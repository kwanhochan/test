import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

import { CURRENT_USER_ID, INITIAL_POSTS } from '@/data/mockData';
import { Post } from '@/types';

interface DataContextValue {
  posts: Post[];
  friendIds: string[];
  getPost: (id: string) => Post | undefined;
  toggleLike: (postId: string) => void;
  addComment: (postId: string, text: string) => void;
  toggleFriend: (userId: string) => void;
}

const DataContext = createContext<DataContextValue | undefined>(undefined);

/** Shared app state so likes/comments/friends stay in sync across every screen. */
export function DataProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [friendIds, setFriendIds] = useState<string[]>(['u2', 'u5']);

  const getPost = useCallback((id: string) => posts.find((p) => p.id === id), [posts]);

  const toggleLike = useCallback((postId: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, likedByMe: !p.likedByMe, likes: p.likes + (p.likedByMe ? -1 : 1) }
          : p,
      ),
    );
  }, []);

  const addComment = useCallback((postId: string, text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              comments: [
                ...p.comments,
                { id: `c-${Date.now()}`, authorId: CURRENT_USER_ID, text: trimmed, time: 'Just now' },
              ],
            }
          : p,
      ),
    );
  }, []);

  const toggleFriend = useCallback((userId: string) => {
    setFriendIds((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId],
    );
  }, []);

  const value = useMemo(
    () => ({ posts, friendIds, getPost, toggleLike, addComment, toggleFriend }),
    [posts, friendIds, getPost, toggleLike, addComment, toggleFriend],
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useAppData(): DataContextValue {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useAppData must be used inside DataProvider');
  return ctx;
}
