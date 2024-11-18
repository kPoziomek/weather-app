import {
  ForecastDay,
  OpenWeatherForecastItem,
  OpenWeatherForecastResponse,
  OpenWeatherResponse,
  WeatherData,
  WeatherError
} from '@/types/weather.tsx'

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY

export class WeatherService {
  private cache: Map<string, WeatherData> = new Map()
  private readonly CACHE_DURATION = 10 * 60 * 1000
  private readonly BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?'
  private readonly FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast?'

  async getCurrentWeather(city: string): Promise<WeatherData> {
    try {
      const cached = this.cache.get(city)
      if (cached && Date.now() - cached.lastUpdated < this.CACHE_DURATION) {
        return cached
      }

      const data = await this.fetchData<OpenWeatherResponse>(this.BASE_URL, city)
      const weatherData = this.mapWeatherData(data)

      this.cache.set(city, weatherData)
      return weatherData
    } catch (error) {
      throw error
    }
  }

  async getForecast(city: string): Promise<ForecastDay[]> {
    try {
      const data = await this.fetchData<OpenWeatherForecastResponse>(this.FORECAST_URL, city)

      const dailyForecasts = this.groupByDay(data.list)

      return dailyForecasts
    } catch (error) {
      this.handleError(error)
    }
  }

  private async fetchData<T>(FETCH_URL: string, city: string): Promise<T> {
    try {
      const url = `${FETCH_URL}q=${city}&appid=${API_KEY}&units=metric`
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`Weather API Error: ${response.statusText}`)
      }
      return response.json()
    } catch (error) {
      throw {
        message: 'Failed to fetch weather data',
        code: error instanceof Error ? error.message : 'UNKNOWN_ERROR'
      } as WeatherError
    }
  }

  async getCurrentCity(city: string): Promise<WeatherData> {
    try {
      const data = await this.fetchData<OpenWeatherResponse>(this.BASE_URL, city)
      return this.mapWeatherData(data)
    } catch (error) {
      throw error
    }
  }

  private mapWeatherData(data: OpenWeatherResponse): WeatherData {
    return {
      city: data.name,
      current: {
        temp: Math.round(data?.main?.temp) || 0,
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind.speed * 10) / 10,
        condition: data.weather[0].main,
        icon: this.getIconUrl(data.weather[0].icon)
      },
      lastUpdated: new Date()
    }
  }

  private groupByDay(data: OpenWeatherForecastItem[]): ForecastDay[] {
    const forecastByDay = data.reduce(
      (acc, item) => {
        const date = new Date(item.dt * 1000).toISOString().split('T')[0]

        if (!acc[date]) {
          acc[date] = []
        }
        acc[date].push(item)
        return acc
      },
      {} as Record<string, OpenWeatherForecastItem[]>
    )

    return Object.entries(forecastByDay).map(([date, items]) => {
      const middayForecast = this.findMiddayForecast(items)

      const minMax = items.reduce(
        (acc, item) => ({
          min: Math.round(Math.min(acc.min, item.main.temp_min)),
          max: Math.round(Math.max(acc.max, item.main.temp_max))
        }),
        { min: Infinity, max: -Infinity }
      )

      return {
        date,
        temp: {
          min: minMax.min,
          max: minMax.max
        },
        condition: middayForecast.weather[0].main,
        icon: this.getIconUrl(middayForecast.weather[0].icon)
      }
    })
  }

  private findMiddayForecast(items: OpenWeatherForecastItem[]): OpenWeatherForecastItem {
    return items.reduce((closest, item) => {
      const itemHour = new Date(item.dt * 1000).getHours()
      const closestHour = new Date(closest.dt * 1000).getHours()

      return Math.abs(itemHour - 12) < Math.abs(closestHour - 12) ? item : closest
    }, items[0])
  }

  private handleError(error: unknown): never {
    throw {
      message: 'Failed to fetch weather data',
      code: error instanceof Error ? error.message : 'UNKNOWN_ERROR'
    } as WeatherError
  }

  private getIconUrl(icon: string): string {
    return `https://openweathermap.org/img/wn/${icon}.png`
  }
}
export const weatherService = new WeatherService()
