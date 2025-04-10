import { mock } from 'bun:test'

export type MockResult = {
  clear: () => void
}

/**
 *
 * @param modulePath - the path starting from this files' path.
 * @param renderMocks - function to generate mocks (by their named or default exports)
 * @returns an object
 */
export const mockModule = async (
  modulePath: string,
  renderMocks: () => Record<string, unknown>,
): Promise<MockResult> => {
  const original = {
    ...(await import(modulePath)),
  }
  const mocks = renderMocks()
  const result = {
    ...original,
    ...mocks,
  }
  mock.module(modulePath, () => result)
  return {
    clear: () => {
      mock.module(modulePath, () => original)
    },
  }
}
