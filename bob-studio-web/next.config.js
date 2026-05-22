/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Required for FFmpeg WASM (SharedArrayBuffer)
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          // credentialless allows cross-origin media (AssemblyAI / fal CDN) without CORP headers
          { key: 'Cross-Origin-Embedder-Policy', value: 'credentialless' },
        ],
      },
    ]
  },
}

module.exports = nextConfig
