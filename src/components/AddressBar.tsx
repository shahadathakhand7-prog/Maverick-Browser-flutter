import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { normalizeUrl } from '../utils/helpers';

interface AddressBarProps {
  url: string;
  isLoading: boolean;
  canGoBack: boolean;
  canGoForward: boolean;
  onNavigate: (url: string) => void;
  onRefresh: () => void;
  onGoBack: () => void;
  onGoForward: () => void;
  onAddTab: () => void;
  onShowTabs: () => void;
  tabCount: number;
}

export const AddressBar: React.FC<AddressBarProps> = ({
  url,
  isLoading,
  canGoBack,
  canGoForward,
  onNavigate,
  onRefresh,
  onGoBack,
  onGoForward,
  onAddTab,
  onShowTabs,
  tabCount,
}) => {
  const [text, setText] = useState(url);
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = () => {
    const normalizedUrl = normalizeUrl(text);
    onNavigate(normalizedUrl);
    setText(normalizedUrl);
    setIsFocused(false);
  };

  const handleRefresh = () => {
    if (isLoading) {
      // In a real app, this would cancel the load
    } else {
      onRefresh();
    }
  };

  React.useEffect(() => {
    if (!isFocused) {
      setText(url);
    }
  }, [url, isFocused]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <View style={styles.controlsRow}>
        <TouchableOpacity
          onPress={onGoBack}
          disabled={!canGoBack}
          style={[styles.button, !canGoBack && styles.disabledButton]}
        >
          <Ionicons
            name="chevron-back"
            size={24}
            color={canGoBack ? '#2196F3' : '#666'}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onGoForward}
          disabled={!canGoForward}
          style={[styles.button, !canGoForward && styles.disabledButton]}
        >
          <Ionicons
            name="chevron-forward"
            size={24}
            color={canGoForward ? '#2196F3' : '#666'}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleRefresh}
          style={styles.button}
        >
          <Ionicons
            name={isLoading ? 'close' : 'refresh'}
            size={24}
            color="#2196F3"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.addressRow}>
        <View style={styles.addressContainer}>
          <Ionicons name="lock" size={18} color="#4CAF50" style={styles.lockIcon} />
          <TextInput
            style={styles.addressInput}
            placeholder="Enter URL or search..."
            placeholderTextColor="#999"
            value={text}
            onChangeText={setText}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onSubmitEditing={handleSubmit}
            returnKeyType="go"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="url"
          />
        </View>

        <TouchableOpacity
          onPress={onAddTab}
          style={styles.tabButton}
        >
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onShowTabs}
          style={styles.tabCountButton}
        >
          <Ionicons name="layers" size={20} color="#fff" />
          {tabCount > 0 && (
            <View style={styles.badgeContainer}>
              <Ionicons
                name="ellipse"
                size={18}
                color="#2196F3"
                style={styles.badge}
              />
            </View>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2a2a2a',
    borderBottomColor: '#444',
    borderBottomWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  button: {
    padding: 8,
    marginRight: 4,
  },
  disabledButton: {
    opacity: 0.5,
  },
  addressContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderColor: '#444',
    borderWidth: 1,
  },
  lockIcon: {
    marginRight: 8,
  },
  addressInput: {
    flex: 1,
    color: '#fff',
    fontSize: 14,
    height: 40,
  },
  tabButton: {
    padding: 10,
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabCountButton: {
    padding: 10,
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  badgeContainer: {
    position: 'absolute',
    top: 2,
    right: 2,
  },
  badge: {
    width: 14,
    height: 14,
  },
});
