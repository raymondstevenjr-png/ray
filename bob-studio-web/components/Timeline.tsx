'use client'

import { useState, useEffect, useRef } from 'react'
import { IconVideo, IconMusic, IconTypography } from '@tabler/icons-react'
import { useEditor } from '../context/EditorContext'
import type { Clip } from '../types/editor'

const TOTAL_DURATION = 150
const BASE_WIDTH = 600

type TrackType = 'video' | 'audio' | 'text'

interface TrackInfo {
  id: string
  type: TrackType
  label: string
  icon: React.ReactNode
}

const defaultTracks: TrackInfo[] = [
  { id: 'video', type: 'video', label: 'Video', icon: <IconVideo size={11} /> },
  { id: 'audio', type: 'audio', label: 'Music', icon: <IconMusic size={11} /> },
  { id: 'text', type: 'text', label: 'Text', icon: <IconTypography size={11} /> },
]

export default function Timeline() {
  const { state, dispatch } = useEditor()
  const { clips, selectedClipId, zoomLevel, currentTime } = state

  const [tracks, setTracks] = useState<TrackInfo[]>(defaultTracks)
  const [draggingId, setDraggingId] = useState<string | null>(null)
  const [dragStartX, setDragStartX] = useState(0)
  const [dragStartClipX, setDragStartClipX] = useState(0)

  const rulerWidth = BASE_WIDTH * zoomLevel
  const playheadPx = (currentTime / TOTAL_DURATION) * rulerWidth

  useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      if (!draggingId) return
      const delta = e.clientX - dragStartX
      const clip = clips.find(c => c.id === draggingId)
      if (!clip) return
      const newStart = Math.max(0, dragStartClipX + delta)
      dispatch({ type: 'UPDATE_CLIP', payload: { ...clip, start: newStart } })
    }
    function onMouseUp() {
      setDraggingId(null)
    }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }
  }, [draggingId, dragStartX, dragStartClipX, clips, dispatch])

  function handleClipMouseDown(e: React.MouseEvent, clip: Clip) {
    e.stopPropagation()
    dispatch({ type: 'SET_SELECTED_CLIP', payload: clip.id })
    setDraggingId(clip.id)
    setDragStartX(e.clientX)
    setDragStartClipX(clip.start)
  }

  function handleSplit() {
    if (!selectedClipId) return
    const clip = clips.find(c => c.id === selectedClipId)
    if (!clip) return
    if (playheadPx <= clip.start || playheadPx >= clip.start + clip.width) return

    const clipA: Clip = {
      ...clip,
      id: clip.id + '_a',
      width: playheadPx - clip.start - 2,
    }
    const clipB: Clip = {
      ...clip,
      id: clip.id + '_b',
      start: playheadPx + 2,
      width: clip.start + clip.width - playheadPx - 2,
    }

    const newClips = clips.filter(c => c.id !== selectedClipId).concat([clipA, clipB])
    dispatch({ type: 'SET_CLIPS', payload: newClips })
    dispatch({ type: 'SET_SELECTED_CLIP', payload: null })
  }

  function handleDelete() {
    if (!selectedClipId) return
    dispatch({ type: 'DELETE_CLIP', payload: selectedClipId })
  }

  function handleAddTrack() {
    const newTrack: TrackInfo = {
      id: 'track_' + Date.now(),
      type: 'video',
      label: 'Track ' + (tracks.length + 1),
      icon: <IconVideo size={11} />,
    }
    setTracks(prev => [...prev, newTrack])
  }

  function renderTicks() {
    const ticks = []
    for (let t = 0; t <= TOTAL_DURATION; t += 10) {
      const x = (t / TOTAL_DURATION) * rulerWidth
      const isMajor = t % 30 === 0
      ticks.push(
        <div
          key={t}
          style={{
            position: 'absolute',
            left: x,
            bottom: 0,
            width: 1,
            height: isMajor ? 10 : 6,
            background: '#2a2a2c',
          }}
        />,
        isMajor && (
          <span
            key={`label_${t}`}
            style={{
              position: 'absolute',
              left: x + 3,
              top: 2,
              fontSize: 9,
              color: '#444',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {`${Math.floor(t / 60)}:${(t % 60).toString().padStart(2, '0')}`}
          </span>
        )
      )
    }
    return ticks
  }

  const btnStyle: React.CSSProperties = {
    background: 'transparent',
    border: 'none',
    color: '#666',
    fontSize: 12,
    cursor: 'pointer',
    padding: '2px 8px',
    borderRadius: 4,
    fontFamily: 'DM Sans, sans-serif',
  }

  return (
    <div style={{
      height: 140,
      background: '#0d0d0e',
      borderTop: '0.5px solid #242426',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
    }}>
      {/* Header */}
      <div style={{
        height: 28,
        background: '#141415',
        borderBottom: '0.5px solid #1e1e20',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 4,
        paddingRight: 8,
        gap: 2,
      }}>
        <button
          style={btnStyle}
          onClick={handleAddTrack}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#e8e6e0'; (e.currentTarget as HTMLButtonElement).style.background = '#1e1e20' }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = '#666'; (e.currentTarget as HTMLButtonElement).style.background = 'transparent' }}
        >
          + Add track
        </button>
        <button
          style={btnStyle}
          onClick={handleSplit}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#e8e6e0'; (e.currentTarget as HTMLButtonElement).style.background = '#1e1e20' }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = '#666'; (e.currentTarget as HTMLButtonElement).style.background = 'transparent' }}
        >
          ✂ Split
        </button>
        <button
          style={btnStyle}
          onClick={handleDelete}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#e8e6e0'; (e.currentTarget as HTMLButtonElement).style.background = '#1e1e20' }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = '#666'; (e.currentTarget as HTMLButtonElement).style.background = 'transparent' }}
        >
          🗑 Delete
        </button>

        <div style={{ flex: 1 }} />

        {[0.5, 1, 2].map(z => (
          <button
            key={z}
            onClick={() => dispatch({ type: 'SET_ZOOM', payload: z })}
            style={{
              ...btnStyle,
              background: zoomLevel === z ? '#1e1e20' : 'transparent',
              color: zoomLevel === z ? 'white' : '#666',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#e8e6e0' }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = zoomLevel === z ? 'white' : '#666' }}
          >
            {z}×
          </button>
        ))}
      </div>

      {/* Body: labels + content */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Track labels */}
        <div style={{ width: 80, borderRight: '0.5px solid #1e1e20', flexShrink: 0 }}>
          {/* Ruler spacer */}
          <div style={{ height: 20, borderBottom: '0.5px solid #1e1e20' }} />
          {tracks.map(t => (
            <div
              key={t.id}
              style={{
                height: 30,
                display: 'flex',
                alignItems: 'center',
                padding: '0 10px',
                fontSize: 10,
                color: '#555',
                borderBottom: '0.5px solid #181819',
                gap: 6,
              }}
            >
              {t.icon}
              {t.label}
            </div>
          ))}
        </div>

        {/* Tracks content */}
        <div style={{ flex: 1, overflowX: 'auto', position: 'relative' }}>
          {/* Ruler */}
          <div style={{
            height: 20,
            background: '#141415',
            borderBottom: '0.5px solid #1e1e20',
            position: 'relative',
            width: rulerWidth,
          }}>
            {renderTicks()}
          </div>

          {/* Track rows */}
          <div style={{ position: 'relative', width: rulerWidth }}>
            {tracks.map(track => {
              const trackClips = clips.filter(c => c.track === track.type)
              return (
                <div
                  key={track.id}
                  style={{
                    height: 30,
                    borderBottom: '0.5px solid #181819',
                    position: 'relative',
                  }}
                >
                  {trackClips.map(clip => (
                    <div
                      key={clip.id}
                      onMouseDown={e => handleClipMouseDown(e, clip)}
                      style={{
                        position: 'absolute',
                        top: 4,
                        left: clip.start * zoomLevel,
                        width: clip.width * zoomLevel,
                        height: 22,
                        borderRadius: 4,
                        background: clip.color,
                        border: `0.5px solid ${clip.borderColor}`,
                        color: clip.textColor,
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0 8px',
                        fontSize: 10,
                        fontWeight: 500,
                        cursor: 'grab',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        outline: selectedClipId === clip.id ? '1px solid #f5a623' : 'none',
                        outlineOffset: 0,
                        userSelect: 'none',
                        transition: 'opacity 0.1s',
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.opacity = '0.85' }}
                      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.opacity = '1' }}
                    >
                      {clip.label}
                    </div>
                  ))}
                </div>
              )
            })}

            {/* Playhead */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: playheadPx,
                height: '100%',
                width: 1.5,
                background: '#f5a623',
                pointerEvents: 'none',
              }}
            >
              <div style={{
                position: 'absolute',
                top: -1,
                left: -4,
                width: 9,
                height: 9,
                background: '#f5a623',
                borderRadius: 2,
              }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
