import { useEffect, useCallback } from 'react';

interface ShortcutHandler {
  key: string;
  ctrl?: boolean;
  meta?: boolean;
  shift?: boolean;
  handler: () => void;
  description: string;
}

export const shortcuts = [
  { key: 'k', ctrl: true, description: 'Focus search' },
  { key: 'z', ctrl: true, description: 'Undo theme change' },
  { key: 'z', ctrl: true, shift: true, description: 'Redo theme change' },
  { key: 'f', description: 'Toggle fullscreen' },
  { key: 'e', description: 'Toggle theme editor' },
  { key: 'd', description: 'Toggle dark mode' },
  { key: 'Escape', description: 'Close panel / Exit fullscreen' },
  { key: '?', shift: true, description: 'Show keyboard shortcuts' },
  { key: 'ArrowUp', description: 'Previous style' },
  { key: 'ArrowDown', description: 'Next style' },
];

export function useKeyboardShortcuts(handlers: ShortcutHandler[]) {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    // Ignore if typing in input
    const target = event.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT') {
      if (event.key !== 'Escape') return;
    }

    for (const shortcut of handlers) {
      const ctrlOrMeta = shortcut.ctrl || shortcut.meta;
      const hasModifier = ctrlOrMeta ? (event.ctrlKey || event.metaKey) : true;
      const hasShift = shortcut.shift ? event.shiftKey : !event.shiftKey || event.key === '?';
      
      if (
        event.key.toLowerCase() === shortcut.key.toLowerCase() &&
        hasModifier &&
        hasShift
      ) {
        event.preventDefault();
        shortcut.handler();
        return;
      }
    }
  }, [handlers]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}
