import { useState, useEffect } from 'react'
import {
  View, Text, ScrollView, TouchableOpacity,
  TextInput, StyleSheet,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { colors } from '../constants/colors'
import { API_BASE } from '../constants/api'
import { getSavedApiUrl, saveApiUrl } from '../constants/storage'

export default function SettingsScreen() {
  const [apiBase, setApiBase] = useState(API_BASE)
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'ok' | 'error'>('idle')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    getSavedApiUrl().then(url => { if (url) setApiBase(url) })
  }, [])

  async function testConnection() {
    setConnectionStatus('idle')
    try {
      const res = await fetch(`${apiBase}/api/health`, { signal: AbortSignal.timeout(5000) })
      const data = await res.json()
      setConnectionStatus(data.status === 'ok' ? 'ok' : 'error')
    } catch {
      setConnectionStatus('error')
    }
  }

  async function handleSaveUrl() {
    await saveApiUrl(apiBase)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.pageTitle}>SETTINGS</Text>

      {/* API card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>API</Text>

        <Text style={styles.label}>Backend URL</Text>
        <TextInput
          style={styles.input}
          value={apiBase}
          onChangeText={setApiBase}
          placeholder="http://localhost:3000"
          placeholderTextColor="#444"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <View style={styles.testRow}>
          <TouchableOpacity style={styles.testButton} onPress={testConnection} activeOpacity={0.8}>
            <Text style={styles.testButtonText}>Test</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.testButton, { borderColor: colors.accent }]} onPress={handleSaveUrl} activeOpacity={0.8}>
            <Text style={[styles.testButtonText, { color: saved ? colors.success : colors.accent }]}>
              {saved ? '✓ Saved' : 'Save URL'}
            </Text>
          </TouchableOpacity>

          {connectionStatus === 'ok' && (
            <View style={styles.statusBadge}>
              <Ionicons name="checkmark-circle" size={14} color={colors.success} />
              <Text style={[styles.statusText, { color: colors.success }]}>Connected</Text>
            </View>
          )}
          {connectionStatus === 'error' && (
            <View style={styles.statusBadge}>
              <Ionicons name="close-circle" size={14} color={colors.error} />
              <Text style={[styles.statusText, { color: colors.error }]}>Failed</Text>
            </View>
          )}
        </View>
      </View>

      {/* About card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>ABOUT</Text>
        <Text style={styles.appName}>Bob Studio</Text>
        <Text style={styles.version}>Version 1.0.0</Text>
        <Text style={styles.tagline}>AI videos for African stories</Text>
        <Text style={styles.muted}>Built for African storytellers</Text>
      </View>

      {/* Credits card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>POWERED BY</Text>
        <Text style={styles.creditLine}>AssemblyAI Universal-3 Pro</Text>
        <Text style={styles.creditDesc}>Transcription, speaker diarization, subtitles</Text>
        <Text style={[styles.creditLine, { marginTop: 10 }]}>VEED AI via fal.ai</Text>
        <Text style={styles.creditDesc}>Background removal, green screen</Text>
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
    paddingBottom: 40,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    letterSpacing: 0.5,
    marginBottom: 20,
  },
  card: {
    backgroundColor: colors.panel,
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: colors.border,
    marginBottom: 12,
    padding: 16,
    overflow: 'hidden',
  },
  cardTitle: {
    fontSize: 10,
    color: colors.muted,
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontWeight: '500',
    marginBottom: 12,
  },
  label: {
    fontSize: 12,
    color: colors.muted,
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#1a1a1c',
    borderRadius: 6,
    borderWidth: 0.5,
    borderColor: '#2a2a2c',
    padding: 10,
    fontSize: 13,
    color: colors.text,
    marginBottom: 10,
    fontFamily: 'monospace',
  },
  testRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  testButton: {
    backgroundColor: '#1e1e20',
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: colors.border,
  },
  testButtonText: {
    fontSize: 12,
    color: colors.text,
    fontWeight: '500',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  appName: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.accent,
    marginBottom: 4,
  },
  version: {
    fontSize: 13,
    color: colors.muted,
    marginBottom: 4,
  },
  tagline: {
    fontSize: 13,
    color: colors.text,
    marginBottom: 4,
  },
  muted: {
    fontSize: 12,
    color: colors.muted,
  },
  creditLine: {
    fontSize: 13,
    color: colors.text,
    marginBottom: 4,
  },
  creditDesc: {
    fontSize: 12,
    color: colors.muted,
  },
})
