import { create } from 'zustand';
import { BrowserTab } from '../types';
import { generateId } from '../utils/helpers';

interface BrowserState {
  tabs: BrowserTab[];
  activeTabId: string;
  addTab: (url?: string) => void;
  removeTab: (id: string) => void;
  setActiveTab: (id: string) => void;
  updateTab: (id: string, updates: Partial<BrowserTab>) => void;
  closeAllTabs: () => void;
  hydrate: (state: Partial<BrowserState>) => void;
}

const createDefaultTab = (url: string = 'https://www.google.com'): BrowserTab => ({
  id: generateId(),
  url,
  title: 'New Tab',
  canGoBack: false,
  canGoForward: false,
  loading: false,
  error: null,
});

export const useBrowserStore = create<BrowserState>((set) => ({
  tabs: [createDefaultTab()],
  activeTabId: '',

  addTab: (url?: string) =>
    set((state) => {
      const newTab = createDefaultTab(url);
      return {
        tabs: [...state.tabs, newTab],
        activeTabId: newTab.id,
      };
    }),

  removeTab: (id: string) =>
    set((state) => {
      const tabs = state.tabs.filter((tab) => tab.id !== id);
      if (tabs.length === 0) {
        const newTab = createDefaultTab();
        return {
          tabs: [newTab],
          activeTabId: newTab.id,
        };
      }

      const newActiveId =
        state.activeTabId === id
          ? tabs[tabs.length - 1].id
          : state.activeTabId;

      return {
        tabs,
        activeTabId: newActiveId,
      };
    }),

  setActiveTab: (id: string) =>
    set((state) => {
      if (state.tabs.some((tab) => tab.id === id)) {
        return { activeTabId: id };
      }
      return state;
    }),

  updateTab: (id: string, updates: Partial<BrowserTab>) =>
    set((state) => ({
      tabs: state.tabs.map((tab) =>
        tab.id === id ? { ...tab, ...updates } : tab
      ),
    })),

  closeAllTabs: () =>
    set(() => ({
      tabs: [createDefaultTab()],
      activeTabId: '',
    })),

  hydrate: (state: Partial<BrowserState>) =>
    set((current) => {
      const restored = {
        ...current,
        ...state,
      };
      if (restored.tabs.length === 0) {
        restored.tabs = [createDefaultTab()];
      }
      if (
        !restored.activeTabId ||
        !restored.tabs.some((tab) => tab.id === restored.activeTabId)
      ) {
        restored.activeTabId = restored.tabs[0].id;
      }
      return restored;
    }),
}));
