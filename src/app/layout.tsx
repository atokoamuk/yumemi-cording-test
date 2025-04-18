import './globals.css'
import type { Metadata } from 'next'

import Provider from './provider'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'ゆめみ フロントエンドコーディング試験',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
