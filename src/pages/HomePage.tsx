import { ThemeToggle } from '@/components/features/ThemeToggle.tsx'
import { useState } from 'react'
import { WeatherData } from '@/types/weather.tsx'
import { weatherService } from '@/services/weather.ts'
import { Button } from '@/components/ui/button.tsx'

export const HomePage = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const fetchWeather = async (city: string) => {
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
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen p-4 transition-colors duration-200 dark:bg-gray-900">
      <div className="max-w-md mx-auto">
        <ThemeToggle />

        <h1 className="text-3xl font-semibold text-center">Weather</h1>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            const formData = new FormData(e.currentTarget)
            const city = formData.get('city') as string
            fetchWeather(city)
          }}
          className="mt-4"
        >
          <label className="block">
            <span className="text-gray-700">City</span>
            <input
              type="text"
              name="city"
              className="mt-1 block w-full rounded-md dark:bg-gray-800"
              placeholder="Enter a city"
              required
            />
          </label>
          <Button type="submit" className="mt-2 px-4 py-2" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Get Weather'}
          </Button>

          {error && <p className="mt-4 text-red-500">{error}</p>}
        </form>

        {weather && (
          <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
            <h2 className="text-xl font-semibold">{weather.city}</h2>
            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="text-2xl font-semibold">{weather.current.temp}°C</p>
                <p>{weather.current.condition}</p>
              </div>
              <img
                src={weather.current.icon}
                alt={weather.current.condition}
                className="w-12 h-12"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
