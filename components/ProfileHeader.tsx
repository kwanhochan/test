import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';

import Avatar from '@/components/Avatar';
import PressableScale from '@/components/PressableScale';
import { useAppTheme } from '@/context/ThemeContext';
import { User } from '@/types';

interface Props {
  user: User;
  isMe: boolean;
  isFriend: boolean;
  onToggleFriend: () => void;
  onPressSettings: () => void;
}

/** Cover photo, round avatar, name, info line and action buttons — the Assignment 1 layout. */
export default function ProfileHeader({ user, isMe, isFriend, onToggleFriend, onPressSettings }: Props) {
  const { colors } = useAppTheme();

  const primaryLabel = isMe ? '+ Add to story' : isFriend ? '✓ Friends' : '+ Add Friend';
  const secondaryLabel = isMe ? 'Edit profile' : 'Message';

  const onPrimary = () => {
    if (isMe) Alert.alert('Story', 'Story camera coming soon!');
    else onToggleFriend();
  };
  const onSecondary = () =>
    Alert.alert(isMe ? 'Edit profile' : 'Message', isMe ? 'Profile editing coming soon!' : `Start a chat with ${user.name}?`);

  return (
    <View style={{ backgroundColor: colors.background }}>
      <View>
        <Image source={{ uri: user.cover }} style={[styles.cover, { backgroundColor: colors.secondaryButton }]} />
        <PressableScale
          style={[styles.gear, { backgroundColor: colors.overlay }]}
          onPress={onPressSettings}
          accessibilityLabel="Settings"
        >
          <Ionicons name="settings-sharp" size={22} color="#fff" />
        </PressableScale>
      </View>

      <View style={styles.avatarWrap}>
        <Avatar uri={user.avatar} size={112} bordered />
      </View>

      <Text style={[styles.name, { color: colors.text }]}>{user.name}</Text>
      <Text style={[styles.info, { color: colors.subtext }]}>
        📍 {user.location} • 🎓 {user.school} • 💼 {user.job}
      </Text>
      {!isMe && (
        <Text style={[styles.mutual, { color: colors.subtext }]}>
          {user.friendsCount} friends · {user.mutualFriends} mutual
        </Text>
      )}

      <View style={styles.buttons}>
        <PressableScale
          style={[styles.button, { backgroundColor: isFriend && !isMe ? colors.secondaryButton : colors.primary }]}
          onPress={onPrimary}
        >
          <Text style={[styles.buttonText, { color: isFriend && !isMe ? colors.secondaryButtonText : colors.primaryText }]}>
            {primaryLabel}
          </Text>
        </PressableScale>
        <PressableScale style={[styles.button, { backgroundColor: colors.secondaryButton }]} onPress={onSecondary}>
          <Text style={[styles.buttonText, { color: colors.secondaryButtonText }]}>{secondaryLabel}</Text>
        </PressableScale>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cover: { width: '100%', height: 180 },
  gear: {
    position: 'absolute',
    top: 10,
    right: 12,
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarWrap: { alignItems: 'center', marginTop: -60 },
  name: { fontSize: 24, fontWeight: '700', textAlign: 'center', marginTop: 8 },
  info: { fontSize: 14, textAlign: 'center', marginTop: 4, paddingHorizontal: 16 },
  mutual: { fontSize: 13, textAlign: 'center', marginTop: 4 },
  buttons: { flexDirection: 'row', justifyContent: 'center', gap: 10, marginVertical: 14 },
  button: { minWidth: 128, paddingVertical: 10, paddingHorizontal: 20, borderRadius: 6, alignItems: 'center' },
  buttonText: { fontSize: 15, fontWeight: '700' },
});
