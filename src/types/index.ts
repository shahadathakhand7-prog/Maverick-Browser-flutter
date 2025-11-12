export interface BrowserTab {
  id: string;
  url: string;
  title: string;
  canGoBack: boolean;
  canGoForward: boolean;
  loading: boolean;
  error: string | null;
}

export interface Bookmark {
  id: string;
  title: string;
  url: string;
  favicon: string | null;
  createdAt: number;
}

export interface HistoryEntry {
  id: string;
  url: string;
  title: string;
  favicon: string | null;
  visitedAt: number;
  count: number;
}

export interface BrowserSettings {
  homeUrl: string;
  searchEngine: 'google' | 'duckduckgo' | 'bing';
  enableJavaScript: boolean;
  enableCookies: boolean;
  blockPopups: boolean;
  userAgent: string;
  darkMode: boolean;
}

export interface RootStackParamList {
  Home: undefined;
  Browser: { tabId: string };
  Bookmarks: undefined;
  History: undefined;
  Settings: undefined;
  TabManagement: undefined;
}

export interface BrowserContextType {
  tabs: BrowserTab[];
  activeTabId: string;
  addTab: (url?: string) => void;
  removeTab: (id: string) => void;
  setActiveTab: (id: string) => void;
  updateTab: (id: string, updates: Partial<BrowserTab>) => void;
  closeAllTabs: () => void;
}
