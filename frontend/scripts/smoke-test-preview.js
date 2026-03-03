#!/usr/bin/env node
/**
 * Smoke test script for a Vercel preview (or any) deployment.
 * Usage:
 *   BASE_URL=https://your-preview.vercel.app node scripts/smoke-test-preview.js
 *   node scripts/smoke-test-preview.js https://your-preview.vercel.app
 * Optional: set VERCEL_API_TOKEN and VERCEL_PROJECT_ID; pass --branch store to use latest preview URL for that branch.
 */

const BASE_URL_ENV = 'BASE_URL';
const VERCEL_API = 'https://api.vercel.com';

function getBaseUrlFromArgs() {
  const args = process.argv.slice(2);
  const branchIndex = args.indexOf('--branch');
  const urlArg = args.find((a) => a.startsWith('http'));
  if (urlArg) return urlArg.replace(/\/$/, '');
  return process.env[BASE_URL_ENV]?.replace(/\/$/, '');
}

async function resolveVercelPreviewUrl(branch = 'store') {
  const token = process.env.VERCEL_API_TOKEN;
  const projectId = process.env.VERCEL_PROJECT_ID;
  if (!token || !projectId) return null;
  const url = `${VERCEL_API}/v6/deployments?projectId=${projectId}&target=preview&limit=10`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) return null;
  const data = await res.json();
  const deployments = data.deployments || [];
  const forBranch = deployments.find(
    (d) => d.meta?.githubCommitRef === branch || d.meta?.gitlabBranchName === branch
  );
  const deployment = forBranch || deployments[0];
  if (!deployment?.url) return null;
  return `https://${deployment.url}`;
}

async function run() {
  let baseUrl = getBaseUrlFromArgs();
  const branchIndex = process.argv.indexOf('--branch');
  const branch = branchIndex !== -1 ? process.argv[branchIndex + 1] : 'store';
  if (!baseUrl && process.env.VERCEL_API_TOKEN && process.env.VERCEL_PROJECT_ID) {
    baseUrl = await resolveVercelPreviewUrl(branch);
    if (baseUrl) console.log('Resolved preview URL:', baseUrl);
  }
  if (!baseUrl) {
    console.error('Missing BASE_URL. Set env BASE_URL or pass URL as first argument.');
    console.error('Example: BASE_URL=https://your-preview.vercel.app node scripts/smoke-test-preview.js');
    process.exit(1);
  }

  const results = [];

  async function check(name, fn) {
    try {
      await fn();
      results.push({ name, ok: true });
      console.log(`  OK   ${name}`);
    } catch (err) {
      results.push({ name, ok: false, error: err.message });
      console.log(`  FAIL ${name}: ${err.message}`);
    }
  }

  console.log(`Smoke testing: ${baseUrl}\n`);

  await check('GET / returns 200 and site title', async () => {
    const res = await fetch(baseUrl + '/');
    if (res.status !== 200) throw new Error(`status ${res.status}`);
    const html = await res.text();
    if (!html.includes('The Tool Guru')) throw new Error('missing site title in HTML');
  });

  await check('GET /store returns 200 and store content', async () => {
    const res = await fetch(baseUrl + '/store');
    if (res.status !== 200) throw new Error(`status ${res.status}`);
    const html = await res.text();
    if (!html.includes('Store') && !html.includes('The Tool Guru Store'))
      throw new Error('missing store content in HTML');
  });

  await check('GET /tools returns 200 and tools content', async () => {
    const res = await fetch(baseUrl + '/tools');
    if (res.status !== 200) throw new Error(`status ${res.status}`);
    const html = await res.text();
    if (!html.includes('tools') && !html.includes('Tools'))
      throw new Error('missing tools content in HTML');
  });

  await check('GET /api/store/catalog returns 200 and products array', async () => {
    const res = await fetch(baseUrl + '/api/store/catalog');
    if (res.status !== 200) throw new Error(`status ${res.status}`);
    const data = await res.json();
    if (!Array.isArray(data.products)) throw new Error('response missing products array');
  });

  await check('POST /api/store/checkout with empty items returns 400', async () => {
    const res = await fetch(baseUrl + '/api/store/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: [] }),
    });
    if (res.status !== 400) throw new Error(`expected 400, got ${res.status}`);
  });

  await check('GET /store/success returns 200 and thank-you content', async () => {
    const res = await fetch(baseUrl + '/store/success');
    if (res.status !== 200) throw new Error(`status ${res.status}`);
    const html = await res.text();
    if (!html.includes('Thank you') && !html.toLowerCase().includes('order'))
      throw new Error('missing thank-you content in HTML');
  });

  const failed = results.filter((r) => !r.ok);
  console.log('');
  if (failed.length === 0) {
    console.log('All checks passed.');
    process.exit(0);
  } else {
    console.log(`${failed.length} check(s) failed.`);
    process.exit(1);
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
