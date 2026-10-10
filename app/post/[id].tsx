import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import Avatar from '@/components/Avatar';
import FadeInView from '@/components/FadeInView';
import PostCard from '@/components/PostCard';
import { useAppData } from '@/context/DataContext';
import { useAppTheme } from '@/context/ThemeContext';
import { CURRENT_USER_ID, findUser } from '@/data/mockData';

/** Stack screen: full post + comments. Receives the post id as a navigation parameter. */
export default function PostDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colors } = useAppTheme();
  const { getPost, addComment } = useAppData();
  const router = useRouter();
  const [draft, setDraft] = useState('');

  const post = getPost(id ?? '');
  const me = findUser(CURRENT_USER_ID);

  if (!post) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.text }}>Post not found.</Text>
      </View>
    );
  }

  const send = () => {
    addComment(post.id, draft);
    setDraft('');
  };

  return (
    <KeyboardAvoidingView
      style={[styles.flex, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      <FlatList
        data={post.comments}
        keyExtractor={(c) => c.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <>
            <PostCard post={post} isDetail />
            <Text style={[styles.heading, { color: colors.text }]}>Comments</Text>
          </>
        }
        ListEmptyComponent={
          <Text style={[styles.empty, { color: colors.subtext }]}>Be the first to comment.</Text>
        }
        renderItem={({ item }) => {
          const author = findUser(item.authorId);
          if (!author) return null;
          return (
            <FadeInView style={styles.comment}>
              <Pressable onPress={() => router.push({ pathname: '/profile/[id]', params: { id: author.id } })}>
                <Avatar uri={author.avatar} size={34} />
              </Pressable>
              <View style={styles.flex}>
                <View style={[styles.bubble, { backgroundColor: colors.input }]}>
                  <Text style={[styles.commentName, { color: colors.text }]}>{author.name}</Text>
                  <Text style={{ color: colors.text, fontSize: 15 }}>{item.text}</Text>
                </View>
                <Text style={[styles.commentMeta, { color: colors.subtext }]}>{item.time}  ·  Like  ·  Reply</Text>
              </View>
            </FadeInView>
          );
        }}
      />

      <View style={[styles.inputBar, { backgroundColor: colors.card, borderTopColor: colors.border }]}>
        {me && <Avatar uri={me.avatar} size={32} />}
        <TextInput
          value={draft}
          onChangeText={setDraft}
          placeholder="Write a comment…"
          placeholderTextColor={colors.subtext}
          style={[styles.input, { backgroundColor: colors.input, color: colors.text }]}
          onSubmitEditing={send}
          returnKeyType="send"
        />
        <Pressable onPress={send} disabled={!draft.trim()} accessibilityLabel="Send comment">
          <Ionicons name="send" size={22} color={draft.trim() ? colors.primary : colors.border} />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  list: { paddingBottom: 16 },
  heading: { fontSize: 16, fontWeight: '700', marginHorizontal: 16, marginTop: 14, marginBottom: 6 },
  empty: { marginHorizontal: 16, marginTop: 8 },
  comment: { flexDirection: 'row', gap: 8, paddingHorizontal: 12, paddingVertical: 6 },
  bubble: { borderRadius: 16, paddingHorizontal: 12, paddingVertical: 8, alignSelf: 'flex-start' },
  commentName: { fontWeight: '700', fontSize: 13, marginBottom: 2 },
  commentMeta: { fontSize: 12, marginTop: 4, marginLeft: 12, fontWeight: '600' },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  input: { flex: 1, borderRadius: 20, paddingHorizontal: 14, paddingVertical: 8, fontSize: 15 },
});
