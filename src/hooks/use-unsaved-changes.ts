import { useEffect } from 'react';

/**
 * Hook to warn users before leaving the page with unsaved changes
 */
export function useUnsavedChanges(hasChanges: boolean, message?: string) {
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasChanges) {
        const confirmMessage = message || 'You have unsaved changes. Are you sure you want to leave?';
        e.preventDefault();
        e.returnValue = confirmMessage;
        return confirmMessage;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasChanges, message]);
}
