import { useBrowserStore } from '../store/browserStore';
import { useBookmarkStore } from '../store/bookmarkStore';
import { useHistoryStore } from '../store/historyStore';

describe('Browser Store', () => {
  beforeEach(() => {
    // Reset stores
    useBrowserStore.setState({
      tabs: [{ id: 'test-1', url: 'https://google.com', title: 'New Tab', canGoBack: false, canGoForward: false, loading: false, error: null }],
      activeTabId: 'test-1',
    });
  });

  it('should add a tab', () => {
    const { addTab, tabs } = useBrowserStore.getState();
    const initialLength = tabs.length;
    addTab();
    const newState = useBrowserStore.getState();
    expect(newState.tabs.length).toBe(initialLength + 1);
  });

  it('should remove a tab', () => {
    const { tabs, addTab, removeTab } = useBrowserStore.getState();
    addTab();
    const tabToRemove = tabs[tabs.length - 1];
    removeTab(tabToRemove.id);
    const newState = useBrowserStore.getState();
    expect(newState.tabs.some((t) => t.id === tabToRemove.id)).toBe(false);
  });

  it('should set active tab', () => {
    const { addTab, setActiveTab } = useBrowserStore.getState();
    addTab();
    const newTab = useBrowserStore.getState().tabs[useBrowserStore.getState().tabs.length - 1];
    setActiveTab(newTab.id);
    expect(useBrowserStore.getState().activeTabId).toBe(newTab.id);
  });
});

describe('Bookmark Store', () => {
  beforeEach(() => {
    useBookmarkStore.setState({ bookmarks: [] });
  });

  it('should add a bookmark', () => {
    const { addBookmark, bookmarks } = useBookmarkStore.getState();
    addBookmark('Test', 'https://test.com');
    const newState = useBookmarkStore.getState();
    expect(newState.bookmarks.length).toBe(1);
    expect(newState.bookmarks[0].title).toBe('Test');
  });

  it('should search bookmarks', () => {
    const { addBookmark, searchBookmarks } = useBookmarkStore.getState();
    addBookmark('Google', 'https://google.com');
    addBookmark('GitHub', 'https://github.com');
    const results = searchBookmarks('google');
    expect(results.length).toBe(1);
    expect(results[0].title).toBe('Google');
  });
});

describe('History Store', () => {
  beforeEach(() => {
    useHistoryStore.setState({ entries: [] });
  });

  it('should add history entry', () => {
    const { addEntry, entries } = useHistoryStore.getState();
    addEntry('https://google.com', 'Google');
    const newState = useHistoryStore.getState();
    expect(newState.entries.length).toBe(1);
  });

  it('should increment visit count for duplicate URLs', () => {
    const { addEntry } = useHistoryStore.getState();
    addEntry('https://google.com', 'Google');
    addEntry('https://google.com', 'Google');
    const entries = useHistoryStore.getState().entries;
    expect(entries.length).toBe(1);
    expect(entries[0].count).toBe(2);
  });

  it('should get recent history', () => {
    const { addEntry, getRecentHistory } = useHistoryStore.getState();
    addEntry('https://google.com', 'Google');
    addEntry('https://github.com', 'GitHub');
    const recent = getRecentHistory(1);
    expect(recent.length).toBe(1);
  });
});
