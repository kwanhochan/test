import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import PressableScale from '@/components/PressableScale';
import { Reel } from '@/types';

interface Props {
  reel: Reel;
  onPress: () => void;
}

export default function ReelTile({ reel, onPress }: Props) {
  const isLive = reel.views === 'LIVE';
  return (
    <PressableScale style={styles.tile} containerStyle={styles.container} onPress={onPress} scaleTo={0.97}>
      <Image source={{ uri: reel.thumbnail }} style={StyleSheet.absoluteFill} />
      <View style={styles.shade} />
      {isLive ? (
        <View style={styles.live}>
          <Text style={styles.liveText}>LIVE</Text>
        </View>
      ) : null}
      <View style={styles.bottom}>
        <Text style={styles.caption} numberOfLines={2}>
          {reel.caption}
        </Text>
        {!isLive && (
          <View style={styles.views}>
            <Ionicons name="play" size={12} color="#fff" />
            <Text style={styles.viewsText}>{reel.views}</Text>
          </View>
        )}
      </View>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  tile: { aspectRatio: 9 / 14, borderRadius: 10, overflow: 'hidden', backgroundColor: '#333' },
  shade: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.18)' },
  live: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#E41E3F',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  liveText: { color: '#fff', fontWeight: '800', fontSize: 11 },
  bottom: { position: 'absolute', left: 8, right: 8, bottom: 8 },
  caption: { color: '#fff', fontWeight: '700', fontSize: 13 },
  views: { flexDirection: 'row', alignItems: 'center', marginTop: 4, gap: 3 },
  viewsText: { color: '#fff', fontSize: 12, fontWeight: '600' },
});
