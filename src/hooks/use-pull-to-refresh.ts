import { useState, useRef, useCallback, TouchEvent } from 'react';

interface PullToRefreshOptions {
  onRefresh: () => void | Promise<void>;
  threshold?: number;
  maxPull?: number;
}

interface PullToRefreshState {
  isPulling: boolean;
  isRefreshing: boolean;
  pullDistance: number;
  handlers: {
    onTouchStart: (e: TouchEvent) => void;
    onTouchMove: (e: TouchEvent) => void;
    onTouchEnd: () => void;
  };
}

export function usePullToRefresh({
  onRefresh,
  threshold = 80,
  maxPull = 120,
}: PullToRefreshOptions): PullToRefreshState {
  const [isPulling, setIsPulling] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const startY = useRef<number | null>(null);
  const currentY = useRef<number | null>(null);

  const onTouchStart = useCallback((e: TouchEvent) => {
    // Only start pull if at top of scroll
    const target = e.currentTarget as HTMLElement;
    if (target.scrollTop > 0) return;
    
    startY.current = e.touches[0].clientY;
    setIsPulling(true);
  }, []);

  const onTouchMove = useCallback((e: TouchEvent) => {
    if (!startY.current || isRefreshing) return;
    
    currentY.current = e.touches[0].clientY;
    const diff = currentY.current - startY.current;
    
    if (diff > 0) {
      // Apply resistance to pull
      const resistance = 0.5;
      const distance = Math.min(diff * resistance, maxPull);
      setPullDistance(distance);
    }
  }, [isRefreshing, maxPull]);

  const onTouchEnd = useCallback(async () => {
    if (!startY.current || isRefreshing) return;
    
    if (pullDistance >= threshold) {
      setIsRefreshing(true);
      try {
        await onRefresh();
      } finally {
        setIsRefreshing(false);
      }
    }
    
    startY.current = null;
    currentY.current = null;
    setPullDistance(0);
    setIsPulling(false);
  }, [pullDistance, threshold, onRefresh, isRefreshing]);

  return {
    isPulling,
    isRefreshing,
    pullDistance,
    handlers: {
      onTouchStart,
      onTouchMove,
      onTouchEnd,
    },
  };
}
