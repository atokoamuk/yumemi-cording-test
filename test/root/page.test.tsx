import '@testing-library/jest-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import { describe, expect, test } from 'bun:test'

import Root from '@/app/page'

describe('Root', () => {
  const queryClient = new QueryClient()

  test('ルートページの初期表示', async () => {
    const { getByText, getAllByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <Root />
      </QueryClientProvider>,
    )

    expect(getByText('都道府県')).toBeInTheDocument()
    expect(await getAllByTestId(/^prefecture-skeleton-\d+$/).length).toBe(47)
    expect(getByText('都道府県を選択してください')).toBeInTheDocument()
  })
})
