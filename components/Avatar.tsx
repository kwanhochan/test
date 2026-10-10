import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

import { useAppTheme } from '@/context/ThemeContext';

interface Props {
  uri: string;
  size?: number;
  /** White ring around the photo (used on the profile header). */
  bordered?: boolean;
  /** Blue ring used for unseen stories. */
  storyRing?: boolean;
}

export default function Avatar({ uri, size = 40, bordered, storyRing }: Props) {
  const { colors } = useAppTheme();
  const ring = bordered ? 4 : storyRing ? 3 : 0;
  const outer = size + ring * 2;

  return (
    <View
      style={[
        styles.ring,
        {
          width: outer,
          height: outer,
          borderRadius: outer / 2,
          borderWidth: ring,
          borderColor: storyRing ? colors.primary : colors.card,
        },
      ]}
    >
      <Image
        source={{ uri }}
        style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: colors.secondaryButton }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  ring: { alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
});
