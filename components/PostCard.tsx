import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import React, { useRef } from 'react';
import { Animated, Image, Pressable, Share, StyleSheet, Text, View } from 'react-native';

import Avatar from '@/components/Avatar';
import { useAppData } from '@/context/DataContext';
import { useAppTheme } from '@/context/ThemeContext';
import { findUser } from '@/data/mockData';
import { Post } from '@/types';

interface Props {
  post: Post;
  /** When true the card is shown on the detail screen, so tapping the body does nothing. */
  isDetail?: boolean;
}

export default function PostCard({ post, isDetail }: Props) {
  const { colors } = useAppTheme();
  const { toggleLike } = useAppData();
  const router = useRouter();
  const author = findUser(post.authorId);
  const likeScale = useRef(new Animated.Value(1)).current;

  if (!author) return null;

  const openProfile = () => router.push({ pathname: '/profile/[id]', params: { id: author.id } });
  const openPost = () => {
    if (!isDetail) router.push({ pathname: '/post/[id]', params: { id: post.id } });
  };

  const onLike = () => {
    toggleLike(post.id);
    Animated.sequence([
      Animated.spring(likeScale, { toValue: 1.35, useNativeDriver: true, speed: 50, bounciness: 12 }),
      Animated.spring(likeScale, { toValue: 1, useNativeDriver: true, speed: 30 }),
    ]).start();
  };

  const onShare = () => {
    Share.share({ message: `${author.name}: ${post.text}` }).catch(() => undefined);
  };

  const likeColor = post.likedByMe ? colors.primary : colors.subtext;

  return (
    <View style={[styles.card, { backgroundColor: colors.card }]}>
      <View style={styles.header}>
        <Pressable onPress={openProfile} accessibilityLabel={`Open ${author.name}'s profile`}>
          <Avatar uri={author.avatar} size={40} />
        </Pressable>
        <View style={styles.headerText}>
          <Text style={[styles.name, { color: colors.text }]} onPress={openProfile}>
            {author.name}
          </Text>
          <Text style={[styles.time, { color: colors.subtext }]}>
            {post.time} · <Ionicons name="earth" size={11} color={colors.subtext} />
          </Text>
        </View>
        <Ionicons name="ellipsis-horizontal" size={20} color={colors.subtext} />
      </View>

      <Pressable onPress={openPost} disabled={isDetail}>
        <Text style={[styles.body, { color: colors.text }]}>{post.text}</Text>
        {post.image ? (
          <Image source={{ uri: post.image }} style={[styles.image, { backgroundColor: colors.secondaryButton }]} />
        ) : null}
      </Pressable>

      <View style={styles.stats}>
        <View style={styles.row}>
          <View style={[styles.likeBadge, { backgroundColor: colors.primary }]}>
            <Ionicons name="thumbs-up" size={10} color="#fff" />
          </View>
          <Text style={[styles.statText, { color: colors.subtext }]}>{post.likes}</Text>
        </View>
        <Text style={[styles.statText, { color: colors.subtext }]} onPress={openPost}>
          {post.comments.length} comments · {post.shares} shares
        </Text>
      </View>

      <View style={[styles.actions, { borderTopColor: colors.border }]}>
        <Pressable style={styles.action} onPress={onLike} accessibilityLabel="Like">
          <Animated.View style={{ transform: [{ scale: likeScale }] }}>
            <Ionicons name={post.likedByMe ? 'thumbs-up' : 'thumbs-up-outline'} size={20} color={likeColor} />
          </Animated.View>
          <Text style={[styles.actionText, { color: likeColor }]}>Like</Text>
        </Pressable>
        <Pressable style={styles.action} onPress={openPost} accessibilityLabel="Comment">
          <Ionicons name="chatbubble-outline" size={19} color={colors.subtext} />
          <Text style={[styles.actionText, { color: colors.subtext }]}>Comment</Text>
        </Pressable>
        <Pressable style={styles.action} onPress={onShare} accessibilityLabel="Share">
          <Ionicons name="arrow-redo-outline" size={20} color={colors.subtext} />
          <Text style={[styles.actionText, { color: colors.subtext }]}>Share</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 8,
    marginTop: 10,
    borderRadius: 8,
    paddingTop: 12,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12 },
  headerText: { flex: 1, marginLeft: 10 },
  name: { fontSize: 15, fontWeight: '700' },
  time: { fontSize: 12, marginTop: 2 },
  body: { fontSize: 15, lineHeight: 21, paddingHorizontal: 12, marginTop: 10, marginBottom: 10 },
  image: { width: '100%', aspectRatio: 4 / 3 },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  row: { flexDirection: 'row', alignItems: 'center' },
  likeBadge: {
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  statText: { fontSize: 13 },
  actions: {
    flexDirection: 'row',
    borderTopWidth: StyleSheet.hairlineWidth,
    marginHorizontal: 12,
  },
  action: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    gap: 6,
  },
  actionText: { fontSize: 14, fontWeight: '600' },
});
