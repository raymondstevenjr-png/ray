'use client'

import { useState, useCallback } from 'react'
import { EditorProvider, useEditor } from '../context/EditorContext'
import TopBar from '../components/TopBar'
import LeftPanel from '../components/LeftPanel'
import Canvas from '../components/Canvas'
import RightPanel from '../components/RightPanel'
import Timeline from '../components/Timeline'
import { SubtitlesPanel, BackgroundPanel, BrandPanel, ExportPanel } from '../components/TabPanels'

function EditorLayout() {
  const { state, dispatch } = useEditor()
  const { activeTab } = state

  const handleFileSelect = useCallback(async (file: File) => {
    dispatch({ type: 'SET_FILE_NAME', payload: file.name })
    dispatch({ type: 'SET_UPLOAD_FILE', payload: file })
    // Local blob URL for immediate video preview — NOT sent to AI APIs
    const localUrl = URL.createObjectURL(file)
    dispatch({ type: 'SET_ORIGINAL_URL', payload: localUrl })
    dispatch({ type: 'SET_PROCESSED_URL', payload: null })

    // Stream upload to AssemblyAI storage — gives a CDN URL usable by all AI APIs
    dispatch({ type: 'SET_SUBTITLE_STATUS', payload: 'uploading' })
    try {
      const res = await fetch('/api/assemblyai-upload', {
        method: 'POST',
        headers: { 'Content-Type': file.type || 'video/mp4' },
        body: file,
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      // Replace blob URL with publicly accessible AssemblyAI CDN URL
      dispatch({ type: 'SET_ORIGINAL_URL', payload: data.url })
      dispatch({ type: 'SET_SUBTITLE_STATUS', payload: 'idle' })
    } catch (err) {
      dispatch({ type: 'SET_SUBTITLE_STATUS', payload: 'idle' })
      dispatch({ type: 'SET_ERROR', payload: `Upload failed — ${(err as Error).message}` })
    }
  }, [dispatch])

  const showTabPanel = activeTab !== 'edit'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <TopBar />

      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        <LeftPanel onFileSelect={handleFileSelect} />

        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <div style={{ flex: 1, display: 'flex', minHeight: 0, overflow: 'hidden' }}>
            {showTabPanel ? (
              <div style={{ flex: 1, overflowY: 'auto', background: '#0e0e0f' }}>
                {activeTab === 'subtitles' && <SubtitlesPanel />}
                {activeTab === 'background' && <BackgroundPanel />}
                {activeTab === 'greenscreen' && <BackgroundPanel />}
                {activeTab === 'brand' && <BrandPanel />}
                {activeTab === 'export' && <ExportPanel />}
              </div>
            ) : (
              <Canvas onFileSelect={handleFileSelect} />
            )}
            <RightPanel />
          </div>
          <Timeline />
        </main>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <EditorProvider>
      <EditorLayout />
    </EditorProvider>
  )
}
