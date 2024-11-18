import { ForecastCard } from '@/components/features/ForecastCard.tsx'
import { ForecastDay } from '@/types/weather.tsx'

type Props = {
  forecast: ForecastDay[]
}

export const ForecastList = ({ forecast }: Props) => {
  return (
    <div className="flex flex-col gap-2 mx-auto h-full w-full max-w-3xl rounded-xl bg-muted/50">
      {forecast && forecast.map((day) => <ForecastCard key={day.date} day={day} />)}
    </div>
  )
}
