import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        'relative p-2 rounded-lg transition-all duration-300 hover:bg-muted group',
        className
      )}
      title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      <Sun className={cn(
        'w-5 h-5 transition-all duration-300',
        theme === 'light' 
          ? 'rotate-0 scale-100 text-amber-500' 
          : 'rotate-90 scale-0 absolute'
      )} />
      <Moon className={cn(
        'w-5 h-5 transition-all duration-300',
        theme === 'dark' 
          ? 'rotate-0 scale-100 text-blue-400' 
          : '-rotate-90 scale-0 absolute'
      )} />
    </button>
  );
}
