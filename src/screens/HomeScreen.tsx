import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useBrowserStore } from '../store/browserStore';
import { useBookmarkStore } from '../store/bookmarkStore';
import { useHistoryStore } from '../store/historyStore';
import { Bookmark, HistoryEntry } from '../types';

export const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { addTab } = useBrowserStore();
  const { bookmarks } = useBookmarkStore();
  const { getRecentHistory } = useHistoryStore();

  const recentHistory = getRecentHistory(5);

  const handleBookmarkPress = (bookmark: Bookmark) => {
    addTab(bookmark.url);
    navigation.navigate('Browser');
  };

  const handleHistoryPress = (entry: HistoryEntry) => {
    addTab(entry.url);
    navigation.navigate('Browser');
  };

  const handleNewTab = () => {
    addTab();
    navigation.navigate('Browser');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="globe" size={40} color="#2196F3" />
        <Text style={styles.title}>Maverick Browser</Text>
        <Text style={styles.subtitle}>A fast and secure web browser</Text>
      </View>

      <TouchableOpacity
        style={styles.newTabButton}
        onPress={handleNewTab}
      >
        <Ionicons name="add-circle" size={24} color="#fff" />
        <Text style={styles.newTabButtonText}>New Tab</Text>
      </TouchableOpacity>

      {recentHistory.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('History')}
            >
              <Text style={styles.sectionLink}>View All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.itemList}>
            {recentHistory.slice(0, 3).map((entry) => (
              <TouchableOpacity
                key={entry.id}
                style={styles.historyItem}
                onPress={() => handleHistoryPress(entry)}
              >
                <Ionicons name="globe-outline" size={16} color="#2196F3" />
                <View style={styles.itemContent}>
                  <Text style={styles.itemTitle} numberOfLines={1}>
                    {entry.title}
                  </Text>
                  <Text style={styles.itemUrl} numberOfLines={1}>
                    {entry.url}
                  </Text>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={16}
                  color="#666"
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {bookmarks.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Bookmarks</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Bookmarks')}
            >
              <Text style={styles.sectionLink}>View All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.itemList}>
            {bookmarks.slice(0, 3).map((bookmark) => (
              <TouchableOpacity
                key={bookmark.id}
                style={styles.bookmarkItem}
                onPress={() => handleBookmarkPress(bookmark)}
              >
                <Ionicons name="bookmark" size={16} color="#2196F3" />
                <View style={styles.itemContent}>
                  <Text style={styles.itemTitle} numberOfLines={1}>
                    {bookmark.title}
                  </Text>
                  <Text style={styles.itemUrl} numberOfLines={1}>
                    {bookmark.url}
                  </Text>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={16}
                  color="#666"
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionGrid}>
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('Bookmarks')}
          >
            <Ionicons name="bookmark-outline" size={28} color="#2196F3" />
            <Text style={styles.actionLabel}>Bookmarks</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('History')}
          >
            <Ionicons name="time-outline" size={28} color="#2196F3" />
            <Text style={styles.actionLabel}>History</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('Settings')}
          >
            <Ionicons name="settings-outline" size={28} color="#2196F3" />
            <Text style={styles.actionLabel}>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Version 1.0.0
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 32,
    borderBottomColor: '#444',
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    marginTop: 12,
  },
  subtitle: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  },
  newTabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginVertical: 20,
    paddingVertical: 14,
    backgroundColor: '#2196F3',
    borderRadius: 8,
    gap: 8,
  },
  newTabButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  sectionLink: {
    fontSize: 12,
    color: '#2196F3',
    fontWeight: '600',
  },
  itemList: {
    gap: 8,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    borderColor: '#444',
    borderWidth: 1,
    gap: 12,
  },
  bookmarkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    borderColor: '#444',
    borderWidth: 1,
    gap: 12,
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 13,
    fontWeight: '500',
    color: '#fff',
    marginBottom: 2,
  },
  itemUrl: {
    fontSize: 11,
    color: '#999',
  },
  actionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 12,
  },
  actionCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    borderColor: '#444',
    borderWidth: 1,
    gap: 8,
  },
  actionLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#fff',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
    borderTopColor: '#444',
    borderTopWidth: 1,
    marginTop: 20,
  },
  footerText: {
    fontSize: 12,
    color: '#666',
  },
});
