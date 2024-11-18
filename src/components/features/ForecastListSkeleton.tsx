export const ForecastListSkeleton = () => {
  return (
    <div>
      {Array.from({ length: 5 }, (_, i) => (
        <div
          key={i}
          className="flex justify-between bg-background shadow rounded-md animate-pulse mb-3"
        >
          <div className="p-4 flex justify-between items-center">
            <div className="w-12 h-12 bg-gray-200 rounded"></div>
            <div>
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            </div>
          </div>
          <div className="p-4 flex justify-between items-center">
            <div className="w-12 h-12 bg-gray-200 rounded"></div>
            <div>
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            </div>
          </div>
          <div className="p-4 flex justify-between items-center">
            <div className="w-12 h-12 bg-gray-200 rounded"></div>
            <div>
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
