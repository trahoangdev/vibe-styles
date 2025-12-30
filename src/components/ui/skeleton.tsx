import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div 
      className={cn(
        "animate-pulse rounded-md bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200%_100%]",
        className
      )} 
      {...props} 
    />
  );
}

// Pre-built skeleton variants for common use cases
function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-xl border border-border/50 p-4 space-y-3", className)}>
      <Skeleton className="h-32 w-full rounded-lg" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
    </div>
  );
}

function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton 
          key={i} 
          className="h-3" 
          style={{ width: `${Math.random() * 40 + 60}%` }} 
        />
      ))}
    </div>
  );
}

function SkeletonAvatar({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-14 h-14",
  };
  return <Skeleton className={cn("rounded-full", sizes[size])} />;
}

function SkeletonButton({ className }: { className?: string }) {
  return <Skeleton className={cn("h-10 w-24 rounded-lg", className)} />;
}

export { Skeleton, SkeletonCard, SkeletonText, SkeletonAvatar, SkeletonButton };
