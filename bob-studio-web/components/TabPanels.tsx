'use client'

import { useState } from 'react'
import { useEditor } from '../context/EditorContext'

const DYNAMIC_PRESETS = ['glass', 'whisper', 'glide2', 'fusion', 'glide', 'terminal', 'handwritten']
const BASIC_PRESETS = [
  'simple', 'plain', 'beans', 'corpo', 'boo', 'shadeplay', 'casper', 'capri',
  'lowkey', 'vinta', 'diego', 'ali', 'slay', 'kitty', 'hustle', 'karl', 'sprout',
  'flex', 'mint', 'rizz', 'vegas'
]

const sectionTitle: React.CSSProperties = {
  fontSize: 10,
  color: '#555',
  textTransform: 'uppercase',
  letterSpacing: 1,
  fontWeight: 500,
  marginBottom: 12,
}

function Spinner() {
  return (
    <div style={{
      width: 16, height: 16, borderRadius: '50%',
      border: '2px solid #333',
      borderTop: '2px solid #f5a623',
      animation: 'spin 1s linear infinite',
      display: 'inline-block',
    }} />
  )
}

export function SubtitlesPanel() {
  const { state, dispatch } = useEditor()
  const {
    originalVideoUrl, processedVideoUrl, subtitleStatus,
    subtitlePreset, language,
  } = state

  async function generate() {
    if (!originalVideoUrl) return
    dispatch({ type: 'SET_SUBTITLE_STATUS', payload: 'processing' })
    try {
      const res = await fetch('/api/subtitles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoUrl: originalVideoUrl, preset: subtitlePreset, language }),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      dispatch({ type: 'SET_PROCESSED_URL', payload: data.videoUrl })
      dispatch({ type: 'SET_SUBTITLE_STATUS', payload: 'done' })
    } catch (err) {
      dispatch({ type: 'SET_SUBTITLE_STATUS', payload: 'error' })
      dispatch({ type: 'SET_ERROR', payload: (err as Error).message })
    }
  }

  function download() {
    const url = processedVideoUrl
    if (!url) return
    const a = document.createElement('a')
    a.href = url
    a.download = 'subtitled-video.mp4'
    a.click()
  }

  const allPresets = [
    ...DYNAMIC_PRESETS.map(p => ({ id: p, dynamic: true })),
    ...BASIC_PRESETS.map(p => ({ id: p, dynamic: false })),
  ]

  const selectStyle: React.CSSProperties = {
    background: '#1a1a1c',
    border: '0.5px solid #2a2a2c',
    color: 'white',
    fontSize: 12,
    borderRadius: 4,
    padding: '6px 8px',
    width: '100%',
    fontFamily: 'DM Sans, sans-serif',
    marginBottom: 12,
  }

  return (
    <div style={{ padding: 20, maxWidth: 700, margin: '0 auto', overflowY: 'auto', maxHeight: '100%' }}>
      <p style={sectionTitle}>Subtitle Style</p>

      {/* Preset grid */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
        {allPresets.map(p => (
          <div
            key={p.id}
            onClick={() => dispatch({ type: 'SET_SUBTITLE_PRESET', payload: p.id })}
            style={{
              width: 90,
              padding: '8px',
              borderRadius: 6,
              background: subtitlePreset === p.id ? '#1e1e20' : '#141415',
              border: `0.5px solid ${subtitlePreset === p.id ? '#f5a623' : '#242426'}`,
              cursor: 'pointer',
            }}
          >
            <div style={{ fontSize: 11, fontWeight: 500, color: '#e8e6e0', marginBottom: 2 }}>{p.id}</div>
            <div style={{ fontSize: 9, color: p.dynamic ? '#f5a623' : '#555' }}>
              {p.dynamic ? 'Dynamic' : 'Basic'}
            </div>
            <div style={{ fontSize: 9, color: '#444' }}>{p.dynamic ? '2x' : '1x'}</div>
          </div>
        ))}
      </div>

      {/* Language */}
      <select
        value={language}
        onChange={e => dispatch({ type: 'SET_LANGUAGE', payload: e.target.value })}
        style={selectStyle}
      >
        <optgroup label="Global">
          <option value="en-US">English US</option>
          <option value="en-GB">English UK</option>
          <option value="fr-FR">French</option>
          <option value="es-ES">Spanish</option>
          <option value="de-DE">German</option>
          <option value="pt-BR">Portuguese</option>
          <option value="ar-SA">Arabic</option>
          <option value="zh">Chinese</option>
          <option value="ja-JP">Japanese</option>
          <option value="ko-KR">Korean</option>
        </optgroup>
        <optgroup label="African Languages">
          <option value="sw-KE">Swahili</option>
          <option value="yo-NG">Yoruba</option>
          <option value="ha-NG">Hausa</option>
          <option value="so-SO">Somali</option>
          <option value="am-ET">Amharic</option>
          <option value="ig-NG">Igbo</option>
          <option value="rw-RW">Kinyarwanda</option>
          <option value="zu-ZA">Zulu</option>
        </optgroup>
      </select>

      <button
        onClick={subtitleStatus === 'done' ? download : generate}
        disabled={!originalVideoUrl || subtitleStatus === 'processing'}
        style={{
          background: subtitleStatus === 'done' ? '#1a3a2a' : '#f5a623',
          color: subtitleStatus === 'done' ? '#5ec488' : '#0e0e0f',
          border: subtitleStatus === 'done' ? '0.5px solid #2a5540' : 'none',
          fontWeight: 600,
          width: '100%',
          padding: '10px',
          borderRadius: 6,
          fontSize: 13,
          cursor: !originalVideoUrl || subtitleStatus === 'processing' ? 'not-allowed' : 'pointer',
          opacity: !originalVideoUrl ? 0.5 : 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          fontFamily: 'DM Sans, sans-serif',
        }}
      >
        {subtitleStatus === 'processing' && <Spinner />}
        {subtitleStatus === 'idle' && 'Generate Subtitles'}
        {subtitleStatus === 'processing' && 'Generating...'}
        {subtitleStatus === 'done' && 'Download subtitled video'}
        {subtitleStatus === 'error' && 'Retry'}
      </button>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

export function BackgroundPanel() {
  const { state, dispatch } = useEditor()
  const {
    originalVideoUrl, processedVideoUrl, bgStatus, greenStatus,
    spillSuppressionStrength, subjectIsPerson, outputCodec
  } = state

  const [mode, setMode] = useState<'auto' | 'green'>('auto')

  async function process() {
    if (!originalVideoUrl) return
    if (mode === 'auto') {
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
    } else {
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
  }

  const processing = bgStatus === 'processing' || greenStatus === 'processing'
  const done = bgStatus === 'done' || greenStatus === 'done'

  const cardStyle = (active: boolean): React.CSSProperties => ({
    flex: 1,
    padding: 12,
    borderRadius: 8,
    background: active ? '#1e1e20' : '#141415',
    border: `0.5px solid ${active ? '#f5a623' : '#242426'}`,
    cursor: 'pointer',
    textAlign: 'left' as const,
  })

  return (
    <div style={{ padding: 20, maxWidth: 500, margin: '0 auto' }}>
      <p style={sectionTitle}>Background Removal</p>

      <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
        <div style={cardStyle(mode === 'auto')} onClick={() => setMode('auto')}>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#e8e6e0', marginBottom: 4 }}>Auto Remove</div>
          <div style={{ fontSize: 11, color: '#555' }}>Fast ($0.015/30 frames)</div>
          <div style={{ fontSize: 11, color: '#444', marginTop: 2 }}>Best for: any background</div>
        </div>
        <div style={cardStyle(mode === 'green')} onClick={() => setMode('green')}>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#e8e6e0', marginBottom: 4 }}>Green Screen</div>
          <div style={{ fontSize: 11, color: '#555' }}>($0.025/30 frames)</div>
          <div style={{ fontSize: 11, color: '#444', marginTop: 2 }}>Best for: green screen</div>
        </div>
      </div>

      {mode === 'auto' && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <span style={{ fontSize: 11, color: '#666' }}>Subject is a person</span>
          <input
            type="checkbox"
            checked={subjectIsPerson}
            onChange={e => dispatch({ type: 'SET_SUBJECT_IS_PERSON', payload: e.target.checked })}
            style={{ accentColor: '#f5a623' }}
          />
        </div>
      )}

      {mode === 'green' && (
        <div style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: 11, color: '#666' }}>Spill strength</span>
            <input
              type="range"
              min={0} max={1} step={0.1}
              value={spillSuppressionStrength}
              onChange={e => dispatch({ type: 'SET_SPILL_STRENGTH', payload: Number(e.target.value) })}
              style={{ accentColor: '#f5a623', flex: 1 }}
            />
            <span style={{ fontSize: 11, color: '#aaa' }}>{spillSuppressionStrength.toFixed(1)}</span>
          </div>
          <p style={{ fontSize: 9, color: '#444', margin: 0 }}>↑ if green spots remain · ↓ if colors shift</p>
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        <span style={{ fontSize: 11, color: '#666' }}>Output codec</span>
        <select
          value={outputCodec}
          onChange={e => dispatch({ type: 'SET_OUTPUT_CODEC', payload: e.target.value as 'vp9' | 'h264' })}
          style={{
            background: '#1a1a1c', border: '0.5px solid #2a2a2c',
            color: 'white', fontSize: 11, borderRadius: 4, padding: '4px 6px',
          }}
        >
          <option value="h264">H264</option>
          <option value="vp9">VP9</option>
        </select>
      </div>

      <button
        onClick={process}
        disabled={!originalVideoUrl || processing}
        style={{
          background: '#f5a623',
          color: '#0e0e0f',
          fontWeight: 600,
          width: '100%',
          padding: '10px',
          borderRadius: 6,
          fontSize: 13,
          border: 'none',
          cursor: !originalVideoUrl || processing ? 'not-allowed' : 'pointer',
          opacity: !originalVideoUrl ? 0.5 : 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          fontFamily: 'DM Sans, sans-serif',
        }}
      >
        {processing && <Spinner />}
        {processing ? 'Processing...' : done ? 'Process Again' : 'Process Background'}
      </button>

      {done && processedVideoUrl && (
        <button
          onClick={() => { const a = document.createElement('a'); a.href = processedVideoUrl; a.download = 'bg-removed.mp4'; a.click() }}
          style={{
            background: '#1a3a2a', color: '#5ec488', border: '0.5px solid #2a5540',
            fontWeight: 600, width: '100%', padding: '10px', borderRadius: 6,
            fontSize: 13, cursor: 'pointer', marginTop: 8,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'DM Sans, sans-serif',
          }}
        >
          Download result
        </button>
      )}

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

export function BrandPanel() {
  return (
    <div style={{ padding: 20, maxWidth: 400, margin: '0 auto' }}>
      <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 28, color: '#f5a623', fontWeight: 800, marginBottom: 4 }}>
        Bob Studio
      </div>
      <p style={{ fontSize: 13, color: '#555', marginBottom: 24 }}>AI videos for African stories</p>

      <p style={{ fontSize: 10, color: '#555', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>Colors</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
        <div style={{ width: 32, height: 32, borderRadius: 6, background: '#f5a623' }} />
        <span style={{ fontSize: 13, color: '#e8e6e0' }}>Primary</span>
        <span style={{ fontSize: 12, color: '#555' }}>#f5a623</span>
      </div>

      <p style={{ fontSize: 10, color: '#555', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>Fonts</p>
      <div style={{ marginBottom: 8 }}>
        <div style={{ fontSize: 12, color: '#aaa', marginBottom: 2 }}>Heading</div>
        <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, color: '#e8e6e0' }}>Syne</div>
      </div>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 12, color: '#aaa', marginBottom: 2 }}>Body</div>
        <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 14, color: '#e8e6e0' }}>DM Sans</div>
      </div>

      <p style={{ fontSize: 10, color: '#555', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>Logo</p>
      <div style={{
        height: 80, borderRadius: 8,
        border: '1.5px dashed #2a2a2c',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 20,
      }}>
        <span style={{ fontSize: 12, color: '#3a3a3c' }}>Upload logo</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 12, color: '#666', flex: 1 }}>Auto-apply brand to exports</span>
        <input type="checkbox" defaultChecked style={{ accentColor: '#f5a623' }} />
      </div>
    </div>
  )
}

export function ExportPanel() {
  const { state } = useEditor()
  const { processedVideoUrl, originalVideoUrl, subtitleStatus } = state
  const [format, setFormat] = useState('mp4')
  const [resolution, setResolution] = useState('1080p')

  const url = processedVideoUrl ?? originalVideoUrl

  const cardStyle = (active: boolean): React.CSSProperties => ({
    flex: 1,
    padding: '8px 12px',
    borderRadius: 6,
    background: active ? '#1e1e20' : '#141415',
    border: `0.5px solid ${active ? '#f5a623' : '#242426'}`,
    cursor: 'pointer',
    textAlign: 'center' as const,
    fontSize: 12,
    color: active ? '#e8e6e0' : '#666',
  })

  return (
    <div style={{ padding: 20, maxWidth: 500, margin: '0 auto' }}>
      <p style={{ fontSize: 10, color: '#555', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>Format</p>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {['mp4', 'mov', 'webm'].map(f => (
          <div key={f} style={cardStyle(format === f)} onClick={() => setFormat(f)}>
            {f.toUpperCase()}
          </div>
        ))}
      </div>

      <p style={{ fontSize: 10, color: '#555', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>Resolution</p>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {['1080p', '720p', '480p'].map(r => (
          <div key={r} style={cardStyle(resolution === r)} onClick={() => setResolution(r)}>
            {r}
          </div>
        ))}
      </div>

      {subtitleStatus === 'done' && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <span style={{ fontSize: 12, color: '#666', flex: 1 }}>Include subtitles</span>
          <input type="checkbox" defaultChecked style={{ accentColor: '#f5a623' }} />
        </div>
      )}

      <div style={{
        background: '#141415', borderRadius: 8,
        border: '0.5px solid #242426', padding: 12, marginBottom: 16,
      }}>
        <p style={{ fontSize: 10, color: '#555', textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 8px' }}>Cost estimate</p>
        <div style={{ fontSize: 12, color: '#aaa' }}>
          {subtitleStatus === 'done' && <div>✓ Subtitles: ~$0.10/min</div>}
          <div style={{ color: '#555', marginTop: 4 }}>fal.ai · VEED API</div>
        </div>
      </div>

      <button
        onClick={() => url && window.open(url)}
        disabled={!url}
        style={{
          background: '#f5a623', color: '#0e0e0f', fontWeight: 600,
          width: '100%', padding: '12px', borderRadius: 6,
          fontSize: 14, border: 'none', cursor: url ? 'pointer' : 'not-allowed',
          opacity: url ? 1 : 0.5, marginBottom: 12,
          fontFamily: 'DM Sans, sans-serif',
        }}
      >
        Download
      </button>

      <div style={{ display: 'flex', gap: 8 }}>
        <button
          onClick={() => url && navigator.clipboard.writeText(url)}
          style={{
            flex: 1, background: '#141415', color: '#666',
            border: '0.5px solid #242426', padding: '8px',
            borderRadius: 6, fontSize: 12, cursor: 'pointer',
            fontFamily: 'DM Sans, sans-serif',
          }}
        >
          Copy link
        </button>
      </div>

      <p style={{ fontSize: 11, color: '#444', textAlign: 'center', marginTop: 12 }}>
        Optimized for Instagram Reels / TikTok / YouTube Shorts
      </p>
    </div>
  )
}
