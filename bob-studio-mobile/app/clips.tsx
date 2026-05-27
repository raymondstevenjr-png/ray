import { useState, useCallback } from 'react'
import {
  View, Text, FlatList, TouchableOpacity,
  StyleSheet, Alert, ActivityIndicator,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useFocusEffect, router } from 'expo-router'
import * as FileSystem from 'expo-file-system'
import * as Sharing from 'expo-sharing'
import { colors } from '../constants/colors'
import { getClips, deleteClip, type ClipEntry } from '../constants/storage'
import { TYPE_LABEL, formatDate } from '../constants/clipUtils'

export default function ClipsScreen() {
  const [clips, setClips] = useState<ClipEntry[]>([])
  const [loading, setLoading] = useState(true)

  useFocusEffect(
    useCallback(() => {
      setLoading(true)
      getClips().then(c => { setClips(c); setLoading(false) })
    }, [])
  )

  async function handleShare(clip: ClipEntry) {
    if (clip.processedUrl) {
      try {
        const localUri = `${FileSystem.documentDirectory}${clip.fileName}`
        await FileSystem.downloadAsync(clip.processedUrl, localUri)
        await Sharing.shareAsync(localUri)
      } catch {
        Alert.alert('Error', 'Could not download the video.')
      }
    } else if (clip.srt) {
      try {
        const localUri = `${FileSystem.documentDirectory}${clip.fileName.replace(/\.[^.]+$/, '')}.srt`
        await FileSystem.writeAsStringAsync(localUri, clip.srt, { encoding: FileSystem.EncodingType.UTF8 })
        await Sharing.shareAsync(localUri)
      } catch {
        Alert.alert('Error', 'Could not share subtitles.')
      }
    }
  }

  async function handleDelete(id: string) {
    Alert.alert('Delete clip?', 'This removes it from history only.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete', style: 'destructive',
        onPress: async () => {
          await deleteClip(id)
          setClips(prev => prev.filter(c => c.id !== id))
        },
      },
    ])
  }

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator color={colors.accent} />
      </View>
    )
  }

  if (clips.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}><Text style={styles.title}>MY CLIPS</Text></View>
        <View style={styles.centered}>
          <Ionicons name="grid-outline" size={64} color="#1e1e20" />
          <Text style={styles.emptyTitle}>No clips yet</Text>
          <Text style={styles.emptySubtitle}>Process a video to see it here</Text>
          <TouchableOpacity style={styles.goButton} onPress={() => router.push('/editor')} activeOpacity={0.8}>
            <Text style={styles.goButtonText}>Go to Editor</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}><Text style={styles.title}>MY CLIPS</Text></View>
      <FlatList
        data={clips}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardRow}>
              <View style={styles.iconBox}>
                <Ionicons
                  name={item.type === 'subtitle' ? 'text-outline' : item.type === 'background' ? 'cut-outline' : 'color-filter-outline'}
                  size={20}
                  color={colors.accent}
                />
              </View>
              <View style={styles.cardInfo}>
                <Text style={styles.cardFileName} numberOfLines={1}>{item.fileName}</Text>
                <Text style={styles.cardMeta}>{TYPE_LABEL[item.type]} · {formatDate(item.processedAt)}</Text>
              </View>
            </View>
            <View style={styles.cardActions}>
              <TouchableOpacity style={styles.actionBtn} onPress={() => handleShare(item)}>
                <Ionicons name="share-outline" size={15} color={colors.text} />
                <Text style={styles.actionBtnText}>{item.processedUrl ? 'Download' : 'Share SRT'}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteBtn} onPress={() => handleDelete(item.id)}>
                <Ionicons name="trash-outline" size={15} color="#e24b4a" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: 80 },
  header: { padding: 20, paddingBottom: 8 },
  title: { fontSize: 18, fontWeight: '700', color: colors.text, letterSpacing: 0.5 },
  emptyTitle: { fontSize: 14, color: '#333', marginTop: 12 },
  emptySubtitle: { fontSize: 12, color: '#2a2a2c', marginTop: 4 },
  goButton: {
    marginTop: 24, backgroundColor: colors.panel,
    borderRadius: 8, paddingHorizontal: 24, paddingVertical: 10,
    borderWidth: 0.5, borderColor: colors.border,
  },
  goButtonText: { fontSize: 13, color: colors.accent, fontWeight: '600' },
  card: {
    backgroundColor: colors.panel, borderRadius: 12,
    borderWidth: 0.5, borderColor: colors.border, marginBottom: 10, padding: 14,
  },
  cardRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  iconBox: {
    width: 40, height: 40, borderRadius: 10,
    backgroundColor: '#2c2200', alignItems: 'center', justifyContent: 'center', marginRight: 12,
  },
  cardInfo: { flex: 1 },
  cardFileName: { fontSize: 13, fontWeight: '600', color: colors.text },
  cardMeta: { fontSize: 11, color: colors.muted, marginTop: 2 },
  cardActions: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  actionBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: '#1e1e20', borderRadius: 6,
    paddingVertical: 8, paddingHorizontal: 12,
    borderWidth: 0.5, borderColor: colors.border,
  },
  actionBtnText: { fontSize: 12, color: colors.text, fontWeight: '500' },
  deleteBtn: {
    width: 36, height: 36, borderRadius: 6, alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#1e1e20', borderWidth: 0.5, borderColor: '#3a1a1a',
  },
})
