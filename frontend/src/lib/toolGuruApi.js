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
 * GET /api/traceroute – trace route to host (hop-by-hop).
 * @param {Object} query - { host, max_hops? }
 * @returns {Promise<{ hops?: Array<{ hop?, ip?, hostname?, rtt_ms? }>, error?: string }>}
 */
export async function traceroute(query) {
  if (!baseUrl) {
    throw Object.assign(new Error('TOOL_GURU_API_URL is not set'), { status: 502, detail: 'Traceroute service not configured.' });
  }
  const params = new URLSearchParams();
  if (query.host) params.set('host', String(query.host).trim());
  if (query.max_hops != null && query.max_hops !== '') params.set('max_hops', String(query.max_hops));
  const qs = params.toString();
  const url = `${baseUrl}/api/traceroute${qs ? `?${qs}` : ''}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: apiKey ? { 'X-API-Key': apiKey, 'Authorization': `Bearer ${apiKey}` } : {},
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.detail || data.error || 'Traceroute failed');
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

function authHeaders() {
  return apiKey ? { 'X-API-Key': apiKey, 'Authorization': `Bearer ${apiKey}` } : {};
}

function handleJsonResponse(res, errMessage) {
  return res.json().catch(() => ({})).then(data => {
    if (!res.ok) {
      const err = new Error(data.detail || data.error || errMessage);
      err.status = res.status;
      err.detail = data.detail || data.error || err.message;
      throw err;
    }
    return data;
  });
}

/**
 * POST /api/transcribe – audio to text (e.g. Whisper).
 * @param {FormData} formData - multipart with 'file' or 'audio' (audio file)
 * @returns {Promise<{ text?: string, transcript?: string }>}
 */
export async function transcribe(formData) {
  if (!baseUrl) throw Object.assign(new Error('TOOL_GURU_API_URL is not set'), { status: 502, detail: 'Transcribe not configured.' });
  const res = await fetch(`${baseUrl}/api/transcribe`, {
    method: 'POST',
    headers: authHeaders(),
    body: formData,
  });
  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { detail: res.status === 413 ? 'File too large. Maximum size is 25 MB.' : (text.slice(0, 200) || 'Invalid response from server.') };
  }
  if (!res.ok) {
    const err = new Error(data.detail || data.error || 'Transcription failed');
    err.status = res.status;
    err.detail = data.detail || data.error || err.message;
    throw err;
  }
  return data;
}

/**
 * GET /api/cron/parse – next run times for a cron expression.
 * @param {{ expression: string, count?: number }} query
 * @returns {Promise<{ next_runs?: string[], times?: string[] }>}
 */
export async function cronParse(query) {
  if (!baseUrl) throw Object.assign(new Error('TOOL_GURU_API_URL is not set'), { status: 502, detail: 'Cron parse not configured.' });
  const params = new URLSearchParams();
  params.set('expression', String(query.expression || '').trim());
  if (query.count != null) params.set('count', String(query.count));
  const res = await fetch(`${baseUrl}/api/cron/parse?${params}`, { method: 'GET', headers: authHeaders() });
  return handleJsonResponse(res, 'Cron parse failed');
}

/**
 * GET or POST /api/wget – fetch URL server-side (no CORS).
 * @param {{ url: string, method?: string, includeBody?: boolean }} query or body
 * @returns {Promise<{ status?: number, headers?: object, body?: string }>}
 */
export async function wget(params) {
  if (!baseUrl) throw Object.assign(new Error('TOOL_GURU_API_URL is not set'), { status: 502, detail: 'URL fetch not configured.' });
  const url = params.url && String(params.url).trim();
  if (!url) {
    const err = new Error('url is required');
    err.status = 400;
    err.detail = 'url is required';
    throw err;
  }
  const res = await fetch(`${baseUrl}/api/wget`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ url: url.startsWith('http') ? url : `https://${url}`, method: params.method || 'GET', include_body: params.includeBody !== false }),
  });
  return handleJsonResponse(res, 'URL fetch failed');
}

/**
 * GET /api/validate/robots-txt – validate robots.txt for a URL.
 * @param {{ url: string }} query
 */
export async function validateRobotsTxt(query) {
  if (!baseUrl) throw Object.assign(new Error('TOOL_GURU_API_URL is not set'), { status: 502, detail: 'Validation not configured.' });
  const u = query.url && String(query.url).trim();
  if (!u) {
    const err = new Error('url is required');
    err.status = 400;
    err.detail = 'url is required';
    throw err;
  }
  const params = new URLSearchParams({ url: u.startsWith('http') ? u : `https://${u}` });
  const res = await fetch(`${baseUrl}/api/validate/robots-txt?${params}`, { method: 'GET', headers: authHeaders() });
  return handleJsonResponse(res, 'Robots.txt validation failed');
}

/**
 * GET /api/validate/sitemap – validate sitemap for a URL.
 * @param {{ url: string }} query
 */
export async function validateSitemap(query) {
  if (!baseUrl) throw Object.assign(new Error('TOOL_GURU_API_URL is not set'), { status: 502, detail: 'Validation not configured.' });
  const u = query.url && String(query.url).trim();
  if (!u) {
    const err = new Error('url is required');
    err.status = 400;
    err.detail = 'url is required';
    throw err;
  }
  const params = new URLSearchParams({ url: u.startsWith('http') ? u : `https://${u}` });
  const res = await fetch(`${baseUrl}/api/validate/sitemap?${params}`, { method: 'GET', headers: authHeaders() });
  return handleJsonResponse(res, 'Sitemap validation failed');
}

/**
 * GET /api/validate/og – validate Open Graph tags for a URL.
 * @param {{ url: string }} query
 */
export async function validateOg(query) {
  if (!baseUrl) throw Object.assign(new Error('TOOL_GURU_API_URL is not set'), { status: 502, detail: 'Validation not configured.' });
  const u = query.url && String(query.url).trim();
  if (!u) {
    const err = new Error('url is required');
    err.status = 400;
    err.detail = 'url is required';
    throw err;
  }
  const params = new URLSearchParams({ url: u.startsWith('http') ? u : `https://${u}` });
  const res = await fetch(`${baseUrl}/api/validate/og?${params}`, { method: 'GET', headers: authHeaders() });
  return handleJsonResponse(res, 'OG validation failed');
}

/**
 * POST /api/pdf/merge – merge PDFs (multipart).
 * @param {FormData} formData - PDF files (e.g. file, file_0, file_1 or files[])
 */
export async function pdfMerge(formData) {
  if (!baseUrl) throw Object.assign(new Error('TOOL_GURU_API_URL is not set'), { status: 502, detail: 'PDF merge not configured.' });
  const res = await fetch(`${baseUrl}/api/pdf/merge`, { method: 'POST', headers: authHeaders(), body: formData });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    const err = new Error(data.detail || data.error || 'PDF merge failed');
    err.status = res.status;
    err.detail = data.detail || data.error || err.message;
    throw err;
  }
  return res.arrayBuffer();
}

/**
 * POST /api/pdf/split – split PDF (multipart).
 * @param {FormData} formData - pdf file + mode/ranges options
 */
export async function pdfSplit(formData) {
  if (!baseUrl) throw Object.assign(new Error('TOOL_GURU_API_URL is not set'), { status: 502, detail: 'PDF split not configured.' });
  const res = await fetch(`${baseUrl}/api/pdf/split`, { method: 'POST', headers: authHeaders(), body: formData });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    const err = new Error(data.detail || data.error || 'PDF split failed');
    err.status = res.status;
    err.detail = data.detail || data.error || err.message;
    throw err;
  }
  return res.arrayBuffer();
}

/**
 * POST /api/pdf/from-images – create PDF from images (multipart).
 * @param {FormData} formData - image files
 */
export async function pdfFromImages(formData) {
  if (!baseUrl) throw Object.assign(new Error('TOOL_GURU_API_URL is not set'), { status: 502, detail: 'PDF from images not configured.' });
  const res = await fetch(`${baseUrl}/api/pdf/from-images`, { method: 'POST', headers: authHeaders(), body: formData });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    const err = new Error(data.detail || data.error || 'PDF creation failed');
    err.status = res.status;
    err.detail = data.detail || data.error || err.message;
    throw err;
  }
  return res.arrayBuffer();
}

/**
 * POST /api/image/resize (or crop, rotate, thumbnail, convert) – image ops.
 * @param {FormData} formData - image file + width, height, etc.
 * @param {string} action - resize | crop | rotate | thumbnail | convert
 */
export async function imageOp(formData, action = 'resize') {
  if (!baseUrl) throw Object.assign(new Error('TOOL_GURU_API_URL is not set'), { status: 502, detail: 'Image service not configured.' });
  const endpoint = ['resize', 'crop', 'rotate', 'thumbnail', 'convert'].includes(action) ? action : 'resize';
  const res = await fetch(`${baseUrl}/api/image/${endpoint}`, { method: 'POST', headers: authHeaders(), body: formData });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    const err = new Error(data.detail || data.error || 'Image operation failed');
    err.status = res.status;
    err.detail = data.detail || data.error || err.message;
    throw err;
  }
  return res.arrayBuffer();
}

/**
 * GET /api/convert/storage – convert storage units.
 * @param {{ value: string|number, from: string, to: string }} query
 */
export async function convertStorage(query) {
  if (!baseUrl) throw Object.assign(new Error('TOOL_GURU_API_URL is not set'), { status: 502, detail: 'Convert not configured.' });
  const params = new URLSearchParams(query);
  const res = await fetch(`${baseUrl}/api/convert/storage?${params}`, { method: 'GET', headers: authHeaders() });
  return handleJsonResponse(res, 'Storage conversion failed');
}

/**
 * GET /api/convert/date/calculate – date calculations.
 * @param {{ ... }} query - op, date, days, etc.
 */
export async function dateCalculate(query) {
  if (!baseUrl) throw Object.assign(new Error('TOOL_GURU_API_URL is not set'), { status: 502, detail: 'Date calculate not configured.' });
  const params = new URLSearchParams(query);
  const res = await fetch(`${baseUrl}/api/convert/date/calculate?${params}`, { method: 'GET', headers: authHeaders() });
  return handleJsonResponse(res, 'Date calculation failed');
}

/**
 * GET /api/convert/timezone/list – list timezones.
 */
export async function timezoneList() {
  if (!baseUrl) throw Object.assign(new Error('TOOL_GURU_API_URL is not set'), { status: 502, detail: 'Timezone list not configured.' });
  const res = await fetch(`${baseUrl}/api/convert/timezone/list`, { method: 'GET', headers: authHeaders() });
  return handleJsonResponse(res, 'Timezone list failed');
}

/**
 * GET /api/convert/timezone – convert time between timezones.
 * @param {{ from: string, to: string, time?: string }} query
 */
export async function timezoneConvert(query) {
  if (!baseUrl) throw Object.assign(new Error('TOOL_GURU_API_URL is not set'), { status: 502, detail: 'Timezone convert not configured.' });
  const params = new URLSearchParams(query);
  const res = await fetch(`${baseUrl}/api/convert/timezone?${params}`, { method: 'GET', headers: authHeaders() });
  return handleJsonResponse(res, 'Timezone conversion failed');
}

export { baseUrl, apiKey };
