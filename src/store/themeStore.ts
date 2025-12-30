import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { DesignStyle, ThemeOverrides, ColorBlindnessMode, designStyles } from '@/lib/designStyles';
import { generateRandomTheme, HarmonyStrategy, generateThemeFromPrompt } from '@/lib/themeGenerator';

interface ThemeState {
    // Selection & Overrides
    selectedStyle: DesignStyle;
    themeOverrides: ThemeOverrides;

    // Undo/Redo History for Overrides
    history: ThemeOverrides[];
    historyIndex: number;
    snapshots: ThemeOverrides[]; // Saved states

    // Favorites
    favoriteStyleIds: string[];

    // UI State
    isFullScreen: boolean;
    showEditor: boolean;
    editorMode: 'sidebar' | 'floating';
    showShortcuts: boolean;
    showCommandPalette: boolean;
    isSidebarCollapsed: boolean;
    isMobileMenuOpen: boolean;

    colorBlindnessMode: ColorBlindnessMode;
    isMobile: boolean;

    // View & Zoom
    previewZoom: number;
    sidebarViewMode: 'list' | 'grid';
    
    // Compare
    showCompare: boolean;
    compareStyle: DesignStyle | null;

    // State
    lockedColors: string[];

    // Actions
    setSelectedStyle: (style: DesignStyle) => void;
    setThemeOverrides: (overrides: ThemeOverrides | ((prev: ThemeOverrides) => ThemeOverrides)) => void;
    toggleColorLock: (key: string) => void;
    undoOverrides: () => void;
    redoOverrides: () => void;
    resetOverrides: () => void;
    randomizeTheme: (strategy?: HarmonyStrategy) => void;
    generateFromPrompt: (prompt: string) => Promise<void>;
    addSnapshot: () => void;
    deleteSnapshot: (index: number) => void;
    restoreSnapshot: (index: number) => void;
    jumpToHistory: (index: number) => void;

    // Favorites
    toggleFavorite: (styleId: string) => void;
    isFavorite: (styleId: string) => boolean;
    reorderFavorites: (newOrder: string[]) => void;

    toggleFullScreen: () => void;
    toggleEditor: () => void;
    setShowEditor: (show: boolean) => void;
    setEditorMode: (mode: 'sidebar' | 'floating') => void;
    toggleShortcuts: () => void;
    setShowShortcuts: (show: boolean) => void;
    setShowCommandPalette: (show: boolean) => void;
    toggleSidebar: () => void;
    setSidebarCollapsed: (collapsed: boolean) => void;
    toggleMobileMenu: () => void;
    setMobileMenuOpen: (open: boolean) => void;

    setColorBlindnessMode: (mode: ColorBlindnessMode) => void;
    setIsMobile: (isMobile: boolean) => void;

    // Zoom & View
    setPreviewZoom: (zoom: number) => void;
    zoomIn: () => void;
    zoomOut: () => void;
    resetZoom: () => void;
    setSidebarViewMode: (mode: 'list' | 'grid') => void;
    
    // Compare
    setShowCompare: (show: boolean) => void;
    setCompareStyle: (style: DesignStyle | null) => void;
}

export const useThemeStore = create<ThemeState>()(
    persist(
        (set, get) => ({
            // Initial State
            selectedStyle: designStyles[0],
            themeOverrides: {},
            history: [{}],
            historyIndex: 0,
            snapshots: [],
            lockedColors: [],
            favoriteStyleIds: [],

            isFullScreen: false,
            showEditor: false,
            editorMode: 'sidebar',
            showShortcuts: false,
            showCommandPalette: false,
            isSidebarCollapsed: false,
            isMobileMenuOpen: false,

            colorBlindnessMode: 'none',
            isMobile: false,

            // Zoom & View
            previewZoom: 100,
            sidebarViewMode: 'list',
            
            // Compare
            showCompare: false,
            compareStyle: null,

            // Actions
            setSelectedStyle: (style) => set({
                selectedStyle: style,
                themeOverrides: {},
                history: [{}],
                historyIndex: 0,
                lockedColors: []
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

            toggleColorLock: (key) => set((state) => ({
                lockedColors: state.lockedColors.includes(key)
                    ? state.lockedColors.filter(k => k !== key)
                    : [...state.lockedColors, key]
            })),

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
                    historyIndex: 0,
                    lockedColors: []
                });
            },

            randomizeTheme: (strategy?: HarmonyStrategy) => {
                const randomTheme = generateRandomTheme(strategy);
                const currentOverrides = get().themeOverrides;
                const locked = get().lockedColors;

                if (randomTheme.colors) {
                    const newColors = { ...randomTheme.colors };
                    locked.forEach(key => {
                        const currentColorsOverride = currentOverrides.colors || {};
                        if (currentColorsOverride[key as keyof typeof currentColorsOverride]) {
                            (newColors as Record<string, string>)[key] = currentColorsOverride[key as keyof typeof currentColorsOverride] as string;
                        } else {
                            delete (newColors as Record<string, string>)[key];
                        }
                    });
                    randomTheme.colors = newColors;
                }

                get().setThemeOverrides(randomTheme);
            },

            generateFromPrompt: async (prompt: string) => {
                const aiTheme = await generateThemeFromPrompt(prompt);
                const currentOverrides = get().themeOverrides;
                const locked = get().lockedColors;

                if (aiTheme.colors) {
                    const newColors = { ...aiTheme.colors };
                    locked.forEach(key => {
                        const currentColorsOverride = currentOverrides.colors || {};
                        if (currentColorsOverride[key as keyof typeof currentColorsOverride]) {
                            (newColors as Record<string, string>)[key] = currentColorsOverride[key as keyof typeof currentColorsOverride] as string;
                        } else {
                            delete (newColors as Record<string, string>)[key];
                        }
                    });
                    aiTheme.colors = newColors;
                }

                get().setThemeOverrides(aiTheme);
            },

            addSnapshot: () => set((state) => ({ snapshots: [...state.snapshots, state.themeOverrides] })),
            deleteSnapshot: (index) => set((state) => ({ snapshots: state.snapshots.filter((_, i) => i !== index) })),
            restoreSnapshot: (index) => {
                const snapshot = get().snapshots[index];
                if (snapshot) get().setThemeOverrides(snapshot);
            },
            jumpToHistory: (index) => {
                const history = get().history;
                if (index >= 0 && index < history.length) {
                    set({
                        themeOverrides: history[index],
                        historyIndex: index
                    });
                }
            },

            // Favorites
            toggleFavorite: (styleId) => set((state) => ({
                favoriteStyleIds: state.favoriteStyleIds.includes(styleId)
                    ? state.favoriteStyleIds.filter(id => id !== styleId)
                    : [...state.favoriteStyleIds, styleId]
            })),
            isFavorite: (styleId) => get().favoriteStyleIds.includes(styleId),
            reorderFavorites: (newOrder) => set({ favoriteStyleIds: newOrder }),

            toggleFullScreen: () => set((state) => ({ isFullScreen: !state.isFullScreen })),
            toggleEditor: () => set((state) => ({ showEditor: !state.showEditor })),
            setShowEditor: (show) => set({ showEditor: show }),
            setEditorMode: (mode) => set({ editorMode: mode }),
            toggleShortcuts: () => set((state) => ({ showShortcuts: !state.showShortcuts })),
            setShowShortcuts: (show) => set({ showShortcuts: show }),
            setShowCommandPalette: (show) => set({ showCommandPalette: show }),
            toggleSidebar: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
            setSidebarCollapsed: (collapsed) => set({ isSidebarCollapsed: collapsed }),
            toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
            setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),

            setColorBlindnessMode: (mode) => set({ colorBlindnessMode: mode }),
            setIsMobile: (isMobile) => set({ isMobile }),

            // Zoom & View
            setPreviewZoom: (zoom) => set({ previewZoom: Math.min(150, Math.max(50, zoom)) }),
            zoomIn: () => set((state) => ({ previewZoom: Math.min(150, state.previewZoom + 10) })),
            zoomOut: () => set((state) => ({ previewZoom: Math.max(50, state.previewZoom - 10) })),
            resetZoom: () => set({ previewZoom: 100 }),
            setSidebarViewMode: (mode) => set({ sidebarViewMode: mode }),
            
            // Compare
            setShowCompare: (show) => set({ showCompare: show }),
            setCompareStyle: (style) => set({ compareStyle: style }),
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
                snapshots: state.snapshots,
                favoriteStyleIds: state.favoriteStyleIds,
                isSidebarCollapsed: state.isSidebarCollapsed,
                editorMode: state.editorMode,
                sidebarViewMode: state.sidebarViewMode,
                previewZoom: state.previewZoom,
                // Do not persist UI toggles like isFullScreen, showEditor, etc. if not desired,  
                // but persist history and selection is crucial.
            }),
        }
    )
);
