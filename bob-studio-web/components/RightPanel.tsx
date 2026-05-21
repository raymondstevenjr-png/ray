'use client'

import { useEditor } from '../context/EditorContext'
import { IconSparkles, IconLayersDifference, IconLayersLinked } from '@tabler/icons-react'

const sectionTitle: React.CSSProperties = {
  fontSize: 10,
  color: '#555',
  textTransform: 'uppercase',
  letterSpacing: 1,
  fontWeight: 500,
  padding: '12px 14px 8px',
}

function Spinner() {
  return (
    <div style={{
      width: 12, height: 12, borderRadius: '50%',
      border: '1.5px solid #555',
      borderTop: '1.5px solid #f5a623',
      animation: 'spin 1s linear infinite',
      flexShrink: 0,
    }} />
  )
}

export default function RightPanel() {
  const { state, dispatch } = useEditor()
  const {
    originalVideoUrl, subtitleStatus, bgStatus, greenStatus,
    language, volume, speed,
    spillSuppressionStrength, subjectIsPerson, outputCodec, errorMessage
  } = state

  async function handleSubtitles() {
    if (!originalVideoUrl) return
    dispatch({ type: 'SET_SUBTITLE_STATUS', payload: 'processing' })
    dispatch({ type: 'SET_ERROR', payload: null })
    try {
      const res = await fetch('/api/subtitles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoUrl: originalVideoUrl, language }),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      dispatch({
        type: 'SET_TRANSCRIPT',
        payload: {
          text: data.subtitles ?? '',
          srt: data.srt ?? '',
          vtt: data.vtt ?? '',
          detectedLanguage: data.detectedLanguage ?? '',
        },
      })
      dispatch({ type: 'SET_SUBTITLE_STATUS', payload: 'done' })
    } catch (err) {
      dispatch({ type: 'SET_SUBTITLE_STATUS', payload: 'error' })
      dispatch({ type: 'SET_ERROR', payload: (err as Error).message })
    }
  }

  async function handleRemoveBg() {
    if (!originalVideoUrl) return
    dispatch({ type: 'SET_BG_STATUS', payload: 'processing' })
    try {
      const res = await fetch('/api/remove-background', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoUrl: originalVideoUrl, subjectIsPerson, outputCodec }),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      dispatch({ type: 'SET_PROCESSED_URL', payload: data.primaryUrl })
      dispatch({ type: 'SET_BG_STATUS', payload: 'done' })
    } catch (err) {
      dispatch({ type: 'SET_BG_STATUS', payload: 'error' })
      dispatch({ type: 'SET_ERROR', payload: (err as Error).message })
    }
  }

  async function handleGreenScreen() {
    if (!originalVideoUrl) return
    dispatch({ type: 'SET_GREEN_STATUS', payload: 'processing' })
    try {
      const res = await fetch('/api/green-screen', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoUrl: originalVideoUrl, spillSuppressionStrength, outputCodec }),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      dispatch({ type: 'SET_PROCESSED_URL', payload: data.primaryUrl })
      dispatch({ type: 'SET_GREEN_STATUS', payload: 'done' })
    } catch (err) {
      dispatch({ type: 'SET_GREEN_STATUS', payload: 'error' })
      dispatch({ type: 'SET_ERROR', payload: (err as Error).message })
    }
  }

  function getSubtitleLabel() {
    if (subtitleStatus === 'uploading') return 'Uploading...'
    if (subtitleStatus === 'processing') return 'Processing...'
    if (subtitleStatus === 'done') return '✓ Done — Re-run?'
    if (subtitleStatus === 'error') return '✗ Failed. Retry?'
    return '✦ Auto-subtitle'
  }

  function getBgLabel() {
    if (bgStatus === 'processing') return 'Removing BG...'
    if (bgStatus === 'done') return '✓ BG Removed'
    return '✦ Remove Background'
  }

  function getGreenLabel() {
    if (greenStatus === 'processing') return 'Processing...'
    if (greenStatus === 'done') return '✓ Green Screen Done'
    return '✦ Green Screen'
  }

  const aiButtonBase: React.CSSProperties = {
    width: '100%',
    textAlign: 'left',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '8px 10px',
    borderRadius: 6,
    fontSize: 11.5,
    fontWeight: 500,
    cursor: 'pointer',
    fontFamily: 'DM Sans, sans-serif',
    marginBottom: 6,
    transition: 'opacity 0.15s',
    background: 'linear-gradient(135deg, #2c2200, #1e1e20)',
    border: '0.5px solid #5a3a0a',
    color: '#f5a623',
  }

  const aiButtonDisabled: React.CSSProperties = {
    ...aiButtonBase,
    opacity: 0.4,
    cursor: 'not-allowed',
  }

  const subtitleDisabled = !originalVideoUrl || subtitleStatus === 'uploading' || subtitleStatus === 'processing'
  const bgDisabled = !originalVideoUrl || bgStatus === 'processing'
  const greenDisabled = !originalVideoUrl || greenStatus === 'processing'

  return (
    <div style={{
      width: 220,
      background: '#141415',
      borderLeft: '0.5px solid #242426',
      overflowY: 'auto',
      flexShrink: 0,
    }}>
      <div style={sectionTitle}>AI Actions</div>
      <div style={{ padding: '0 10px' }}>
        {/* Auto-subtitle */}
        <button
          onClick={handleSubtitles}
          disabled={subtitleDisabled}
          style={subtitleDisabled ? aiButtonDisabled : aiButtonBase}
        >
          {(subtitleStatus === 'uploading' || subtitleStatus === 'processing') ? <Spinner /> : <IconSparkles size={14} />}
          {getSubtitleLabel()}
        </button>

        {/* Remove BG */}
        <button
          onClick={handleRemoveBg}
          disabled={bgDisabled}
          style={bgDisabled ? aiButtonDisabled : aiButtonBase}
        >
          {bgStatus === 'processing' ? <Spinner /> : <IconLayersDifference size={14} />}
          {getBgLabel()}
        </button>

        {/* Green Screen */}
        <button
          onClick={handleGreenScreen}
          disabled={greenDisabled}
          style={greenDisabled ? aiButtonDisabled : aiButtonBase}
        >
          {greenStatus === 'processing' ? <Spinner /> : <IconLayersLinked size={14} />}
          {getGreenLabel()}
        </button>

        {/* Spill suppression */}
        <div style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: 11, color: '#666' }}>Spill strength</span>
            <input
              type="range"
              min={0} max={1} step={0.1}
              value={spillSuppressionStrength}
              onChange={e => dispatch({ type: 'SET_SPILL_STRENGTH', payload: Number(e.target.value) })}
              style={{ accentColor: '#f5a623', width: 100 }}
            />
            <span style={{ fontSize: 11, color: '#aaa' }}>{spillSuppressionStrength.toFixed(1)}</span>
          </div>
          <p style={{ fontSize: 9, color: '#444', margin: 0 }}>
            ↑ if green spots remain · ↓ if colors shift
          </p>
        </div>

        {/* Subject toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <span style={{ fontSize: 11, color: '#666' }}>Subject is a person</span>
          <input
            type="checkbox"
            checked={subjectIsPerson}
            onChange={e => dispatch({ type: 'SET_SUBJECT_IS_PERSON', payload: e.target.checked })}
            style={{ accentColor: '#f5a623' }}
          />
        </div>
      </div>

      <div style={sectionTitle}>Video</div>
      <div style={{ padding: '0 14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <span style={{ fontSize: 11, color: '#666', flex: 1 }}>Volume</span>
          <input
            type="range"
            min={0} max={100}
            value={volume}
            onChange={e => dispatch({ type: 'SET_VOLUME', payload: Number(e.target.value) })}
            style={{ accentColor: '#f5a623', width: 80 }}
          />
          <span style={{ fontSize: 11, color: '#aaa', width: 30 }}>{volume}%</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <span style={{ fontSize: 11, color: '#666', flex: 1 }}>Speed</span>
          <select
            value={speed}
            onChange={e => dispatch({ type: 'SET_SPEED', payload: Number(e.target.value) })}
            style={{
              background: '#1a1a1c',
              border: '0.5px solid #2a2a2c',
              color: 'white',
              fontSize: 11,
              borderRadius: 4,
              padding: '2px 4px',
            }}
          >
            <option value={0.5}>0.5×</option>
            <option value={1}>1×</option>
            <option value={1.5}>1.5×</option>
            <option value={2}>2×</option>
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <span style={{ fontSize: 11, color: '#666', flex: 1 }}>Aspect</span>
          <span style={{ fontSize: 11, color: '#aaa' }}>16:9</span>
        </div>
      </div>

      <div style={sectionTitle}>Brand Kit</div>
      <div style={{ padding: '0 14px 14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <div style={{ width: 20, height: 20, borderRadius: 4, background: '#f5a623' }} />
          <span style={{ fontSize: 12, color: '#f5a623', fontWeight: 600 }}>Bob Studio</span>
        </div>
        <p style={{ fontSize: 11, color: '#555', margin: '0 0 4px' }}>Syne + DM Sans</p>
        <p style={{ fontSize: 11, color: '#5ec488', margin: 0 }}>Applied to all videos</p>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
