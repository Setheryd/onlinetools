export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import net from 'node:net';

function isValidHostname(host) {
  if (!host || host.length > 253) return false;
  const regex = /^(?=.{1,253}$)(?!-)(?:[a-zA-Z0-9-]{0,63}[a-zA-Z0-9]\.)+[a-zA-Z]{2,63}$/;
  return regex.test(host);
}

const TLD_SERVERS = {
  com: 'whois.verisign-grs.com',
  net: 'whois.verisign-grs.com',
  org: 'whois.pir.org',
  io: 'whois.nic.io',
  ai: 'whois.nic.ai',
  app: 'whois.nic.google',
  dev: 'whois.nic.google',
  xyz: 'whois.nic.xyz',
};

function guessWhoisServer(domain) {
  const tld = domain.split('.').pop();
  return TLD_SERVERS[tld] || 'whois.iana.org';
}

function whoisQuery(server, domain) {
  return new Promise((resolve, reject) => {
    const socket = net.connect(43, server);
    let data = '';
    socket.setTimeout(8000);
    socket.on('connect', () => {
      socket.write(domain + '\r\n');
    });
    socket.on('data', chunk => { data += chunk.toString('utf8'); });
    socket.on('end', () => resolve(data));
    socket.on('timeout', () => socket.destroy(new Error('Timeout')));
    socket.on('error', reject);
  });
}

function parseSimpleWhois(text) {
  const lines = text.split(/\r?\n/);
  const fields = {};
  for (const line of lines) {
    const idx = line.indexOf(':');
    if (idx > 0) {
      const key = line.slice(0, idx).trim().toLowerCase();
      const value = line.slice(idx + 1).trim();
      if (!fields[key]) fields[key] = value;
    }
  }
  return { raw: text, fields };
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const domain = (searchParams.get('domain') || '').trim().toLowerCase();
  if (!domain) return NextResponse.json({ error: 'Missing ?domain=' }, { status: 400 });
  if (!isValidHostname(domain)) return NextResponse.json({ error: 'Invalid domain' }, { status: 400 });

  try {
    const server = guessWhoisServer(domain);
    const startedAt = Date.now();
    const response = await whoisQuery(server, domain);
    const durationMs = Date.now() - startedAt;
    return NextResponse.json({ domain, server, durationMs, ...parseSimpleWhois(response) });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}


