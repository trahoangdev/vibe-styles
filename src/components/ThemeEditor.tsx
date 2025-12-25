import { useState, useMemo, useEffect } from 'react';
import {
  Palette, Type, Square, RotateCcw, ChevronDown, ChevronUp,
  Download, FileCode, Copy, Check, Undo2, Redo2, Eye, ShieldCheck,
  AlertCircle, Save, Trash2, Bookmark, Layers
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';

export interface ThemeOverrides {
  colors?: {
    primary?: string;
    accent?: string;
    muted?: string;
    background?: string;
    foreground?: string;
    surface?: string;
  };
  fonts?: {
    heading?: string;
    body?: string;
    headingWeight?: string;
    bodyWeight?: string;
  };
  radius?: string;
  shadowStrength?: number;
}

interface Preset {
  id: string;
  name: string;
  overrides: ThemeOverrides;
  createdAt: number;
}

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
}

const fontOptions = [
  'Inter, sans-serif',
  'Space Grotesk, sans-serif',
  'DM Sans, sans-serif',
  'Poppins, sans-serif',
  'Playfair Display, serif',
  'Merriweather, serif',
  'JetBrains Mono, monospace',
  'Roboto, sans-serif',
  'Montserrat, sans-serif',
  'Source Sans 3, sans-serif',
];

const weightOptions = [
  { label: 'Light', value: '300' },
  { label: 'Regular', value: '400' },
  { label: 'Medium', value: '500' },
  { label: 'Semibold', value: '600' },
  { label: 'Bold', value: '700' },
  { label: 'Black', value: '900' },
];

// Contrast helper functions
const getRelativeLuminance = (color: string) => {
  const [h, s, l] = color.split(' ').map(v => parseFloat(v));
  const sNorm = s / 100;
  const lNorm = l / 100;

  const a = sNorm * Math.min(lNorm, 1 - lNorm);
  const f = (n: number, k = (n + h / 30) % 12) => lNorm - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);

  const [r, g, b] = [f(0), f(8), f(4)];
  const [R, G, B] = [r, g, b].map(v => v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
};

const getContrastRatio = (lum1: number, lum2: number) => {
  const l1 = Math.max(lum1, lum2);
  const l2 = Math.min(lum1, lum2);
  return (l1 + 0.05) / (l2 + 0.05);
};

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
}: ThemeEditorProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>('colors');
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);
  const [presets, setPresets] = useState<Preset[]>([]);
  const [newPresetName, setNewPresetName] = useState('');
  const [showSavePreset, setShowSavePreset] = useState(false);

  // Load presets from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('vibe_theme_presets');
    if (saved) {
      try {
        setPresets(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load presets', e);
      }
    }
  }, []);

  const savePreset = () => {
    if (!newPresetName.trim()) return;

    const newPreset: Preset = {
      id: crypto.randomUUID(),
      name: newPresetName.trim(),
      overrides,
      createdAt: Date.now(),
    };

    const updatedPresets = [...presets, newPreset];
    setPresets(updatedPresets);
    localStorage.setItem('vibe_theme_presets', JSON.stringify(updatedPresets));

    setNewPresetName('');
    setShowSavePreset(false);
    toast({
      title: 'Preset Saved',
      description: `Theme "${newPreset.name}" has been saved.`,
    });
  };

  const loadPreset = (preset: Preset) => {
    onOverridesChange(preset.overrides);
    toast({
      title: 'Preset Loaded',
      description: `Applied theme "${preset.name}".`,
    });
  };

  const deletePreset = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updatedPresets = presets.filter(p => p.id !== id);
    setPresets(updatedPresets);
    localStorage.setItem('vibe_theme_presets', JSON.stringify(updatedPresets));
  };


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

  // Accessibility Check
  const contrastInfo = useMemo(() => {
    const bgLum = getRelativeLuminance(currentColors.background);
    const fgLum = getRelativeLuminance(currentColors.foreground);
    const primaryLum = getRelativeLuminance(currentColors.primary);

    const ratio = getContrastRatio(bgLum, fgLum);
    const primaryRatio = getContrastRatio(bgLum, primaryLum);

    return {
      main: {
        ratio: ratio.toFixed(2),
        pass: ratio >= 4.5,
        largePass: ratio >= 3,
      },
      primary: {
        ratio: primaryRatio.toFixed(2),
        pass: primaryRatio >= 4.5,
      }
    };
  }, [currentColors.background, currentColors.foreground, currentColors.primary]);

  const hslToHex = (hsl: string): string => {
    const [h, s, l] = hsl.split(' ').map(v => parseFloat(v));
    const sNorm = s / 100;
    const lNorm = l / 100;

    const c = (1 - Math.abs(2 * lNorm - 1)) * sNorm;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = lNorm - c / 2;

    let r = 0, g = 0, b = 0;
    if (h < 60) { r = c; g = x; }
    else if (h < 120) { r = x; g = c; }
    else if (h < 180) { g = c; b = x; }
    else if (h < 240) { g = x; b = c; }
    else if (h < 300) { r = x; b = c; }
    else { r = c; b = x; }

    const toHex = (n: number) => Math.round((n + m) * 255).toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  const hexToHsl = (hex: string): string => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const l = (max + min) / 2;

    if (max === min) return `0 0% ${Math.round(l * 100)}%`;

    const d = max - min;
    const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    let h = 0;
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;

    return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
  };

  const updateColor = (key: keyof typeof currentColors, hex: string) => {
    const hsl = hexToHsl(hex);
    onOverridesChange({
      ...overrides,
      colors: {
        ...overrides.colors,
        [key]: hsl,
      },
    });
  };

  const updateColorHSLComponent = (key: keyof typeof currentColors, channel: 0 | 1 | 2, value: number) => {
    const parts = currentColors[key].split(' ');
    if (channel === 0) parts[0] = value.toString();
    else if (channel === 1) parts[1] = `${value}%`;
    else parts[2] = `${value}%`;

    onOverridesChange({
      ...overrides,
      colors: {
        ...overrides.colors,
        [key]: parts.join(' '),
      },
    });
  };

  const updateFont = (key: keyof typeof currentFonts, value: string) => {
    onOverridesChange({
      ...overrides,
      fonts: {
        ...overrides.fonts,
        [key]: value,
      },
    });
  };

  const updateRadius = (value: string) => {
    onOverridesChange({
      ...overrides,
      radius: value,
    });
  };

  const updateShadowStrength = (value: number) => {
    onOverridesChange({
      ...overrides,
      shadowStrength: value,
    });
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const hasChanges = Object.keys(overrides.colors || {}).length > 0 ||
    Object.keys(overrides.fonts || {}).length > 0 ||
    overrides.radius !== undefined ||
    overrides.shadowStrength !== undefined;

  const generateCSSExport = (): string => {
    const lines = [':root {'];
    lines.push(`  /* Colors (HSL) */`);
    lines.push(`  --primary: ${currentColors.primary};`);
    lines.push(`  --accent: ${currentColors.accent};`);
    lines.push(`  --muted: ${currentColors.muted};`);
    lines.push(`  --background: ${currentColors.background};`);
    lines.push(`  --foreground: ${currentColors.foreground};`);
    lines.push(`  --surface: ${currentColors.surface};`);
    lines.push('');
    lines.push(`  /* Typography */`);
    lines.push(`  --font-heading: "${currentFonts.heading.split(',')[0]}";`);
    lines.push(`  --font-body: "${currentFonts.body.split(',')[0]}";`);
    lines.push('');
    lines.push(`  /* Border Radius */`);
    lines.push(`  --radius: ${currentRadius};`);
    lines.push('');
    lines.push(`  /* Effects */`);
    lines.push(`  --shadow-strength: ${currentShadowStrength};`);
    lines.push('}');
    return lines.join('\n');
  };

  const generateTailwindExport = (): string => {
    const config = {
      theme: {
        extend: {
          colors: {
            primary: `hsl(${currentColors.primary})`,
            accent: `hsl(${currentColors.accent})`,
            muted: `hsl(${currentColors.muted})`,
            background: `hsl(${currentColors.background})`,
            foreground: `hsl(${currentColors.foreground})`,
            surface: `hsl(${currentColors.surface})`,
          },
          fontFamily: {
            heading: [currentFonts.heading.split(',')[0]],
            body: [currentFonts.body.split(',')[0]],
          },
          borderRadius: {
            DEFAULT: currentRadius,
          },
        },
      },
    };
    return `// tailwind.config.ts\nmodule.exports = ${JSON.stringify(config, null, 2)}`;
  };

  const generateJSONExport = (): string => {
    return JSON.stringify({
      name: 'Vibe Custom Theme',
      version: '1.0.0',
      colors: currentColors,
      fonts: currentFonts,
      radius: currentRadius,
      shadowStrength: currentShadowStrength,
    }, null, 2);
  };

  const copyToClipboard = async (format: 'css' | 'tailwind' | 'json') => {
    const content = format === 'css' ? generateCSSExport() :
      format === 'tailwind' ? generateTailwindExport() :
        generateJSONExport();

    await navigator.clipboard.writeText(content);
    setCopiedFormat(format);
    toast({
      title: 'Copied to Clipboard!',
      description: `Target: ${format.toUpperCase()}`,
    });
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  const downloadJSON = () => {
    const content = generateJSONExport();
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vibe-theme-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({
      title: 'Download Started',
      description: 'Theme configuration saved as JSON.',
    });
  };

  return (
    <TooltipProvider delayDuration={300}>
      <div className="w-80 h-full border-l border-border bg-card flex flex-col overflow-hidden animate-slide-in-right">
        {/* Header */}
        <div className="p-6 border-b border-border bg-muted/20">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-black text-xs uppercase tracking-[0.2em]">Engine Config</h3>
              <p className="text-[10px] uppercase font-bold opacity-40">Verifying aesthetic output</p>
            </div>
            <div className="flex items-center gap-2">
              {hasChanges && (
                <button
                  onClick={onReset}
                  className="p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-all active:scale-95"
                  title="Wipe overrides"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-1">
              <button
                onClick={onUndo}
                disabled={!canUndo}
                className="p-2 rounded-xl bg-muted/50 border border-border disabled:opacity-20 transition-all hover:bg-muted active:scale-90"
              >
                <Undo2 className="w-4 h-4" />
              </button>
              <button
                onClick={onRedo}
                disabled={!canRedo}
                className="p-2 rounded-xl bg-muted/50 border border-border disabled:opacity-20 transition-all hover:bg-muted active:scale-90"
              >
                <Redo2 className="w-4 h-4" />
              </button>
            </div>
            {historyInfo && (
              <div className="px-3 py-1 bg-foreground text-background text-[9px] font-black uppercase rounded-full">
                Step {historyInfo.current + 1} / {historyInfo.total}
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-thin px-4 py-2">
          {/* Accessibility Info Bar */}
          <div className="mt-4 mb-6 p-4 rounded-2xl bg-muted/40 border border-border/50">
            <div className="flex items-center justify-between mb-3 text-[10px] font-black uppercase tracking-widest opacity-60">
              <ShieldCheck className="w-3 h-3" />
              <span>Accessibility Scan</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold">Contrast Ratio (FG/BG)</span>
                <span className={`text-[11px] font-black ${contrastInfo.main.pass ? 'text-success' : 'text-error'}`}>
                  {contrastInfo.main.ratio}:1 {contrastInfo.main.pass ? '✓' : '×'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold">Primary Visibility</span>
                <span className={`text-[11px] font-black ${contrastInfo.primary.pass ? 'text-success' : 'text-warning'}`}>
                  {contrastInfo.primary.ratio}:1 {contrastInfo.primary.pass ? 'Optimal' : 'Sub-optimal'}
                </span>
              </div>
            </div>
          </div>

          {/* Presets Section */}
          <section className="mb-2">
            <button
              onClick={() => toggleSection('presets')}
              className="w-full py-4 flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <Bookmark className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                <span className="text-xs font-black uppercase tracking-widest">Saved Presets</span>
              </div>
              {expandedSection === 'presets' ? <ChevronUp className="w-4 h-4 opacity-30" /> : <ChevronDown className="w-4 h-4 opacity-30" />}
            </button>

            {expandedSection === 'presets' && (
              <div className="space-y-4 pb-4 animate-fade-in pl-1">
                {/* Save Current */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newPresetName}
                    onChange={(e) => setNewPresetName(e.target.value)}
                    placeholder="New preset name..."
                    className="flex-1 px-3 py-2 text-xs bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  <button
                    onClick={savePreset}
                    disabled={!hasChanges || !newPresetName}
                    className="p-2 bg-primary text-primary-foreground rounded-lg disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                  </button>
                </div>

                {/* Preset List */}
                <div className="space-y-2">
                  {presets.length === 0 ? (
                    <p className="text-[10px] text-muted-foreground italic text-center py-2">No saved presets yet</p>
                  ) : (
                    presets.map(preset => (
                      <div
                        key={preset.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/60 border border-transparent hover:border-border transition-all cursor-pointer group"
                        onClick={() => loadPreset(preset)}
                      >
                        <div>
                          <p className="text-xs font-bold">{preset.name}</p>
                          <p className="text-[9px] opacity-40">{new Date(preset.createdAt).toLocaleDateString()}</p>
                        </div>
                        <button
                          onClick={(e) => deletePreset(preset.id, e)}
                          className="p-1.5 rounded text-muted-foreground hover:text-error hover:bg-error/10 opacity-0 group-hover:opacity-100 transition-all"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </section>

          {/* Colors Section */}
          <section className="border-t border-border/50">
            <button
              onClick={() => toggleSection('colors')}
              className="w-full py-4 flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <Palette className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                <span className="text-xs font-black uppercase tracking-widest">Chromatic Array</span>
              </div>
              {expandedSection === 'colors' ? <ChevronUp className="w-4 h-4 opacity-30" /> : <ChevronDown className="w-4 h-4 opacity-30" />}
            </button>

            {expandedSection === 'colors' && (
              <div className="space-y-6 pb-4 animate-fade-in pl-1">
                {[
                  { key: 'background', label: 'VOID (BG)' },
                  { key: 'foreground', label: 'CONTENT (FG)' },
                  { key: 'primary', label: 'ENGINE (PRIMARY)' },
                  { key: 'accent', label: 'DETAIL (ACCENT)' },
                ].map(({ key, label }) => {
                  const colorParts = currentColors[key as keyof typeof currentColors].split(' ');
                  const hue = parseInt(colorParts[0]);
                  return (
                    <div key={key} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-[9px] font-black tracking-[0.2em] opacity-50">{label}</label>
                        <span className="text-[10px] font-mono opacity-40">HEX: {hslToHex(currentColors[key as keyof typeof currentColors]).toUpperCase()}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <input
                          type="color"
                          value={hslToHex(currentColors[key as keyof typeof currentColors])}
                          onChange={(e) => updateColor(key as keyof typeof currentColors, e.target.value)}
                          className="w-12 h-12 rounded-xl cursor-pointer bg-transparent border-0 outline-none"
                        />
                        <div className="flex-1 space-y-2">
                          <input
                            type="range"
                            min="0" max="360"
                            value={hue}
                            onChange={(e) => updateColorHSLComponent(key as keyof typeof currentColors, 0, parseInt(e.target.value))}
                            className="w-full h-1.5 appearance-none bg-gradient-to-r from-red-500 via-green-500 to-red-500 rounded-full accent-white border border-border"
                          />
                          <div className="flex justify-between text-[8px] font-black opacity-30">
                            <span>0°</span>
                            <span>HUE {hue}°</span>
                            <span>360°</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* Typography Section */}
          <section className="border-t border-border/50">
            <button
              onClick={() => toggleSection('fonts')}
              className="w-full py-4 flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <Type className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                <span className="text-xs font-black uppercase tracking-widest">Glyph Engine</span>
              </div>
              {expandedSection === 'fonts' ? <ChevronUp className="w-4 h-4 opacity-30" /> : <ChevronDown className="w-4 h-4 opacity-30" />}
            </button>

            {expandedSection === 'fonts' && (
              <div className="space-y-4 pb-4 animate-fade-in pl-1">
                <div>
                  <label className="text-[9px] font-black tracking-[0.2em] opacity-40 block mb-2">HEADING FONT</label>
                  <select
                    value={currentFonts.heading}
                    onChange={(e) => updateFont('heading', e.target.value)}
                    className="w-full px-4 py-3 text-xs bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none font-bold"
                  >
                    {fontOptions.map((font) => (
                      <option key={font} value={font}>{font.split(',')[0]}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[9px] font-black tracking-[0.2em] opacity-40 block mb-2">HEADING WEIGHT</label>
                  <div className="grid grid-cols-6 gap-1">
                    {weightOptions.map(option => (
                      <button
                        key={option.value}
                        onClick={() => updateFont('headingWeight', option.value)}
                        className={`h-8 rounded flex items-center justify-center text-[10px] font-medium transition-colors ${currentFonts.headingWeight === option.value ? 'bg-primary text-primary-foreground' : 'bg-muted/50 hover:bg-muted'}`}
                        title={option.label}
                      >
                        {option.value}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-4">
                  <label className="text-[9px] font-black tracking-[0.2em] opacity-40 block mb-2">BODY FONT</label>
                  <select
                    value={currentFonts.body}
                    onChange={(e) => updateFont('body', e.target.value)}
                    className="w-full px-4 py-3 text-xs bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none"
                  >
                    {fontOptions.map((font) => (
                      <option key={font} value={font}>{font.split(',')[0]}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[9px] font-black tracking-[0.2em] opacity-40 block mb-2">BODY WEIGHT</label>
                  <div className="grid grid-cols-6 gap-1">
                    {weightOptions.map(option => (
                      <button
                        key={option.value}
                        onClick={() => updateFont('bodyWeight', option.value)}
                        className={`h-8 rounded flex items-center justify-center text-[10px] font-medium transition-colors ${currentFonts.bodyWeight === option.value ? 'bg-primary text-primary-foreground' : 'bg-muted/50 hover:bg-muted'}`}
                        title={option.label}
                      >
                        {option.value}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Radius Section */}
          <section className="border-t border-border/50">
            <button
              onClick={() => toggleSection('radius')}
              className="w-full py-4 flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <Square className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                <span className="text-xs font-black uppercase tracking-widest">Curvature Density</span>
              </div>
              {expandedSection === 'radius' ? <ChevronUp className="w-4 h-4 opacity-30" /> : <ChevronDown className="w-4 h-4 opacity-30" />}
            </button>

            {expandedSection === 'radius' && (
              <div className="pb-4 animate-fade-in pl-1">
                <div className="flex items-center gap-4 mb-4">
                  <input
                    type="range"
                    min="0" max="32"
                    value={parseInt(currentRadius)}
                    onChange={(e) => updateRadius(`${e.target.value}px`)}
                    className="flex-1 accent-foreground h-1.5 bg-muted rounded-full"
                  />
                  <span className="text-[10px] font-black font-mono bg-muted px-2 py-1 rounded-lg">{currentRadius}</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {['0px', '8px', '16px', '32px'].map((r) => (
                    <button
                      key={r}
                      onClick={() => updateRadius(r)}
                      className={`py-2 text-[9px] font-black rounded-lg border transition-all ${currentRadius === r ? 'bg-foreground text-background border-foreground' : 'bg-muted/50 border-transparent hover:border-border'}`}
                    >
                      {r === '0px' ? 'FLAT' : r}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Shadow Section */}
          <section className="border-t border-border/50">
            <button
              onClick={() => toggleSection('shadows')}
              className="w-full py-4 flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <Layers className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                <span className="text-xs font-black uppercase tracking-widest">Depth Perception</span>
              </div>
              {expandedSection === 'shadows' ? <ChevronUp className="w-4 h-4 opacity-30" /> : <ChevronDown className="w-4 h-4 opacity-30" />}
            </button>

            {expandedSection === 'shadows' && (
              <div className="pb-4 animate-fade-in pl-1">
                <div className="flex items-center gap-4 mb-4">
                  <input
                    type="range"
                    min="0" max="100"
                    value={currentShadowStrength * 100}
                    onChange={(e) => updateShadowStrength(parseInt(e.target.value) / 100)}
                    className="flex-1 accent-foreground h-1.5 bg-muted rounded-full"
                  />
                  <span className="text-[10px] font-black font-mono bg-muted px-2 py-1 rounded-lg">{(currentShadowStrength * 100).toFixed(0)}%</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[0, 0.2, 0.5].map((s) => (
                    <button
                      key={s}
                      onClick={() => updateShadowStrength(s)}
                      className={`py-2 text-[9px] font-black rounded-lg border transition-all ${currentShadowStrength === s ? 'bg-foreground text-background border-foreground' : 'bg-muted/50 border-transparent hover:border-border'}`}
                    >
                      {s === 0 ? 'FLAT' : s === 0.2 ? 'SUBTLE' : 'DEEP'}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Export Section */}
          <section className="border-t border-border/50 mb-8">
            <button
              onClick={() => toggleSection('export')}
              className="w-full py-4 flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <Download className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                <span className="text-xs font-black uppercase tracking-widest">Sync & Deploy</span>
              </div>
              {expandedSection === 'export' ? <ChevronUp className="w-4 h-4 opacity-30" /> : <ChevronDown className="w-4 h-4 opacity-30" />}
            </button>

            {expandedSection === 'export' && (
              <div className="space-y-3 pb-4 animate-fade-in pl-1">
                <button
                  onClick={() => copyToClipboard('css')}
                  className="w-full flex items-center justify-between px-5 py-4 bg-foreground text-background rounded-2xl transition-transform active:scale-95 group"
                >
                  <div className="text-left">
                    <p className="text-[10px] font-black uppercase tracking-widest leading-tight">CSS Variables</p>
                    <p className="text-[9px] opacity-60 font-medium">Standard Web Integration</p>
                  </div>
                  <Copy className="w-4 h-4 opacity-40 group-hover:opacity-100" />
                </button>
                <button
                  onClick={() => copyToClipboard('tailwind')}
                  className="w-full flex items-center justify-between px-5 py-4 bg-muted border border-border rounded-2xl transition-transform active:scale-95 group"
                >
                  <div className="text-left">
                    <p className="text-[10px] font-black uppercase tracking-widest leading-tight">Tailwind Config</p>
                    <p className="text-[9px] opacity-40 font-medium">Framework Optimized</p>
                  </div>
                  <FileCode className="w-4 h-4 opacity-20 group-hover:opacity-100" />
                </button>
                <button
                  onClick={downloadJSON}
                  className="w-full flex items-center justify-between px-5 py-4 bg-muted border border-border rounded-2xl transition-transform active:scale-95 group"
                >
                  <div className="text-left">
                    <p className="text-[10px] font-black uppercase tracking-widest leading-tight">Backup Config</p>
                    <p className="text-[9px] opacity-40 font-medium">Download JSON</p>
                  </div>
                  <Download className="w-4 h-4 opacity-20 group-hover:opacity-100" />
                </button>
              </div>
            )}
          </section>
        </div>

        {/* Real-time Lab Preview */}
        {hasChanges && (
          <div className="p-6 border-t border-border bg-muted/10 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-4">
              <Eye className="w-3 h-3 opacity-40" />
              <span className="text-[9px] font-black uppercase tracking-[0.2em] opacity-40">Live Manifest</span>
            </div>
            <div
              className="p-4 flex flex-col gap-4 shadow-2xl transition-all duration-500"
              style={{
                backgroundColor: `hsl(${currentColors.surface})`,
                borderRadius: currentRadius,
                border: `1px solid hsl(${currentColors.muted} / 0.2)`,
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary shadow-lg" style={{ backgroundColor: `hsl(${currentColors.primary})`, borderRadius: currentRadius }} />
                <div className="flex-1">
                  <div className="h-2 w-20 bg-foreground/20 rounded-full mb-2" style={{ backgroundColor: `hsl(${currentColors.foreground} / 0.2)` }} />
                  <div className="h-1.5 w-12 bg-foreground/10 rounded-full" style={{ backgroundColor: `hsl(${currentColors.foreground} / 0.1)` }} />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-6 h-6 rounded-full border-2 border-surface bg-muted/50" style={{ backgroundColor: `hsl(${currentColors.muted} / 0.3)` }} />
                  ))}
                </div>
                <div className="w-6 h-6 rounded-lg bg-accent" style={{ backgroundColor: `hsl(${currentColors.accent})`, borderRadius: currentRadius }} />
              </div>
            </div>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}
