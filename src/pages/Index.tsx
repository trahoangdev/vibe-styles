import { useRef, useCallback, useEffect } from 'react';
import { StyleSidebar, StyleSidebarRef } from '@/components/StyleSidebar';
import { StylePreview } from '@/components/preview/StylePreview';
import { ThemeEditor } from '@/components/editor/ThemeEditor';
import { KeyboardShortcutsPanel } from '@/components/KeyboardShortcutsPanel';
import { OnboardingTour } from '@/components/OnboardingTour';
import { CommandPalette } from '@/components/CommandPalette';
import { designStyles } from '@/lib/designStyles';
import { toast } from '@/hooks/use-toast';
import { getFullExportCode } from '@/lib/designStyles';
import { useKeyboardShortcuts } from '@/hooks/use-keyboard-shortcuts';
import { useTheme } from '@/hooks/use-theme';
import { useThemeStore } from '@/store/themeStore';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';


const Index = () => {
  const store = useThemeStore();
  const {
    selectedStyle,
    themeOverrides,
    isFullScreen,
    showEditor,
    showShortcuts,
    showCommandPalette,
    isSidebarCollapsed,
    isMobileMenuOpen,
    colorBlindnessMode,
    isMobile,
    editorMode,
  } = store;

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
    store.setSelectedStyle(style);
    store.setMobileMenuOpen(false);
  };

  const handleResetOverrides = () => {
    store.resetOverrides();
    toast({
      title: "Theme reset",
      description: "All customizations have been cleared.",
    });
  };

  const handleRandomize = () => {
    store.randomizeTheme();
    toast({
      title: "Feeling Lucky!",
      description: "Generated a new random theme based on color theory.",
    });
  };

  const navigateStyle = useCallback((direction: 'prev' | 'next') => {
    const newIndex = direction === 'prev'
      ? (currentStyleIndex - 1 + designStyles.length) % designStyles.length
      : (currentStyleIndex + 1) % designStyles.length;
    handleSelectStyle(designStyles[newIndex]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStyleIndex]);

  // Keyboard shortcuts
  useKeyboardShortcuts([
    { key: 'k', ctrl: true, handler: () => sidebarRef.current?.focusSearch(), description: 'Focus search' },
    { key: 'f', handler: () => store.toggleFullScreen(), description: 'Toggle fullscreen' },
    { key: 'e', handler: () => store.toggleEditor(), description: 'Toggle theme editor' },
    { key: 'd', handler: toggleTheme, description: 'Toggle dark mode' },
    { key: 'z', ctrl: true, handler: () => store.undoOverrides(), description: 'Undo' },
    { key: 'z', ctrl: true, shift: true, handler: () => store.redoOverrides(), description: 'Redo' },
    { key: 'y', ctrl: true, handler: () => store.redoOverrides(), description: 'Redo' },
    {
      key: 'Escape', handler: () => {
        if (showShortcuts) store.setShowShortcuts(false);
        else if (isFullScreen) store.toggleFullScreen();
        else if (showEditor) store.setShowEditor(false);
        else if (isMobileMenuOpen) store.setMobileMenuOpen(false);
      }, description: 'Close panel'
    },
    { key: '?', shift: true, handler: () => store.toggleShortcuts(), description: 'Show shortcuts' },
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
    gradients: {
      ...(selectedStyle.gradients || {}),
      ...(themeOverrides.gradients || {}),
    },
    borderWidth: themeOverrides.borderWidth ?? selectedStyle.borderWidth,
    density: themeOverrides.density ?? selectedStyle.density,
  };

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      store.setIsMobile(mobile);
      if (!mobile) {
        store.setMobileMenuOpen(false);
      }
    };

    // Initial check
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-md border-b border-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => store.toggleMobileMenu()}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Vibe Styles" className="w-7 h-7 rounded-lg object-contain" />
            <span className="font-semibold text-sm">{selectedStyle.name}</span>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-30 bg-background/80 backdrop-blur-sm animate-fade-in"
          onClick={() => store.setMobileMenuOpen(false)}
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
            onShowShortcuts={() => store.setShowShortcuts(true)}
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={() => store.toggleSidebar()}
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
          onShowShortcuts={() => store.setShowShortcuts(true)}
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
          onToggleFullScreen={() => store.toggleFullScreen()}
          onToggleEditor={() => store.toggleEditor()}
          showEditorButton={!isFullScreen}
          isEditorOpen={showEditor}
          colorBlindnessMode={colorBlindnessMode}
        />

        {/* Theme Editor Panel - Desktop */}
        {!isMobile && showEditor && !isFullScreen && (
          <div className={cn(
            "hidden md:block animate-slide-in z-40 transition-all duration-300 ease-spring",
            editorMode === 'floating'
              ? "absolute right-6 top-6 bottom-6 h-auto pointer-events-none"
              : "relative h-full"
          )}>
            <div className={cn(
              editorMode === 'floating' ? "pointer-events-auto h-full rounded-2xl shadow-2xl overflow-hidden" : "h-full"
            )}>
              <ThemeEditor
                className={cn(
                  "h-full transition-all duration-300",
                  editorMode === 'floating'
                    ? "border-0 bg-background/80 backdrop-blur-xl" // Moved borders to wrapper for better shadow
                    : "bg-card"
                )}
              />
            </div>
          </div>
        )}

        {/* Theme Editor Panel - Mobile Drawer */}
        {isMobile && (
          <Drawer open={showEditor} onOpenChange={store.setShowEditor}>
            <DrawerContent className="h-[85vh] outline-none">
              <DrawerHeader className="text-left border-b border-border/10 pb-4">
                <DrawerTitle className="font-black uppercase tracking-widest text-sm opacity-60">Theme Editor</DrawerTitle>
              </DrawerHeader>
              <div className="flex-1 overflow-hidden h-full">
                <ThemeEditor
                  className="w-full border-0"
                />
              </div>
            </DrawerContent>
          </Drawer>
        )}
      </div>

      {/* Keyboard Shortcuts Panel */}
      <KeyboardShortcutsPanel
        isOpen={showShortcuts}
        onClose={() => store.setShowShortcuts(false)}
      />

      <OnboardingTour />

      <CommandPalette
        open={showCommandPalette}
        onOpenChange={store.setShowCommandPalette}
        onSelectStyle={handleSelectStyle}
        currentStyleId={selectedStyle.id}
        onToggleFullScreen={() => store.toggleFullScreen()}
        onToggleEditor={() => store.toggleEditor()}
        onCopyStyle={handleCopyStyle}
        onUndo={() => store.undoOverrides()}
        onRedo={() => store.redoOverrides()}
      />
    </div>
  );
};

export default Index;
