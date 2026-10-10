# Facebook Clone — Assignment 2 (Expo + TypeScript)

A multi-screen Facebook-style app built with **Expo Router** (tabs template, TypeScript).
It extends the Assignment 1 profile page (cover photo, round avatar, Add Friend / Message,
Posts · Reels · Tagged) into a full app with tab + stack navigation.

## Run it

```bash
npm install
npx expo install --fix     # aligns package versions with your Expo SDK
npx expo start             # press a (Android), i (iOS) or w (web), or scan the QR in Expo Go
```

> Built for Expo SDK 54. If your Expo Go app asks for a newer SDK, run
> `npx expo install expo@latest --fix` first.

## Screens & navigation

| Navigator | Screen | File | What it shows |
|---|---|---|---|
| **Tabs** | Home | `app/(tabs)/index.tsx` | News feed: composer, stories row, FlatList of posts, pull-to-refresh, loading indicator |
| Tabs | Search | `app/(tabs)/search.tsx` | Live search of people, recent-search chips |
| Tabs | Reels | `app/(tabs)/watch.tsx` | Filter chips + 2-column reel grid |
| Tabs | Notifications | `app/(tabs)/notifications.tsx` | New / Earlier sections, unread badge, mark all as read |
| Tabs | Menu | `app/(tabs)/menu.tsx` | Profile shortcut, shortcut grid, dark-mode switch |
| **Stack** | Profile | `app/profile/[id].tsx` | Assignment 1 layout; receives `id` (and optional `tab`) as **navigation params** |
| Stack | Post detail | `app/post/[id].tsx` | Full post + comments; add a comment |
| Stack | Settings | `app/settings.tsx` | Light / Dark / System theme picker, preference toggles |

Example flows: Home → tap an author → **Profile** → tap a post → **Post detail**;
Notifications → tap → **Post** or **Profile**; any ⚙️ button → **Settings**.

## Requirement checklist

- ✅ Expo + TypeScript, tabs template structure (`app/`, `components/`, `constants/`)
- ✅ 8 functional screens (minimum 4)
- ✅ Tab navigation + Stack navigation (`app/_layout.tsx` = Stack, `app/(tabs)/_layout.tsx` = Tabs)
- ✅ Dynamic content: FlatList / SectionList, navigation params (`/profile/[id]`, `/post/[id]`), reusable components, shared state (likes, comments, friends)
- ✅ Icons + consistent styling (shared palette in `constants/Colors.ts`)
- ✅ Optional: manual light/dark theme toggle (Menu switch and Settings screen)
- ✅ Optional: animations — slide transitions, press-scale buttons, fade-in lists, like-button bounce, sliding tab underline, tab-icon bounce, loading indicator

## Project structure

```
app/
  _layout.tsx            Root Stack + theme/data providers
  (tabs)/_layout.tsx     Bottom tabs (emoji icons like Assignment 1)
  (tabs)/index.tsx | search.tsx | watch.tsx | notifications.tsx | menu.tsx
  profile/[id].tsx       Profile (stack, params)
  post/[id].tsx          Post detail (stack, params)
  settings.tsx           Settings (stack)
components/              Avatar, PostCard, ProfileHeader, SegmentedTabs, StoriesRow,
                         Composer, UserRow, ReelTile, PressableScale, FadeInView
context/                 ThemeContext (light/dark), DataContext (posts, likes, comments, friends)
constants/Colors.ts      Light + dark palettes
data/mockData.ts         Users, posts, reels, stories, notifications
types/index.ts           Shared TypeScript interfaces
```

Images load from picsum.photos / pravatar.cc, so the device needs internet access.

## Suggested GitHub split (so every member has visible commits)

| Member | Branch / files |
|---|---|
| Member 1 | Project setup, `app/_layout.tsx`, `(tabs)/_layout.tsx`, theme context, Settings screen |
| Member 2 | Home feed, PostCard, StoriesRow, Composer, Post detail screen, DataContext |
| Member 3 | Profile screen + ProfileHeader/SegmentedTabs, Search, Reels, Notifications, Menu |

Each member should commit their own part from their own GitHub account and open a pull request into `main`.
