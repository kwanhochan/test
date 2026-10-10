import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';

import Avatar from '@/components/Avatar';
import PressableScale from '@/components/PressableScale';
import { useAppTheme } from '@/context/ThemeContext';
import { CURRENT_USER_ID, STORIES, findUser } from '@/data/mockData';

const CARD_W = 104;
const CARD_H = 180;

export default function StoriesRow() {
  const { colors } = useAppTheme();
  const router = useRouter();
  const me = findUser(CURRENT_USER_ID);

  return (
    <FlatList
      horizontal
      data={STORIES}
      keyExtractor={(s) => s.id}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.list}
      style={{ backgroundColor: colors.card }}
      ListHeaderComponent={
        me ? (
          <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border, borderWidth: 1 }]}>
            <Image source={{ uri: me.avatar }} style={styles.createImage} />
            <View style={[styles.plus, { backgroundColor: colors.primary, borderColor: colors.card }]}>
              <Ionicons name="add" size={20} color="#fff" />
            </View>
            <Text style={[styles.createText, { color: colors.text }]}>Create story</Text>
          </View>
        ) : null
      }
      renderItem={({ item }) => {
        const author = findUser(item.authorId);
        if (!author) return null;
        return (
          <PressableScale
            style={styles.card}
            onPress={() => router.push({ pathname: '/profile/[id]', params: { id: author.id } })}
          >
            <Image source={{ uri: item.image }} style={StyleSheet.absoluteFill} />
            <View style={styles.storyAvatar}>
              <Avatar uri={author.avatar} size={32} storyRing />
            </View>
            <Text style={styles.storyName} numberOfLines={2}>
              {author.name}
            </Text>
          </PressableScale>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  list: { paddingHorizontal: 8, paddingVertical: 10, gap: 8 },
  card: { width: CARD_W, height: CARD_H, borderRadius: 12, overflow: 'hidden', backgroundColor: '#333' },
  createImage: { width: '100%', height: CARD_H * 0.62 },
  plus: {
    position: 'absolute',
    top: CARD_H * 0.62 - 18,
    alignSelf: 'center',
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  createText: { fontSize: 12, fontWeight: '700', textAlign: 'center', marginTop: 24 },
  storyAvatar: { position: 'absolute', top: 8, left: 8 },
  storyName: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    right: 8,
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
    textShadowColor: 'rgba(0,0,0,0.7)',
    textShadowRadius: 4,
  },
});
