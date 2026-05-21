'use client'

import { useRef, useState, useEffect } from 'react'
import {
  IconUpload, IconPlayerPlay, IconPlayerPause,
  IconPlayerSkipBack, IconPlayerSkipForward,
  IconVolume, IconMaximize, IconSubtask
} from '@tabler/icons-react'
import { useEditor } from '../context/EditorContext'

function formatTime(s: number) {
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}


export default function Canvas({ onFileSelect }: { onFileSelect: (file: File) => void }) {
  const { state, dispatch } = useEditor()
  const {
    originalVideoUrl, processedVideoUrl, isPlaying, currentTime, duration,
    subtitleStatus, bgStatus, greenStatus, errorMessage, language,
    transcriptVtt,
  } = state

  const videoRef = useRef<HTMLVideoElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const trackRef = useRef<HTMLTrackElement>(null)
  const [dragOver, setDragOver] = useState(false)
  const [subtitlesOn, setSubtitlesOn] = useState(true)
  const [vttBlobUrl, setVttBlobUrl] = useState<string | null>(null)

  // Build a blob URL from the VTT string whenever it changes
  useEffect(() => {
    if (!transcriptVtt) { setVttBlobUrl(null); return }
    const blob = new Blob([transcriptVtt], { type: 'text/vtt' })
    const url = URL.createObjectURL(blob)
    setVttBlobUrl(url)
    return () => URL.revokeObjectURL(url)
  }, [transcriptVtt])

  // Show/hide subtitle track on the video element
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const track = video.textTracks[0]
    if (!track) return
    track.mode = subtitlesOn ? 'showing' : 'hidden'
  }, [subtitlesOn, vttBlobUrl])

  const anyProcessing = subtitleStatus === 'uploading' || subtitleStatus === 'processing'
    || bgStatus === 'uploading' || bgStatus === 'processing'
    || greenStatus === 'uploading' || greenStatus === 'processing'

  const anyDone = subtitleStatus === 'done' || bgStatus === 'done' || greenStatus === 'done'
  const anyError = subtitleStatus === 'error' || bgStatus === 'error' || greenStatus === 'error'

  function getOverlayMessage() {
    if (subtitleStatus === 'uploading') return { text: 'Uploading to fal storage...', color: '#e8e6e0' }
    if (subtitleStatus === 'processing') return { text: 'Transcribing with AssemblyAI...', color: '#e8e6e0' }
    if (bgStatus === 'processing') return { text: 'Removing background...', color: '#e8e6e0' }
    if (greenStatus === 'processing') return { text: 'Processing green screen...', color: '#e8e6e0' }
    if (anyDone) return { text: 'Done! Ready to download.', color: '#5ec488' }
    if (anyError) return { text: errorMessage || 'Processing failed.', color: '#e24b4a' }
    return null
  }

  function handleTimeUpdate() {
    if (videoRef.current) {
      dispatch({ type: 'SET_CURRENT_TIME', payload: videoRef.current.currentTime })
    }
  }

  function handleMetadata() {
    if (videoRef.current) {
      dispatch({ type: 'SET_DURATION', payload: videoRef.current.duration })
    }
  }

  function togglePlay() {
    if (!videoRef.current) return
    if (isPlaying) {
      videoRef.current.pause()
      dispatch({ type: 'SET_PLAYING', payload: false })
    } else {
      videoRef.current.play()
      dispatch({ type: 'SET_PLAYING', payload: true })
    }
  }

  function handleFileDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith('video/')) onFileSelect(file)
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) onFileSelect(file)
  }

  const overlayMsg = getOverlayMessage()
  const showOverlay = anyProcessing || anyDone || anyError

  const selectStyle: React.CSSProperties = {
    background: '#1a1a1c',
    border: '0.5px solid #2a2a2c',
    color: 'white',
    fontSize: 12,
    borderRadius: 4,
    padding: '2px 6px',
    fontFamily: 'DM Sans, sans-serif',
  }

  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0e0e0f',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <input
        type="file"
        accept="video/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      <span style={{
        position: 'absolute',
        top: 12,
        fontSize: 10,
        color: '#333',
        textTransform: 'uppercase',
        letterSpacing: 2,
      }}>
        1920 × 1080
      </span>

      {/* Video container */}
      <div style={{
        width: 400,
        height: 225,
        background: '#111112',
        borderRadius: 8,
        border: originalVideoUrl ? '0.5px solid #2a2a2c' : '1.5px dashed #2a2a2c',
        position: 'relative',
        overflow: 'hidden',
        cursor: !originalVideoUrl ? 'pointer' : 'default',
        outline: dragOver ? '2px solid #f5a623' : 'none',
      }}
        onClick={!originalVideoUrl ? () => fileInputRef.current?.click() : undefined}
        onDragOver={e => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleFileDrop}
      >
        {!originalVideoUrl ? (
          <div style={{
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            height: '100%',
          }}>
            <IconUpload size={32} color="#333" />
            <p style={{ fontSize: 12, color: '#3a3a3c', marginTop: 8, marginBottom: 0 }}>
              Drop a video or click to upload
            </p>
            <p style={{ fontSize: 10, color: '#2a2a2c', marginTop: 4 }}>
              MP4, MOV, WebM
            </p>
          </div>
        ) : (
          <video
            ref={videoRef}
            src={processedVideoUrl ?? originalVideoUrl}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleMetadata}
          >
            {vttBlobUrl && (
              <track
                ref={trackRef}
                kind="subtitles"
                src={vttBlobUrl}
                default
                label="AssemblyAI"
              />
            )}
          </video>
        )}

        {/* Status overlay */}
        {showOverlay && (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'rgba(0,0,0,0.75)',
            display: 'flex', alignItems: 'center',
            justifyContent: 'center', flexDirection: 'column', gap: 12,
          }}>
            {anyProcessing && (
              <div style={{
                width: 32, height: 32, borderRadius: '50%',
                border: '2px solid #333',
                borderTop: '2px solid #f5a623',
                animation: 'spin 1s linear infinite',
              }} />
            )}
            {overlayMsg && (
              <span style={{ fontSize: 12, color: overlayMsg.color, textAlign: 'center', padding: '0 16px' }}>
                {overlayMsg.text}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Playback controls */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 12 }}>
        <button
          onClick={() => { if (videoRef.current) videoRef.current.currentTime = 0 }}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#666' }}
        >
          <IconPlayerSkipBack size={14} color="#666" />
        </button>

        <button
          onClick={togglePlay}
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          {isPlaying
            ? <IconPlayerPause size={18} color="#f5a623" />
            : <IconPlayerPlay size={18} color="#f5a623" />
          }
        </button>

        <button
          onClick={() => { if (videoRef.current) videoRef.current.currentTime = Math.min(videoRef.current.duration, videoRef.current.currentTime + 10) }}
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <IconPlayerSkipForward size={14} color="#666" />
        </button>

        <span style={{ fontSize: 11, color: '#555', fontVariantNumeric: 'tabular-nums' }}>
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>

        <IconVolume size={14} color="#666" />
        <input
          type="range"
          min={0} max={100}
          defaultValue={80}
          style={{ width: 80, accentColor: '#f5a623' }}
          onChange={e => {
            if (videoRef.current) videoRef.current.volume = Number(e.target.value) / 100
          }}
        />

        {vttBlobUrl && (
          <button
            onClick={() => setSubtitlesOn(v => !v)}
            title={subtitlesOn ? 'Hide subtitles' : 'Show subtitles'}
            style={{
              background: subtitlesOn ? '#2c2200' : 'none',
              border: subtitlesOn ? '0.5px solid #5a3a0a' : 'none',
              borderRadius: 4,
              padding: '2px 4px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <IconSubtask size={14} color={subtitlesOn ? '#f5a623' : '#444'} />
          </button>
        )}

        <button
          onClick={() => videoRef.current?.requestFullscreen()}
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <IconMaximize size={14} color="#666" />
        </button>
      </div>

      {/* Language row */}
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 8 }}>
        <select
          value={language}
          onChange={e => dispatch({ type: 'SET_LANGUAGE', payload: e.target.value })}
          style={selectStyle}
        >
          <option value="">Auto-detect language</option>
          <optgroup label="Global">
            <option value="en-US">English US</option>
            <option value="en-GB">English UK</option>
            <option value="fr-FR">French</option>
            <option value="es-ES">Spanish</option>
            <option value="de-DE">German</option>
            <option value="pt-BR">Portuguese</option>
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
