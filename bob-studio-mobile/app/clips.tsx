import {
  View, Text, TouchableOpacity, StyleSheet,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { colors } from '../constants/colors'

export default function ClipsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>MY CLIPS</Text>
      </View>

      <View style={styles.emptyState}>
        <Ionicons name="grid-outline" size={64} color="#1e1e20" />
        <Text style={styles.emptyTitle}>No clips yet</Text>
        <Text style={styles.emptySubtitle}>Process a video to see clips here</Text>

        <TouchableOpacity
          style={styles.goButton}
          onPress={() => router.push('/editor')}
          activeOpacity={0.8}
        >
          <Text style={styles.goButtonText}>Go to Editor</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  header: {
    padding: 20,
    paddingBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    letterSpacing: 0.5,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 80,
  },
  emptyTitle: {
    fontSize: 14,
    color: '#333',
    marginTop: 12,
  },
  emptySubtitle: {
    fontSize: 12,
    color: '#2a2a2c',
    marginTop: 4,
  },
  goButton: {
    marginTop: 24,
    backgroundColor: colors.panel,
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderWidth: 0.5,
    borderColor: colors.border,
  },
  goButtonText: {
    fontSize: 13,
    color: colors.accent,
    fontWeight: '600',
  },
})
