import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { ApiProvider } from '../context/ApiContext'

export default function RootLayout() {
  return (
    <ApiProvider>
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
            tabBarIcon: ({ color }) => (
              <Ionicons name="home-outline" size={22} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="editor"
          options={{
            title: 'Editor',
            tabBarIcon: ({ color }) => (
              <Ionicons name="film-outline" size={22} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="clips"
          options={{
            title: 'Clips',
            tabBarIcon: ({ color }) => (
              <Ionicons name="grid-outline" size={22} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: ({ color }) => (
              <Ionicons name="settings-outline" size={22} color={color} />
            ),
          }}
        />
      </Tabs>
    </ApiProvider>
  )
}
