import Ionicons from '@expo/vector-icons/Ionicons';
import Constants from 'expo-constants';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native';

import PressableScale from '@/components/PressableScale';
import { ThemeMode, useAppTheme } from '@/context/ThemeContext';

const THEME_OPTIONS: { mode: ThemeMode; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { mode: 'light', label: 'Light', icon: 'sunny' },
  { mode: 'dark', label: 'Dark', icon: 'moon' },
  { mode: 'system', label: 'Use system setting', icon: 'phone-portrait-outline' },
];

/** Stack screen: manual light / dark / system theme selection plus a few preference toggles. */
export default function SettingsScreen() {
  const { colors, mode, setMode } = useAppTheme();
  const [push, setPush] = useState(true);
  const [activeStatus, setActiveStatus] = useState(true);

  return (
    <ScrollView style={{ backgroundColor: colors.background }} contentContainerStyle={styles.content}>
      <Text style={[styles.heading, { color: colors.subtext }]}>Display</Text>
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        {THEME_OPTIONS.map((opt) => {
          const selected = opt.mode === mode;
          return (
            <PressableScale key={opt.mode} style={styles.row} onPress={() => setMode(opt.mode)} scaleTo={0.98}>
              <Ionicons name={opt.icon} size={22} color={colors.icon} />
              <Text style={[styles.rowText, { color: colors.text }]}>{opt.label}</Text>
              <Ionicons
                name={selected ? 'radio-button-on' : 'radio-button-off'}
                size={22}
                color={selected ? colors.primary : colors.subtext}
              />
            </PressableScale>
          );
        })}
      </View>

      <Text style={[styles.heading, { color: colors.subtext }]}>Preferences</Text>
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <ToggleRow icon="notifications" label="Push notifications" value={push} onChange={setPush} />
        <ToggleRow icon="ellipse" label="Active status" value={activeStatus} onChange={setActiveStatus} />
      </View>

      <Text style={[styles.heading, { color: colors.subtext }]}>About</Text>
      <View style={[styles.card, styles.row, { backgroundColor: colors.card }]}>
        <Ionicons name="information-circle" size={22} color={colors.icon} />
        <Text style={[styles.rowText, { color: colors.text }]}>Version</Text>
        <Text style={{ color: colors.subtext }}>{Constants.expoConfig?.version ?? '1.0.0'}</Text>
      </View>
    </ScrollView>
  );
}

function ToggleRow({
  icon,
  label,
  value,
  onChange,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  const { colors } = useAppTheme();
  return (
    <View style={styles.row}>
      <Ionicons name={icon} size={22} color={colors.icon} />
      <Text style={[styles.rowText, { color: colors.text }]}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{ true: colors.primary, false: colors.border }}
        thumbColor="#fff"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  content: { padding: 12, paddingBottom: 32 },
  heading: { fontSize: 13, fontWeight: '700', textTransform: 'uppercase', marginTop: 14, marginBottom: 6, marginLeft: 4 },
  card: { borderRadius: 10, overflow: 'hidden' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 14, paddingVertical: 14 },
  rowText: { flex: 1, fontSize: 16 },
});
