import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useBrowserStore } from '../store/browserStore';
import { useHistoryStore } from '../store/historyStore';
import { AddressBar } from '../components/AddressBar';
import { WebViewComponent } from '../components/WebViewComponent';
import { saveAppState } from '../services/initialization';

export const BrowserScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { tabs, activeTabId, addTab, updateTab, setActiveTab } = useBrowserStore();
  const { addEntry } = useHistoryStore();
  const dimensions = useWindowDimensions();
  const saveTimeoutRef = useRef<NodeJS.Timeout>();

  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        // Save state when navigating away
        if (saveTimeoutRef.current) {
          clearTimeout(saveTimeoutRef.current);
        }
        saveTimeoutRef.current = setTimeout(() => {
          saveAppState();
        }, 500);
      };
    }, [])
  );

  useEffect(() => {
    // Save state periodically
    const interval = setInterval(() => {
      saveAppState();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleNavigate = (url: string) => {
    updateTab(activeTab.id, { url, error: null });
    addEntry(url, 'Loading...');
  };

  const handleRefresh = () => {
    // WebView will be reloaded automatically
    updateTab(activeTab.id, { loading: true });
  };

  const handleGoBack = () => {
    if (activeTab.canGoBack) {
      // This would be handled by WebView's goBack method
      // In a real implementation, we'd use a ref to call webViewRef.current?.goBack()
    }
  };

  const handleGoForward = () => {
    if (activeTab.canGoForward) {
      // This would be handled by WebView's goForward method
    }
  };

  const handleAddTab = () => {
    addTab();
  };

  const handleShowTabs = () => {
    navigation.navigate('Settings', { screen: 'SettingsList' });
  };

  const handleTabUpdate = (updates: Partial<typeof activeTab>) => {
    updateTab(activeTab.id, updates);
  };

  return (
    <View style={styles.container}>
      <AddressBar
        url={activeTab.url}
        isLoading={activeTab.loading}
        canGoBack={activeTab.canGoBack}
        canGoForward={activeTab.canGoForward}
        onNavigate={handleNavigate}
        onRefresh={handleRefresh}
        onGoBack={handleGoBack}
        onGoForward={handleGoForward}
        onAddTab={handleAddTab}
        onShowTabs={handleShowTabs}
        tabCount={tabs.length}
      />
      <WebViewComponent
        tab={activeTab}
        onStateChange={handleTabUpdate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
});
