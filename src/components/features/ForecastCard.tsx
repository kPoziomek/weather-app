import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card.tsx'

type Props = {
  day: {
    date: string
    temp: {
      max: number
      min: number
    }
    condition: string
    icon: string
  }
}
export const ForecastCard = ({ day }: Props) => {
  return (
    <Card className="flex items-center justify-between " key={day.date}>
      <CardHeader className="flex flex-col">
        <CardDescription>Day:</CardDescription>

        <CardTitle>{day.date}</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col pt-6">
        <CardDescription>Temperature:</CardDescription>

        <p>Max: {day.temp.max}°C</p>
        <p>Min: {day.temp.min}°C</p>
      </CardContent>

      <CardFooter className="flex flex-col pt-6">
        <CardDescription>{day.condition}</CardDescription>
        <img src={day.icon} alt={day.condition} />
      </CardFooter>
    </Card>
  )
}
