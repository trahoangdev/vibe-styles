import { X, Command } from 'lucide-react';
import { shortcuts } from '@/hooks/use-keyboard-shortcuts';

interface KeyboardShortcutsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function KeyboardShortcutsPanel({ isOpen, onClose }: KeyboardShortcutsPanelProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-card border border-border rounded-xl shadow-medium w-full max-w-md mx-4 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Command className="w-5 h-5 text-muted-foreground" />
            <h2 className="font-semibold">Keyboard Shortcuts</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-muted transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        
        <div className="p-4 space-y-2 max-h-[60vh] overflow-y-auto">
          {shortcuts.map((shortcut, i) => (
            <div 
              key={i}
              className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <span className="text-sm text-foreground">{shortcut.description}</span>
              <kbd className="inline-flex items-center gap-1 px-2 py-1 text-xs font-mono bg-muted rounded-md border border-border">
                {shortcut.ctrl && (
                  <>
                    <span className="text-muted-foreground">⌘</span>
                    <span className="text-muted-foreground">+</span>
                  </>
                )}
                {shortcut.shift && (
                  <>
                    <span className="text-muted-foreground">⇧</span>
                    <span className="text-muted-foreground">+</span>
                  </>
                )}
                <span className="uppercase">{shortcut.key === 'ArrowUp' ? '↑' : shortcut.key === 'ArrowDown' ? '↓' : shortcut.key}</span>
              </kbd>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            Press <kbd className="px-1.5 py-0.5 text-xs bg-muted rounded border border-border">Esc</kbd> to close
          </p>
        </div>
      </div>
    </div>
  );
}
