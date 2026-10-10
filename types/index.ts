export interface User {
  id: string;
  name: string;
  avatar: string;
  cover: string;
  location: string;
  school: string;
  job: string;
  bio: string;
  friendsCount: number;
  mutualFriends: number;
}

export interface Comment {
  id: string;
  authorId: string;
  text: string;
  time: string;
}

export interface Post {
  id: string;
  authorId: string;
  time: string;
  text: string;
  image?: string;
  likes: number;
  likedByMe: boolean;
  shares: number;
  comments: Comment[];
  taggedIds: string[];
}

export interface Reel {
  id: string;
  authorId: string;
  thumbnail: string;
  views: string;
  caption: string;
  category: ReelCategory;
}

export type ReelCategory = 'For you' | 'Live' | 'Gaming' | 'Following';

export type NotificationType = 'like' | 'comment' | 'friend' | 'tag' | 'birthday';

export interface AppNotification {
  id: string;
  actorId: string;
  type: NotificationType;
  text: string;
  time: string;
  isNew: boolean;
  postId?: string;
}

export interface Story {
  id: string;
  authorId: string;
  image: string;
}
