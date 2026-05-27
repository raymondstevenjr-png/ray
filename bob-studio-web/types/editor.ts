export interface Clip {
  id: string
  track: 'video' | 'audio' | 'text'
  label: string
  start: number
  width: number
  color: string
  textColor: string
  borderColor: string
}

export interface GeneratedClip {
  url: string
  contentType: string
  index: number
}

export type SubtitleStatus =
  'idle' | 'uploading' | 'processing' | 'done' | 'error'

export type ActiveTab =
  'edit' | 'subtitles' | 'clips' | 'background' | 'greenscreen' | 'brand' | 'export'

export interface EditorState {
  originalVideoUrl: string | null
  processedVideoUrl: string | null
  uploadedFileName: string
  uploadedFile: File | null
  isPlaying: boolean
  currentTime: number
  duration: number
  volume: number
  speed: number
  subtitleStatus: SubtitleStatus
  bgStatus: SubtitleStatus
  greenStatus: SubtitleStatus
  transcriptText: string | null
  transcriptSrt: string | null
  transcriptVtt: string | null
  detectedLanguage: string | null
  language: string
  activeTab: ActiveTab
  activeTool: string
  selectedClipId: string | null
  zoomLevel: number
  clips: Clip[]
  generatedClips: GeneratedClip[]
  errorMessage: string | null
  spillSuppressionStrength: number
  subjectIsPerson: boolean
  outputCodec: 'vp9' | 'h264'
  numClips: number
}
