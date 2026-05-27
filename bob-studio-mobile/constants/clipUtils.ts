import type { ClipEntry } from './storage'

export const TYPE_LABEL: Record<ClipEntry['type'], string> = {
  subtitle: 'Subtitles',
  background: 'BG Removed',
  'green-screen': 'Green Screen',
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, {
    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
  })
}
