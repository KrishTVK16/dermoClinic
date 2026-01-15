import React, { useEffect, useState } from 'react';

/**
 * CSSLoader - Automatically loads fallback CSS if Tailwind fails
 * This ensures the website always has styling, even if Tailwind CSS doesn't load
 */
export const CSSLoader: React.FC = () => {
  const [tailwindLoaded, setTailwindLoaded] = useState<boolean | null>(null);
  const [fallbackLoaded, setFallbackLoaded] = useState(false);

  useEffect(() => {
    const checkTailwind = () => {
      // Check if Tailwind CSS is loaded by looking for specific Tailwind classes
      const testElement = document.createElement('div');
      testElement.className = 'bg-white dark:bg-zinc-950';
      testElement.style.position = 'absolute';
      testElement.style.visibility = 'hidden';
      testElement.style.pointerEvents = 'none';
      document.body.appendChild(testElement);

      const computedStyle = window.getComputedStyle(testElement);
      const hasTailwind = 
        computedStyle.backgroundColor !== '' &&
        (computedStyle.backgroundColor !== 'rgba(0, 0, 0, 0)' || 
         computedStyle.backgroundColor !== 'transparent');

      // Also check if Tailwind utilities exist in stylesheets
      const stylesheets = Array.from(document.styleSheets);
      const hasTailwindInSheets = stylesheets.some(sheet => {
        try {
          const rules = Array.from(sheet.cssRules || []);
          return rules.some(rule => {
            const cssText = rule.cssText || '';
            return cssText.includes('.bg-white') || 
                   cssText.includes('.dark\\:bg-zinc-950') ||
                   cssText.includes('--tw-');
          });
        } catch (e) {
          return false;
        }
      });

      document.body.removeChild(testElement);

      const isLoaded = hasTailwind || hasTailwindInSheets;
      setTailwindLoaded(isLoaded);

      // If Tailwind is not loaded after 2 seconds, load fallback
      if (!isLoaded) {
        setTimeout(() => {
          if (!tailwindLoaded) {
            loadFallbackCSS();
          }
        }, 2000);
      }

      return isLoaded;
    };

    const loadFallbackCSS = () => {
      // Check if fallback CSS is already loaded
      const existingLink = document.querySelector('link[data-fallback-css]');
      if (existingLink || fallbackLoaded) {
        return;
      }

      // Create and inject fallback CSS link
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      
      // Try multiple paths for fallback CSS
      const basePath = window.location.pathname.includes('/dermoClinic/') 
        ? '/dermoClinic' 
        : '';
      const paths = [
        `${basePath}/src/fallback.css`,
        `${basePath}/assets/fallback.css`,
        './src/fallback.css',
        '/src/fallback.css'
      ];
      
      let currentPathIndex = 0;
      
      const tryNextPath = () => {
        if (currentPathIndex < paths.length) {
          link.href = paths[currentPathIndex];
          currentPathIndex++;
        } else {
          // If all paths fail, inject inline fallback styles
          injectInlineFallback();
        }
      };
      
      link.setAttribute('data-fallback-css', 'true');
      link.onload = () => {
        setFallbackLoaded(true);
        console.log('✅ Fallback CSS loaded successfully from:', link.href);
        document.body.classList.add('fallback-css-active');
      };
      link.onerror = () => {
        console.warn('Failed to load fallback CSS from:', link.href, '- trying next path');
        tryNextPath();
      };
      
      link.href = paths[0];
      document.head.appendChild(link);
      
      // If first path fails, try others
      if (currentPathIndex === 0) {
        setTimeout(() => {
          if (!fallbackLoaded && link.sheet === null) {
            tryNextPath();
          }
        }, 1000);
      }
      
      const injectInlineFallback = () => {
        // Last resort: inject minimal critical CSS inline
        const style = document.createElement('style');
        style.setAttribute('data-fallback-css', 'true');
        style.textContent = `
          * { box-sizing: border-box; }
          body { font-family: system-ui, -apple-system, sans-serif; margin: 0; padding: 0; }
          .container { max-width: 1280px; margin: 0 auto; padding: 0 1rem; }
          nav { display: flex; align-items: center; justify-content: space-between; padding: 1rem; }
          button, .btn { padding: 0.75rem 1.5rem; background:rgba(197, 160, 40, 0); color: white; border: none; border-radius: 0.5rem; cursor: pointer; }
        `;
        document.head.appendChild(style);
        setFallbackLoaded(true);
        document.body.classList.add('fallback-css-active');
        console.log('✅ Inline fallback CSS injected');
      };
    };

    // Initial check after a short delay to allow CSS to load
    const timeout = setTimeout(() => {
      const loaded = checkTailwind();
      if (!loaded) {
        loadFallbackCSS();
      }
    }, 1000);

    // Also check on stylesheet load events
    const checkOnLoad = () => {
      setTimeout(() => {
        if (tailwindLoaded === null || tailwindLoaded === false) {
          const loaded = checkTailwind();
          if (!loaded && !fallbackLoaded) {
            loadFallbackCSS();
          }
        }
      }, 500);
    };

    // Listen for stylesheet loads
    document.addEventListener('DOMContentLoaded', checkOnLoad);
    window.addEventListener('load', checkOnLoad);

    return () => {
      clearTimeout(timeout);
      document.removeEventListener('DOMContentLoaded', checkOnLoad);
      window.removeEventListener('load', checkOnLoad);
    };
  }, [tailwindLoaded, fallbackLoaded]);

  // This component doesn't render anything
  return null;
};
