'use client'

import { useEditor } from '../context/EditorContext'
import type { ActiveTab } from '../types/editor'

const tabs: { id: ActiveTab; label: string }[] = [
  { id: 'edit', label: 'Edit' },
  { id: 'subtitles', label: 'Subtitles' },
  { id: 'background', label: 'Background' },
  { id: 'greenscreen', label: 'Green Screen' },
  { id: 'brand', label: 'Brand' },
  { id: 'export', label: 'Export' },
]

export default function TopBar() {
  const { state, dispatch } = useEditor()
  const { activeTab, processedVideoUrl, originalVideoUrl, uploadedFileName } = state

  function handleExport() {
    const url = processedVideoUrl ?? originalVideoUrl
    if (!url) return
    const a = document.createElement('a')
    a.href = url
    a.download = uploadedFileName || 'bob-studio-export.mp4'
    a.click()
  }

  return (
    <div style={{
      height: 48,
      background: '#141415',
      borderBottom: '0.5px solid #242426',
      display: 'flex',
      alignItems: 'center',
      paddingLeft: 16,
      paddingRight: 16,
      gap: 12,
      flexShrink: 0,
    }}>
      {/* Logo */}
      <span style={{
        fontFamily: 'Syne, sans-serif',
        fontWeight: 800,
        fontSize: 15,
        color: '#f5a623',
        letterSpacing: '0.5px',
        flexShrink: 0,
      }}>
        BOB STUDIO
      </span>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, marginLeft: 8 }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => dispatch({ type: 'SET_ACTIVE_TAB', payload: tab.id })}
            style={{
              background: activeTab === tab.id ? '#242426' : 'transparent',
              color: activeTab === tab.id ? '#fff' : '#666',
              border: 'none',
              borderRadius: 6,
              padding: '4px 12px',
              fontSize: 12,
              cursor: 'pointer',
              fontFamily: 'DM Sans, sans-serif',
              transition: 'all 0.12s',
            }}
            onMouseEnter={e => {
              if (activeTab !== tab.id) (e.currentTarget as HTMLButtonElement).style.background = '#1e1e20'
            }}
            onMouseLeave={e => {
              if (activeTab !== tab.id) (e.currentTarget as HTMLButtonElement).style.background = 'transparent'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* File name */}
      <span style={{
        color: '#444',
        fontSize: 12,
        maxWidth: 160,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        flex: 1,
        textAlign: 'center',
      }}>
        {uploadedFileName || 'No file loaded'}
      </span>

      {/* Export */}
      <button
        onClick={handleExport}
        style={{
          background: '#f5a623',
          color: '#0e0e0f',
          fontWeight: 600,
          fontSize: 12,
          padding: '6px 16px',
          borderRadius: 6,
          border: 'none',
          cursor: 'pointer',
          fontFamily: 'DM Sans, sans-serif',
          flexShrink: 0,
        }}
      >
        Export
      </button>
    </div>
  )
}
