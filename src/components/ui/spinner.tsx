import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
};

export function Spinner({ size = "md", className }: SpinnerProps) {
  return (
    <motion.div
      className={cn("relative", sizes[size], className)}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    >
      <div className="absolute inset-0 rounded-full border-2 border-muted" />
      <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-foreground" />
    </motion.div>
  );
}

// Dots spinner variant
export function DotsSpinner({ className }: { className?: string }) {
  return (
    <div className={cn("flex gap-1", className)}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full bg-foreground"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Pulse spinner variant
export function PulseSpinner({ size = "md", className }: SpinnerProps) {
  return (
    <motion.div
      className={cn(
        "rounded-full bg-foreground/20",
        sizes[size],
        className
      )}
      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

// Loading overlay
export function LoadingOverlay({ message = "Loading..." }: { message?: string }) {
  return (
    <motion.div
      className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Spinner size="lg" />
      <p className="mt-4 text-sm text-muted-foreground">{message}</p>
    </motion.div>
  );
}
