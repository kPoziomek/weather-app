import { useState } from 'react'
import { WeatherData } from '@/types/weather.tsx'
import { weatherService } from '@/services/weather.ts'
import { useErrorHandler } from '@/hooks/useErrorHandler.ts'

export const useWeather = () => {
  const handleError = useErrorHandler()
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const fetchByCity = async (city: string) => {
    try {
      setIsLoading(true)
      setError(null)
      const data = await weatherService.getCurrentWeather(city)
      if (!data) {
        setError('No data available')
        return
      }
      setWeather(data)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred')
      handleError(error)
    } finally {
      setIsLoading(false)
    }
  }

  const featchByCoords = async (latitude: number, longitude: number) => {
    try {
      setIsLoading(true)
      setError(null)
      const data = await weatherService.getCurrentCity(latitude, longitude)
      if (!data) {
        setError('No data available')
        return
      }
      setWeather(data)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred')
      handleError(error)
    } finally {
      setIsLoading(false)
    }
  }

  return { weather, error, isLoading, fetchByCity, featchByCoords }
}
