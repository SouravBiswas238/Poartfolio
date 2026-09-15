import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type ThemeMode = 'light' | 'dark';

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

const themes: Record<ThemeMode, ColorTheme> = {
  light: {
    name: 'Light',
    primary: '#7c3aed',
    secondary: '#0891b2',
    accent: '#db2777',
    background: '#f8fafc',
    surface: '#ffffff',
    text: '#0f172a',
    textSecondary: '#475569',
    gradient: 'linear-gradient(135deg, #7c3aed, #0891b2)',
    gradientHover: 'linear-gradient(135deg, #6d28d9, #0e7490)',
  },
  dark: {
    name: 'Dark',
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
};

interface ThemeContextType {
  mode: ThemeMode;
  currentTheme: ColorTheme;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = 'theme-mode';

const getInitialMode = (): ThemeMode => {
  if (typeof window === 'undefined') return 'dark';
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
};

const hexToRgbTriplet = (hex: string): string => {
  const value = hex.replace('#', '');
  const r = parseInt(value.substring(0, 2), 16);
  const g = parseInt(value.substring(2, 4), 16);
  const b = parseInt(value.substring(4, 6), 16);
  return `${r} ${g} ${b}`;
};

const applyTheme = (mode: ThemeMode) => {
  const theme = themes[mode];
  const root = document.documentElement;

  root.style.setProperty('--color-primary', theme.primary);
  root.style.setProperty('--color-secondary', theme.secondary);
  root.style.setProperty('--color-accent', theme.accent);
  root.style.setProperty('--color-background', theme.background);
  root.style.setProperty('--color-surface', theme.surface);
  root.style.setProperty('--color-text', theme.text);
  root.style.setProperty('--color-text-secondary', theme.textSecondary);
  root.style.setProperty('--gradient-primary', theme.gradient);
  root.style.setProperty('--gradient-hover', theme.gradientHover);

  root.style.setProperty('--color-primary-rgb', hexToRgbTriplet(theme.primary));
  root.style.setProperty('--color-secondary-rgb', hexToRgbTriplet(theme.secondary));
  root.style.setProperty('--color-accent-rgb', hexToRgbTriplet(theme.accent));
  root.style.setProperty('--color-background-rgb', hexToRgbTriplet(theme.background));
  root.style.setProperty('--color-surface-rgb', hexToRgbTriplet(theme.surface));
  root.style.setProperty('--color-text-rgb', hexToRgbTriplet(theme.text));
  root.style.setProperty('--color-text-secondary-rgb', hexToRgbTriplet(theme.textSecondary));

  root.classList.toggle('dark', mode === 'dark');
  root.classList.toggle('light', mode === 'light');
  document.body.className = `theme-${mode}`;
};

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [mode, setModeState] = useState<ThemeMode>(getInitialMode);

  useEffect(() => {
    applyTheme(mode);
  }, [mode]);

  const setMode = (newMode: ThemeMode) => {
    setModeState(newMode);
    window.localStorage.setItem(STORAGE_KEY, newMode);
  };

  const toggleMode = () => {
    setMode(mode === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ mode, currentTheme: themes[mode], setMode, toggleMode }}>
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
