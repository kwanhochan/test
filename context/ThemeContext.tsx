import React, { createContext, useContext, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';

import { Colors, Palette } from '@/constants/Colors';

export type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextValue {
  mode: ThemeMode;
  isDark: boolean;
  colors: Palette;
  setMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = useColorScheme();
  const [mode, setMode] = useState<ThemeMode>('light');

  const value = useMemo<ThemeContextValue>(() => {
    const isDark = mode === 'system' ? systemScheme === 'dark' : mode === 'dark';
    return {
      mode,
      isDark,
      colors: isDark ? Colors.dark : Colors.light,
      setMode,
      toggleTheme: () => setMode(isDark ? 'light' : 'dark'),
    };
  }, [mode, systemScheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useAppTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useAppTheme must be used inside AppThemeProvider');
  return ctx;
}
