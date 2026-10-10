import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Avatar from '@/components/Avatar';
import PressableScale from '@/components/PressableScale';
import { useAppTheme } from '@/context/ThemeContext';
import { User } from '@/types';

interface Props {
  user: User;
  subtitle?: string;
  onPress: () => void;
}

export default function UserRow({ user, subtitle, onPress }: Props) {
  const { colors } = useAppTheme();
  return (
    <PressableScale style={styles.row} onPress={onPress} scaleTo={0.98}>
      <Avatar uri={user.avatar} size={48} />
      <View style={styles.text}>
        <Text style={[styles.name, { color: colors.text }]}>{user.name}</Text>
        <Text style={[styles.sub, { color: colors.subtext }]} numberOfLines={1}>
          {subtitle ?? `${user.job} · ${user.location}`}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.subtext} />
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 10 },
  text: { flex: 1, marginLeft: 12 },
  name: { fontSize: 16, fontWeight: '600' },
  sub: { fontSize: 13, marginTop: 2 },
});
