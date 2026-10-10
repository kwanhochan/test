import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';

import { DataProvider } from '@/context/DataContext';
import { AppThemeProvider, useAppTheme } from '@/context/ThemeContext';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  return (
    <AppThemeProvider>
      <DataProvider>
        <RootNavigator />
      </DataProvider>
    </AppThemeProvider>
  );
}

/**
 * Root STACK navigator.
 * (tabs) is the bottom-tab navigator; profile/post/settings are pushed on top of it.
 */
function RootNavigator() {
  const { colors, isDark } = useAppTheme();
  const base = isDark ? DarkTheme : DefaultTheme;
  const navTheme = {
    ...base,
    colors: {
      ...base.colors,
      primary: colors.primary,
      background: colors.background,
      card: colors.card,
      text: colors.text,
      border: colors.border,
    },
  };

  return (
    <ThemeProvider value={navTheme}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          animation: 'slide_from_right',
          headerTintColor: colors.text,
          headerStyle: { backgroundColor: colors.card },
          headerShadowVisible: false,
          headerBackButtonDisplayMode: 'minimal',
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="profile/[id]" options={{ title: 'Profile' }} />
        <Stack.Screen name="post/[id]" options={{ title: 'Post' }} />
        <Stack.Screen
          name="settings"
          options={{ title: 'Settings & privacy', animation: 'slide_from_bottom' }}
        />
        <Stack.Screen name="+not-found" options={{ title: 'Oops!' }} />
      </Stack>
    </ThemeProvider>
  );
}
