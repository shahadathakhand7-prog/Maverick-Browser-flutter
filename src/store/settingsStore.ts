import { create } from 'zustand';
import { BrowserSettings } from '../types';

interface SettingsState {
  settings: BrowserSettings;
  updateSetting: <K extends keyof BrowserSettings>(
    key: K,
    value: BrowserSettings[K]
  ) => void;
  updateSettings: (partial: Partial<BrowserSettings>) => void;
  resetSettings: () => void;
  hydrate: (settings: Partial<BrowserSettings>) => void;
}

const DEFAULT_SETTINGS: BrowserSettings = {
  homeUrl: 'https://www.google.com',
  searchEngine: 'google',
  enableJavaScript: true,
  enableCookies: true,
  blockPopups: true,
  userAgent: '',
  darkMode: true,
};

export const useSettingsStore = create<SettingsState>((set) => ({
  settings: DEFAULT_SETTINGS,

  updateSetting: <K extends keyof BrowserSettings>(
    key: K,
    value: BrowserSettings[K]
  ) =>
    set((state) => ({
      settings: {
        ...state.settings,
        [key]: value,
      },
    })),

  updateSettings: (partial: Partial<BrowserSettings>) =>
    set((state) => ({
      settings: {
        ...state.settings,
        ...partial,
      },
    })),

  resetSettings: () =>
    set(() => ({
      settings: DEFAULT_SETTINGS,
    })),

  hydrate: (settings: Partial<BrowserSettings>) =>
    set((state) => ({
      settings: {
        ...state.settings,
        ...settings,
      },
    })),
}));
