import { create } from 'zustand';
import { HistoryEntry } from '../types';
import { generateId } from '../utils/helpers';

interface HistoryState {
  entries: HistoryEntry[];
  addEntry: (url: string, title: string, favicon?: string) => void;
  removeEntry: (id: string) => void;
  clearHistory: () => void;
  getHistoryForUrl: (url: string) => HistoryEntry | undefined;
  searchHistory: (query: string) => HistoryEntry[];
  getRecentHistory: (limit?: number) => HistoryEntry[];
  hydrate: (entries: HistoryEntry[]) => void;
}

export const useHistoryStore = create<HistoryState>((set, get) => ({
  entries: [],

  addEntry: (url: string, title: string, favicon?: string) =>
    set((state) => {
      const existing = state.entries.find((entry) => entry.url === url);

      if (existing) {
        return {
          entries: state.entries.map((entry) =>
            entry.url === url
              ? {
                  ...entry,
                  visitedAt: Date.now(),
                  count: entry.count + 1,
                }
              : entry
          ),
        };
      }

      return {
        entries: [
          ...state.entries,
          {
            id: generateId(),
            url,
            title,
            favicon: favicon || null,
            visitedAt: Date.now(),
            count: 1,
          },
        ],
      };
    }),

  removeEntry: (id: string) =>
    set((state) => ({
      entries: state.entries.filter((entry) => entry.id !== id),
    })),

  clearHistory: () =>
    set(() => ({
      entries: [],
    })),

  getHistoryForUrl: (url: string) => {
    return get().entries.find((entry) => entry.url === url);
  },

  searchHistory: (query: string) => {
    const lower = query.toLowerCase();
    return get().entries.filter(
      (entry) =>
        entry.title.toLowerCase().includes(lower) ||
        entry.url.toLowerCase().includes(lower)
    );
  },

  getRecentHistory: (limit: number = 50) => {
    return get()
      .entries.sort((a, b) => b.visitedAt - a.visitedAt)
      .slice(0, limit);
  },

  hydrate: (entries: HistoryEntry[]) =>
    set(() => ({
      entries,
    })),
}));
