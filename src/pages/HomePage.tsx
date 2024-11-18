import { ThemeToggle } from '@/components/features/ThemeToggle.tsx'

import { Button } from '@/components/ui/button.tsx'
import { useGeolocation } from 'react-use'
import { useWeather } from '@/hooks/useWeather.ts'
import { CurrentWeather } from '@/components/features/CurrentWeather.tsx'
import { Input } from '@/components/ui/input.tsx'
import { Label } from '@/components/ui/label.tsx'
import { CurrentWeatherSkeleton } from '@/components/features/CurrentWeatherSkeleton.tsx'
import { useEffect } from 'react'

export const HomePage = () => {
  const state = useGeolocation()

  const { latitude, longitude } = state

  const { weather, error, isLoading, fetchByCity, featchByCoords } = useWeather()

  useEffect(() => {
    if (latitude && longitude) {
      featchByCoords(latitude, longitude)
    }
  }, [latitude, longitude])

  return (
    <div className="min-h-screen">
      <div className="w-full max-w-md mx-auto p-4">
        <div className="rounded-lg bg-background shadow-lg p-6">
          <div className="flex justify-end">
            <ThemeToggle />
          </div>

          <h1 className="text-3xl font-semibold text-center">Weather App</h1>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.currentTarget)
              const city = formData.get('city') as string
              fetchByCity(city)
            }}
            className="my-4"
          >
            <div className="flex w-full max-w-sm items-end space-x-2">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="City">City</Label>
                <Input
                  type="text"
                  name="city"
                  className="mt-1 block w-full rounded-md dark:bg-gray-800"
                  placeholder="Enter a city"
                  required
                />
              </div>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Get Weather'}
              </Button>
            </div>
            {error && <p className="mt-4 text-red-500">{error}</p>}
          </form>
          {isLoading && <CurrentWeatherSkeleton />}
          {weather && <CurrentWeather weather={weather} />}
        </div>
      </div>
    </div>
  )
}
