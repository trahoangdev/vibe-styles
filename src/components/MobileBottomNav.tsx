import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Sliders, Star, Command, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MobileBottomNavProps {
  onOpenStyles: () => void;
  onOpenEditor: () => void;
  onOpenFavorites: () => void;
  onOpenCommand: () => void;
  isEditorOpen: boolean;
  activeTab?: 'styles' | 'editor' | 'favorites' | 'command';
}

export function MobileBottomNav({
  onOpenStyles,
  onOpenEditor,
  onOpenFavorites,
  onOpenCommand,
  isEditorOpen,
  activeTab = 'styles',
}: MobileBottomNavProps) {
  const navItems = [
    { id: 'styles', icon: Menu, label: 'Styles', onClick: onOpenStyles },
    { id: 'favorites', icon: Star, label: 'Favorites', onClick: onOpenFavorites },
    { id: 'editor', icon: Sliders, label: 'Editor', onClick: onOpenEditor },
    { id: 'command', icon: Command, label: 'Command', onClick: onOpenCommand },
  ];

  return (
    <motion.nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-xl border-t border-border safe-area-bottom"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const isActive = activeTab === item.id || (item.id === 'editor' && isEditorOpen);
          
          return (
            <motion.button
              key={item.id}
              onClick={item.onClick}
              className={cn(
                "flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-colors relative",
                isActive ? "text-foreground" : "text-muted-foreground"
              )}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    className="absolute inset-0 bg-muted rounded-xl"
                    layoutId="activeTab"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </AnimatePresence>
              <item.icon className={cn("w-5 h-5 relative z-10", isActive && "text-foreground")} />
              <span className="text-[10px] font-medium relative z-10">{item.label}</span>
            </motion.button>
          );
        })}
      </div>
    </motion.nav>
  );
}
