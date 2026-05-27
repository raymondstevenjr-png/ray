'use client'

import { useState, useRef } from 'react'
import { FFmpeg } from '@ffmpeg/ffmpeg'
import { fetchFile, toBlobURL } from '@ffmpeg/util'

interface Props {
  videoUrl: string
  srtContent: string
  fileName: string
}

export default function BurnSubtitles({ videoUrl, srtContent, fileName }: Props) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'burning' | 'done' | 'error'>('idle')
  const [progress, setProgress] = useState(0)
  const [outputUrl, setOutputUrl] = useState<string | null>(null)
  const ffmpegRef = useRef<FFmpeg | null>(null)

  async function burn() {
    setStatus('loading')
    setProgress(0)

    try {
      const ffmpeg = new FFmpeg()
      ffmpegRef.current = ffmpeg

      // Load FFmpeg WASM from CDN
      const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd'
      await ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
      })

      ffmpeg.on('progress', ({ progress: p }) => setProgress(Math.round(p * 100)))

      setStatus('burning')

      // Write input files to FFmpeg virtual FS
      await ffmpeg.writeFile('input.mp4', await fetchFile(videoUrl))
      await ffmpeg.writeFile('subtitles.srt', new TextEncoder().encode(srtContent))

      // Burn subtitles in
      await ffmpeg.exec([
        '-i', 'input.mp4',
        '-vf', 'subtitles=subtitles.srt:force_style=\'FontSize=18,PrimaryColour=&Hffffff,OutlineColour=&H000000,Outline=1\'',
        '-c:a', 'copy',
        '-c:v', 'libx264',
        '-preset', 'fast',
        'output.mp4',
      ])

      const data = await ffmpeg.readFile('output.mp4')
      const blob = new Blob([data as unknown as BlobPart], { type: 'video/mp4' })
      setOutputUrl(URL.createObjectURL(blob))
      setStatus('done')
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  function download() {
    if (!outputUrl) return
    const a = document.createElement('a')
    a.href = outputUrl
    a.download = fileName.replace(/\.[^.]+$/, '') + '_subtitled.mp4'
    a.click()
  }

  if (status === 'idle') {
    return (
      <button
        onClick={burn}
        style={{
          width: '100%', background: '#141415', color: '#e8e6e0',
          border: '0.5px solid #242426', borderRadius: 6,
          padding: '9px', fontSize: 12, cursor: 'pointer',
          fontFamily: 'DM Sans, sans-serif', fontWeight: 500, marginTop: 8,
        }}
      >
        🔥 Burn subtitles into video
      </button>
    )
  }

  if (status === 'loading') {
    return (
      <div style={{ marginTop: 8, padding: 10, background: '#141415', border: '0.5px solid #242426', borderRadius: 6 }}>
        <p style={{ fontSize: 12, color: '#555', margin: 0 }}>Loading FFmpeg...</p>
      </div>
    )
  }

  if (status === 'burning') {
    return (
      <div style={{ marginTop: 8, padding: 10, background: '#141415', border: '0.5px solid #242426', borderRadius: 6 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ fontSize: 12, color: '#aaa' }}>Burning subtitles...</span>
          <span style={{ fontSize: 12, color: '#f5a623' }}>{progress}%</span>
        </div>
        <div style={{ height: 4, background: '#242426', borderRadius: 2 }}>
          <div style={{ height: '100%', width: `${progress}%`, background: '#f5a623', borderRadius: 2, transition: 'width 0.2s' }} />
        </div>
        <p style={{ fontSize: 10, color: '#444', margin: '6px 0 0' }}>Processing in browser — no upload needed</p>
      </div>
    )
  }

  if (status === 'done') {
    return (
      <button
        onClick={download}
        style={{
          width: '100%', background: '#1a3a2a', color: '#5ec488',
          border: '0.5px solid #2a5540', borderRadius: 6,
          padding: '9px', fontSize: 12, cursor: 'pointer',
          fontFamily: 'DM Sans, sans-serif', fontWeight: 600, marginTop: 8,
        }}
      >
        ↓ Download video with subtitles burned in
      </button>
    )
  }

  return (
    <div style={{ marginTop: 8, padding: 10, background: '#2a0a0a', border: '0.5px solid #5a1a1a', borderRadius: 6 }}>
      <p style={{ fontSize: 12, color: '#e24b4a', margin: 0 }}>Burn failed — try downloading the .srt instead</p>
    </div>
  )
}
