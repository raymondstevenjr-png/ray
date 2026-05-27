import { useState, useCallback } from 'react'
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, Alert,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import { router, useFocusEffect } from 'expo-router'
import { colors } from '../constants/colors'
import { getClips } from '../constants/storage'
import { TYPE_LABEL, formatDate } from '../constants/clipUtils'

const quickActions = [
  { id: 'subtitle', icon: 'sparkles-outline' as const, label: 'Auto-subtitle', desc: 'Burn captions into video', active: true },
  { id: 'removebg', icon: 'cut-outline' as const, label: 'Remove BG', desc: 'Fast background removal', active: true },
  { id: 'greenscreen', icon: 'color-filter-outline' as const, label: 'Green Screen', desc: 'Chromakey processing', active: true },
  { id: 'voice', icon: 'mic-outline' as const, label: 'Voice Clone', desc: 'Coming soon', active: false },
]

export default function HomeScreen() {
  const [recentClips, setRecentClips] = useState<ClipEntry[]>([])

  useFocusEffect(
    useCallback(() => {
      getClips().then(clips => setRecentClips(clips.slice(0, 3)))
    }, [])
  )

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
        params: { videoUri: result.assets[0].uri, fileName: result.assets[0].fileName || 'video.mp4' },
      })
    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.logo}>BOB STUDIO</Text>
        <Text style={styles.tagline}>AI videos for African stories</Text>
      </View>

      <TouchableOpacity style={styles.uploadHero} onPress={pickVideo} activeOpacity={0.8}>
        <Ionicons name="cloud-upload-outline" size={40} color="#333" />
        <Text style={styles.uploadTitle}>Tap to upload a video</Text>
        <Text style={styles.uploadSubtitle}>MP4, MOV, WebM</Text>
      </TouchableOpacity>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionLabel}>AI TOOLS</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.quickActions}>
        {quickActions.map(action => (
          <TouchableOpacity
            key={action.id}
            style={[styles.actionCard, !action.active && styles.actionCardDisabled]}
            onPress={() => action.active && router.push('/editor')}
            activeOpacity={0.8}
          >
            <Ionicons name={action.icon} size={24} color={action.active ? colors.accent : '#333'} />
            <Text style={[styles.actionLabel, !action.active && styles.actionLabelDisabled]}>{action.label}</Text>
            <Text style={[styles.actionDesc, !action.active && styles.actionDescDisabled]}>{action.desc}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={[styles.sectionHeader, { flexDirection: 'row', alignItems: 'center' }]}>
        <Text style={[styles.sectionLabel, { flex: 1 }]}>RECENT</Text>
        {recentClips.length > 0 && (
          <TouchableOpacity onPress={() => router.push('/clips')}>
            <Text style={styles.seeAll}>See all →</Text>
          </TouchableOpacity>
        )}
      </View>

      {recentClips.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="film-outline" size={48} color="#1e1e20" />
          <Text style={styles.emptyTitle}>No videos yet</Text>
          <Text style={styles.emptySubtitle}>Upload a video to get started</Text>
        </View>
      ) : (
        recentClips.map(clip => (
          <View key={clip.id} style={styles.recentCard}>
            <View style={styles.recentIcon}>
              <Ionicons
                name={clip.type === 'subtitle' ? 'text-outline' : clip.type === 'background' ? 'cut-outline' : 'color-filter-outline'}
                size={16}
                color={colors.accent}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.recentName} numberOfLines={1}>{clip.fileName}</Text>
              <Text style={styles.recentMeta}>{TYPE_LABEL[clip.type]} · {formatDate(clip.processedAt)}</Text>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 20, paddingBottom: 40 },
  header: { marginBottom: 24 },
  logo: { fontSize: 28, fontWeight: '800', color: colors.accent, letterSpacing: 0.5 },
  tagline: { fontSize: 13, color: colors.muted, marginTop: 4 },
  uploadHero: {
    marginTop: 4, height: 160, borderRadius: 16,
    borderWidth: 1.5, borderStyle: 'dashed', borderColor: '#2a2a2c',
    backgroundColor: colors.panel, alignItems: 'center', justifyContent: 'center', marginBottom: 28,
  },
  uploadTitle: { fontSize: 14, color: colors.muted, marginTop: 8 },
  uploadSubtitle: { fontSize: 11, color: '#333', marginTop: 4 },
  sectionHeader: { marginBottom: 12 },
  sectionLabel: { fontSize: 10, color: colors.muted, textTransform: 'uppercase', letterSpacing: 1, fontWeight: '500' },
  seeAll: { fontSize: 11, color: colors.accent },
  quickActions: { paddingBottom: 4, marginBottom: 28, gap: 10 },
  actionCard: {
    width: 130, backgroundColor: colors.panel, borderRadius: 12,
    padding: 14, borderWidth: 0.5, borderColor: colors.border, marginRight: 10,
  },
  actionCardDisabled: { opacity: 0.5 },
  actionLabel: { fontSize: 13, fontWeight: '500', color: colors.text, marginTop: 8 },
  actionLabelDisabled: { color: '#444' },
  actionDesc: { fontSize: 11, color: colors.muted, marginTop: 2 },
  actionDescDisabled: { color: '#333' },
  emptyState: { alignItems: 'center', paddingVertical: 32 },
  emptyTitle: { fontSize: 13, color: '#333', marginTop: 8 },
  emptySubtitle: { fontSize: 12, color: '#2a2a2c', marginTop: 4 },
  recentCard: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: colors.panel, borderRadius: 10,
    borderWidth: 0.5, borderColor: colors.border,
    padding: 12, marginBottom: 8,
  },
  recentIcon: {
    width: 34, height: 34, borderRadius: 8,
    backgroundColor: '#2c2200', alignItems: 'center', justifyContent: 'center',
  },
  recentName: { fontSize: 13, fontWeight: '500', color: colors.text },
  recentMeta: { fontSize: 11, color: colors.muted, marginTop: 2 },
})
