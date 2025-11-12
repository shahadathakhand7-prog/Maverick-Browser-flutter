import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useBrowserStore } from '../store/browserStore';
import { BrowserTab } from '../types';
import { truncateUrl } from '../utils/helpers';

export const TabManagementScreen: React.FC<{ navigation: any }> = ({
  navigation,
}) => {
  const { tabs, activeTabId, removeTab, setActiveTab, addTab } =
    useBrowserStore();

  const handleTabPress = (tabId: string) => {
    setActiveTab(tabId);
    navigation.navigate('Browser');
  };

  const handleCloseTab = (tabId: string) => {
    removeTab(tabId);
  };

  const handleAddTab = () => {
    addTab();
  };

  const renderTab = ({ item }: { item: BrowserTab }) => (
    <TouchableOpacity
      style={[
        styles.tabItem,
        activeTabId === item.id && styles.tabItemActive,
      ]}
      onPress={() => handleTabPress(item.id)}
    >
      <View style={styles.tabContent}>
        <Ionicons
          name="globe-outline"
          size={16}
          color={activeTabId === item.id ? '#2196F3' : '#999'}
        />
        <View style={styles.tabInfo}>
          <Text
            style={styles.tabTitle}
            numberOfLines={1}
          >
            {item.title}
          </Text>
          <Text
            style={styles.tabUrl}
            numberOfLines={1}
          >
            {truncateUrl(item.url, 40)}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => handleCloseTab(item.id)}
        style={styles.closeButton}
      >
        <Ionicons name="close" size={20} color="#999" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Open Tabs ({tabs.length})</Text>
        <TouchableOpacity
          onPress={handleAddTab}
          style={styles.addButton}
        >
          <Ionicons name="add" size={24} color="#2196F3" />
        </TouchableOpacity>
      </View>

      {tabs.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="layers-outline" size={48} color="#666" />
          <Text style={styles.emptyText}>No tabs open</Text>
        </View>
      ) : (
        <FlatList
          data={tabs}
          renderItem={renderTab}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#2a2a2a',
    borderBottomColor: '#444',
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  addButton: {
    padding: 8,
  },
  listContent: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  tabItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 8,
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    borderColor: '#444',
    borderWidth: 1,
  },
  tabItemActive: {
    borderColor: '#2196F3',
    backgroundColor: '#1f4a7f',
  },
  tabContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  tabInfo: {
    flex: 1,
    marginLeft: 12,
  },
  tabTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  tabUrl: {
    color: '#999',
    fontSize: 12,
  },
  closeButton: {
    padding: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#999',
    fontSize: 16,
    marginTop: 12,
  },
});
