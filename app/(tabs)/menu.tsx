import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';

import Avatar from '@/components/Avatar';
import FadeInView from '@/components/FadeInView';
import PressableScale from '@/components/PressableScale';
import { useAppTheme } from '@/context/ThemeContext';
import { CURRENT_USER_ID, findUser } from '@/data/mockData';

type IconName = keyof typeof Ionicons.glyphMap;

const SHORTCUTS: { label: string; icon: IconName; color: string }[] = [
  { label: 'Friends', icon: 'people', color: '#1877F2' },
  { label: 'Memories', icon: 'time', color: '#1877F2' },
  { label: 'Saved', icon: 'bookmark', color: '#A033FF' },
  { label: 'Groups', icon: 'people-circle', color: '#1877F2' },
  { label: 'Marketplace', icon: 'storefront', color: '#1877F2' },
  { label: 'Events', icon: 'calendar', color: '#E41E3F' },
];

/** Menu tab — profile shortcut, shortcut grid, dark-mode toggle and links into the stack. */
export default function MenuScreen() {
  const { colors, isDark, toggleTheme } = useAppTheme();
  const router = useRouter();
  const me = findUser(CURRENT_USER_ID);

  const comingSoon = (label: string) => Alert.alert(label, `${label} is coming soon!`);

  return (
    <ScrollView style={{ backgroundColor: colors.background }} contentContainerStyle={styles.content}>
      {me && (
        <FadeInView>
          <PressableScale
            style={[styles.card, styles.profileCard, { backgroundColor: colors.card }]}
            onPress={() => router.push({ pathname: '/profile/[id]', params: { id: me.id } })}
            scaleTo={0.98}
          >
            <Avatar uri={me.avatar} size={44} />
            <View style={styles.flex}>
              <Text style={[styles.name, { color: colors.text }]}>{me.name}</Text>
              <Text style={{ color: colors.subtext, fontSize: 13 }}>See your profile</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.subtext} />
          </PressableScale>
        </FadeInView>
      )}

      <Text style={[styles.heading, { color: colors.subtext }]}>Your shortcuts</Text>
      <View style={styles.grid}>
        {SHORTCUTS.map((s, i) => (
          <FadeInView key={s.label} delay={i * 50} style={styles.gridItem}>
            <PressableScale
              style={[styles.card, styles.shortcut, { backgroundColor: colors.card }]}
              onPress={() => comingSoon(s.label)}
            >
              <Ionicons name={s.icon} size={26} color={s.color} />
              <Text style={[styles.shortcutText, { color: colors.text }]}>{s.label}</Text>
            </PressableScale>
          </FadeInView>
        ))}
      </View>

      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <View style={styles.row}>
          <Ionicons name="moon" size={22} color={colors.icon} />
          <Text style={[styles.rowText, { color: colors.text }]}>Dark mode</Text>
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            trackColor={{ true: colors.primary, false: colors.border }}
            thumbColor="#fff"
          />
        </View>
        <MenuRow icon="settings-sharp" label="Settings & privacy" onPress={() => router.push('/settings')} />
        <MenuRow icon="help-circle" label="Help & support" onPress={() => comingSoon('Help & support')} />
        <MenuRow
          icon="log-out-outline"
          label="Log out"
          onPress={() => Alert.alert('Log out', 'Are you sure you want to log out?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Log out', style: 'destructive' },
          ])}
        />
      </View>
    </ScrollView>
  );
}

function MenuRow({ icon, label, onPress }: { icon: IconName; label: string; onPress: () => void }) {
  const { colors } = useAppTheme();
  return (
    <PressableScale style={styles.row} onPress={onPress} scaleTo={0.98}>
      <Ionicons name={icon} size={22} color={colors.icon} />
      <Text style={[styles.rowText, { color: colors.text }]}>{label}</Text>
      <Ionicons name="chevron-forward" size={18} color={colors.subtext} />
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: { padding: 12, gap: 10 },
  card: {
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  profileCard: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12 },
  name: { fontSize: 17, fontWeight: '700' },
  heading: { fontSize: 15, fontWeight: '600', marginTop: 4 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 10 },
  gridItem: { width: '48.5%' },
  shortcut: { padding: 12, gap: 8 },
  shortcutText: { fontSize: 15, fontWeight: '600' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 14, paddingVertical: 14 },
  rowText: { flex: 1, fontSize: 16, fontWeight: '500' },
});
