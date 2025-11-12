import React, { useRef, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import WebView from 'react-native-webview';
import { BrowserTab } from '../types';

interface WebViewComponentProps {
  tab: BrowserTab;
  onStateChange: (updates: Partial<BrowserTab>) => void;
}

export const WebViewComponent: React.FC<WebViewComponentProps> = ({
  tab,
  onStateChange,
}) => {
  const webViewRef = useRef<WebView>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadStart = () => {
    setIsLoading(true);
    onStateChange({ loading: true });
  };

  const handleLoadEnd = () => {
    setIsLoading(false);
    onStateChange({ loading: false });
  };

  const handleError = (error: string) => {
    setIsLoading(false);
    onStateChange({ error, loading: false });
  };

  const handleNavigationStateChange = (navState: {
    canGoBack: boolean;
    canGoForward: boolean;
    title: string;
    url: string;
  }) => {
    onStateChange({
      canGoBack: navState.canGoBack,
      canGoForward: navState.canGoForward,
      title: navState.title || 'Untitled',
      url: navState.url,
    });
  };

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{ uri: tab.url }}
        style={styles.webview}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.warn('WebView error:', nativeEvent);
          handleError(nativeEvent.description);
        }}
        onNavigationStateChange={handleNavigationStateChange}
        javaScriptEnabled={true}
        scalesPageToFit={true}
        startInLoadingState={true}
        mixedContentMode="always"
        allowFileAccess={true}
        allowFileAccessFromFileURLs={true}
        allowUniversalAccessFromFileURLs={true}
        renderLoading={() => (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#2196F3" />
          </View>
        )}
        userAgent={
          'Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36'
        }
      />

      {isLoading && (
        <ActivityIndicator
          size="small"
          color="#2196F3"
          style={styles.loadingIndicator}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  webview: {
    flex: 1,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingIndicator: {
    position: 'absolute',
    top: 50,
    right: 20,
  },
});
