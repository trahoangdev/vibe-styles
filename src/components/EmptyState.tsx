import { Search, Frown } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: 'search' | 'empty';
}

export function EmptyState({ 
  title = 'No results found', 
  description = 'Try adjusting your search or filter criteria',
  icon = 'search'
}: EmptyStateProps) {
  const Icon = icon === 'search' ? Search : Frown;
  
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 animate-fade-in">
      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-muted-foreground" />
      </div>
      <h3 className="font-medium text-foreground mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground text-center max-w-xs">{description}</p>
    </div>
  );
}
