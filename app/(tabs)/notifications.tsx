import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Pressable, SectionList, StyleSheet, Text, View } from 'react-native';

import Avatar from '@/components/Avatar';
import FadeInView from '@/components/FadeInView';
import { useAppTheme } from '@/context/ThemeContext';
import { NOTIFICATIONS, findUser } from '@/data/mockData';
import { AppNotification, NotificationType } from '@/types';

const TYPE_ICON: Record<NotificationType, { name: keyof typeof Ionicons.glyphMap; color: string }> = {
  like: { name: 'thumbs-up', color: '#1877F2' },
  comment: { name: 'chatbubble', color: '#45BD62' },
  friend: { name: 'person-add', color: '#1877F2' },
  tag: { name: 'pricetag', color: '#F7B928' },
  birthday: { name: 'gift', color: '#E41E3F' },
};

/** Notifications tab — sectioned list; tapping marks as read and navigates to the post or profile. */
export default function NotificationsScreen() {
  const { colors } = useAppTheme();
  const router = useRouter();
  const [items, setItems] = useState<AppNotification[]>(NOTIFICATIONS);

  const sections = useMemo(
    () => [
      { title: 'New', data: items.filter((n) => n.isNew) },
      { title: 'Earlier', data: items.filter((n) => !n.isNew) },
    ].filter((s) => s.data.length > 0),
    [items],
  );

  const markRead = (id: string) =>
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, isNew: false } : n)));

  const onPress = (n: AppNotification) => {
    markRead(n.id);
    if (n.postId) router.push({ pathname: '/post/[id]', params: { id: n.postId } });
    else router.push({ pathname: '/profile/[id]', params: { id: n.actorId } });
  };

  const hasUnread = items.some((n) => n.isNew);

  return (
    <SectionList
      style={{ backgroundColor: colors.card }}
      sections={sections}
      keyExtractor={(n) => n.id}
      stickySectionHeadersEnabled={false}
      ListHeaderComponent={
        hasUnread ? (
          <Pressable
            onPress={() => setItems((prev) => prev.map((n) => ({ ...n, isNew: false })))}
            style={styles.markAll}
          >
            <Text style={{ color: colors.primary, fontWeight: '600' }}>Mark all as read</Text>
          </Pressable>
        ) : null
      }
      renderSectionHeader={({ section }) => (
        <Text style={[styles.section, { color: colors.text }]}>{section.title}</Text>
      )}
      renderItem={({ item, index }) => {
        const actor = findUser(item.actorId);
        if (!actor) return null;
        const icon = TYPE_ICON[item.type];
        return (
          <FadeInView delay={index * 50}>
            <Pressable
              onPress={() => onPress(item)}
              style={({ pressed }) => [
                styles.row,
                { backgroundColor: item.isNew ? colors.unreadBg : colors.card, opacity: pressed ? 0.7 : 1 },
              ]}
            >
              <View>
                <Avatar uri={actor.avatar} size={56} />
                <View style={[styles.typeIcon, { backgroundColor: icon.color, borderColor: colors.card }]}>
                  <Ionicons name={icon.name} size={12} color="#fff" />
                </View>
              </View>
              <View style={styles.text}>
                <Text style={{ color: colors.text, fontSize: 15, lineHeight: 20 }}>
                  <Text style={{ fontWeight: '700' }}>{actor.name}</Text> {item.text}
                </Text>
                <Text style={{ color: item.isNew ? colors.primary : colors.subtext, fontSize: 13, marginTop: 2 }}>
                  {item.time}
                </Text>
              </View>
              {item.isNew && <View style={[styles.dot, { backgroundColor: colors.primary }]} />}
            </Pressable>
          </FadeInView>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  markAll: { alignSelf: 'flex-end', paddingHorizontal: 16, paddingTop: 10 },
  section: { fontSize: 17, fontWeight: '700', paddingHorizontal: 16, paddingTop: 12, paddingBottom: 6 },
  row: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 10 },
  typeIcon: {
    position: 'absolute',
    right: -2,
    bottom: -2,
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: { flex: 1, marginLeft: 12 },
  dot: { width: 12, height: 12, borderRadius: 6, marginLeft: 8 },
});
