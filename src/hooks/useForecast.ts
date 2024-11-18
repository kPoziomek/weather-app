import { useState } from 'react'
import { ForecastDay } from '@/types/weather.tsx'
import { weatherService } from '@/services/weather.ts'
import { useErrorHandler } from '@/hooks/useErrorHandler.ts'

export const useForecast = () => {
  const handleError = useErrorHandler()
  const [forecast, setForecast] = useState<ForecastDay[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const fetchForecast = async (city: string) => {
    try {
      setIsLoading(true)
      setError(null)
      const data = await weatherService.getForecast(city)
      if (!data) {
        setError('No data available')
        return
      }
      setForecast(data)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred')
      handleError(error)
    } finally {
      setIsLoading(false)
    }
  }

  return { forecast, error, isLoading, fetchForecast }
}
