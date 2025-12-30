import { useState } from 'react';
import { useThemeStore } from '@/store/themeStore';
import { TooltipProvider } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

import { EditorHeader } from './EditorHeader';
import { PresetsSection } from './PresetsSection';
import { ColorsSection } from './ColorsSection';
import { GradientsSection } from './GradientsSection';
import { TypographySection } from './TypographySection';
import { SpacingSection } from './SpacingSection';
import { RadiusSection } from './RadiusSection';
import { ShadowsSection } from './ShadowsSection';
import { ExportSection } from './ExportSection';
import { A11yPanel } from './A11yPanel';

interface ThemeEditorProps {
  className?: string;
}

export function ThemeEditor({ className }: ThemeEditorProps) {
  const store = useThemeStore();
  const {
    selectedStyle,
    themeOverrides,
    historyIndex,
    history,
    colorBlindnessMode,
    lockedColors
  } = store;

  const [expandedSection, setExpandedSection] = useState<string | null>('colors');
  const [searchQuery, setSearchQuery] = useState('');

  const baseColors = selectedStyle.colors;
  const baseFonts = selectedStyle.fonts;
  const baseRadius = selectedStyle.radius;
  const baseBorderWidth = selectedStyle.borderWidth;
  const baseDensity = selectedStyle.density;

  // Calculate current theme values by merging base + overrides
  const currentColors = {
    primary: themeOverrides.colors?.primary ?? baseColors.primary,
    accent: themeOverrides.colors?.accent ?? baseColors.accent,
    muted: themeOverrides.colors?.muted ?? baseColors.muted,
    background: themeOverrides.colors?.background ?? baseColors.background,
    foreground: themeOverrides.colors?.foreground ?? baseColors.foreground,
    surface: themeOverrides.colors?.surface ?? baseColors.surface,
  };

  const currentFonts = {
    heading: themeOverrides.fonts?.heading ?? baseFonts.heading,
    body: themeOverrides.fonts?.body ?? baseFonts.body,
    headingWeight: themeOverrides.fonts?.headingWeight ?? '700',
    bodyWeight: themeOverrides.fonts?.bodyWeight ?? '400',
    scale: themeOverrides.fonts?.scale ?? baseFonts.scale ?? 1.25,
  };

  const currentRadius = themeOverrides.radius ?? baseRadius;
  const currentShadowStrength = themeOverrides.shadowStrength ?? 0.2; // Default 20%
  const currentBorderWidth = themeOverrides.borderWidth ?? baseBorderWidth;
  const currentDensity = themeOverrides.density ?? baseDensity ?? 1;

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const hasChanges = Object.keys(themeOverrides.colors || {}).length > 0 ||
    Object.keys(themeOverrides.fonts || {}).length > 0 ||
    themeOverrides.radius !== undefined ||
    themeOverrides.shadowStrength !== undefined ||
    themeOverrides.borderWidth !== undefined ||
    themeOverrides.density !== undefined;

  const currentTheme = {
    colors: currentColors,
    fonts: currentFonts,
    radius: currentRadius,
    shadowStrength: currentShadowStrength,
    borderWidth: currentBorderWidth,
    density: currentDensity,
  };

  const handleReset = () => {
    store.resetOverrides();
  };

  return (
    <TooltipProvider delayDuration={300}>
      <div className={cn("w-80 h-full border-l border-border bg-card flex flex-col overflow-hidden animate-slide-in-right", className)}>

        <EditorHeader
          hasChanges={hasChanges}
          onReset={handleReset}
          canUndo={historyIndex > 0}
          canRedo={historyIndex < history.length - 1}
          onUndo={store.undoOverrides}
          onRedo={store.redoOverrides}
          historyInfo={{ current: historyIndex, total: history.length }}
          onRandomize={store.randomizeTheme}
          onGenerate={store.generateFromPrompt}
          onSearch={setSearchQuery}
          editorMode={store.editorMode}
          onToggleMode={() => store.setEditorMode(store.editorMode === 'sidebar' ? 'floating' : 'sidebar')}
        />

        <div className="flex-1 overflow-y-auto scrollbar-thin px-4 py-2">

          <A11yPanel
            currentColors={currentColors}
            colorBlindnessMode={colorBlindnessMode}
            onColorBlindnessModeChange={store.setColorBlindnessMode}
            isOpen={expandedSection === 'a11y'}
            onToggle={() => toggleSection('a11y')}
          />

          <PresetsSection
            overrides={themeOverrides}
            onOverridesChange={store.setThemeOverrides}
            isOpen={expandedSection === 'presets'}
            onToggle={() => toggleSection('presets')}
          />

          <ColorsSection
            currentColors={currentColors}
            overrides={themeOverrides}
            onOverridesChange={store.setThemeOverrides}
            isOpen={expandedSection === 'colors' || searchQuery.length > 0}
            onToggle={() => toggleSection('colors')}
            searchQuery={searchQuery}
            lockedColors={lockedColors}
            onToggleLock={store.toggleColorLock}
          />

          <GradientsSection
            overrides={themeOverrides}
            onOverridesChange={store.setThemeOverrides}
            isOpen={expandedSection === 'gradients' || searchQuery.length > 0}
            onToggle={() => toggleSection('gradients')}
          />

          <TypographySection
            currentFonts={currentFonts}
            overrides={themeOverrides}
            onOverridesChange={store.setThemeOverrides}
            isOpen={expandedSection === 'fonts' || searchQuery.length > 0}
            onToggle={() => toggleSection('fonts')}
            searchQuery={searchQuery}
          />

          <SpacingSection
            overrides={themeOverrides}
            onOverridesChange={store.setThemeOverrides}
            isOpen={expandedSection === 'spacing' || searchQuery.length > 0}
            onToggle={() => toggleSection('spacing')}
          />

          <RadiusSection
            currentRadius={currentRadius}
            overrides={themeOverrides}
            onOverridesChange={store.setThemeOverrides}
            isOpen={expandedSection === 'radius' || searchQuery.length > 0}
            onToggle={() => toggleSection('radius')}
            searchQuery={searchQuery}
          />

          <ShadowsSection
            currentShadowStrength={currentShadowStrength}
            overrides={themeOverrides}
            onOverridesChange={store.setThemeOverrides}
            isOpen={expandedSection === 'shadows' || searchQuery.length > 0}
            onToggle={() => toggleSection('shadows')}
            searchQuery={searchQuery}
          />

          <ExportSection
            currentTheme={currentTheme}
            isOpen={expandedSection === 'export'}
            onToggle={() => toggleSection('export')}
          />

        </div>
      </div>
    </TooltipProvider>
  );
}
