import { Search, Frown, Star, FolderOpen, type LucideIcon } from 'lucide-react';
import { Button } from './ui/button';
import { motion } from 'framer-motion';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: 'search' | 'empty' | 'favorites' | 'folder';
  action?: {
    label: string;
    onClick: () => void;
  };
}

const iconMap: Record<string, LucideIcon> = {
  search: Search,
  empty: Frown,
  favorites: Star,
  folder: FolderOpen,
};

export function EmptyState({
  title = 'No results found',
  description = 'Try adjusting your search or filter criteria',
  icon = 'search',
  action
}: EmptyStateProps) {
  const Icon = iconMap[icon] || Search;

  return (
    <motion.div 
      className="flex flex-col items-center justify-center py-12 px-4 text-center"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        className="w-16 h-16 rounded-2xl bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center mb-5 shadow-soft"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
      >
        <Icon className="w-7 h-7 text-muted-foreground" />
      </motion.div>
      <motion.h3 
        className="font-semibold text-foreground mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
      >
        {title}
      </motion.h3>
      <motion.p 
        className="text-sm text-muted-foreground text-center max-w-xs mb-6 leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {description}
      </motion.p>

      {action && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <Button onClick={action.onClick} variant="outline" className="rounded-xl">
            {action.label}
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
}
