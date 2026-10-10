import { Link, Stack } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useAppTheme } from '@/context/ThemeContext';

export default function NotFoundScreen() {
  const { colors } = useAppTheme();
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.title, { color: colors.text }]}>This screen doesn&apos;t exist.</Text>
        <Link href="/" style={[styles.link, { color: colors.primary }]}>
          Go to home screen
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { fontSize: 20, fontWeight: '700' },
  link: { marginTop: 15, paddingVertical: 15, fontSize: 15 },
});
