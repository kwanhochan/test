import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import FadeInView from '@/components/FadeInView';
import UserRow from '@/components/UserRow';
import { useAppData } from '@/context/DataContext';
import { useAppTheme } from '@/context/ThemeContext';
import { CURRENT_USER_ID, USERS } from '@/data/mockData';

const RECENT = ['React Native', 'SAIT', 'Calgary events', 'Expo Router'];

/** Search tab — live-filtered list of people; tapping one pushes their profile with an id param. */
export default function SearchScreen() {
  const { colors } = useAppTheme();
  const { friendIds } = useAppData();
  const router = useRouter();
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return USERS.filter((u) => u.id !== CURRENT_USER_ID).filter(
      (u) =>
        !q ||
        u.name.toLowerCase().includes(q) ||
        u.location.toLowerCase().includes(q) ||
        u.school.toLowerCase().includes(q) ||
        u.job.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <View style={[styles.flex, { backgroundColor: colors.card }]}>
      <View style={[styles.searchBar, { backgroundColor: colors.input }]}>
        <Ionicons name="search" size={18} color={colors.subtext} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search Facebook"
          placeholderTextColor={colors.subtext}
          style={[styles.input, { color: colors.text }]}
          autoCorrect={false}
          returnKeyType="search"
        />
        {query.length > 0 && (
          <Pressable onPress={() => setQuery('')} accessibilityLabel="Clear search">
            <Ionicons name="close-circle" size={18} color={colors.subtext} />
          </Pressable>
        )}
      </View>

      <FlatList
        data={results}
        keyExtractor={(u) => u.id}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={
          <>
            {!query && (
              <>
                <Text style={[styles.section, { color: colors.text }]}>Recent</Text>
                <View style={styles.chips}>
                  {RECENT.map((r) => (
                    <Pressable
                      key={r}
                      onPress={() => setQuery(r.split(' ')[0])}
                      style={[styles.chip, { backgroundColor: colors.secondaryButton }]}
                    >
                      <Ionicons name="time-outline" size={14} color={colors.subtext} />
                      <Text style={{ color: colors.text, fontSize: 14 }}>{r}</Text>
                    </Pressable>
                  ))}
                </View>
              </>
            )}
            <Text style={[styles.section, { color: colors.text }]}>
              {query ? `Results for "${query}"` : 'People you may know'}
            </Text>
          </>
        }
        ListEmptyComponent={
          <Text style={[styles.empty, { color: colors.subtext }]}>No people found for “{query}”.</Text>
        }
        renderItem={({ item, index }) => (
          <FadeInView delay={index * 50}>
            <UserRow
              user={item}
              subtitle={
                friendIds.includes(item.id)
                  ? `Friend · ${item.location}`
                  : `${item.mutualFriends} mutual friends · ${item.job}`
              }
              onPress={() => router.push({ pathname: '/profile/[id]', params: { id: item.id } })}
            />
          </FadeInView>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 12,
    paddingHorizontal: 14,
    borderRadius: 22,
    height: 42,
    gap: 8,
  },
  input: { flex: 1, fontSize: 16, height: '100%' },
  section: { fontSize: 17, fontWeight: '700', paddingHorizontal: 16, marginTop: 8, marginBottom: 6 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, paddingHorizontal: 16, marginBottom: 10 },
  chip: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 7, borderRadius: 18 },
  empty: { textAlign: 'center', marginTop: 40, fontSize: 15 },
});
