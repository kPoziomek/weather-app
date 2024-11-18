import { useTheme } from '@/hooks/useTheme.ts'

export const ThemeToggle = () => {
  const {isDark, toggleTheme} = useTheme()

  return(
    <button className={`px-4 py-2 rounded-md ${
      isDark ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'
    }`} onClick={toggleTheme}>
      {isDark ? 'Light Mode' : 'Dark Mode'}
    </button>
  )
}
