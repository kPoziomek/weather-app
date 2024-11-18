import { ThemeToggle } from '@/components/features/ThemeToggle'

const App = () => {
  return (
    <div className="min-h-screen p-4 transition-colors duration-200 dark:bg-gray-900">
      <div className="max-w-md mx-auto">
        <ThemeToggle />
      </div>
    </div>
  )
}

export default App
