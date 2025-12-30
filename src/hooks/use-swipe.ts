import { useRef, TouchEvent } from 'react';

interface SwipeHandlers {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
}

interface SwipeState {
  onTouchStart: (e: TouchEvent) => void;
  onTouchMove: (e: TouchEvent) => void;
  onTouchEnd: () => void;
}

export function useSwipe(
  handlers: SwipeHandlers,
  threshold: number = 50
): SwipeState {
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const touchEnd = useRef<{ x: number; y: number } | null>(null);

  const onTouchStart = (e: TouchEvent) => {
    touchEnd.current = null;
    touchStart.current = {
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    };
  };

  const onTouchMove = (e: TouchEvent) => {
    touchEnd.current = {
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    };
  };

  const onTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return;

    const deltaX = touchStart.current.x - touchEnd.current.x;
    const deltaY = touchStart.current.y - touchEnd.current.y;
    const isHorizontal = Math.abs(deltaX) > Math.abs(deltaY);

    if (isHorizontal) {
      if (deltaX > threshold) {
        handlers.onSwipeLeft?.();
      } else if (deltaX < -threshold) {
        handlers.onSwipeRight?.();
      }
    } else {
      if (deltaY > threshold) {
        handlers.onSwipeUp?.();
      } else if (deltaY < -threshold) {
        handlers.onSwipeDown?.();
      }
    }

    touchStart.current = null;
    touchEnd.current = null;
  };

  return { onTouchStart, onTouchMove, onTouchEnd };
}
