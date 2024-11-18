import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { WeatherData } from '@/types/weather.tsx'
import { Button } from '@/components/ui/button.tsx'
import { Link } from 'react-router-dom'

type Props = {
  weather: WeatherData
}

export const CurrentWeather = ({ weather }: Props) => {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{weather.city}</CardTitle>
        <CardDescription>
          <p>Feels like {weather.current.feelsLike}°C</p>
          <p>Humidity {weather.current.humidity}%</p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <p className="text-2xl font-semibold">{weather.current.temp}°C</p>
          <p>{weather.current.condition}</p>
        </div>
        <img src={weather.current.icon} alt={weather.current.condition} className="w-12 h-12" />
      </CardContent>
      <CardFooter>
        <Button asChild>
          <Link to={`/forecast/${weather.city}`}>More details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
