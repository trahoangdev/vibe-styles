import { designStyles, styleCategories, type DesignStyle, type StyleCategory } from '@/lib/designStyles';
import { cn } from '@/lib/utils';
import {
  Copy, Check, Search, X, ChevronLeft, ChevronRight, Keyboard, Star,
  Feather, Minus, Square, Newspaper, Layers,
  Hexagon, User, Cpu, BookOpen, Moon, Sparkles, Grid3X3,
  type LucideIcon
} from 'lucide-react';
import {
  SiApple,
  SiSpotify,
  SiNotion,
  SiGithub,
  SiStripe,
  SiVercel,
  SiDribbble,
  SiDiscord,
  SiTailwindcss
} from '@icons-pack/react-simple-icons';
import { useState, useMemo, useRef, forwardRef, useImperativeHandle } from 'react';
import { EmptyState } from './EmptyState';
import { ThemeToggle } from './ThemeToggle';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import { useThemeStore } from '@/store/themeStore';
import { hslToHex } from '@/lib/colorUtils';

// Union type for icons
type IconType = LucideIcon | React.ComponentType<{ color?: string, size?: string | number, className?: string }>;

// Map icon names to components
const iconMap: Record<string, IconType> = {
  'apple': SiApple,
  'music': SiSpotify,
  'feather': Feather,
  'minus': Minus,
  'square': Square,
  'newspaper': Newspaper,
  'layers': Layers,
  'wind': SiTailwindcss,
  'hexagon': Hexagon,
  'file-text': SiNotion,
  'github': SiGithub,
  'message-circle': SiDiscord,
  'credit-card': SiStripe,
  'triangle': SiVercel,
  'dribbble': SiDribbble,
  'user': User,
};

// Category icons
const categoryIcons: Record<string, LucideIcon> = {
  'all': Grid3X3,
  'tech': Cpu,
  'editorial': BookOpen,
  'dark': Moon,
  'minimalist': Sparkles,
};

const StyleIcon = ({ iconName, className }: { iconName: string; className?: string }) => {
  const IconComponent = iconMap[iconName];
  if (!IconComponent) return <span className={className}>{iconName}</span>;
  return <IconComponent className={className} />;
};

// Mini color palette preview component
const ColorPalettePreview = ({ style }: { style: DesignStyle }) => {
  const colors = [
    style.colors.primary,
    style.colors.accent,
    style.colors.background,
    style.colors.foreground,
  ];
  
  return (
    <div className="flex gap-0.5 mt-1.5">
      {colors.map((color, i) => (
        <div
          key={i}
          className="w-3 h-3 rounded-sm border border-border/30"
          style={{ backgroundColor: `hsl(${color})` }}
          title={hslToHex(color)}
        />
      ))}
    </div>
  );
};

interface StyleSidebarProps {
  selectedStyle: DesignStyle;
  onSelectStyle: (style: DesignStyle) => void;
  onCopyStyle: () => void;
  onShowShortcuts?: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export interface StyleSidebarRef {
  focusSearch: () => void;
}

export const StyleSidebar = forwardRef<StyleSidebarRef, StyleSidebarProps>(({
  selectedStyle,
  onSelectStyle,
  onCopyStyle,
  onShowShortcuts,
  isCollapsed = false,
  onToggleCollapse
}, ref) => {
  const [copied, setCopied] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<StyleCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLElement>(null);
  const { favoriteStyleIds, toggleFavorite } = useThemeStore();

  useImperativeHandle(ref, () => ({
    focusSearch: () => {
      searchInputRef.current?.focus();
    }
  }));

  // Check scroll position for indicators
  const checkScroll = () => {
    if (listRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listRef.current;
      setCanScrollUp(scrollTop > 10);
      setCanScrollDown(scrollTop < scrollHeight - clientHeight - 10);
    }
  };

  const handleCopy = () => {
    onCopyStyle();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredStyles = useMemo(() => {
    let styles = selectedCategory === 'all'
      ? designStyles
      : selectedCategory === 'favorites' as StyleCategory
        ? designStyles.filter(style => favoriteStyleIds.includes(style.id))
        : designStyles.filter(style => style.category.includes(selectedCategory));

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      styles = styles.filter(style =>
        style.name.toLowerCase().includes(query) ||
        style.description.toLowerCase().includes(query)
      );
    }

    return styles;
  }, [selectedCategory, searchQuery, favoriteStyleIds]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { 
      all: designStyles.length,
      favorites: favoriteStyleIds.length 
    };
    styleCategories.forEach(cat => {
      if (cat.id !== 'all') {
        counts[cat.id] = designStyles.filter(s => s.category.includes(cat.id)).length;
      }
    });
    return counts;
  }, [favoriteStyleIds]);

  // Collapsed mini sidebar
  if (isCollapsed) {
    return (
      <TooltipProvider delayDuration={0}>
        <aside className="w-16 h-screen flex flex-col bg-card border-r border-border transition-all duration-300">
          <div className="p-3 border-b border-border flex justify-center">
            <Tooltip>
              <TooltipTrigger asChild>
                <img
                  src="/logo.png"
                  alt="Vibe Styles"
                  className="w-10 h-10 rounded-lg object-contain cursor-pointer hover:opacity-90 transition-opacity"
                />
              </TooltipTrigger>
              <TooltipContent side="right">Vibe Styles</TooltipContent>
            </Tooltip>
          </div>

          <div className="flex-1 overflow-y-auto py-2 space-y-1">
            {filteredStyles.slice(0, 8).map((style) => (
              <Tooltip key={style.id}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => onSelectStyle(style)}
                    className={cn(
                      'w-full flex justify-center py-2.5 transition-all duration-200',
                      selectedStyle.id === style.id
                        ? 'bg-foreground text-background'
                        : 'hover:bg-muted'
                    )}
                  >
                    <StyleIcon iconName={style.icon} className="w-5 h-5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right">{style.name}</TooltipContent>
              </Tooltip>
            ))}
          </div>

          <div className="p-2 border-t border-border space-y-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={onToggleCollapse}
                  className="w-full flex justify-center py-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">Expand sidebar</TooltipContent>
            </Tooltip>
          </div>
        </aside>
      </TooltipProvider>
    );
  }

  return (
    <TooltipProvider delayDuration={300}>
      <aside className="w-72 h-screen flex flex-col bg-card border-r border-border transition-all duration-300 animate-slide-in">
        {/* Logo */}
        <div className="p-5 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Vibe Styles"
                className="w-9 h-9 rounded-lg object-contain shadow-soft"
              />
              <div>
                <h1 className="font-semibold text-foreground tracking-tight">Vibe Styles</h1>
                <p className="text-xs text-muted-foreground">Design System Explorer</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <ThemeToggle />
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={onToggleCollapse}
                    className="p-2 rounded-lg hover:bg-muted transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>Collapse sidebar</TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>

        {/* Search Input */}
        <div className="px-3 py-3 border-b border-border">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-foreground" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search styles... (⌘K)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-9 py-2.5 text-sm bg-muted rounded-lg border border-transparent focus:border-foreground/20 focus:outline-none focus:ring-2 focus:ring-foreground/10 placeholder:text-muted-foreground transition-all duration-200"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="px-3 py-3 border-b border-border">
          <div className="flex flex-wrap gap-1.5">
            {/* Favorites tab */}
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setSelectedCategory('favorites' as StyleCategory)}
                  className={cn(
                    'px-2.5 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 flex items-center gap-1.5',
                    selectedCategory === ('favorites' as StyleCategory)
                      ? 'bg-amber-500 text-white shadow-soft'
                      : 'bg-muted text-muted-foreground hover:bg-accent hover:text-foreground'
                  )}
                >
                  <Star className="w-3 h-3" />
                  <span className={cn(
                    'text-[10px] px-1.5 py-0.5 rounded-full',
                    selectedCategory === ('favorites' as StyleCategory)
                      ? 'bg-white/20'
                      : 'bg-foreground/10'
                  )}>
                    {categoryCounts.favorites}
                  </span>
                </button>
              </TooltipTrigger>
              <TooltipContent>Your favorite styles</TooltipContent>
            </Tooltip>
            {styleCategories.map((cat) => {
              const CategoryIcon = categoryIcons[cat.id] || Grid3X3;
              return (
                <Tooltip key={cat.id}>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => setSelectedCategory(cat.id)}
                      className={cn(
                        'px-2.5 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 flex items-center gap-1.5',
                        selectedCategory === cat.id
                          ? 'bg-foreground text-background shadow-soft'
                          : 'bg-muted text-muted-foreground hover:bg-accent hover:text-foreground'
                      )}
                    >
                      <CategoryIcon className="w-3 h-3" />
                      {cat.label}
                      <span className={cn(
                        'text-[10px] px-1.5 py-0.5 rounded-full',
                        selectedCategory === cat.id
                          ? 'bg-background/20'
                          : 'bg-foreground/10'
                      )}>
                        {categoryCounts[cat.id]}
                      </span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>{categoryCounts[cat.id]} styles</TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </div>

        {/* Style List with Scroll Indicators */}
        <div className="relative flex-1">
          {/* Top scroll indicator */}
          <div 
            className={cn(
              "absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-card to-transparent z-10 pointer-events-none transition-opacity duration-200",
              canScrollUp ? "opacity-100" : "opacity-0"
            )}
          />
          
          <nav 
            ref={listRef}
            className="h-full overflow-y-auto scrollbar-thin px-3 py-3"
            onScroll={checkScroll}
          >
            {filteredStyles.length === 0 ? (
              <EmptyState
                title={selectedCategory === ('favorites' as StyleCategory) ? "No favorites yet" : "No styles found"}
                description={selectedCategory === ('favorites' as StyleCategory) ? "Click the star icon to add favorites" : "Try a different search term or category"}
                icon={selectedCategory === ('favorites' as StyleCategory) ? "favorites" : "search"}
              />
            ) : (
              <div className="space-y-1">
                {filteredStyles.map((style, index) => (
                  <div
                    key={style.id}
                    className="relative group"
                    style={{ animationDelay: `${index * 30}ms` }}
                  >
                  <button
                    onClick={() => onSelectStyle(style)}
                    className={cn(
                      'w-full text-left px-3 py-3 rounded-xl transition-all duration-200',
                      'hover:scale-[1.02] active:scale-[0.98]',
                      selectedStyle.id === style.id
                        ? 'bg-foreground text-background shadow-medium'
                        : 'hover:bg-muted'
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <StyleIcon
                        iconName={style.icon}
                        className={cn(
                          'w-5 h-5 mt-0.5 transition-transform duration-200 group-hover:scale-110',
                          selectedStyle.id === style.id ? 'opacity-100' : 'opacity-60'
                        )}
                      />
                      <div className="flex-1 min-w-0 pr-6">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm">{style.name}</span>
                          {selectedStyle.id === style.id && (
                            <span className="text-xs opacity-70 animate-fade-in">✓</span>
                          )}
                        </div>
                        <p
                          className={cn(
                            'text-xs mt-1 line-clamp-1',
                            selectedStyle.id === style.id
                              ? 'text-background/70'
                              : 'text-muted-foreground'
                          )}
                        >
                          {style.description}
                        </p>
                        {/* Color palette preview on hover */}
                        <ColorPalettePreview style={style} />
                      </div>
                    </div>
                  </button>
                  {/* Favorite button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(style.id);
                    }}
                    className={cn(
                      'absolute right-3 top-3 p-1.5 rounded-lg transition-all duration-200',
                      'opacity-0 group-hover:opacity-100',
                      favoriteStyleIds.includes(style.id)
                        ? 'opacity-100 text-amber-500 hover:text-amber-600'
                        : selectedStyle.id === style.id
                          ? 'text-background/50 hover:text-background'
                          : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    <Star
                      className={cn(
                        'w-4 h-4 transition-transform hover:scale-110',
                        favoriteStyleIds.includes(style.id) && 'fill-current'
                      )}
                    />
                  </button>
                </div>
              ))}
            </div>
          )}
          </nav>
          
          {/* Bottom scroll indicator */}
          <div 
            className={cn(
              "absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-card to-transparent z-10 pointer-events-none transition-opacity duration-200",
              canScrollDown ? "opacity-100" : "opacity-0"
            )}
          />
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border space-y-3">
          <button
            onClick={handleCopy}
            className={cn(
              'w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium text-sm transition-all duration-300',
              'hover:scale-[1.02] active:scale-[0.98]',
              copied
                ? 'bg-green-600 text-white shadow-soft'
                : 'bg-foreground text-background shadow-medium hover:shadow-soft'
            )}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy Style CSS
              </>
            )}
          </button>

          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              Ready for building your project
            </p>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={onShowShortcuts}
                  className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                >
                  <Keyboard className="w-4 h-4 text-muted-foreground" />
                </button>
              </TooltipTrigger>
              <TooltipContent>Keyboard shortcuts (⇧?)</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </aside>
    </TooltipProvider>
  );
});

StyleSidebar.displayName = 'StyleSidebar';
