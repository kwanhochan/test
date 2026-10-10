import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import FadeInView from '@/components/FadeInView';
import PostCard from '@/components/PostCard';
import ProfileHeader from '@/components/ProfileHeader';
import ReelTile from '@/components/ReelTile';
import SegmentedTabs from '@/components/SegmentedTabs';
import { useAppData } from '@/context/DataContext';
import { useAppTheme } from '@/context/ThemeContext';
import { CURRENT_USER_ID, REELS, findUser } from '@/data/mockData';

const TABS = ['Posts', 'Reels', 'Tagged'] as const;
type ProfileTab = (typeof TABS)[number];

/**
 * Stack screen that receives the user id as a navigation parameter.
 * Layout mirrors the Assignment 1 profile page.
 */
export default function ProfileScreen() {
  const { id, tab } = useLocalSearchParams<{ id: string; tab?: string }>();
  const { colors } = useAppTheme();
  const { posts, friendIds, toggleFriend } = useAppData();
  const router = useRouter();

  const initialTab: ProfileTab = TABS.includes(tab as ProfileTab) ? (tab as ProfileTab) : 'Posts';
  const [activeTab, setActiveTab] = useState<ProfileTab>(initialTab);

  const user = findUser(id ?? '');

  const userPosts = useMemo(() => posts.filter((p) => p.authorId === id), [posts, id]);
  const taggedPosts = useMemo(() => posts.filter((p) => p.taggedIds.includes(id ?? '')), [posts, id]);
  const userReels = useMemo(() => REELS.filter((r) => r.authorId === id), [id]);

  if (!user) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.text }}>User not found.</Text>
      </View>
    );
  }

  const isMe = user.id === CURRENT_USER_ID;
  const emptyText = (what: string) => (
    <Text style={[styles.empty, { color: colors.subtext }]}>No {what} yet.</Text>
  );

  return (
    <>
      <Stack.Screen options={{ title: user.name }} />
      <ScrollView style={{ backgroundColor: colors.background }} contentContainerStyle={styles.content}>
        <ProfileHeader
          user={user}
          isMe={isMe}
          isFriend={friendIds.includes(user.id)}
          onToggleFriend={() => toggleFriend(user.id)}
          onPressSettings={() => router.push('/settings')}
        />

        <SegmentedTabs tabs={TABS} active={activeTab} onChange={setActiveTab} />

        {activeTab === 'Posts' &&
          (userPosts.length
            ? userPosts.map((p, i) => (
                <FadeInView key={p.id} delay={i * 80}>
                  <PostCard post={p} />
                </FadeInView>
              ))
            : emptyText('posts'))}

        {activeTab === 'Reels' &&
          (userReels.length ? (
            <View style={styles.reelGrid}>
              {userReels.map((r, i) => (
                <FadeInView key={r.id} delay={i * 80} style={styles.reelCell}>
                  <ReelTile reel={r} onPress={() => undefined} />
                </FadeInView>
              ))}
            </View>
          ) : (
            emptyText('reels')
          ))}

        {activeTab === 'Tagged' &&
          (taggedPosts.length
            ? taggedPosts.map((p, i) => (
                <FadeInView key={p.id} delay={i * 80}>
                  <PostCard post={p} />
                </FadeInView>
              ))
            : emptyText('tagged posts'))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  content: { paddingBottom: 24 },
  empty: { textAlign: 'center', marginTop: 32, fontSize: 15 },
  reelGrid: { flexDirection: 'row', flexWrap: 'wrap', padding: 8, gap: 8 },
  reelCell: { width: '48.5%' },
});
