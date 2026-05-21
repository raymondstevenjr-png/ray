'use client'

import React, { createContext, useContext, useReducer } from 'react'
import type { EditorState, ActiveTab, SubtitleStatus, Clip } from '../types/editor'

const initialClips: Clip[] = [
  {
    id: 'v1', track: 'video', label: 'Folktale_ep01.mp4',
    start: 0, width: 260,
    color: '#1e3a5f', textColor: '#7ab8f5', borderColor: '#2a5580'
  },
  {
    id: 'v2', track: 'video', label: 'B-roll_02.mp4',
    start: 268, width: 120,
    color: '#1e3a5f', textColor: '#7ab8f5', borderColor: '#2a5580'
  },
  {
    id: 'a1', track: 'audio', label: 'background_drums.mp3',
    start: 0, width: 380,
    color: '#1a3a2a', textColor: '#5ec488', borderColor: '#2a5540'
  },
  {
    id: 't1', track: 'text', label: 'Intro title',
    start: 28, width: 120,
    color: '#3a2a1a', textColor: '#e8a84a', borderColor: '#5a3a0a'
  },
  {
    id: 't2', track: 'text', label: 'The tortoise carried...',
    start: 165, width: 180,
    color: '#3a2a1a', textColor: '#e8a84a', borderColor: '#5a3a0a'
  },
]

const initialState: EditorState = {
  originalVideoUrl: null,
  processedVideoUrl: null,
  uploadedFileName: '',
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 80,
  speed: 1,
  subtitleStatus: 'idle',
  bgStatus: 'idle',
  greenStatus: 'idle',
  subtitlePreset: 'glass',
  language: 'en-US',
  activeTab: 'edit',
  activeTool: '',
  selectedClipId: null,
  zoomLevel: 1,
  clips: initialClips,
  generatedClips: [],
  errorMessage: null,
  spillSuppressionStrength: 0.8,
  subjectIsPerson: true,
  outputCodec: 'h264',
  numClips: 0,
}

type Action =
  | { type: 'SET_ORIGINAL_URL'; payload: string }
  | { type: 'SET_PROCESSED_URL'; payload: string | null }
  | { type: 'SET_FILE_NAME'; payload: string }
  | { type: 'SET_PLAYING'; payload: boolean }
  | { type: 'SET_CURRENT_TIME'; payload: number }
  | { type: 'SET_DURATION'; payload: number }
  | { type: 'SET_VOLUME'; payload: number }
  | { type: 'SET_SPEED'; payload: number }
  | { type: 'SET_SUBTITLE_STATUS'; payload: SubtitleStatus }
  | { type: 'SET_BG_STATUS'; payload: SubtitleStatus }
  | { type: 'SET_GREEN_STATUS'; payload: SubtitleStatus }
  | { type: 'SET_SUBTITLE_PRESET'; payload: string }
  | { type: 'SET_LANGUAGE'; payload: string }
  | { type: 'SET_ACTIVE_TAB'; payload: ActiveTab }
  | { type: 'SET_ACTIVE_TOOL'; payload: string }
  | { type: 'SET_SELECTED_CLIP'; payload: string | null }
  | { type: 'SET_ZOOM'; payload: number }
  | { type: 'SET_CLIPS'; payload: Clip[] }
  | { type: 'UPDATE_CLIP'; payload: Clip }
  | { type: 'DELETE_CLIP'; payload: string }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_SPILL_STRENGTH'; payload: number }
  | { type: 'SET_SUBJECT_IS_PERSON'; payload: boolean }
  | { type: 'SET_OUTPUT_CODEC'; payload: 'vp9' | 'h264' }

function reducer(state: EditorState, action: Action): EditorState {
  switch (action.type) {
    case 'SET_ORIGINAL_URL': return { ...state, originalVideoUrl: action.payload }
    case 'SET_PROCESSED_URL': return { ...state, processedVideoUrl: action.payload }
    case 'SET_FILE_NAME': return { ...state, uploadedFileName: action.payload }
    case 'SET_PLAYING': return { ...state, isPlaying: action.payload }
    case 'SET_CURRENT_TIME': return { ...state, currentTime: action.payload }
    case 'SET_DURATION': return { ...state, duration: action.payload }
    case 'SET_VOLUME': return { ...state, volume: action.payload }
    case 'SET_SPEED': return { ...state, speed: action.payload }
    case 'SET_SUBTITLE_STATUS': return { ...state, subtitleStatus: action.payload }
    case 'SET_BG_STATUS': return { ...state, bgStatus: action.payload }
    case 'SET_GREEN_STATUS': return { ...state, greenStatus: action.payload }
    case 'SET_SUBTITLE_PRESET': return { ...state, subtitlePreset: action.payload }
    case 'SET_LANGUAGE': return { ...state, language: action.payload }
    case 'SET_ACTIVE_TAB': return { ...state, activeTab: action.payload }
    case 'SET_ACTIVE_TOOL': return { ...state, activeTool: action.payload }
    case 'SET_SELECTED_CLIP': return { ...state, selectedClipId: action.payload }
    case 'SET_ZOOM': return { ...state, zoomLevel: action.payload }
    case 'SET_CLIPS': return { ...state, clips: action.payload }
    case 'UPDATE_CLIP':
      return { ...state, clips: state.clips.map(c => c.id === action.payload.id ? action.payload : c) }
    case 'DELETE_CLIP':
      return { ...state, clips: state.clips.filter(c => c.id !== action.payload), selectedClipId: null }
    case 'SET_ERROR': return { ...state, errorMessage: action.payload }
    case 'SET_SPILL_STRENGTH': return { ...state, spillSuppressionStrength: action.payload }
    case 'SET_SUBJECT_IS_PERSON': return { ...state, subjectIsPerson: action.payload }
    case 'SET_OUTPUT_CODEC': return { ...state, outputCodec: action.payload }
    default: return state
  }
}

interface EditorContextValue {
  state: EditorState
  dispatch: React.Dispatch<Action>
}

const EditorContext = createContext<EditorContextValue | null>(null)

export function EditorProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <EditorContext.Provider value={{ state, dispatch }}>
      {children}
    </EditorContext.Provider>
  )
}

export function useEditor() {
  const ctx = useContext(EditorContext)
  if (!ctx) throw new Error('useEditor must be used within EditorProvider')
  return ctx
}
