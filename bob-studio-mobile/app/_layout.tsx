import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#141415',
          borderTopWidth: 0.5,
          borderTopColor: '#242426',
        },
        tabBarActiveTintColor: '#f5a623',
        tabBarInactiveTintColor: '#555555',
        headerStyle: {
          backgroundColor: '#141415',
        },
        headerTintColor: '#e8e6e0',
        headerTitleStyle: {
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="editor"
        options={{
          title: 'Editor',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="film-outline" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="clips"
        options={{
          title: 'Clips',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="grid-outline" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={22} color={color} />
          ),
        }}
      />
    </Tabs>
  )
}
