import React, { useEffect, useState } from 'react';

interface DependencyStatus {
  name: string;
  url: string;
  loaded: boolean;
  error?: string;
}

const DependencyChecker: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dependencies, setDependencies] = useState<DependencyStatus[]>([]);
  const [showPrompt, setShowPrompt] = useState(false);
  const [cssLoaded, setCssLoaded] = useState(false);

  useEffect(() => {
    // Check if CSS is loaded (either Tailwind or fallback)
    const checkCSS = () => {
      const stylesheets = Array.from(document.styleSheets);
      const hasTailwind = stylesheets.some(sheet => {
        try {
          const rules = Array.from(sheet.cssRules || []);
          return rules.some(rule => 
            rule.cssText.includes('tailwind') || 
            rule.cssText.includes('bg-white') ||
            rule.cssText.includes('dark:bg-zinc-950') ||
            rule.cssText.includes('--tw-')
          );
        } catch (e) {
          return false;
        }
      });
      
      // Check if fallback CSS is loaded
      const hasFallback = document.querySelector('link[data-fallback-css]') !== null ||
                         document.body.classList.contains('fallback-css-active');
      
      // CSS is loaded if either Tailwind or fallback is present
      const cssIsLoaded = hasTailwind || hasFallback;
      setCssLoaded(cssIsLoaded);
      return cssIsLoaded;
    };

    // Check CSS after a short delay to allow it to load
    const cssCheckTimeout = setTimeout(() => {
      if (!checkCSS()) {
        console.warn('Tailwind CSS may not be loaded correctly');
        setShowPrompt(true);
      }
    }, 1000);

    // Check CDN dependencies from import map
    const checkDependencies = async () => {
      const importMap = document.querySelector('script[type="importmap"]');
      if (!importMap) return;

      try {
        const importMapData = JSON.parse(importMap.textContent || '{}');
        const deps: DependencyStatus[] = [];

        for (const [name, url] of Object.entries(importMapData.imports || {})) {
          if (typeof url === 'string' && url.startsWith('http')) {
            try {
              const response = await fetch(url, { method: 'HEAD', mode: 'no-cors' });
              deps.push({ name, url, loaded: true });
            } catch (error) {
              deps.push({ 
                name, 
                url, 
                loaded: false, 
                error: 'Failed to load dependency' 
              });
              setShowPrompt(true);
            }
          }
        }

        setDependencies(deps);
      } catch (error) {
        console.error('Error checking dependencies:', error);
      }
    };

    checkDependencies();

    return () => {
      clearTimeout(cssCheckTimeout);
    };
  }, []);

  const handleRetry = () => {
    window.location.reload();
  };

  const handleContinue = () => {
    setShowPrompt(false);
  };

  if (!showPrompt) {
    return <>{children}</>;
  }

  const failedDeps = dependencies.filter(dep => !dep.loaded);
  const hasCSSIssue = !cssLoaded;

  return (
    <>
      {children}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 border border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
              <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
              Dependency Check Required
            </h2>
          </div>

          <div className="space-y-4 mb-6">
            {hasCSSIssue && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-sm text-red-800 dark:text-red-400 font-medium">
                  ⚠️ CSS styles may not be loading correctly. The website may appear unstyled.
                </p>
              </div>
            )}

            {failedDeps.length > 0 && (
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <p className="text-sm text-yellow-800 dark:text-yellow-400 font-medium mb-2">
                  The following dependencies failed to load:
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-yellow-700 dark:text-yellow-300">
                  {failedDeps.map((dep, idx) => (
                    <li key={idx}>{dep.name}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-400">
                This website requires external dependencies to function properly. 
                Please check your internet connection and try again.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleRetry}
              className="flex-1 px-4 py-2 bg-gold-500 hover:bg-gold-600 text-white rounded-lg font-medium transition-colors"
            >
              Retry
            </button>
            <button
              onClick={handleContinue}
              className="flex-1 px-4 py-2 bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 text-zinc-900 dark:text-zinc-50 rounded-lg font-medium transition-colors"
            >
              Continue Anyway
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DependencyChecker;
