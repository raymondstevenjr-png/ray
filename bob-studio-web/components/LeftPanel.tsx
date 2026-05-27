'use client'

import { useRef } from 'react'
import {
  IconVideo, IconMusic, IconTypography, IconPhoto, IconSubtask,
  IconSparkles, IconLayersDifference, IconLayersLinked,
  IconLanguage, IconWand, IconPalette
} from '@tabler/icons-react'
import { useEditor } from '../context/EditorContext'

const sectionTitle: React.CSSProperties = {
  fontSize: 10,
  color: '#555',
  textTransform: 'uppercase',
  letterSpacing: 1,
  fontWeight: 500,
  padding: '12px 14px 8px',
}

interface ToolItemProps {
  icon: React.ReactNode
  label: string
  badge?: string
  muted?: boolean
  active?: boolean
  onClick?: () => void
  dot?: boolean
}

function ToolItem({ icon, label, badge, muted, active, onClick, dot }: ToolItemProps) {
  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '7px 14px',
        fontSize: 12.5,
        color: active ? '#f5a623' : muted ? '#444' : '#888',
        cursor: onClick ? 'pointer' : 'default',
        borderRadius: 6,
        margin: '0 6px 1px',
        transition: 'all 0.12s',
      }}
      onMouseEnter={e => {
        if (onClick) {
          ;(e.currentTarget as HTMLDivElement).style.background = '#1e1e20'
          ;(e.currentTarget as HTMLDivElement).style.color = '#e8e6e0'
        }
      }}
      onMouseLeave={e => {
        ;(e.currentTarget as HTMLDivElement).style.background = 'transparent'
        ;(e.currentTarget as HTMLDivElement).style.color = active ? '#f5a623' : muted ? '#444' : '#888'
      }}
    >
      <div style={{
        width: 28, height: 28, borderRadius: 6,
        background: active ? '#2c2200' : '#1e1e20',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 14, flexShrink: 0,
      }}>
        {icon}
      </div>
      <span style={{ flex: 1 }}>{label}</span>
      {dot && (
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#f5a623' }} />
      )}
      {badge && (
        <span style={{
          fontSize: 9,
          background: '#2c2200',
          color: '#f5a623',
          border: '0.5px solid #5a3a0a',
          padding: '1px 6px',
          borderRadius: 3,
          fontWeight: 600,
          marginLeft: 'auto',
        }}>
          {badge}
        </span>
      )}
    </div>
  )
}

export default function LeftPanel({ onFileSelect }: { onFileSelect: (file: File) => void }) {
  const { dispatch } = useEditor()
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) onFileSelect(file)
  }

  return (
    <div style={{
      width: 200,
      background: '#141415',
      borderRight: '0.5px solid #242426',
      overflowY: 'auto',
      flexShrink: 0,
    }}>
      <input
        type="file"
        accept="video/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      <div style={sectionTitle}>Add</div>
      <ToolItem icon={<IconVideo size={14} />} label="Video" onClick={() => fileInputRef.current?.click()} />
      <ToolItem icon={<IconMusic size={14} />} label="Audio" />
      <ToolItem icon={<IconTypography size={14} />} label="Text" badge="AI" />
      <ToolItem icon={<IconPhoto size={14} />} label="Image" />
      <ToolItem
        icon={<IconSubtask size={14} />}
        label="Subtitles"
        badge="AI"
        onClick={() => dispatch({ type: 'SET_ACTIVE_TAB', payload: 'subtitles' })}
      />

      <div style={sectionTitle}>AI Tools</div>
      <ToolItem
        icon={<IconSparkles size={14} />}
        label="Auto-subtitle"
        badge="AI"
        onClick={() => dispatch({ type: 'SET_ACTIVE_TAB', payload: 'subtitles' })}
      />
      <ToolItem
        icon={<IconLayersDifference size={14} />}
        label="Remove BG"
        badge="AI"
        onClick={() => dispatch({ type: 'SET_ACTIVE_TAB', payload: 'background' })}
      />
      <ToolItem
        icon={<IconLayersLinked size={14} />}
        label="Green Screen"
        badge="AI"
        onClick={() => dispatch({ type: 'SET_ACTIVE_TAB', payload: 'greenscreen' })}
      />
      <ToolItem icon={<IconLanguage size={14} />} label="Translate" muted />
      <ToolItem icon={<IconWand size={14} />} label="Voice Clone" muted />

      <div style={sectionTitle}>Brand</div>
      <ToolItem
        icon={<IconPalette size={14} />}
        label="Bob Studio Kit"
        dot
        onClick={() => dispatch({ type: 'SET_ACTIVE_TAB', payload: 'brand' })}
      />
    </div>
  )
}
