import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

import Avatar from '@/components/Avatar';
import { useAppTheme } from '@/context/ThemeContext';
import { CURRENT_USER_ID, findUser } from '@/data/mockData';

/** "What's on your mind?" bar at the top of the feed. */
export default function Composer() {
  const { colors } = useAppTheme();
  const router = useRouter();
  const me = findUser(CURRENT_USER_ID);
  if (!me) return null;

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <Pressable onPress={() => router.push({ pathname: '/profile/[id]', params: { id: me.id } })}>
        <Avatar uri={me.avatar} size={40} />
      </Pressable>
      <Pressable
        style={[styles.input, { borderColor: colors.border }]}
        onPress={() => Alert.alert('Create post', 'Post composer coming soon!')}
      >
        <Text style={{ color: colors.subtext, fontSize: 15 }}>What&apos;s on your mind?</Text>
      </Pressable>
      <Ionicons name="images" size={24} color="#45BD62" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', padding: 12, gap: 10 },
  input: { flex: 1, borderWidth: 1, borderRadius: 20, paddingHorizontal: 14, paddingVertical: 9 },
});
