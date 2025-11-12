import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  TextInput,
  Alert,
  SectionList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSettingsStore } from '../store/settingsStore';
import { useBrowserStore } from '../store/browserStore';
import { useBookmarkStore } from '../store/bookmarkStore';
import { useHistoryStore } from '../store/historyStore';
import { clearAppData, saveAppState } from '../services/initialization';

export const SettingsScreen: React.FC<{ navigation: any }> = () => {
  const {
    settings,
    updateSetting,
    updateSettings,
    resetSettings,
  } = useSettingsStore();
  const { closeAllTabs } = useBrowserStore();
  const { clearHistory } = useHistoryStore();

  const handleHomeUrlChange = (url: string) => {
    updateSetting('homeUrl', url);
  };

  const handleSearchEngineChange = (engine: 'google' | 'duckduckgo' | 'bing') => {
    updateSetting('searchEngine', engine);
  };

  const handleToggleSetting = (
    key: 'enableJavaScript' | 'enableCookies' | 'blockPopups' | 'darkMode'
  ) => {
    updateSetting(key, !settings[key]);
  };

  const handleResetSettings = () => {
    Alert.alert(
      'Reset Settings',
      'Are you sure you want to reset all settings to default?',
      [
        { text: 'Cancel' },
        {
          text: 'Reset',
          onPress: () => resetSettings(),
          style: 'destructive',
        },
      ]
    );
  };

  const handleClearAllData = () => {
    Alert.alert(
      'Clear All Data',
      'This will clear all bookmarks, history, tabs, and settings. This cannot be undone.',
      [
        { text: 'Cancel' },
        {
          text: 'Clear All',
          onPress: async () => {
            clearHistory();
            closeAllTabs();
            resetSettings();
            await clearAppData();
          },
          style: 'destructive',
        },
      ]
    );
  };

  const handleExportData = async () => {
    try {
      await saveAppState();
      Alert.alert('Success', 'Data has been saved');
    } catch (error) {
      Alert.alert('Error', 'Failed to save data');
    }
  };

  const sections = [
    {
      title: 'Browser',
      data: [
        {
          id: 'homeUrl',
          label: 'Home URL',
          type: 'text' as const,
        },
        {
          id: 'searchEngine',
          label: 'Search Engine',
          type: 'picker' as const,
        },
        {
          id: 'darkMode',
          label: 'Dark Mode',
          type: 'toggle' as const,
        },
      ],
    },
    {
      title: 'Privacy & Security',
      data: [
        {
          id: 'enableJavaScript',
          label: 'Enable JavaScript',
          type: 'toggle' as const,
        },
        {
          id: 'enableCookies',
          label: 'Enable Cookies',
          type: 'toggle' as const,
        },
        {
          id: 'blockPopups',
          label: 'Block Pop-ups',
          type: 'toggle' as const,
        },
      ],
    },
    {
      title: 'Data & Storage',
      data: [
        {
          id: 'export',
          label: 'Save Data',
          type: 'button' as const,
        },
        {
          id: 'reset',
          label: 'Reset Settings',
          type: 'button' as const,
        },
        {
          id: 'clearAll',
          label: 'Clear All Data',
          type: 'button' as const,
        },
      ],
    },
  ];

  const renderItem = ({ item }: { item: any }) => {
    if (item.type === 'toggle') {
      return (
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>{item.label}</Text>
          <Switch
            value={settings[item.id as keyof typeof settings] as boolean}
            onValueChange={() =>
              handleToggleSetting(
                item.id as
                  | 'enableJavaScript'
                  | 'enableCookies'
                  | 'blockPopups'
                  | 'darkMode'
              )
            }
            trackColor={{ false: '#444', true: '#2196F3' }}
            thumbColor={
              settings[item.id as keyof typeof settings] ? '#2196F3' : '#888'
            }
          />
        </View>
      );
    }

    if (item.type === 'text') {
      return (
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>{item.label}</Text>
          <TextInput
            style={styles.textInput}
            value={settings.homeUrl}
            onChangeText={handleHomeUrlChange}
            placeholderTextColor="#666"
          />
        </View>
      );
    }

    if (item.type === 'picker') {
      return (
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>{item.label}</Text>
          <View style={styles.pickerContainer}>
            {(['google', 'duckduckgo', 'bing'] as const).map((engine) => (
              <TouchableOpacity
                key={engine}
                style={[
                  styles.pickerOption,
                  settings.searchEngine === engine && styles.pickerOptionActive,
                ]}
                onPress={() => handleSearchEngineChange(engine)}
              >
                <Text
                  style={[
                    styles.pickerOptionText,
                    settings.searchEngine === engine &&
                      styles.pickerOptionTextActive,
                  ]}
                >
                  {engine.charAt(0).toUpperCase() + engine.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      );
    }

    if (item.type === 'button') {
      let onPress = () => {};
      let textColor = '#2196F3';

      if (item.id === 'export') {
        onPress = handleExportData;
      } else if (item.id === 'reset') {
        onPress = handleResetSettings;
        textColor = '#FF9800';
      } else if (item.id === 'clearAll') {
        onPress = handleClearAllData;
        textColor = '#f44336';
      }

      return (
        <TouchableOpacity
          style={styles.buttonItem}
          onPress={onPress}
        >
          <Text style={[styles.buttonText, { color: textColor }]}>
            {item.label}
          </Text>
          <Ionicons name="chevron-forward" size={20} color={textColor} />
        </TouchableOpacity>
      );
    }

    return null;
  };

  const renderSectionHeader = ({ section }: { section: any }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{section.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        contentContainerStyle={styles.listContent}
        scrollEnabled={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  listContent: {
    paddingVertical: 12,
  },
  sectionHeader: {
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomColor: '#444',
    borderBottomWidth: 1,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2196F3',
    textTransform: 'uppercase',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#2a2a2a',
    borderBottomColor: '#444',
    borderBottomWidth: 1,
  },
  settingLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
    flex: 1,
  },
  textInput: {
    flex: 1,
    marginLeft: 12,
    backgroundColor: '#1a1a1a',
    color: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
    borderColor: '#444',
    borderWidth: 1,
    fontSize: 12,
  },
  pickerContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  pickerOption: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
    borderColor: '#444',
    borderWidth: 1,
    backgroundColor: '#1a1a1a',
  },
  pickerOptionActive: {
    backgroundColor: '#2196F3',
    borderColor: '#2196F3',
  },
  pickerOptionText: {
    fontSize: 12,
    color: '#999',
    fontWeight: '500',
  },
  pickerOptionTextActive: {
    color: '#fff',
  },
  buttonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#2a2a2a',
    borderBottomColor: '#444',
    borderBottomWidth: 1,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
  },
});
