import { create } from 'zustand';
import { Bookmark } from '../types';
import { generateId } from '../utils/helpers';

interface BookmarkState {
  bookmarks: Bookmark[];
  addBookmark: (title: string, url: string, favicon?: string) => void;
  removeBookmark: (id: string) => void;
  updateBookmark: (id: string, updates: Partial<Bookmark>) => void;
  getBookmark: (url: string) => Bookmark | undefined;
  searchBookmarks: (query: string) => Bookmark[];
  hydrate: (bookmarks: Bookmark[]) => void;
}

export const useBookmarkStore = create<BookmarkState>((set, get) => ({
  bookmarks: [],

  addBookmark: (title: string, url: string, favicon?: string) =>
    set((state) => ({
      bookmarks: [
        ...state.bookmarks,
        {
          id: generateId(),
          title,
          url,
          favicon: favicon || null,
          createdAt: Date.now(),
        },
      ],
    })),

  removeBookmark: (id: string) =>
    set((state) => ({
      bookmarks: state.bookmarks.filter((bookmark) => bookmark.id !== id),
    })),

  updateBookmark: (id: string, updates: Partial<Bookmark>) =>
    set((state) => ({
      bookmarks: state.bookmarks.map((bookmark) =>
        bookmark.id === id ? { ...bookmark, ...updates } : bookmark
      ),
    })),

  getBookmark: (url: string) => {
    return get().bookmarks.find((bookmark) => bookmark.url === url);
  },

  searchBookmarks: (query: string) => {
    const lower = query.toLowerCase();
    return get().bookmarks.filter(
      (bookmark) =>
        bookmark.title.toLowerCase().includes(lower) ||
        bookmark.url.toLowerCase().includes(lower)
    );
  },

  hydrate: (bookmarks: Bookmark[]) =>
    set(() => ({
      bookmarks,
    })),
}));
