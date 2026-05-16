import { Icon } from "@iconify/react"

import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/shared/theme-provider"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)

  return (
    <Button
      variant='ghost'
      size='icon'
      className="size-10 cursor-pointer"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <Icon
        icon={
          isDark
            ? "line-md:moon-to-sunny-outline-loop-transition"
            : "line-md:sunny-outline-to-moon-loop-transition"
        }
        className='size-5'
      />
      <span className='sr-only'>Toggle theme</span>
    </Button>
  )
}
