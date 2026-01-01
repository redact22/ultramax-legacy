import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

/**
 * ULTRAMAX LEGACY: ThemeContext
 * Dynamic Identity - The UI should feel alive and context-aware
 * Automatically switches between Rose (Dating), Emerald (Finance), and Cyan (Tech)
 * based on the app's metadata
 */

export type AccentColor = 'rose' | 'emerald' | 'cyan';

export type AppCategory = 'dating' | 'finance' | 'tech' | 'default';

interface ThemeContextType {
    accent: AccentColor;
    setAccent: (accent: AccentColor) => void;
    detectAppCategory: (metadata?: AppMetadata) => void;
}

interface AppMetadata {
    category?: AppCategory;
    domain?: string;
    title?: string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Mapping between app categories and accent colors
const categoryToAccent: Record<AppCategory, AccentColor> = {
    dating: 'rose',
    finance: 'emerald',
    tech: 'cyan',
  default: 'cyan',
};

// Domain-based detection patterns
const domainPatterns: Record<string, AppCategory> = {
    'dating': 'dating',
    'match': 'dating',
    'love': 'dating',
    'romance': 'dating',
    'finance': 'finance',
    'payment': 'finance',
    'bank': 'finance',
    'wallet': 'finance',
    'crypto': 'finance',
    'invest': 'finance',
    'ai': 'tech',
    'tech': 'tech',
    'cloud': 'tech',
    'code': 'tech',
    'dev': 'tech',
};

interface ThemeProviderProps {
    children: ReactNode;
    initialAccent?: AccentColor;
    metadata?: AppMetadata;
}

export function ThemeProvider({ children, initialAccent = 'cyan', metadata }: ThemeProviderProps) {
    const [accent, setAccent] = useState<AccentColor>(initialAccent);

  // Detect app category and automatically switch accent
  const detectAppCategory = (meta?: AppMetadata) => {
      const data = meta || metadata;

        if (!data) return;

        // Direct category provided
        if (data.category) {
                const newAccent = categoryToAccent[data.category];
                setAccent(newAccent);
                updateCSSVariables(newAccent);
                return;
        }

        // Detect from domain
      if (data.domain) {
              const lowerDomain = data.domain.toLowerCase();
              for (const [pattern, category] of Object.entries(domainPatterns)) {
                        if (lowerDomain.includes(pattern)) {
                                    const newAccent = categoryToAccent[category];
                                    setAccent(newAccent);
                                    updateCSSVariables(newAccent);
                                    return;
                        }
              }
              }

        // Detect from title
        if (data.title) {
                const lowerTitle = data.title.toLowerCase();
                for (const [pattern, category] of Object.entries(domainPatterns)) {
                          if (lowerTitle.includes(pattern)) {
                                      const newAccent = categoryToAccent[category];
                                      setAccent(newAccent);
            updateCSSVariables(newAccent);
                                      return;
                          }
  }
        }
};

  // Update CSS custom properties on accent change
            const updateCSSVariables = (accentColor: AccentColor) => {
                  const root = document.documentElement;

                  // Map accent to CSS variable values from colors.css
      const accentVars: Record<AccentColor, string> = {
                                     rose: 'var(--accent-rose)',
              emerald: 'var(--accent-emerald)',
              cyan: 'var(--accent-cyan)',
      };

                  root.style.setProperty('--accent-primary', accentVars[accentColor]);
};

  // Initialize on mount
    useEffect(() => {
          if (metadata) {
                  detectAppCategory(metadata);
          } else {
                  updateCSSVariables(accent);
          }
    }, []);

  // Update when accent changes manually
  useEffect(() => {
        updateCSSVariables(accent);
  }, [accent]);

  const value: ThemeContextType = {
        accent,
        setAccent,
        detectAppCategory,
  };

  return (
        <ThemeContext.Provider value={value}>
          {children}
        </ThemeContext.Provider>ThemeContext.Provider>
      );
}

// Hook to use theme context
export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
          throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}

// Example usage:
// 
// Wrap your app with ThemeProvider:
// <ThemeProvider metadata={{ category: 'dating' }}>
//   <App />
// </ThemeProvider>
//
// Use in components:
// const { accent, detectAppCategory } = useTheme();
// detectAppCategory({ domain: 'payment-app.com' }); // Switches to emerald (finance)
