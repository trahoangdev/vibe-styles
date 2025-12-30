import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeftRight } from 'lucide-react';
import { type DesignStyle } from '@/lib/designStyles';
import { cn } from '@/lib/utils';

interface CompareViewProps {
  isOpen: boolean;
  onClose: () => void;
  leftStyle: DesignStyle;
  rightStyle: DesignStyle | null;
  onSelectRight: () => void;
}

export function CompareView({
  isOpen,
  onClose,
  leftStyle,
  rightStyle,
  onSelectRight,
}: CompareViewProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div className="flex items-center gap-3">
            <ArrowLeftRight className="w-5 h-5 text-muted-foreground" />
            <h2 className="font-semibold">Compare Styles</h2>
          </div>
          <motion.button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
            whileTap={{ scale: 0.95 }}
          >
            <X className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Compare Grid */}
        <div className="flex h-[calc(100vh-65px)]">
          {/* Left Style */}
          <div className="flex-1 border-r border-border p-6 overflow-auto">
            <div className="mb-4">
              <h3 className="font-medium text-lg">{leftStyle.name}</h3>
              <p className="text-sm text-muted-foreground">{leftStyle.category}</p>
            </div>
            <StylePreviewCard style={leftStyle} />
          </div>

          {/* Right Style */}
          <div className="flex-1 p-6 overflow-auto">
            {rightStyle ? (
              <>
                <div className="mb-4">
                  <h3 className="font-medium text-lg">{rightStyle.name}</h3>
                  <p className="text-sm text-muted-foreground">{rightStyle.category}</p>
                </div>
                <StylePreviewCard style={rightStyle} />
              </>
            ) : (
              <motion.button
                onClick={onSelectRight}
                className="w-full h-full min-h-[300px] rounded-xl border-2 border-dashed border-border hover:border-muted-foreground/50 transition-colors flex flex-col items-center justify-center gap-3"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                  <ArrowLeftRight className="w-6 h-6 text-muted-foreground" />
                </div>
                <span className="text-muted-foreground font-medium">Select a style to compare</span>
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function StylePreviewCard({ style }: { style: DesignStyle }) {
  return (
    <div className="space-y-6">
      {/* Colors */}
      <div>
        <h4 className="text-sm font-medium mb-3 text-muted-foreground">Colors</h4>
        <div className="grid grid-cols-4 gap-2">
          {Object.entries(style.colors).slice(0, 8).map(([name, value]) => (
            <div key={name} className="space-y-1">
              <div
                className="w-full aspect-square rounded-lg border border-border"
                style={{ backgroundColor: `hsl(${value})` }}
              />
              <p className="text-[10px] text-muted-foreground truncate">{name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Typography */}
      <div>
        <h4 className="text-sm font-medium mb-3 text-muted-foreground">Typography</h4>
        <div className="space-y-2 p-4 rounded-lg bg-muted/30">
          <p style={{ fontFamily: style.fonts.heading }} className="text-xl font-bold">
            Heading Font
          </p>
          <p style={{ fontFamily: style.fonts.body }} className="text-sm">
            Body text using {style.fonts.body}
          </p>
        </div>
      </div>

      {/* Radius & Spacing */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm font-medium mb-3 text-muted-foreground">Border Radius</h4>
          <div
            className="w-full h-16 bg-muted/50 border border-border"
            style={{ borderRadius: style.radius }}
          />
          <p className="text-xs text-muted-foreground mt-1">{style.radius}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium mb-3 text-muted-foreground">Sample Button</h4>
          <button
            className="px-4 py-2 text-sm font-medium transition-colors"
            style={{
              backgroundColor: `hsl(${style.colors.primary})`,
              color: `hsl(${style.colors.primaryForeground})`,
              borderRadius: style.radius,
            }}
          >
            Button
          </button>
        </div>
      </div>
    </div>
  );
}
