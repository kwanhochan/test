/**
 * Facebook-inspired palette, matching the look of Assignment 1.
 * Both schemes share the same keys so components can switch freely.
 */
export interface Palette {
  background: string;
  card: string;
  text: string;
  subtext: string;
  primary: string;
  primaryText: string;
  secondaryButton: string;
  secondaryButtonText: string;
  border: string;
  input: string;
  icon: string;
  unreadBg: string;
  danger: string;
  overlay: string;
}

export const Colors: Record<'light' | 'dark', Palette> = {
  light: {
    background: '#F0F2F5',
    card: '#FFFFFF',
    text: '#050505',
    subtext: '#65676B',
    primary: '#1877F2',
    primaryText: '#FFFFFF',
    secondaryButton: '#E4E6EB',
    secondaryButtonText: '#050505',
    border: '#DADDE1',
    input: '#F0F2F5',
    icon: '#65676B',
    unreadBg: '#E7F3FF',
    danger: '#E41E3F',
    overlay: 'rgba(0,0,0,0.35)',
  },
  dark: {
    background: '#18191A',
    card: '#242526',
    text: '#E4E6EB',
    subtext: '#B0B3B8',
    primary: '#2D88FF',
    primaryText: '#FFFFFF',
    secondaryButton: '#3A3B3C',
    secondaryButtonText: '#E4E6EB',
    border: '#3E4042',
    input: '#3A3B3C',
    icon: '#B0B3B8',
    unreadBg: '#263951',
    danger: '#F02849',
    overlay: 'rgba(0,0,0,0.55)',
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
} as const;
