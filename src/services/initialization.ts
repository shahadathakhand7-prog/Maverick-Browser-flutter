import AsyncStorage from '@react-native-async-storage/async-storage';
import { useBrowserStore } from '../store/browserStore';
import { useSettingsStore } from '../store/settingsStore';
import { useBookmarkStore } from '../store/bookmarkStore';
import { useHistoryStore } from '../store/historyStore';

const STORAGE_KEYS = {
  BROWSER_STATE: 'browser_state',
  SETTINGS: 'browser_settings',
  BOOKMARKS: 'bookmarks',
  HISTORY: 'history',
};

export async function initializeApp(): Promise<void> {
  try {
    const [browserState, settings, bookmarks, history] = await Promise.all([
      AsyncStorage.getItem(STORAGE_KEYS.BROWSER_STATE),
      AsyncStorage.getItem(STORAGE_KEYS.SETTINGS),
      AsyncStorage.getItem(STORAGE_KEYS.BOOKMARKS),
      AsyncStorage.getItem(STORAGE_KEYS.HISTORY),
    ]);

    if (browserState) {
      try {
        const state = JSON.parse(browserState);
        useBrowserStore.getState().hydrate(state);
      } catch (error) {
        console.error('Failed to restore browser state:', error);
      }
    }

    if (settings) {
      try {
        const parsedSettings = JSON.parse(settings);
        useSettingsStore.getState().hydrate(parsedSettings);
      } catch (error) {
        console.error('Failed to restore settings:', error);
      }
    }

    if (bookmarks) {
      try {
        const parsedBookmarks = JSON.parse(bookmarks);
        useBookmarkStore.getState().hydrate(parsedBookmarks);
      } catch (error) {
        console.error('Failed to restore bookmarks:', error);
      }
    }

    if (history) {
      try {
        const parsedHistory = JSON.parse(history);
        useHistoryStore.getState().hydrate(parsedHistory);
      } catch (error) {
        console.error('Failed to restore history:', error);
      }
    }
  } catch (error) {
    console.error('Failed to initialize app:', error);
  }
}

export async function saveAppState(): Promise<void> {
  try {
    const browserState = useBrowserStore.getState();
    const settings = useSettingsStore.getState().settings;
    const bookmarks = useBookmarkStore.getState().bookmarks;
    const history = useHistoryStore.getState().entries;

    await Promise.all([
      AsyncStorage.setItem(
        STORAGE_KEYS.BROWSER_STATE,
        JSON.stringify({
          tabs: browserState.tabs,
          activeTabId: browserState.activeTabId,
        })
      ),
      AsyncStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings)),
      AsyncStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks)),
      AsyncStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history)),
    ]);
  } catch (error) {
    console.error('Failed to save app state:', error);
  }
}

export async function clearAppData(): Promise<void> {
  try {
    await AsyncStorage.multiRemove(Object.values(STORAGE_KEYS));
  } catch (error) {
    console.error('Failed to clear app data:', error);
  }
}
