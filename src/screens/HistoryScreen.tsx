import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useHistoryStore } from '../store/historyStore';
import { useBrowserStore } from '../store/browserStore';
import { HistoryEntry } from '../types';
import { getTimeAgo } from '../utils/helpers';

export const HistoryScreen: React.FC<{ navigation: any }> = ({
  navigation,
}) => {
  const { entries, removeEntry, clearHistory, searchHistory } =
    useHistoryStore();
  const { addTab } = useBrowserStore();
  const [searchText, setSearchText] = useState('');
  const { height } = useWindowDimensions();

  const displayEntries =
    searchText.length > 0 ? searchHistory(searchText) : entries;

  const handleEntryPress = (entry: HistoryEntry) => {
    addTab(entry.url);
    navigation.navigate('Browser');
  };

  const handleDeleteEntry = (id: string) => {
    removeEntry(id);
  };

  const handleClearHistory = () => {
    Alert.alert(
      'Clear History',
      'Are you sure you want to clear all history? This cannot be undone.',
      [
        { text: 'Cancel', onPress: () => {} },
        {
          text: 'Clear',
          onPress: () => clearHistory(),
          style: 'destructive',
        },
      ]
    );
  };

  const renderHistoryEntry = ({ item }: { item: HistoryEntry }) => (
    <TouchableOpacity
      style={styles.historyItem}
      onPress={() => handleEntryPress(item)}
    >
      <View style={styles.historyContent}>
        <Ionicons name="globe-outline" size={20} color="#2196F3" />
        <View style={styles.historyInfo}>
          <Text style={styles.historyTitle} numberOfLines={1}>
            {item.title}
          </Text>
          <View style={styles.historyMeta}>
            <Text style={styles.historyUrl} numberOfLines={1}>
              {item.url}
            </Text>
            <Text style={styles.historyTime}>{getTimeAgo(item.visitedAt)}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => handleDeleteEntry(item.id)}
        style={styles.deleteButton}
      >
        <Ionicons name="close-circle-outline" size={20} color="#999" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.controlsContainer}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#999" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search history..."
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={setSearchText}
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => setSearchText('')}>
              <Ionicons name="close-circle" size={20} color="#999" />
            </TouchableOpacity>
          )}
        </View>

        {entries.length > 0 && searchText.length === 0 && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={handleClearHistory}
          >
            <Ionicons name="trash-outline" size={16} color="#f44336" />
            <Text style={styles.clearButtonText}>Clear History</Text>
          </TouchableOpacity>
        )}
      </View>

      {displayEntries.length === 0 ? (
        <View style={[styles.emptyContainer, { height: height * 0.6 }]}>
          <Ionicons name="time-outline" size={48} color="#666" />
          <Text style={styles.emptyText}>
            {entries.length === 0
              ? 'No history yet'
              : 'No results found'}
          </Text>
        </View>
      ) : (
        <FlatList
          data={displayEntries}
          renderItem={renderHistoryEntry}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          scrollEnabled={true}
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
  controlsContainer: {
    backgroundColor: '#2a2a2a',
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 12,
    borderRadius: 8,
    borderColor: '#444',
    borderWidth: 1,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
    color: '#fff',
    fontSize: 14,
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1a1a1a',
    paddingVertical: 10,
    borderRadius: 8,
    borderColor: '#f44336',
    borderWidth: 1,
    gap: 8,
  },
  clearButtonText: {
    color: '#f44336',
    fontSize: 14,
    fontWeight: '600',
  },
  listContent: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 8,
    borderColor: '#444',
    borderWidth: 1,
  },
  historyContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  historyInfo: {
    flex: 1,
    marginLeft: 12,
  },
  historyTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  historyMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  historyUrl: {
    color: '#999',
    fontSize: 12,
    flex: 1,
  },
  historyTime: {
    color: '#666',
    fontSize: 11,
    marginLeft: 8,
  },
  deleteButton: {
    padding: 8,
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#999',
    fontSize: 16,
    marginTop: 12,
  },
});
