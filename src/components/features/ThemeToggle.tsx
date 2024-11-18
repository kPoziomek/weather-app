import { useTheme } from '@/hooks/useTheme.ts'
import { Button } from '@/components/ui/button.tsx'

export const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme()

  return <Button onClick={toggleTheme}>{isDark ? 'Light Mode' : 'Dark Mode'}</Button>
}
