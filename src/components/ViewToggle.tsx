import { motion } from 'framer-motion';
import { LayoutGrid, List } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ViewToggleProps {
  view: 'grid' | 'list';
  onViewChange: (view: 'grid' | 'list') => void;
  className?: string;
}

export function ViewToggle({ view, onViewChange, className }: ViewToggleProps) {
  return (
    <div className={cn("flex items-center gap-1 p-1 rounded-lg bg-muted/50", className)}>
      <motion.button
        onClick={() => onViewChange('list')}
        className={cn(
          "p-1.5 rounded-md transition-colors",
          view === 'list' ? "bg-background shadow-sm" : "hover:bg-background/50"
        )}
        whileTap={{ scale: 0.95 }}
        title="List view"
      >
        <List className={cn("w-4 h-4", view === 'list' ? "text-foreground" : "text-muted-foreground")} />
      </motion.button>
      <motion.button
        onClick={() => onViewChange('grid')}
        className={cn(
          "p-1.5 rounded-md transition-colors",
          view === 'grid' ? "bg-background shadow-sm" : "hover:bg-background/50"
        )}
        whileTap={{ scale: 0.95 }}
        title="Grid view"
      >
        <LayoutGrid className={cn("w-4 h-4", view === 'grid' ? "text-foreground" : "text-muted-foreground")} />
      </motion.button>
    </div>
  );
}
