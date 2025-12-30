import { motion } from 'framer-motion';
import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ZoomControlsProps {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  min?: number;
  max?: number;
  className?: string;
}

export function ZoomControls({
  zoom,
  onZoomIn,
  onZoomOut,
  onReset,
  min = 50,
  max = 150,
  className,
}: ZoomControlsProps) {
  const canZoomIn = zoom < max;
  const canZoomOut = zoom > min;
  const isDefault = zoom === 100;

  return (
    <div className={cn("flex items-center gap-1 p-1 rounded-lg bg-muted/50 backdrop-blur-sm", className)}>
      <motion.button
        onClick={onZoomOut}
        disabled={!canZoomOut}
        className={cn(
          "p-1.5 rounded-md transition-colors",
          canZoomOut ? "hover:bg-background/50" : "opacity-40 cursor-not-allowed"
        )}
        whileTap={canZoomOut ? { scale: 0.95 } : {}}
        title="Zoom out"
      >
        <ZoomOut className="w-4 h-4 text-muted-foreground" />
      </motion.button>
      
      <motion.button
        onClick={onReset}
        className={cn(
          "px-2 py-1 rounded-md text-xs font-medium min-w-[3rem] transition-colors",
          isDefault ? "text-muted-foreground" : "text-foreground hover:bg-background/50"
        )}
        whileTap={{ scale: 0.95 }}
        title="Reset zoom"
      >
        {zoom}%
      </motion.button>
      
      <motion.button
        onClick={onZoomIn}
        disabled={!canZoomIn}
        className={cn(
          "p-1.5 rounded-md transition-colors",
          canZoomIn ? "hover:bg-background/50" : "opacity-40 cursor-not-allowed"
        )}
        whileTap={canZoomIn ? { scale: 0.95 } : {}}
        title="Zoom in"
      >
        <ZoomIn className="w-4 h-4 text-muted-foreground" />
      </motion.button>
    </div>
  );
}
