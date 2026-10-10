import React, { useEffect, useRef, useState } from 'react';
import { Animated, LayoutChangeEvent, Pressable, StyleSheet, Text, View } from 'react-native';

import { useAppTheme } from '@/context/ThemeContext';

interface Props<T extends string> {
  tabs: readonly T[];
  active: T;
  onChange: (tab: T) => void;
}

/** Posts / Reels / Tagged switcher with a sliding underline (same look as Assignment 1). */
export default function SegmentedTabs<T extends string>({ tabs, active, onChange }: Props<T>) {
  const { colors } = useAppTheme();
  const [width, setWidth] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;
  const tabWidth = width / tabs.length;
  const activeIndex = tabs.indexOf(active);

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: activeIndex * tabWidth,
      useNativeDriver: true,
      speed: 20,
      bounciness: 4,
    }).start();
  }, [activeIndex, tabWidth, translateX]);

  const onLayout = (e: LayoutChangeEvent) => setWidth(e.nativeEvent.layout.width);

  return (
    <View
      onLayout={onLayout}
      style={[styles.container, { backgroundColor: colors.card, borderColor: colors.border }]}
    >
      {tabs.map((tab) => (
        <Pressable key={tab} style={styles.tab} onPress={() => onChange(tab)} accessibilityRole="tab">
          <Text style={[styles.label, { color: tab === active ? colors.text : colors.subtext }]}>
            {tab}
          </Text>
        </Pressable>
      ))}
      {width > 0 && (
        <Animated.View
          style={[
            styles.underline,
            { width: tabWidth, backgroundColor: colors.text, transform: [{ translateX }] },
          ]}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 12 },
  label: { fontSize: 15 },
  underline: { position: 'absolute', bottom: 0, left: 0, height: 2 },
});
