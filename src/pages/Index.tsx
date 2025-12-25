import { useState, useRef, useCallback, useEffect } from 'react';
import { StyleSidebar, StyleSidebarRef } from '@/components/StyleSidebar';
import { StylePreview } from '@/components/StylePreview';
import { ThemeEditor, type ThemeOverrides } from '@/components/ThemeEditor';
import { KeyboardShortcutsPanel } from '@/components/KeyboardShortcutsPanel';
import { designStyles } from '@/lib/designStyles';
import { toast } from '@/hooks/use-toast';
import { getFullExportCode } from '@/lib/designStyles';
import { useKeyboardShortcuts } from '@/hooks/use-keyboard-shortcuts';
import { useTheme } from '@/hooks/use-theme';
import { useUndoRedo } from '@/hooks/use-undo-redo';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Index = () => {
  const [selectedStyle, setSelectedStyle] = useState(designStyles[0]);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Undo/Redo for theme overrides
  const {
    state: themeOverrides,
    pushState: setThemeOverrides,
    undo: undoTheme,
    redo: redoTheme,
    reset: resetThemeHistory,
    canUndo,
    canRedo,
    historyLength,
    currentIndex,
  } = useUndoRedo<ThemeOverrides>({});
  
  const sidebarRef = useRef<StyleSidebarRef>(null);
  const { toggleTheme } = useTheme();

  const currentStyleIndex = designStyles.findIndex(s => s.id === selectedStyle.id);

  const handleCopyStyle = async () => {
    const code = getFullExportCode(selectedStyle);
    
    try {
      await navigator.clipboard.writeText(code);
      toast({
        title: "Copied to clipboard!",
        description: `${selectedStyle.name} design system is ready to paste.`,
      });
    } catch (err) {
      const textArea = document.createElement('textarea');
      textArea.value = code;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      
      toast({
        title: "Copied to clipboard!",
        description: `${selectedStyle.name} design system is ready to paste.`,
      });
    }
  };

  const handleSelectStyle = (style: typeof selectedStyle) => {
    setSelectedStyle(style);
    resetThemeHistory({});
    setIsMobileMenuOpen(false);
  };

  const handleResetOverrides = () => {
    resetThemeHistory({});
    toast({
      title: "Theme reset",
      description: "All customizations have been cleared.",
    });
  };

  const navigateStyle = useCallback((direction: 'prev' | 'next') => {
    const newIndex = direction === 'prev' 
      ? (currentStyleIndex - 1 + designStyles.length) % designStyles.length
      : (currentStyleIndex + 1) % designStyles.length;
    handleSelectStyle(designStyles[newIndex]);
  }, [currentStyleIndex]);

  // Keyboard shortcuts
  useKeyboardShortcuts([
    { key: 'k', ctrl: true, handler: () => sidebarRef.current?.focusSearch(), description: 'Focus search' },
    { key: 'f', handler: () => setIsFullScreen(prev => !prev), description: 'Toggle fullscreen' },
    { key: 'e', handler: () => setShowEditor(prev => !prev), description: 'Toggle theme editor' },
    { key: 'd', handler: toggleTheme, description: 'Toggle dark mode' },
    { key: 'z', ctrl: true, handler: () => { if (canUndo) undoTheme(); }, description: 'Undo' },
    { key: 'z', ctrl: true, shift: true, handler: () => { if (canRedo) redoTheme(); }, description: 'Redo' },
    { key: 'y', ctrl: true, handler: () => { if (canRedo) redoTheme(); }, description: 'Redo' },
    { key: 'Escape', handler: () => {
      if (showShortcuts) setShowShortcuts(false);
      else if (isFullScreen) setIsFullScreen(false);
      else if (showEditor) setShowEditor(false);
      else if (isMobileMenuOpen) setIsMobileMenuOpen(false);
    }, description: 'Close panel' },
    { key: '?', shift: true, handler: () => setShowShortcuts(prev => !prev), description: 'Show shortcuts' },
    { key: 'ArrowUp', handler: () => navigateStyle('prev'), description: 'Previous style' },
    { key: 'ArrowDown', handler: () => navigateStyle('next'), description: 'Next style' },
  ]);

  // Merge base style with overrides
  const effectiveStyle = {
    ...selectedStyle,
    colors: {
      ...selectedStyle.colors,
      ...(themeOverrides.colors || {}),
    },
    fonts: {
      ...selectedStyle.fonts,
      ...(themeOverrides.fonts || {}),
    },
    radius: themeOverrides.radius ?? selectedStyle.radius,
  };

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-md border-b border-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-foreground flex items-center justify-center">
              <span className="text-background text-sm font-semibold">V</span>
            </div>
            <span className="font-semibold text-sm">{selectedStyle.name}</span>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 z-30 bg-background/80 backdrop-blur-sm animate-fade-in"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - Desktop */}
      {!isFullScreen && (
        <div className={cn(
          'hidden md:block transition-all duration-300',
          isSidebarCollapsed ? 'w-16' : 'w-72'
        )}>
          <StyleSidebar 
            ref={sidebarRef}
            selectedStyle={selectedStyle}
            onSelectStyle={handleSelectStyle}
            onCopyStyle={handleCopyStyle}
            onShowShortcuts={() => setShowShortcuts(true)}
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          />
        </div>
      )}

      {/* Sidebar - Mobile */}
      <div className={cn(
        'md:hidden fixed top-14 left-0 bottom-0 z-30 transition-transform duration-300',
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <StyleSidebar 
          ref={sidebarRef}
          selectedStyle={selectedStyle}
          onSelectStyle={handleSelectStyle}
          onCopyStyle={handleCopyStyle}
          onShowShortcuts={() => setShowShortcuts(true)}
        />
      </div>

      {/* Main Content */}
      <div className={cn(
        'flex-1 flex relative transition-all duration-300',
        'md:pt-0 pt-14' // Account for mobile header
      )}>
        <StylePreview 
          style={effectiveStyle} 
          isFullScreen={isFullScreen}
          onToggleFullScreen={() => setIsFullScreen(!isFullScreen)}
          onToggleEditor={() => setShowEditor(!showEditor)}
          showEditorButton={!isFullScreen}
          isEditorOpen={showEditor}
        />
        
        {/* Theme Editor Panel */}
        {showEditor && !isFullScreen && (
          <div className="hidden md:block animate-slide-in">
            <ThemeEditor
              baseColors={{
                primary: selectedStyle.colors.primary,
                accent: selectedStyle.colors.accent,
                muted: selectedStyle.colors.muted,
                background: selectedStyle.colors.background,
                foreground: selectedStyle.colors.foreground,
                surface: selectedStyle.colors.surface,
              }}
              baseFonts={{
                heading: selectedStyle.fonts.heading,
                body: selectedStyle.fonts.body,
              }}
              baseRadius={selectedStyle.radius}
              overrides={themeOverrides}
              onOverridesChange={setThemeOverrides}
              onReset={handleResetOverrides}
              canUndo={canUndo}
              canRedo={canRedo}
              onUndo={undoTheme}
              onRedo={redoTheme}
              historyInfo={{ current: currentIndex, total: historyLength }}
            />
          </div>
        )}
      </div>

      {/* Keyboard Shortcuts Panel */}
      <KeyboardShortcutsPanel 
        isOpen={showShortcuts} 
        onClose={() => setShowShortcuts(false)} 
      />
    </div>
  );
};

export default Index;
