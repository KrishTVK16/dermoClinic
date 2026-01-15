# Image Assets Folder

Place your **static image files** here (`.jpg`, `.jfif`, `.png`, `.svg`, `.webp`, etc.).

## How it works:
- Files in the `public` folder are copied to the root of `dist` during build
- With base path `/dermoClinic/`, images here are accessible at: `/dermoClinic/assets/[filename]`

## Example:
- Place `img1.jfif` in this folder (`public/assets/img1.jfif`)
- Reference it in code as: `/dermoClinic/assets/img1.jfif`
- Or use in CSS: `background-image: url(/dermoClinic/assets/img1.jfif);`

## Supported formats:
- Images: `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`, `.svg`, `.jfif`, `.bmp`
- Favicons and icons can also go here

## Note:
- Files in `public` are committed to git (unlike `dist` which contains build artifacts)
- Images here are not optimized/processed - they are copied as-is
- For optimized images, consider using Vite's asset handling in `src/` folder
