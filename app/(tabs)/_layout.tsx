import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs, useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

import PressableScale from '@/components/PressableScale';
import { useAppTheme } from '@/context/ThemeContext';
import { NOTIFICATIONS } from '@/data/mockData';

/** Emoji tab icon (same style as Assignment 1) with a bounce + blue indicator when focused. */
function TabIcon({ emoji, focused, badge }: { emoji: string; focused: boolean; badge?: number }) {
  const { colors } = useAppTheme();
  const scale = useRef(new Animated.Value(focused ? 1.15 : 1)).current;

  useEffect(() => {
    Animated.spring(scale, {
      toValue: focused ? 1.15 : 1,
      useNativeDriver: true,
      speed: 20,
      bounciness: 10,
    }).start();
  }, [focused, scale]);

  return (
    <View style={styles.iconWrap}>
      {focused && <View style={[styles.indicator, { backgroundColor: colors.primary }]} />}
      <Animated.Text style={[styles.emoji, { opacity: focused ? 1 : 0.75, transform: [{ scale }] }]}>
        {emoji}
      </Animated.Text>
      {badge ? (
        <View style={[styles.badge, { backgroundColor: colors.danger, borderColor: colors.card }]}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
      ) : null}
    </View>
  );
}

function HeaderButton({ icon, onPress, label }: { icon: keyof typeof Ionicons.glyphMap; onPress: () => void; label: string }) {
  const { colors } = useAppTheme();
  return (
    <PressableScale
      style={[styles.headerBtn, { backgroundColor: colors.secondaryButton }]}
      onPress={onPress}
      accessibilityLabel={label}
    >
      <Ionicons name={icon} size={20} color={colors.text} />
    </PressableScale>
  );
}

/** Bottom TAB navigator: Home · Search · Watch · Notifications · Menu */
export default function TabLayout() {
  const { colors } = useAppTheme();
  const router = useRouter();
  const unread = NOTIFICATIONS.filter((n) => n.isNew).length;

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: { backgroundColor: colors.card, borderTopColor: colors.border, height: 60 },
        tabBarItemStyle: { paddingTop: 6 },
        headerStyle: { backgroundColor: colors.card },
        headerTitleStyle: { color: colors.text, fontSize: 24, fontWeight: '700' },
        headerTitleAlign: 'left',
        headerShadowVisible: false,
        headerRight: () => (
          <View style={styles.headerRight}>
            <HeaderButton icon="settings-sharp" label="Settings" onPress={() => router.push('/settings')} />
          </View>
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerTitle: () => <Text style={[styles.logo, { color: colors.primary }]}>facebook</Text>,
          headerRight: () => (
            <View style={styles.headerRight}>
              <HeaderButton icon="search" label="Search" onPress={() => router.navigate('/search')} />
              <HeaderButton icon="person-circle-outline" label="My profile" onPress={() => router.push({ pathname: '/profile/[id]', params: { id: 'me' } })} />
            </View>
          ),
          tabBarIcon: ({ focused }) => <TabIcon emoji="🏠" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{ title: 'Search', tabBarIcon: ({ focused }) => <TabIcon emoji="🔍" focused={focused} /> }}
      />
      <Tabs.Screen
        name="watch"
        options={{ title: 'Reels', tabBarIcon: ({ focused }) => <TabIcon emoji="▶️" focused={focused} /> }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: 'Notifications',
          tabBarIcon: ({ focused }) => <TabIcon emoji="🔔" focused={focused} badge={unread} />,
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{ title: 'Menu', tabBarIcon: ({ focused }) => <TabIcon emoji="☰" focused={focused} /> }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconWrap: { alignItems: 'center', justifyContent: 'center', width: 56, height: 40 },
  indicator: { position: 'absolute', top: -6, width: 44, height: 3, borderRadius: 2 },
  emoji: { fontSize: 24 },
  badge: {
    position: 'absolute',
    top: 0,
    right: 8,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: '800' },
  logo: { fontSize: 30, fontWeight: '800', letterSpacing: -1 },
  headerRight: { flexDirection: 'row', gap: 8, marginRight: 12 },
  headerBtn: { width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center' },
});
