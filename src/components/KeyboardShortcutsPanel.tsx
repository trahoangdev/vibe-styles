import { X, Command } from 'lucide-react';
import { shortcuts } from '@/hooks/use-keyboard-shortcuts';
import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface KeyboardShortcutsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function KeyboardShortcutsPanel({ isOpen, onClose }: KeyboardShortcutsPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Focus trap and escape key handler
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    // Focus the panel when opened
    panelRef.current?.focus();

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Group shortcuts by category
  const groupedShortcuts = {
    navigation: shortcuts.filter(s => ['ArrowUp', 'ArrowDown', 'Escape'].includes(s.key)),
    editing: shortcuts.filter(s => s.ctrl && ['z', 'y'].includes(s.key.toLowerCase())),
    interface: shortcuts.filter(s => ['f', 'e', 'd', 'k', '?'].includes(s.key.toLowerCase())),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            ref={panelRef}
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', duration: 0.3 }}
            className="relative bg-card border border-border rounded-2xl shadow-2xl w-full max-w-lg mx-4 outline-none"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-muted">
                  <Command className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <h2 className="font-semibold text-lg">Keyboard Shortcuts</h2>
                  <p className="text-xs text-muted-foreground">Navigate faster with shortcuts</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-muted transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-5 space-y-6 max-h-[60vh] overflow-y-auto">
              {/* Interface */}
              <div>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Interface</h3>
                <div className="space-y-1">
                  {groupedShortcuts.interface.map((shortcut, i) => (
                    <ShortcutRow key={i} shortcut={shortcut} />
                  ))}
                </div>
              </div>

              {/* Editing */}
              <div>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Editing</h3>
                <div className="space-y-1">
                  {groupedShortcuts.editing.map((shortcut, i) => (
                    <ShortcutRow key={i} shortcut={shortcut} />
                  ))}
                </div>
              </div>

              {/* Navigation */}
              <div>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Navigation</h3>
                <div className="space-y-1">
                  {groupedShortcuts.navigation.map((shortcut, i) => (
                    <ShortcutRow key={i} shortcut={shortcut} />
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-border bg-muted/30 rounded-b-2xl">
              <p className="text-xs text-muted-foreground text-center">
                Press <kbd className="px-1.5 py-0.5 text-xs bg-background rounded border border-border font-mono">Esc</kbd> or click outside to close
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function ShortcutRow({ shortcut }: { shortcut: typeof shortcuts[0] }) {
  const keyDisplay = shortcut.key === 'ArrowUp' ? '↑' 
    : shortcut.key === 'ArrowDown' ? '↓' 
    : shortcut.key === 'Escape' ? 'Esc'
    : shortcut.key.toUpperCase();

  return (
    <div className="flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-muted/50 transition-colors group">
      <span className="text-sm text-foreground group-hover:text-foreground">{shortcut.description}</span>
      <kbd className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-mono bg-muted rounded-lg border border-border">
        {shortcut.ctrl && (
          <>
            <span className="text-muted-foreground">⌘</span>
          </>
        )}
        {shortcut.shift && (
          <>
            <span className="text-muted-foreground">⇧</span>
          </>
        )}
        <span>{keyDisplay}</span>
      </kbd>
    </div>
  );
}
