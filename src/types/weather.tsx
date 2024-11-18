export interface OpenWeatherResponse {
  main: {
    temp: number
    humidity: number
    feels_like: number
  }
  wind: {
    speed: number
  }
  weather: Array<{
    main: string
    icon: string
  }>
  name: string
}

export interface CurrentWeather {
  temp: number
  humidity: number
  windSpeed: number
  condition: string
  feelsLike: number
  icon: string
}

export interface Forecast {
  date: string
  temp: {
    min: number
    max: number
  }
  condition: string
  icon: string
}

export interface OpenWeatherForecastItem {
  dt: number
  main: {
    temp: number
    temp_min: number
    temp_max: number
    humidity: number
  }
  weather: Array<{
    main: string
    icon: string
  }>
  wind: {
    speed: number
  }
  dt_txt: string
}

export interface OpenWeatherForecastResponse {
  list: OpenWeatherForecastItem[]
  city: {
    name: string
  }
}

export interface ForecastDay {
  date: string
  temp: {
    min: number
    max: number
  }
  condition: string
  icon: string
}

export interface WeatherData {
  city: string
  current: CurrentWeather
  forecast?: ForecastDay[]
  lastUpdated: Date
}

export type WeatherError = {
  message: string
  code?: string
}
