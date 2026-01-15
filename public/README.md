# Public Assets Folder

This folder contains **static assets** that are copied directly to the output directory during build.

## 📁 Folder Structure

```
public/
├── assets/     # Images (jpg, png, svg, etc.)
├── css/        # Static CSS files
├── js/         # Static JavaScript files
└── README.md   # This file
```

## 🎯 How It Works

- **Files in `public` are automatically copied to `dist` during build**
- Files here are **committed to git** (unlike `dist` folder)
- Access files using the base path: `/dermoClinic/[folder]/[filename]`

## 📦 Usage Examples

### Images (`public/assets/`)
```html
<!-- In HTML -->
<img src="/dermoClinic/assets/img1.jfif" alt="Image" />

<!-- In CSS/React -->
style={{ backgroundImage: 'url(/dermoClinic/assets/img1.jfif)' }}
```

### JavaScript (`public/js/`)
```html
<!-- In index.html -->
<script src="/dermoClinic/js/custom-script.js"></script>
```

### CSS (`public/css/`)
```html
<!-- In index.html -->
<link rel="stylesheet" href="/dermoClinic/css/custom-styles.css" />
```

## ✅ What Goes Where?

### ✅ Put in `public/`:
- Static images (logos, backgrounds, etc.)
- Third-party scripts (analytics, widgets)
- Custom CSS files (not processed by Tailwind)
- Favicons, icons
- Font files (if hosting locally)

### ❌ Don't put in `public/`:
- React components (go in `components/` or `pages/`)
- TypeScript/JSX files (go in `src/`)
- Tailwind-processed CSS (go in `src/index.css`)
- Source code files

## 🔄 Build Process

1. You add files to `public/` folders
2. Run `npm run build`
3. Vite automatically copies everything from `public/` to `dist/`
4. GitHub Actions builds and deploys `dist/` to GitHub Pages

## 📝 Notes

- Files are copied **as-is** (no processing/optimization)
- For optimized assets, import them in React/TypeScript files
- All files here will be publicly accessible after deployment
- Use relative paths with base `/dermoClinic/` prefix
