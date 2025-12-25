import { useState } from 'react';
import { ThemeOverrides, ColorBlindnessMode } from '@/lib/designStyles';
import { TooltipProvider } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';


import { EditorHeader } from './editor/EditorHeader';
import { PresetsSection } from './editor/PresetsSection';
import { ColorsSection } from './editor/ColorsSection';
import { TypographySection } from './editor/TypographySection';
import { RadiusSection } from './editor/RadiusSection';
import { ShadowsSection } from './editor/ShadowsSection';
import { ExportSection } from './editor/ExportSection';
import { A11yPanel } from './editor/A11yPanel';

interface ThemeEditorProps {
  baseColors: {
    primary: string;
    accent: string;
    muted: string;
    background: string;
    foreground: string;
    surface: string;
  };
  baseFonts: {
    heading: string;
    body: string;
  };
  baseRadius: string;
  overrides: ThemeOverrides;
  onOverridesChange: (overrides: ThemeOverrides) => void;
  onReset: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
  onUndo?: () => void;
  onRedo?: () => void;
  historyInfo?: { current: number; total: number };
  colorBlindnessMode: ColorBlindnessMode;
  onColorBlindnessModeChange: (mode: ColorBlindnessMode) => void;
  className?: string;
  onRandomize?: () => void;
}

export function ThemeEditor({
  baseColors,
  baseFonts,
  baseRadius,
  overrides,
  onOverridesChange,
  onReset,
  canUndo = false,
  canRedo = false,
  onUndo,
  onRedo,
  historyInfo,
  colorBlindnessMode,
  onColorBlindnessModeChange,
  className,
  onRandomize
}: ThemeEditorProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>('colors');



  const currentColors = {
    primary: overrides.colors?.primary ?? baseColors.primary,
    accent: overrides.colors?.accent ?? baseColors.accent,
    muted: overrides.colors?.muted ?? baseColors.muted,
    background: overrides.colors?.background ?? baseColors.background,
    foreground: overrides.colors?.foreground ?? baseColors.foreground,
    surface: overrides.colors?.surface ?? baseColors.surface,
  };

  const currentFonts = {
    heading: overrides.fonts?.heading ?? baseFonts.heading,
    body: overrides.fonts?.body ?? baseFonts.body,
    headingWeight: overrides.fonts?.headingWeight ?? '700',
    bodyWeight: overrides.fonts?.bodyWeight ?? '400',
  };

  const currentRadius = overrides.radius ?? baseRadius;
  const currentShadowStrength = overrides.shadowStrength ?? 0.2; // Default 20%

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const hasChanges = Object.keys(overrides.colors || {}).length > 0 ||
    Object.keys(overrides.fonts || {}).length > 0 ||
    overrides.radius !== undefined ||
    overrides.shadowStrength !== undefined;

  const currentTheme = {
    colors: currentColors,
    fonts: currentFonts,
    radius: currentRadius,
    shadowStrength: currentShadowStrength
  };

  return (
    <TooltipProvider delayDuration={300}>
      <div className={cn("w-80 h-full border-l border-border bg-card flex flex-col overflow-hidden animate-slide-in-right", className)}>

        <EditorHeader
          hasChanges={hasChanges}
          onReset={onReset}
          canUndo={canUndo}
          canRedo={canRedo}
          onUndo={onUndo}
          onRedo={onRedo}
          historyInfo={historyInfo}
          onRandomize={onRandomize}
        />

        <div className="flex-1 overflow-y-auto scrollbar-thin px-4 py-2">

          <A11yPanel
            currentColors={currentColors}
            colorBlindnessMode={colorBlindnessMode}
            onColorBlindnessModeChange={onColorBlindnessModeChange}
            isOpen={expandedSection === 'a11y'}
            onToggle={() => toggleSection('a11y')}
          />

          <PresetsSection
            overrides={overrides}
            onOverridesChange={onOverridesChange}
            isOpen={expandedSection === 'presets'}
            onToggle={() => toggleSection('presets')}
          />

          <ColorsSection
            currentColors={currentColors}
            overrides={overrides}
            onOverridesChange={onOverridesChange}
            isOpen={expandedSection === 'colors'}
            onToggle={() => toggleSection('colors')}
          />

          <TypographySection
            currentFonts={currentFonts}
            overrides={overrides}
            onOverridesChange={onOverridesChange}
            isOpen={expandedSection === 'fonts'}
            onToggle={() => toggleSection('fonts')}
          />

          <RadiusSection
            currentRadius={currentRadius}
            overrides={overrides}
            onOverridesChange={onOverridesChange}
            isOpen={expandedSection === 'radius'}
            onToggle={() => toggleSection('radius')}
          />

          <ShadowsSection
            currentShadowStrength={currentShadowStrength}
            overrides={overrides}
            onOverridesChange={onOverridesChange}
            isOpen={expandedSection === 'shadows'}
            onToggle={() => toggleSection('shadows')}
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
