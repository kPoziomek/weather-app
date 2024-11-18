export const CurrentWeatherSkeleton = () => {
  return (
    <div className="w-[350px] bg-background shadow rounded-md animate-pulse">
      <div className="p-4">
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
      <div className="p-4 flex justify-between items-center">
        <div className="w-12 h-12 bg-gray-200 rounded"></div>
        <div>
          <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        </div>
      </div>
      <div className="p-4">
        <div className="h-8 bg-gray-200 rounded w-full"></div>
      </div>
    </div>
  )
}
