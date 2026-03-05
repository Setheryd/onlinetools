/**
 * Server-only client for Tool Guru API.
 * Use only in API routes (e.g. src/app/api/**). Do not import from client components.
 */

const baseUrl = process.env.TOOL_GURU_API_URL?.replace(/\/$/, '') || '';
const apiKey = process.env.TOOL_GURU_API_KEY || process.env.API_KEY || '';

function headers() {
  const h = { 'Content-Type': 'application/json' };
  if (apiKey) {
    h['X-API-Key'] = apiKey;
    h['Authorization'] = `Bearer ${apiKey}`;
  }
  return h;
}

/**
 * POST /api/screenshot – full-page screenshot of a URL.
 * Uses a 90s timeout so the external browser has time to load and capture.
 * @param {Object} body - { url, width?, height?, format?, quality?, wait_until? }
 * @returns {Promise<{ url, image_base64, format, viewport_width, viewport_height, size_bytes }>}
 * @throws {{ status: number, detail: string }} on 4xx/5xx or timeout
 */
export async function screenshot(body) {
  if (!baseUrl) {
    throw Object.assign(new Error('TOOL_GURU_API_URL is not set'), { status: 502, detail: 'Screenshot service not configured.' });
  }
  const url = `${baseUrl}/api/screenshot`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 90000); // 90s for full-page capture
  let res;
  try {
    res = await fetch(url, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(body),
      signal: controller.signal,
    });
  } catch (fetchErr) {
    clearTimeout(timeoutId);
    const err = new Error(fetchErr.name === 'AbortError' ? 'The page took too long to capture. Try a simpler URL or reduce the delay.' : (fetchErr.message || 'Screenshot request failed'));
    err.status = fetchErr.name === 'AbortError' ? 504 : 502;
    err.detail = err.message;
    throw err;
  }
  clearTimeout(timeoutId);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.detail || data.error || 'Screenshot failed');
    err.status = res.status;
    err.detail = data.detail || data.error || err.message;
    throw err;
  }
  return data;
}

/**
 * POST /api/extract/article – fetch URL and extract main article content (no CORS).
 * @param {Object} body - { url, format?: "text"|"markdown"|"json", include_metadata?: boolean }
 * @returns {Promise<{ url?, text?, markdown?, content?, title?, author?, date?, extracted: boolean }>}
 */
export async function extractArticle(body) {
  if (!baseUrl) {
    throw Object.assign(new Error('TOOL_GURU_API_URL is not set'), { status: 502, detail: 'Article extraction not configured.' });
  }
  const res = await fetch(`${baseUrl}/api/extract/article`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.detail || data.error || 'Article extraction failed');
    err.status = res.status;
    err.detail = data.detail || data.error || err.message;
    throw err;
  }
  return data;
}

/**
 * GET /api/ping – check host (and optional port) reachability and latency.
 * @param {Object} query - { host, port? }
 * @returns {Promise<{ reachable?: boolean, ok?: boolean, latency_ms?: number, time_ms?: number, message?: string, error?: string }>}
 */
export async function ping(query) {
  if (!baseUrl) {
    throw Object.assign(new Error('TOOL_GURU_API_URL is not set'), { status: 502, detail: 'Ping service not configured.' });
  }
  const params = new URLSearchParams();
  if (query.host) params.set('host', String(query.host).trim());
  if (query.port != null && query.port !== '') params.set('port', String(query.port));
  const qs = params.toString();
  const url = `${baseUrl}/api/ping${qs ? `?${qs}` : ''}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: apiKey ? { 'X-API-Key': apiKey, 'Authorization': `Bearer ${apiKey}` } : {},
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.detail || data.error || 'Ping failed');
    err.status = res.status;
    err.detail = data.detail || data.error || err.message;
    throw err;
  }
  return data;
}

/**
 * GET /api/redirect/check – follow redirects and return chain + final URL.
 * @param {Object} query - { url }
 * @returns {Promise<{ chain?, redirects?, final_url?, totalMs?, total_time_ms? }>}
 */
export async function redirectCheck(query) {
  if (!baseUrl) {
    throw Object.assign(new Error('TOOL_GURU_API_URL is not set'), { status: 502, detail: 'Redirect check not configured.' });
  }
  const rawUrl = query.url && String(query.url).trim();
  if (!rawUrl) {
    const err = new Error('url is required');
    err.status = 400;
    err.detail = 'url is required';
    throw err;
  }
  const params = new URLSearchParams({ url: rawUrl });
  const res = await fetch(`${baseUrl}/api/redirect/check?${params}`, {
    method: 'GET',
    headers: apiKey ? { 'X-API-Key': apiKey, 'Authorization': `Bearer ${apiKey}` } : {},
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.detail || data.error || 'Redirect check failed');
    err.status = res.status;
    err.detail = data.detail || data.error || err.message;
    throw err;
  }
  return data;
}

export { baseUrl, apiKey };
