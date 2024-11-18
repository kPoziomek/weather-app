import { useTheme } from '@/hooks/useTheme.ts'
import { Button } from '@/components/ui/button.tsx'
import Moon from '@/assets/Moon.svg?react'
import Sun from '@/assets/Sun.svg?react'

export const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme()

  return (
    <Button variant="outline" onClick={toggleTheme}>
      {isDark ? <Sun /> : <Moon />}
    </Button>
  )
}
