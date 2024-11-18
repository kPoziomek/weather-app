import { useEffect } from 'react'

import { Link, useParams } from 'react-router-dom'
import { useForecast } from '@/hooks/useForecast.ts'
import { CircleLoader } from 'react-spinners'
import { Separator } from '@/components/ui/separator.tsx'
import { ForecastList } from '@/components/features/ForecastList.tsx'
import { ThemeToggle } from '@/components/features/ThemeToggle.tsx'
import { Button } from '@/components/ui/button.tsx'
import { ForecastListSkeleton } from '@/components/features/ForecastListSkeleton.tsx'

export const ForecastPage = () => {
  const { city } = useParams<{ city: string }>()
  const { forecast, error, isLoading, fetchForecast } = useForecast()

  useEffect(() => {
    if (city) {
      fetchForecast(city)
    }
  }, [city])

  return (
    <div className="min-h-screen">
      <div className="w-full max-w-md mx-auto p-4">
        <div className="rounded-lg shadow-lg p-6">
          {isLoading && <CircleLoader />}
          {error && <p>{error}</p>}
          <div className="flex justify-between">
            <Button variant="outline">
              <Link to="/">Back</Link>
            </Button>
            <ThemeToggle />
          </div>
          <div className="flex flex-1 flex-col gap-4 px-4 py-10">
            <div className="flex flex-col gap-2.5">
              <div className="mx-auto h-24 px-2.5 w-full max-w-3xl rounded-xl bg-muted/50">
                <h1 className="text-3xl font-semibold">{city}</h1>
                <Separator className="my-2 w-3/4 mx-auto" />
                <h3 className="text-xl font-semibold">
                  {forecast && forecast.length} Day Forecast
                </h3>
              </div>
              {isLoading && <ForecastListSkeleton />}
              {forecast && <ForecastList forecast={forecast} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
