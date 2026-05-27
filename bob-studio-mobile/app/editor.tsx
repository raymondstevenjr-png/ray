import { useState } from 'react'
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, Alert, ActivityIndicator,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import * as Sharing from 'expo-sharing'
import { useLocalSearchParams } from 'expo-router'
import { colors } from '../constants/colors'
import { useApiBase } from '../context/ApiContext'
import { saveClip } from '../constants/storage'

type ProcessStatus = 'idle' | 'uploading' | 'processing' | 'done' | 'error'
type BgMode = 'auto' | 'green'

const PRESET_CHIPS = ['glass', 'whisper', 'simple', 'hustle', 'rizz', 'vegas', 'beans', 'corpo', 'plain']

export default function EditorScreen() {
  const { apiBase } = useApiBase()
  const params = useLocalSearchParams<{ videoUri?: string; fileName?: string }>()

  const [localVideoUri, setLocalVideoUri] = useState<string | null>(params.videoUri ?? null)
  const [uploadedFalUrl, setUploadedFalUrl] = useState<string | null>(null)
  const [processedVideoUrl, setProcessedVideoUrl] = useState<string | null>(null)
  const [subtitleSrt, setSubtitleSrt] = useState<string | null>(null)
  const [subtitleVtt, setSubtitleVtt] = useState<string | null>(null)
  const [subtitleStatus, setSubtitleStatus] = useState<ProcessStatus>('idle')
  const [bgStatus, setBgStatus] = useState<ProcessStatus>('idle')
  const [preset, setPreset] = useState('glass')
  const [language, setLanguage] = useState('en-US')
  const [bgMode, setBgMode] = useState<BgMode>('auto')
  const [spillStrength, setSpillStrength] = useState(0.8)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const fileName = params.fileName ?? 'video.mp4'

  async function uploadVideo() {
    if (!localVideoUri) return
    setSubtitleStatus('uploading')
    setErrorMessage(null)
    try {
      const formData = new FormData()
      formData.append('file', {
        uri: localVideoUri,
        type: 'video/mp4',
        name: fileName,
      } as any)

      const response = await fetch(`${apiBase}/api/assemblyai-upload`, {
        method: 'POST',
        body: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      const data = await response.json()
      if (data.error) throw new Error(data.error)
      setUploadedFalUrl(data.url)
      setSubtitleStatus('idle')
    } catch (err) {
      setSubtitleStatus('error')
      setErrorMessage((err as Error).message)
    }
  }

  async function generateSubtitles() {
    if (!uploadedFalUrl) return
    setSubtitleStatus('processing')
    setErrorMessage(null)
    try {
      const response = await fetch(`${apiBase}/api/subtitles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoUrl: uploadedFalUrl, preset, language }),
      })
      const data = await response.json()
      if (data.error) throw new Error(data.error)
      setSubtitleSrt(data.srt ?? null)
      setSubtitleVtt(data.vtt ?? null)
      setSubtitleStatus('done')
      saveClip({
        id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
        fileName,
        processedAt: new Date().toISOString(),
        type: 'subtitle',
        originalUrl: uploadedFalUrl,
        srt: data.srt ?? undefined,
        vtt: data.vtt ?? undefined,
      })
    } catch (err) {
      setSubtitleStatus('error')
      setErrorMessage((err as Error).message)
    }
  }

  async function processBackground() {
    if (!uploadedFalUrl) return
    setBgStatus('processing')
    setErrorMessage(null)
    try {
      const endpoint = bgMode === 'auto' ? '/api/remove-background' : '/api/green-screen'
      const body = bgMode === 'auto'
        ? { videoUrl: uploadedFalUrl, subjectIsPerson: true, outputCodec: 'h264' }
        : { videoUrl: uploadedFalUrl, spillSuppressionStrength: spillStrength, outputCodec: 'vp9' }

      const response = await fetch(`${apiBase}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const data = await response.json()
      if (data.error) throw new Error(data.error)
      setProcessedVideoUrl(data.primaryUrl)
      setBgStatus('done')
      saveClip({
        id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
        fileName,
        processedAt: new Date().toISOString(),
        type: bgMode === 'auto' ? 'background' : 'green-screen',
        originalUrl: uploadedFalUrl,
        processedUrl: data.primaryUrl,
      })
    } catch (err) {
      setBgStatus('error')
      setErrorMessage((err as Error).message)
    }
  }

  async function downloadSubtitles(format: 'srt' | 'vtt') {
    const content = format === 'srt' ? subtitleSrt : subtitleVtt
    if (!content) return
    try {
      const localUri = FileSystem.documentDirectory + fileName.replace(/\.[^.]+$/, '') + '.' + format
      await FileSystem.writeAsStringAsync(localUri, content, { encoding: FileSystem.EncodingType.UTF8 })
      await Sharing.shareAsync(localUri)
    } catch {
      Alert.alert('Error', 'Could not save subtitle file.')
    }
  }

  async function downloadAndShare() {
    if (!processedVideoUrl) return
    try {
      const localUri = FileSystem.documentDirectory + fileName
      await FileSystem.downloadAsync(processedVideoUrl, localUri)
      await Sharing.shareAsync(localUri)
    } catch (err) {
      Alert.alert('Error', 'Could not download the video.')
    }
  }

  async function pickNewVideo() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'videos',
      allowsEditing: false,
      quality: 1,
    })
    if (!result.canceled && result.assets?.[0]) {
      setLocalVideoUri(result.assets[0].uri)
      setUploadedFalUrl(null)
      setProcessedVideoUrl(null)
      setSubtitleSrt(null)
      setSubtitleVtt(null)
      setSubtitleStatus('idle')
      setBgStatus('idle')
    }
  }

  const cardStyle = StyleSheet.create({
    card: {
      backgroundColor: colors.panel,
      borderRadius: 12,
      padding: 14,
      borderWidth: 0.5,
      borderColor: colors.border,
      marginBottom: 12,
    },
  })

  const isUploading = subtitleStatus === 'uploading'
  const isProcessingSubtitles = subtitleStatus === 'processing'
  const isProcessingBg = bgStatus === 'processing'

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Video preview area */}
      <TouchableOpacity
        style={styles.videoPlaceholder}
        onPress={pickNewVideo}
        activeOpacity={0.8}
      >
        {localVideoUri ? (
          <View style={styles.videoLoaded}>
            <Ionicons name="checkmark-circle-outline" size={32} color={colors.success} />
            <Text style={styles.videoLoadedText}>Video loaded</Text>
            <Text style={styles.videoFileName}>{fileName}</Text>
            <Text style={styles.tapToChange}>Tap to change</Text>
          </View>
        ) : (
          <View style={styles.videoEmpty}>
            <Ionicons name="film-outline" size={40} color="#333" />
            <Text style={styles.uploadTitle}>No video selected</Text>
            <Text style={styles.uploadSubtitle}>Tap to choose a video</Text>
          </View>
        )}

        {/* Status overlay */}
        {(isUploading || isProcessingSubtitles || isProcessingBg) && (
          <View style={styles.statusOverlay}>
            <ActivityIndicator color={colors.accent} size="large" />
            <Text style={styles.statusText}>
              {isUploading && 'Uploading to fal storage...'}
              {isProcessingSubtitles && 'Adding subtitles...'}
              {isProcessingBg && 'Processing background...'}
            </Text>
          </View>
        )}
      </TouchableOpacity>

      {errorMessage && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      )}

      {/* Upload card */}
      <View style={cardStyle.card}>
        <Text style={styles.cardTitle}>VIDEO</Text>
        {!uploadedFalUrl ? (
          <TouchableOpacity
            style={[styles.amberButton, (!localVideoUri || isUploading) && styles.buttonDisabled]}
            onPress={uploadVideo}
            disabled={!localVideoUri || isUploading}
          >
            {isUploading && <ActivityIndicator color="#0e0e0f" size="small" style={{ marginRight: 8 }} />}
            <Text style={styles.amberButtonText}>
              {isUploading ? 'Uploading...' : 'Upload to AI'}
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.uploadedRow}>
            <Ionicons name="checkmark-circle" size={18} color={colors.success} />
            <Text style={styles.uploadedText}>Uploaded to fal storage</Text>
          </View>
        )}
        {uploadedFalUrl && (
          <Text style={styles.fileNameText} numberOfLines={1}>{fileName}</Text>
        )}
      </View>

      {/* Subtitle card */}
      <View style={cardStyle.card}>
        <Text style={styles.cardTitle}>AUTO-SUBTITLE</Text>

        {/* Preset chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsScroll}>
          {PRESET_CHIPS.map(p => (
            <TouchableOpacity
              key={p}
              onPress={() => setPreset(p)}
              style={[styles.chip, preset === p && styles.chipActive]}
            >
              <Text style={[styles.chipText, preset === p && styles.chipTextActive]}>{p}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TouchableOpacity
          style={[styles.amberButton, (!uploadedFalUrl || isProcessingSubtitles) && styles.buttonDisabled]}
          onPress={generateSubtitles}
          disabled={!uploadedFalUrl || isProcessingSubtitles}
        >
          {isProcessingSubtitles && <ActivityIndicator color="#0e0e0f" size="small" style={{ marginRight: 8 }} />}
          <Text style={styles.amberButtonText}>
            {isProcessingSubtitles ? 'Generating...' : subtitleStatus === 'done' ? 'Re-generate' : 'Generate Subtitles'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Background card */}
      <View style={cardStyle.card}>
        <Text style={styles.cardTitle}>BACKGROUND REMOVAL</Text>

        <View style={styles.modeRow}>
          <TouchableOpacity
            style={[styles.modeBtn, bgMode === 'auto' && styles.modeBtnActive]}
            onPress={() => setBgMode('auto')}
          >
            <Text style={[styles.modeBtnText, bgMode === 'auto' && styles.modeBtnTextActive]}>Auto Remove</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.modeBtn, bgMode === 'green' && styles.modeBtnActive]}
            onPress={() => setBgMode('green')}
          >
            <Text style={[styles.modeBtnText, bgMode === 'green' && styles.modeBtnTextActive]}>Green Screen</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.amberButton, (!uploadedFalUrl || isProcessingBg) && styles.buttonDisabled]}
          onPress={processBackground}
          disabled={!uploadedFalUrl || isProcessingBg}
        >
          {isProcessingBg && <ActivityIndicator color="#0e0e0f" size="small" style={{ marginRight: 8 }} />}
          <Text style={styles.amberButtonText}>
            {isProcessingBg ? 'Processing...' : bgStatus === 'done' ? 'Re-process' : 'Process Background'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Subtitle results card */}
      {subtitleStatus === 'done' && (subtitleSrt || subtitleVtt) && (
        <View style={[cardStyle.card, { borderColor: '#2a5540' }]}>
          <Text style={[styles.cardTitle, { color: colors.success }]}>SUBTITLES READY</Text>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            {subtitleSrt && (
              <TouchableOpacity style={styles.downloadButton} onPress={() => downloadSubtitles('srt')}>
                <Ionicons name="download-outline" size={16} color={colors.success} />
                <Text style={styles.downloadText}>Download SRT</Text>
              </TouchableOpacity>
            )}
            {subtitleVtt && (
              <TouchableOpacity style={styles.downloadButton} onPress={() => downloadSubtitles('vtt')}>
                <Ionicons name="download-outline" size={16} color={colors.success} />
                <Text style={styles.downloadText}>Download VTT</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}

      {/* Results card */}
      {processedVideoUrl && (
        <View style={[cardStyle.card, { borderColor: '#2a5540' }]}>
          <Text style={[styles.cardTitle, { color: colors.success }]}>RESULTS</Text>
          <Text style={styles.resultUrl} numberOfLines={1}>{processedVideoUrl}</Text>

          <TouchableOpacity style={styles.downloadButton} onPress={downloadAndShare}>
            <Ionicons name="download-outline" size={16} color={colors.success} />
            <Text style={styles.downloadText}>Download & Share</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  videoPlaceholder: {
    aspectRatio: 16 / 9,
    backgroundColor: '#111112',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: '#2a2a2c',
    position: 'relative',
  },
  videoEmpty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoLoaded: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  videoLoadedText: {
    fontSize: 14,
    color: colors.success,
    fontWeight: '600',
    marginTop: 8,
  },
  videoFileName: {
    fontSize: 12,
    color: colors.muted,
  },
  tapToChange: {
    fontSize: 11,
    color: '#333',
    marginTop: 4,
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
  statusOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  statusText: {
    fontSize: 13,
    color: colors.text,
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  errorBox: {
    backgroundColor: '#2a0a0a',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    borderWidth: 0.5,
    borderColor: '#5a1a1a',
  },
  errorText: {
    fontSize: 12,
    color: colors.error,
  },
  cardTitle: {
    fontSize: 10,
    color: colors.muted,
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontWeight: '500',
    marginBottom: 10,
  },
  amberButton: {
    backgroundColor: colors.accent,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 8,
  },
  amberButtonText: {
    color: '#0e0e0f',
    fontWeight: '600',
    fontSize: 14,
  },
  buttonDisabled: {
    opacity: 0.4,
  },
  uploadedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 4,
  },
  uploadedText: {
    fontSize: 13,
    color: colors.success,
  },
  fileNameText: {
    fontSize: 11,
    color: colors.muted,
    marginTop: 4,
  },
  chipsScroll: {
    marginBottom: 10,
  },
  chip: {
    backgroundColor: '#1a1a1c',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 6,
    borderWidth: 0.5,
    borderColor: '#2a2a2c',
  },
  chipActive: {
    backgroundColor: '#2c2200',
    borderColor: '#5a3a0a',
  },
  chipText: {
    fontSize: 12,
    color: '#666',
  },
  chipTextActive: {
    color: colors.accent,
    fontWeight: '600',
  },
  modeRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  modeBtn: {
    flex: 1,
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#1a1a1c',
    borderWidth: 0.5,
    borderColor: '#2a2a2c',
    alignItems: 'center',
  },
  modeBtnActive: {
    borderColor: colors.accent,
    backgroundColor: '#1e1e20',
  },
  modeBtnText: {
    fontSize: 12,
    color: '#666',
  },
  modeBtnTextActive: {
    color: colors.text,
  },
  resultUrl: {
    fontSize: 10,
    color: colors.muted,
    marginBottom: 10,
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#1a3a2a',
    borderRadius: 8,
    padding: 12,
    borderWidth: 0.5,
    borderColor: '#2a5540',
    justifyContent: 'center',
  },
  downloadText: {
    fontSize: 13,
    color: colors.success,
    fontWeight: '600',
  },
})
