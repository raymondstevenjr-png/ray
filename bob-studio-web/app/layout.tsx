import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Bob Studio',
  description: 'AI videos for African stories',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Syne:wght@700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{
        margin: 0,
        background: '#0e0e0f',
        color: '#e8e6e0',
        fontFamily: "'DM Sans', sans-serif",
        height: '100vh',
        overflow: 'hidden'
      }}>
        {children}
      </body>
    </html>
  )
}
