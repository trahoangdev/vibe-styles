import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { DesignStyle, ThemeOverrides, ColorBlindnessMode, designStyles } from '@/lib/designStyles';
import { generateRandomTheme } from '@/lib/themeGenerator';

interface ThemeState {
    // Selection & Overrides
    selectedStyle: DesignStyle;
    themeOverrides: ThemeOverrides;

    // Undo/Redo History for Overrides
    history: ThemeOverrides[];
    historyIndex: number;

    // UI State
    isFullScreen: boolean;
    showEditor: boolean;
    showShortcuts: boolean;
    showCommandPalette: boolean;
    isSidebarCollapsed: boolean;
    isMobileMenuOpen: boolean;
    isDebugMode: boolean;
    colorBlindnessMode: ColorBlindnessMode;
    isMobile: boolean;

    // Actions
    setSelectedStyle: (style: DesignStyle) => void;
    setThemeOverrides: (overrides: ThemeOverrides | ((prev: ThemeOverrides) => ThemeOverrides)) => void;
    undoOverrides: () => void;
    redoOverrides: () => void;
    resetOverrides: () => void;
    randomizeTheme: () => void;

    toggleFullScreen: () => void;
    toggleEditor: () => void;
    setShowEditor: (show: boolean) => void;
    toggleShortcuts: () => void;
    setShowShortcuts: (show: boolean) => void;
    setShowCommandPalette: (show: boolean) => void;
    toggleSidebar: () => void;
    setSidebarCollapsed: (collapsed: boolean) => void;
    toggleMobileMenu: () => void;
    setMobileMenuOpen: (open: boolean) => void;
    toggleDebugMode: () => void;
    setColorBlindnessMode: (mode: ColorBlindnessMode) => void;
    setIsMobile: (isMobile: boolean) => void;
}

export const useThemeStore = create<ThemeState>()(
    persist(
        (set, get) => ({
            // Initial State
            selectedStyle: designStyles[0],
            themeOverrides: {},
            history: [{}],
            historyIndex: 0,

            isFullScreen: false,
            showEditor: false,
            showShortcuts: false,
            showCommandPalette: false,
            isSidebarCollapsed: false,
            isMobileMenuOpen: false,
            isDebugMode: false,
            colorBlindnessMode: 'none',
            isMobile: false,

            // Actions
            setSelectedStyle: (style) => set({
                selectedStyle: style,
                themeOverrides: {},
                history: [{}],
                historyIndex: 0
            }),

            setThemeOverrides: (overridesOrFn) => {
                const currentOverrides = get().themeOverrides;
                const newOverrides = typeof overridesOrFn === 'function' ? overridesOrFn(currentOverrides) : overridesOrFn;

                const currentHistory = get().history.slice(0, get().historyIndex + 1);
                const newHistory = [...currentHistory, newOverrides];

                set({
                    themeOverrides: newOverrides,
                    history: newHistory,
                    historyIndex: newHistory.length - 1
                });
            },

            undoOverrides: () => {
                const { history, historyIndex } = get();
                if (historyIndex > 0) {
                    const newIndex = historyIndex - 1;
                    set({
                        themeOverrides: history[newIndex],
                        historyIndex: newIndex
                    });
                }
            },

            redoOverrides: () => {
                const { history, historyIndex } = get();
                if (historyIndex < history.length - 1) {
                    const newIndex = historyIndex + 1;
                    set({
                        themeOverrides: history[newIndex],
                        historyIndex: newIndex
                    });
                }
            },

            resetOverrides: () => {
                const newHistory = [{}];
                set({
                    themeOverrides: {},
                    history: newHistory,
                    historyIndex: 0
                });
            },

            randomizeTheme: () => {
                const randomTheme = generateRandomTheme();
                get().setThemeOverrides(randomTheme);
            },

            toggleFullScreen: () => set((state) => ({ isFullScreen: !state.isFullScreen })),
            toggleEditor: () => set((state) => ({ showEditor: !state.showEditor })),
            setShowEditor: (show) => set({ showEditor: show }),
            toggleShortcuts: () => set((state) => ({ showShortcuts: !state.showShortcuts })),
            setShowShortcuts: (show) => set({ showShortcuts: show }),
            setShowCommandPalette: (show) => set({ showCommandPalette: show }),
            toggleSidebar: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
            setSidebarCollapsed: (collapsed) => set({ isSidebarCollapsed: collapsed }),
            toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
            setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
            toggleDebugMode: () => set((state) => ({ isDebugMode: !state.isDebugMode })),
            setColorBlindnessMode: (mode) => set({ colorBlindnessMode: mode }),
            setIsMobile: (isMobile) => set({ isMobile }),
        }),
        {
            name: 'vibestyle-storage', // unique name
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                // Only persist these fields
                selectedStyle: state.selectedStyle,
                themeOverrides: state.themeOverrides,
                history: state.history,
                historyIndex: state.historyIndex,
                isSidebarCollapsed: state.isSidebarCollapsed,
                // Do not persist UI toggles like isFullScreen, showEditor, etc. if not desired, 
                // but persist history and selection is crucial.
            }),
        }
    )
);
