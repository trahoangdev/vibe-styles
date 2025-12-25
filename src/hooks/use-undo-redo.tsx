import { useState, useCallback, useRef } from 'react';

const MAX_HISTORY_SIZE = 50;

export function useUndoRedo<T>(initialState: T) {
  const [state, setState] = useState<T>(initialState);
  const historyRef = useRef<T[]>([initialState]);
  const currentIndexRef = useRef(0);

  const pushState = useCallback((newState: T) => {
    // Remove any future states if we're not at the end
    historyRef.current = historyRef.current.slice(0, currentIndexRef.current + 1);
    
    // Add the new state
    historyRef.current.push(newState);
    
    // Limit history size
    if (historyRef.current.length > MAX_HISTORY_SIZE) {
      historyRef.current = historyRef.current.slice(-MAX_HISTORY_SIZE);
    }
    
    currentIndexRef.current = historyRef.current.length - 1;
    setState(newState);
  }, []);

  const undo = useCallback(() => {
    if (currentIndexRef.current > 0) {
      currentIndexRef.current -= 1;
      setState(historyRef.current[currentIndexRef.current]);
    }
  }, []);

  const redo = useCallback(() => {
    if (currentIndexRef.current < historyRef.current.length - 1) {
      currentIndexRef.current += 1;
      setState(historyRef.current[currentIndexRef.current]);
    }
  }, []);

  const reset = useCallback((resetState: T) => {
    historyRef.current = [resetState];
    currentIndexRef.current = 0;
    setState(resetState);
  }, []);

  const canUndo = currentIndexRef.current > 0;
  const canRedo = currentIndexRef.current < historyRef.current.length - 1;
  const historyLength = historyRef.current.length;
  const currentIndex = currentIndexRef.current;

  return {
    state,
    pushState,
    undo,
    redo,
    reset,
    canUndo,
    canRedo,
    historyLength,
    currentIndex,
  };
}
