import { useState } from 'react'
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, Alert,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import { router } from 'expo-router'
import { colors } from '../constants/colors'

const quickActions = [
  {
    id: 'subtitle',
    icon: 'sparkles-outline' as const,
    label: 'Auto-subtitle',
    desc: 'Burn captions into video',
    route: '/editor',
    active: true,
  },
  {
    id: 'removebg',
    icon: 'cut-outline' as const,
    label: 'Remove BG',
    desc: 'Fast background removal',
    route: '/editor',
    active: true,
  },
  {
    id: 'greenscreen',
    icon: 'color-filter-outline' as const,
    label: 'Green Screen',
    desc: 'Chromakey processing',
    route: '/editor',
    active: true,
  },
  {
    id: 'voice',
    icon: 'mic-outline' as const,
    label: 'Voice Clone',
    desc: 'Coming soon',
    route: null,
    active: false,
  },
]

export default function HomeScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)

  async function pickVideo() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Bob Studio needs access to your photos to upload videos.')
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'videos',
      allowsEditing: false,
      quality: 1,
    })

    if (!result.canceled && result.assets?.[0]) {
      router.push({
        pathname: '/editor',
        params: {
          videoUri: result.assets[0].uri,
          fileName: result.assets[0].fileName || 'video.mp4',
        },
      })
    }
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>BOB STUDIO</Text>
        <Text style={styles.tagline}>AI videos for African stories</Text>
      </View>

      {/* Upload hero */}
      <TouchableOpacity style={styles.uploadHero} onPress={pickVideo} activeOpacity={0.8}>
        <Ionicons name="cloud-upload-outline" size={40} color="#333" />
        <Text style={styles.uploadTitle}>Tap to upload a video</Text>
        <Text style={styles.uploadSubtitle}>MP4, MOV, WebM</Text>
      </TouchableOpacity>

      {/* Quick actions */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionLabel}>AI TOOLS</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.quickActions}
      >
        {quickActions.map(action => (
          <TouchableOpacity
            key={action.id}
            style={[styles.actionCard, !action.active && styles.actionCardDisabled]}
            onPress={() => action.route && router.push(action.route as any)}
            activeOpacity={0.8}
          >
            <Ionicons
              name={action.icon}
              size={24}
              color={action.active ? colors.accent : '#333'}
            />
            <Text style={[styles.actionLabel, !action.active && styles.actionLabelDisabled]}>
              {action.label}
            </Text>
            <Text style={[styles.actionDesc, !action.active && styles.actionDescDisabled]}>
              {action.desc}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Recent */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionLabel}>RECENT</Text>
      </View>

      <View style={styles.emptyState}>
        <Ionicons name="film-outline" size={48} color="#1e1e20" />
        <Text style={styles.emptyTitle}>No videos yet</Text>
        <Text style={styles.emptySubtitle}>Upload a video to get started</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  content: {
    padding: 20,
  },
  header: {
    marginBottom: 24,
  },
  logo: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.accent,
    letterSpacing: 0.5,
  },
  tagline: {
    fontSize: 13,
    color: colors.muted,
    marginTop: 4,
  },
  uploadHero: {
    marginTop: 4,
    height: 180,
    borderRadius: 16,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#2a2a2c',
    backgroundColor: colors.panel,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 28,
  },
  uploadTitle: {
    fontSize: 14,
    color: colors.muted,
    marginTop: 8,
  },
  uploadSubtitle: {
    fontSize: 11,
    color: '#333',
    marginTop: 4,
  },
  sectionHeader: {
    marginBottom: 12,
  },
  sectionLabel: {
    fontSize: 10,
    color: colors.muted,
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontWeight: '500',
  },
  quickActions: {
    paddingBottom: 4,
    marginBottom: 28,
    gap: 10,
  },
  actionCard: {
    width: 130,
    backgroundColor: colors.panel,
    borderRadius: 12,
    padding: 14,
    borderWidth: 0.5,
    borderColor: colors.border,
    marginRight: 10,
  },
  actionCardDisabled: {
    opacity: 0.5,
  },
  actionLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.text,
    marginTop: 8,
  },
  actionLabelDisabled: {
    color: '#444',
  },
  actionDesc: {
    fontSize: 11,
    color: colors.muted,
    marginTop: 2,
  },
  actionDescDisabled: {
    color: '#333',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyTitle: {
    fontSize: 13,
    color: '#333',
    marginTop: 8,
  },
  emptySubtitle: {
    fontSize: 12,
    color: '#2a2a2c',
    marginTop: 4,
  },
})
