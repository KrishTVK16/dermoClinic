# Static CSS Files

Place your **static CSS files** here (`.css` files that are not part of the main build).

## How it works:
- Files in the `public` folder are copied to the root of `dist` during build
- With base path `/dermoClinic/`, CSS files here are accessible at: `/dermoClinic/css/[filename]`

## Example:
- Place `custom-styles.css` in this folder (`public/css/custom-styles.css`)
- Reference it in `index.html` as: `<link rel="stylesheet" href="/dermoClinic/css/custom-styles.css">`

## When to use this:
- Third-party CSS libraries
- Custom styles that aren't processed by Tailwind
- Legacy CSS files
- External stylesheets that need to load separately

## Note:
- Files in `public` are committed to git (unlike `dist` which contains build artifacts)
- CSS files here are not processed by PostCSS/Tailwind - they are copied as-is
- The main CSS (Tailwind + custom) is handled via `src/index.css`
