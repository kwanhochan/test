import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, View } from 'react-native';

import Composer from '@/components/Composer';
import FadeInView from '@/components/FadeInView';
import PostCard from '@/components/PostCard';
import StoriesRow from '@/components/StoriesRow';
import { useAppData } from '@/context/DataContext';
import { useAppTheme } from '@/context/ThemeContext';

/** Home tab — news feed built from a FlatList of reusable PostCards. */
export default function HomeScreen() {
  const { colors } = useAppTheme();
  const { posts } = useAppData();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Simulated first load so the loading indicator is visible.
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1200);
  }, []);

  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <FlatList
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={styles.content}
      data={posts}
      keyExtractor={(p) => p.id}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} colors={[colors.primary]} />
      }
      ListHeaderComponent={
        <View style={{ gap: 8, backgroundColor: colors.background }}>
          <Composer />
          <StoriesRow />
        </View>
      }
      renderItem={({ item, index }) => (
        <FadeInView delay={Math.min(index, 5) * 80}>
          <PostCard post={item} />
        </FadeInView>
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  content: { paddingBottom: 16 },
});
