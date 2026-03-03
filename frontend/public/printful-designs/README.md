# Printful product designs — THE TOOL GURU

Ready-to-upload designs for [Printful Product templates](https://www.printful.com/dashboard/product-templates).

## Profile logo designs (from your asset)

These use **Brand_Assets/Profile_Photo_Transparent.png** (head silhouette + wrench & screwdriver). Generated on demand as PNGs:

| Design | Description |
|--------|-------------|
| `profile-logo-only` | Your profile logo only, scaled to requested width |
| `profile-fix-it-ship-it` | Logo + "Fix It. Ship It." below |
| `profile-approved` | Logo + "TOOL GURU APPROVED" below |
| `profile-built-right` | Logo + "Built Right." below |

Use the same export API or the `/printful-designs` page; choose **PNG 2250px** or **4500px**.

## Vector designs (SVG)

| File | Description |
|------|-------------|
| `01-logo-only.svg` | Logo (icon + "THE TOOL GURU") — purple/blue gradient |
| `02-logo-tagline.svg` | Logo + "Fix It. Ship It." |
| `03-measure-twice-ship-once.svg` | "Measure Twice. Ship Once." + brand line |
| `04-i-fix-things.svg` | "I Fix Things." |
| `05-tool-guru-approved.svg` | "TOOL GURU APPROVED" stamp style |
| `06-built-right.svg` | "Built Right." |
| **Dev jokes** | |
| `07-if-it-works-dont-touch-it.svg` | "If It Works. Don't Touch It." |
| `08-show-me-the-code.svg` | "Talk Is Cheap. Show Me The Code." |
| `09-its-a-feature.svg` | "It's Not A Bug. It's A Feature." |
| `10-turn-it-off-and-on.svg` | "Turn It Off. Turn It On. Sorted." |
| `11-code-blooded-bug-free.svg` | "Code Blooded. Bug Free." |
| `12-this-should-do-the-trick.svg` | "This Should Do The Trick." |
| `13-rubber-duck-approved.svg` | "Rubber Duck Approved." |
| `14-10-types-of-people.svg` | "10 Types Of People" / binary joke |
| `15-sudo-make-me-a-sandwich.svg` | "sudo make me a sandwich." |
| `16-404-sleep-not-found.svg` | "404: Sleep Not Found." |

All use your brand gradient (indigo → violet → purple) and transparent backgrounds so they work on any product color.

## Getting PNGs for Printful

**Option A – From the site**  
Open `/printful-designs` on your site and use the **PNG 2250px** or **PNG 4500px** buttons to download Printful-ready PNGs.

**Option B – Export API**  
- Standard placement (tees, mugs):  
  `GET /api/printful-design/export?name=01-logo-only&width=2250`  
- Large / all-over:  
  `GET /api/printful-design/export?name=01-logo-only&width=4500`  

**Option C – Convert SVGs yourself**  
Open any `.svg` in a browser or design tool and export as PNG.  
- **2250px width** ≈ standard chest/back placement.  
- **4500px width** for posters or large print areas.  
Printful accepts up to 20,000px and 200 MB; 300 DPI for paper, 150 DPI for apparel is typical.

## Uploading to Printful

1. Go to [Dashboard → Product templates](https://www.printful.com/dashboard/product-templates).
2. Click **Create product** (or **Add product**).
3. Pick your product (e.g. Unisex Staple T-Shirt).
4. Upload your PNG as the **print file**.
5. Position if needed, then **Save as template**.
6. Use **Add to store** or **New order** to use the template.

## Editing or adding designs

- Edit the `.svg` files in this folder; they’re plain SVG.
- Add new designs as `NN-name.svg` and add the same `name` to the `ALLOWED` array in `src/app/api/printful-design/export/route.js` and to the list on `/printful-designs`. Profile designs use the same API with `name=profile-*` and require `Brand_Assets/Profile_Photo_Transparent.png`.
