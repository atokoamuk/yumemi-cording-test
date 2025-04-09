'use client'

import { useEffect } from 'react'

import SimpleButton from '@/components/SimpleButton'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col justify-center items-center h-svh px-16 py-8 gap-2">
      <h1>エラーが発生しました</h1>
      <h3>画面を更新して現象が解決するかお試しください</h3>
      <h4 className="text-gray-500">エラーが解決しない場合はお時間をおいて再度アクセスしてください</h4>
      <SimpleButton onClick={() => reset()}>更新</SimpleButton>
    </div>
  )
}
