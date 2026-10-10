import React, { useRef } from 'react';
import { Animated, Pressable, StyleProp, ViewStyle } from 'react-native';

interface Props {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  /** Style for the outer touch target (e.g. flex: 1 inside grids). */
  containerStyle?: StyleProp<ViewStyle>;
  children: React.ReactNode;
  scaleTo?: number;
  accessibilityLabel?: string;
  disabled?: boolean;
}

/** Pressable that gently shrinks while held — used for all tappable buttons/cards. */
export default function PressableScale({
  onPress,
  style,
  containerStyle,
  children,
  scaleTo = 0.95,
  accessibilityLabel,
  disabled,
}: Props) {
  const scale = useRef(new Animated.Value(1)).current;

  const animateTo = (toValue: number) =>
    Animated.spring(scale, { toValue, useNativeDriver: true, speed: 30, bounciness: 6 }).start();

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => animateTo(scaleTo)}
      onPressOut={() => animateTo(1)}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      disabled={disabled}
      style={containerStyle}
    >
      <Animated.View style={[style, { transform: [{ scale }] }]}>{children}</Animated.View>
    </Pressable>
  );
}
