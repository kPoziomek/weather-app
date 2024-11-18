import { useState } from 'react'

export function useErrorBoundary() {
  const [error, setError] = useState<Error | null>(null)

  const showBoundary = (error: Error) => {
    setError(error)
  }

  return [error, showBoundary] as const
}
