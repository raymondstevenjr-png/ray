import AsyncStorage from '@react-native-async-storage/async-storage'

const CLIPS_KEY = '@bob_studio:clips'
const API_URL_KEY = '@bob_studio:api_url'

export interface ClipEntry {
  id: string
  fileName: string
  processedAt: string
  type: 'subtitle' | 'background' | 'green-screen'
  originalUrl: string
  processedUrl?: string
  srt?: string
  vtt?: string
}

export async function getClips(): Promise<ClipEntry[]> {
  try {
    const raw = await AsyncStorage.getItem(CLIPS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

// Serialise writes so concurrent calls never race on the shared array
let saveQueue = Promise.resolve()

export function saveClip(entry: ClipEntry): void {
  saveQueue = saveQueue
    .then(async () => {
      const existing = await getClips()
      const updated = [entry, ...existing].slice(0, 50)
      await AsyncStorage.setItem(CLIPS_KEY, JSON.stringify(updated))
    })
    .catch(() => {})
}

export async function deleteClip(id: string): Promise<void> {
  try {
    const existing = await getClips()
    await AsyncStorage.setItem(CLIPS_KEY, JSON.stringify(existing.filter(c => c.id !== id)))
  } catch {}
}

export async function getSavedApiUrl(): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(API_URL_KEY)
  } catch {
    return null
  }
}

export async function saveApiUrl(url: string): Promise<void> {
  try {
    await AsyncStorage.setItem(API_URL_KEY, url)
  } catch {}
}
