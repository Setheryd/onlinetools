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

export { baseUrl, apiKey };
