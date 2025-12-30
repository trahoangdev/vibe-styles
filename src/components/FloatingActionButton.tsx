import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Sliders, Copy, Palette, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface FABAction {
  icon: React.ElementType;
  label: string;
  onClick: () => void;
  color?: string;
}

interface FloatingActionButtonProps {
  onOpenEditor: () => void;
  onCopyStyle: () => void;
  onRandomize: () => void;
  className?: string;
}

export function FloatingActionButton({
  onOpenEditor,
  onCopyStyle,
  onRandomize,
  className,
}: FloatingActionButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const actions: FABAction[] = [
    { icon: Sliders, label: 'Editor', onClick: onOpenEditor, color: 'bg-blue-500' },
    { icon: Copy, label: 'Copy', onClick: onCopyStyle, color: 'bg-emerald-500' },
    { icon: Palette, label: 'Random', onClick: onRandomize, color: 'bg-amber-500' },
  ];

  return (
    <div className={cn("fixed bottom-24 right-4 z-40 md:hidden", className)}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute bottom-16 right-0 flex flex-col gap-3"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            {actions.map((action, index) => (
              <motion.button
                key={action.label}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-full shadow-lg text-white text-sm font-medium",
                  action.color
                )}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => {
                  action.onClick();
                  setIsOpen(false);
                }}
                whileTap={{ scale: 0.95 }}
              >
                <action.icon className="w-4 h-4" />
                {action.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className={cn(
          "w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-colors",
          isOpen 
            ? "bg-zinc-700 dark:bg-zinc-300" 
            : "bg-zinc-900 dark:bg-white"
        )}
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.95 }}
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{ duration: 0.2 }}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white dark:text-zinc-900" />
        ) : (
          <Plus className="w-6 h-6 text-white dark:text-zinc-900" />
        )}
      </motion.button>
    </div>
  );
}
