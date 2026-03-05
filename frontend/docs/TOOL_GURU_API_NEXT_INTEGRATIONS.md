# Tool Guru API — Next integrations roadmap

Screenshot is done: frontend calls Next.js `/api/website-screenshot`, which uses `toolGuruApi.screenshot()` and returns the image. API key stays server-side.

Use the **same pattern** for every new integration:
1. Add a function in `frontend/src/lib/toolGuruApi.js` that calls the API (with auth headers).
2. Add a Next.js API route under `frontend/src/app/api/...` that reads the request, calls the Tool Guru API client, and returns the response (or a normalized shape). The UI calls the Next route, not the API directly.
3. Point the existing tool page (or a new one) at the new route so the tool is backed by the API.

---

## Tier 1 — Enhance existing tools (quick wins)

These tools already exist; wire them to the API for a single source of truth and less client-side logic.

| API endpoint | Frontend tool | Notes |
|--------------|---------------|--------|
| **GET /api/password/generate** | Password Generator | Query: length, uppercase, lowercase, digits, symbols. Proxy GET → return `{ password, length }`. |
| **POST /api/hash** | Hash Generator | Body: text, algorithms[]. Returns multiple hashes at once. |
| **POST /api/base64** | Base64 Encoder/Decoder | Body: text, action (encode/decode). |
| **POST /api/json/format**, **validate**, **to-yaml** | JSON Formatter | Three endpoints; can proxy all from one route with an action param. |
| **POST /api/qr** | QR Code Generator | Body: data, size?, border?. Returns image_base64 PNG; proxy and return image or base64. |
| **POST /api/color/convert** | Color Converter | Body: color (hex/rgb/hsl). Returns hex, rgb, hsl. |
| **POST /api/jwt/decode** | JWT Decoder | Body: token. Returns header, payload. |
| **GET /api/uuid/generate** | UUID Generator | Query: count. Returns uuids[]. |

**Suggested order:** Password → Hash → QR → Base64 → JSON → Color → JWT → UUID (or batch 2–3 at a time).

---

## Tier 2 — New or high-value tools

| API endpoint | Idea | Notes |
|--------------|------|--------|
| **POST /api/pdf/merge**, **split**, **from-images** | PDF tools | You have pdf-merger, pdf-splitter, image-to-pdf. Back them with the API for large files / consistent behavior. |
| **POST /api/extract/article** | Article extractor | ✅ **Done.** New tool: paste URL → get main article text/markdown (no CORS). `/tools/article-extractor`, `POST /api/article-extract`. |
| **POST /api/transcribe** | Audio to text | New tool: upload audio → transcript (multipart/form-data; 503 if Whisper not installed). |
| **GET /api/validate/robots-txt**, **sitemap**, **og** | SEO / validators | New or add to meta-analyzer: fetch URL, validate robots/sitemap/OG tags. |
| **GET /api/redirect/check** | Redirect checker | ✅ **Done.** Redirect checker now uses API: `/api/redirect-check` proxies to API, response normalized to `{ chain, totalMs }`. |
| **GET /api/cron/parse** | Cron explainer | You have cron-job-generator; add “next run times” using this. |
| **GET /api/ping** | Ping / port check | ✅ **Done.** New tool: host + optional port → reachable + latency. `/tools/ping-tool`, `GET /api/ping`. |
| **POST /api/wget** | Fetch URL | New tool or power-user: URL → status, headers, optional body (no CORS). |
| **POST /api/image/resize**, **crop**, **rotate**, **thumbnail**, **convert** | Image ops | Back image-resizer, image-converter, etc., with server-side Pillow. |
| **GET /api/convert/storage**, **date/calculate**, **timezone/list**, **timezone** | Convert | Back file-size-converter, date/time tools, time-zone-converter. |

---

## Implementation checklist (per endpoint)

- [ ] Add `toolGuruApi.<name>(bodyOrQuery)` in `frontend/src/lib/toolGuruApi.js`.
- [ ] Add `frontend/src/app/api/<tool>/route.js` (or subpath) that validates input, calls the client, normalizes errors, returns JSON (or image/blob if applicable).
- [ ] Update the tool page to `fetch('/api/...')` instead of client-only logic (or add a “Use API” path that calls the route).
- [ ] Handle 502/503/429 and show API `detail` in the UI where possible.

---

## Reference

- **API base:** `TOOL_GURU_API_URL` (e.g. https://api.thetool.guru).
- **Auth:** `TOOL_GURU_API_KEY` or `API_KEY` in headers: `X-API-Key`, `Authorization: Bearer`.
- **Full API list:** `Tool_Guru_API/FRONTEND_API_REFERENCE.md`.
