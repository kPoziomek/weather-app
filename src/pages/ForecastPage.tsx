import { useState } from 'react'
import { ForecastDay } from '@/types/weather.tsx'
import { weatherService } from '@/services/weather.ts'

export const ForecastPage = () => {
  const city = 'London'
  const [weather, setWeather] = useState<ForecastDay[]>([])
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
      setWeather(data)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return <div></div>
}
