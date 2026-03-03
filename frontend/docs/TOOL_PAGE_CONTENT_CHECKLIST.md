# Tool Page Content Checklist

Use this checklist when creating or updating tool pages so each page meets minimum content standards (e.g., for AdSense and search quality). Every tool page should provide **unique, substantive content** and a good user experience.

## Minimum content for each tool page

- **Description**: At least 2–3 sentences (ideally 100–200+ words) of tool-specific explanation. Cover what the tool does, who it’s for, and why it’s useful. Avoid generic one-liners repeated across tools.

- **Features**: At least 4–6 concrete features. Use full phrases (e.g., “One-click copy of the result to clipboard”) rather than single words.

- **How to use**: At least 4 clear steps. Number or order them so a first-time user can follow along.

- **Use cases**: At least 3–4 specific scenarios (e.g., “Debug API responses that return timestamps”) rather than one-word categories.

- **Tips**: At least 2–3 tips where relevant. Keep them specific to the tool (e.g., conversion formulas, best practices).

- **FAQ**: At least 3–4 questions with helpful, tool-specific answers. Avoid repeating the same generic FAQ (e.g., “Is data sent to a server?”) on every page without adding value; vary questions and answers per tool.

## Quality guidelines

- **Unique copy**: Write tool-specific text. Do not copy the same boilerplate (e.g., “Works in your browser”) across many pages without adding unique context.

- **No thin content**: A page that is only a form + result + one short paragraph and one FAQ is likely to be treated as low-value. Expand descriptions, use cases, and FAQs.

- **FAQ schema**: Tool pages that pass a `faq` array to `ToolContentSection` automatically get FAQPage structured data from the shared component. Ensure FAQs are substantive and relevant.

## Where to edit

- Tool page content lives in `frontend/src/app/tools/<tool>/page.js`.
- Pass the expanded props (description, features, howToUse, useCases, tips, faq) to `<ToolContentSection ... />`.

## Reference examples

For examples of pages that meet these standards, see:

- `frontend/src/app/tools/password-generator/page.js`
- `frontend/src/app/tools/base64/page.js`
- `frontend/src/app/tools/sha-generator/page.js` (after enrichment)
- `frontend/src/app/tools/sql-formatter/page.js` (after enrichment)
