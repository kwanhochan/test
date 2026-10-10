import React, { useEffect, useRef } from 'react';
import { Animated, StyleProp, ViewStyle } from 'react-native';

interface Props {
  children: React.ReactNode;
  delay?: number;
  style?: StyleProp<ViewStyle>;
}

/** Fades and slides its children up slightly when first mounted. */
export default function FadeInView({ children, delay = 0, style }: Props) {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 350,
      delay,
      useNativeDriver: true,
    }).start();
  }, [delay, progress]);

  const translateY = progress.interpolate({ inputRange: [0, 1], outputRange: [12, 0] });

  return (
    <Animated.View style={[style, { opacity: progress, transform: [{ translateY }] }]}>
      {children}
    </Animated.View>
  );
}
