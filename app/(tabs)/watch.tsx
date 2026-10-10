import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import FadeInView from '@/components/FadeInView';
import ReelTile from '@/components/ReelTile';
import { useAppTheme } from '@/context/ThemeContext';
import { REELS } from '@/data/mockData';
import { ReelCategory } from '@/types';

const FILTERS: ReelCategory[] = ['For you', 'Live', 'Gaming', 'Following'];

/** Reels tab — filter chips + two-column grid of reel thumbnails. */
export default function WatchScreen() {
  const { colors } = useAppTheme();
  const router = useRouter();
  const [filter, setFilter] = useState<ReelCategory | 'All'>('All');

  const reels = useMemo(
    () => (filter === 'All' ? REELS : REELS.filter((r) => r.category === filter)),
    [filter],
  );

  return (
    <View style={[styles.flex, { backgroundColor: colors.background }]}>
      <View style={{ backgroundColor: colors.card }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
          {(['All', ...FILTERS] as const).map((f) => {
            const active = f === filter;
            return (
              <Pressable
                key={f}
                onPress={() => setFilter(f)}
                style={[styles.chip, { backgroundColor: active ? colors.unreadBg : colors.secondaryButton }]}
              >
                <Text style={{ color: active ? colors.primary : colors.text, fontWeight: '600' }}>{f}</Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <FlatList
        key={filter}
        data={reels}
        numColumns={2}
        keyExtractor={(r) => r.id}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={styles.column}
        renderItem={({ item, index }) => (
          <FadeInView delay={index * 60} style={styles.flex}>
            <ReelTile
              reel={item}
              onPress={() => router.push({ pathname: '/profile/[id]', params: { id: item.authorId, tab: 'Reels' } })}
            />
          </FadeInView>
        )}
        ListEmptyComponent={<Text style={[styles.empty, { color: colors.subtext }]}>No reels here yet.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  chips: { paddingHorizontal: 12, paddingVertical: 10, gap: 8 },
  chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 18 },
  grid: { padding: 8, gap: 8 },
  column: { gap: 8 },
  empty: { textAlign: 'center', marginTop: 40 },
});
