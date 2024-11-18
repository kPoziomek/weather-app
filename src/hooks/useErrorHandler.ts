import { useErrorBoundary } from '@/hooks/useErrorBoundary'

export function useErrorHandler() {
  const [_, showBoundary] = useErrorBoundary()

  return (error: unknown) => {
    if (error instanceof Error) {
      showBoundary(error)
    } else {
      showBoundary(new Error('An unknown error occurred'))
    }
  }
}
