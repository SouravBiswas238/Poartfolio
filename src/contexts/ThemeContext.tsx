import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface ColorTheme {
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  gradient: string;
  gradientHover: string;
}

const themes: Record<string, ColorTheme> = {
  purple: {
    name: 'Purple Dream',
    primary: '#9333ea',
    secondary: '#06b6d4',
    accent: '#ec4899',
    background: '#111827',
    surface: '#1f2937',
    text: '#ffffff',
    textSecondary: '#9ca3af',
    gradient: 'linear-gradient(135deg, #9333ea, #06b6d4)',
    gradientHover: 'linear-gradient(135deg, #7c3aed, #0891b2)',
  },
  blue: {
    name: 'Ocean Blue',
    primary: '#3b82f6',
    secondary: '#10b981',
    accent: '#f59e0b',
    background: '#0f172a',
    surface: '#1e293b',
    text: '#ffffff',
    textSecondary: '#94a3b8',
    gradient: 'linear-gradient(135deg, #3b82f6, #10b981)',
    gradientHover: 'linear-gradient(135deg, #2563eb, #059669)',
  },
  green: {
    name: 'Forest Green',
    primary: '#22c55e',
    secondary: '#a855f7',
    accent: '#fb923c',
    background: '#141414',
    surface: '#262626',
    text: '#ffffff',
    textSecondary: '#a3a3a3',
    gradient: 'linear-gradient(135deg, #22c55e, #a855f7)',
    gradientHover: 'linear-gradient(135deg, #16a34a, #9333ea)',
  },
  red: {
    name: 'Crimson Fire',
    primary: '#ef4444',
    secondary: '#f56565',
    accent: '#fbbf24',
    background: '#171717',
    surface: '#282828',
    text: '#ffffff',
    textSecondary: '#9ca3af',
    gradient: 'linear-gradient(135deg, #ef4444, #f56565)',
    gradientHover: 'linear-gradient(135deg, #dc2626, #ef4444)',
  },
  orange: {
    name: 'Sunset Orange',
    primary: '#f97316',
    secondary: '#ec4899',
    accent: '#a855f7',
    background: '#121212',
    surface: '#232323',
    text: '#ffffff',
    textSecondary: '#a3a3a3',
    gradient: 'linear-gradient(135deg, #f97316, #ec4899)',
    gradientHover: 'linear-gradient(135deg, #ea580c, #db2777)',
  },
};

interface ThemeContextType {
  currentTheme: ColorTheme;
  setTheme: (themeName: string) => void;
  availableThemes: Record<string, ColorTheme>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ColorTheme>(themes.purple);

  // Initialize theme on mount
  React.useEffect(() => {
    setTheme('purple');
  }, []);

  const setTheme = (themeName: string) => {
    if (themes[themeName]) {
      setCurrentTheme(themes[themeName]);
      
      // Update CSS custom properties
      const root = document.documentElement;
      const theme = themes[themeName];
      
      root.style.setProperty('--color-primary', theme.primary);
      root.style.setProperty('--color-secondary', theme.secondary);
      root.style.setProperty('--color-accent', theme.accent);
      root.style.setProperty('--color-background', theme.background);
      root.style.setProperty('--color-surface', theme.surface);
      root.style.setProperty('--color-text', theme.text);
      root.style.setProperty('--color-text-secondary', theme.textSecondary);
      root.style.setProperty('--gradient-primary', theme.gradient);
      root.style.setProperty('--gradient-hover', theme.gradientHover);
      
      // Force re-render by updating body class
      document.body.className = `theme-${themeName}`;
    }
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, availableThemes: themes }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};