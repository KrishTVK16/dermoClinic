# Static JavaScript Files

Place your **static JavaScript files** here (`.js` files that are not part of the React build).

## How it works:
- Files in the `public` folder are copied to the root of `dist` during build
- With base path `/dermoClinic/`, JS files here are accessible at: `/dermoClinic/js/[filename]`

## Example:
- Place `custom-script.js` in this folder (`public/js/custom-script.js`)
- Reference it in `index.html` as: `<script src="/dermoClinic/js/custom-script.js"></script>`

## When to use this:
- Third-party scripts that need to load separately
- Analytics scripts (Google Analytics, etc.)
- Custom utility scripts that aren't part of React
- Scripts that need to load before or after React

## Note:
- Files in `public` are committed to git (unlike `dist` which contains build artifacts)
- Scripts here are not processed by Vite/bundler - they are copied as-is
