import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { BrowserScreen } from '../screens/BrowserScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { BookmarksScreen } from '../screens/BookmarksScreen';
import { HistoryScreen } from '../screens/HistoryScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { TabManagementScreen } from '../screens/TabManagementScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BrowserStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#1a1a1a' },
      }}
    >
      <Stack.Screen name="BrowserHome" component={BrowserScreen} />
    </Stack.Navigator>
  );
}

function BookmarksStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#2a2a2a' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: '600' },
        cardStyle: { backgroundColor: '#1a1a1a' },
      }}
    >
      <Stack.Screen
        name="BookmarksList"
        component={BookmarksScreen}
        options={{ title: 'Bookmarks' }}
      />
    </Stack.Navigator>
  );
}

function HistoryStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#2a2a2a' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: '600' },
        cardStyle: { backgroundColor: '#1a1a1a' },
      }}
    >
      <Stack.Screen
        name="HistoryList"
        component={HistoryScreen}
        options={{ title: 'History' }}
      />
    </Stack.Navigator>
  );
}

function SettingsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#2a2a2a' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: '600' },
        cardStyle: { backgroundColor: '#1a1a1a' },
      }}
    >
      <Stack.Screen
        name="SettingsList"
        component={SettingsScreen}
        options={{ title: 'Settings' }}
      />
    </Stack.Navigator>
  );
}

export function RootNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'globe';

          if (route.name === 'Browser') {
            iconName = focused ? 'globe' : 'globe-outline';
          } else if (route.name === 'Bookmarks') {
            iconName = focused ? 'bookmark' : 'bookmark-outline';
          } else if (route.name === 'History') {
            iconName = focused ? 'time' : 'time-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2196F3',
        tabBarInactiveTintColor: '#888',
        tabBarStyle: {
          backgroundColor: '#2a2a2a',
          borderTopColor: '#444',
          borderTopWidth: 1,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Browser"
        component={BrowserStack}
        options={{
          title: 'Browser',
          tabBarLabel: 'Browser',
        }}
      />
      <Tab.Screen
        name="Bookmarks"
        component={BookmarksStack}
        options={{
          title: 'Bookmarks',
          tabBarLabel: 'Bookmarks',
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryStack}
        options={{
          title: 'History',
          tabBarLabel: 'History',
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsStack}
        options={{
          title: 'Settings',
          tabBarLabel: 'Settings',
        }}
      />
    </Tab.Navigator>
  );
}
