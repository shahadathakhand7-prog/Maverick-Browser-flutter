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
import { useBookmarkStore } from '../store/bookmarkStore';
import { useBrowserStore } from '../store/browserStore';
import { Bookmark } from '../types';

export const BookmarksScreen: React.FC<{ navigation: any }> = ({
  navigation,
}) => {
  const { bookmarks, removeBookmark, searchBookmarks } = useBookmarkStore();
  const { addTab } = useBrowserStore();
  const [searchText, setSearchText] = useState('');
  const { height } = useWindowDimensions();

  const displayBookmarks =
    searchText.length > 0 ? searchBookmarks(searchText) : bookmarks;

  const handleBookmarkPress = (bookmark: Bookmark) => {
    addTab(bookmark.url);
    navigation.navigate('Browser');
  };

  const handleDeleteBookmark = (id: string) => {
    Alert.alert(
      'Delete Bookmark',
      'Are you sure you want to delete this bookmark?',
      [
        { text: 'Cancel', onPress: () => {} },
        {
          text: 'Delete',
          onPress: () => removeBookmark(id),
          style: 'destructive',
        },
      ]
    );
  };

  const renderBookmark = ({ item }: { item: Bookmark }) => (
    <TouchableOpacity
      style={styles.bookmarkItem}
      onPress={() => handleBookmarkPress(item)}
    >
      <View style={styles.bookmarkContent}>
        <Ionicons name="bookmark" size={20} color="#2196F3" />
        <View style={styles.bookmarkInfo}>
          <Text style={styles.bookmarkTitle} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.bookmarkUrl} numberOfLines={1}>
            {item.url}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => handleDeleteBookmark(item.id)}
        style={styles.deleteButton}
      >
        <Ionicons name="trash-outline" size={20} color="#f44336" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search bookmarks..."
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

      {displayBookmarks.length === 0 ? (
        <View style={[styles.emptyContainer, { height: height * 0.6 }]}>
          <Ionicons name="bookmark-outline" size={48} color="#666" />
          <Text style={styles.emptyText}>
            {bookmarks.length === 0
              ? 'No bookmarks yet'
              : 'No results found'}
          </Text>
        </View>
      ) : (
        <FlatList
          data={displayBookmarks}
          renderItem={renderBookmark}
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    marginHorizontal: 12,
    marginVertical: 12,
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
  listContent: {
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  bookmarkItem: {
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
  bookmarkContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  bookmarkInfo: {
    flex: 1,
    marginLeft: 12,
  },
  bookmarkTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  bookmarkUrl: {
    color: '#999',
    fontSize: 12,
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
