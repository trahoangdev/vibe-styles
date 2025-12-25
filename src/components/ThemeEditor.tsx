import { useState } from 'react';
import { Palette, Type, Square, RotateCcw, ChevronDown, ChevronUp, Download, FileCode, Copy, Check, Undo2, Redo2 } from 'lucide-react';
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
  };
  radius?: string;
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
  };

  const currentRadius = overrides.radius ?? baseRadius;

  const hslToHex = (hsl: string): string => {
    const [h, s, l] = hsl.split(' ').map(v => parseFloat(v.replace('%', '')));
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

  const updateFont = (key: 'heading' | 'body', value: string) => {
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

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const hasChanges = Object.keys(overrides.colors || {}).length > 0 || 
                     Object.keys(overrides.fonts || {}).length > 0 || 
                     overrides.radius !== undefined;

  const generateCSSExport = (): string => {
    const lines = [':root {'];
    lines.push(`  /* Colors */`);
    lines.push(`  --primary: ${currentColors.primary};`);
    lines.push(`  --accent: ${currentColors.accent};`);
    lines.push(`  --muted: ${currentColors.muted};`);
    lines.push(`  --background: ${currentColors.background};`);
    lines.push(`  --foreground: ${currentColors.foreground};`);
    lines.push(`  --surface: ${currentColors.surface};`);
    lines.push('');
    lines.push(`  /* Typography */`);
    lines.push(`  --font-heading: ${currentFonts.heading};`);
    lines.push(`  --font-body: ${currentFonts.body};`);
    lines.push('');
    lines.push(`  /* Border Radius */`);
    lines.push(`  --radius: ${currentRadius};`);
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
            heading: [currentFonts.heading],
            body: [currentFonts.body],
          },
          borderRadius: {
            DEFAULT: currentRadius,
          },
        },
      },
    };
    return `// tailwind.config.ts\nmodule.exports = ${JSON.stringify(config, null, 2)}`;
  };

  const copyToClipboard = async (format: 'css' | 'tailwind') => {
    const content = format === 'css' ? generateCSSExport() : generateTailwindExport();
    await navigator.clipboard.writeText(content);
    setCopiedFormat(format);
    toast({
      title: 'Copied!',
      description: `${format === 'css' ? 'CSS Variables' : 'Tailwind Config'} copied to clipboard`,
    });
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  const downloadFile = (format: 'css' | 'tailwind') => {
    const content = format === 'css' ? generateCSSExport() : generateTailwindExport();
    const filename = format === 'css' ? 'theme.css' : 'tailwind.config.ts';
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    toast({
      title: 'Downloaded!',
      description: `${filename} has been downloaded`,
    });
  };

  return (
    <TooltipProvider delayDuration={300}>
      <div className="w-72 h-full border-l border-border bg-card flex flex-col overflow-hidden">
        {/* Header with Undo/Redo */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-sm">Live Theme Editor</h3>
            {hasChanges && (
              <button
                onClick={onReset}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            )}
          </div>
          
          {/* Undo/Redo Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={onUndo}
                    disabled={!canUndo}
                    className="p-2 rounded-lg transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-muted active:scale-95"
                  >
                    <Undo2 className="w-4 h-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>Undo (⌘Z)</TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={onRedo}
                    disabled={!canRedo}
                    className="p-2 rounded-lg transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-muted active:scale-95"
                  >
                    <Redo2 className="w-4 h-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>Redo (⌘⇧Z)</TooltipContent>
              </Tooltip>
            </div>
            
            {historyInfo && historyInfo.total > 1 && (
              <span className="text-[10px] text-muted-foreground font-mono">
                {historyInfo.current + 1}/{historyInfo.total}
              </span>
            )}
          </div>
        </div>

      <div className="flex-1 overflow-y-auto">
        {/* Colors Section */}
        <div className="border-b border-border">
          <button
            onClick={() => toggleSection('colors')}
            className="w-full px-4 py-3 flex items-center justify-between hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Colors</span>
            </div>
            {expandedSection === 'colors' ? (
              <ChevronUp className="w-4 h-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            )}
          </button>
          
          {expandedSection === 'colors' && (
            <div className="px-4 pb-4 space-y-3">
              {[
                { key: 'primary', label: 'Primary' },
                { key: 'accent', label: 'Accent' },
                { key: 'muted', label: 'Muted' },
                { key: 'background', label: 'Background' },
                { key: 'surface', label: 'Surface' },
                { key: 'foreground', label: 'Foreground' },
              ].map(({ key, label }) => (
                <div key={key} className="flex items-center justify-between gap-3">
                  <label className="text-xs text-muted-foreground flex-1">{label}</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={hslToHex(currentColors[key as keyof typeof currentColors])}
                      onChange={(e) => updateColor(key as keyof typeof currentColors, e.target.value)}
                      className="w-8 h-8 rounded cursor-pointer border border-border"
                    />
                    <span className="text-[10px] text-muted-foreground font-mono w-16 truncate">
                      {currentColors[key as keyof typeof currentColors].split(' ')[0]}°
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Typography Section */}
        <div className="border-b border-border">
          <button
            onClick={() => toggleSection('fonts')}
            className="w-full px-4 py-3 flex items-center justify-between hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Type className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Typography</span>
            </div>
            {expandedSection === 'fonts' ? (
              <ChevronUp className="w-4 h-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            )}
          </button>
          
          {expandedSection === 'fonts' && (
            <div className="px-4 pb-4 space-y-3">
              <div>
                <label className="text-xs text-muted-foreground block mb-1.5">Heading Font</label>
                <select
                  value={currentFonts.heading}
                  onChange={(e) => updateFont('heading', e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-muted rounded-md border-0 focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  {fontOptions.map((font) => (
                    <option key={font} value={font} style={{ fontFamily: font }}>
                      {font.split(',')[0]}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs text-muted-foreground block mb-1.5">Body Font</label>
                <select
                  value={currentFonts.body}
                  onChange={(e) => updateFont('body', e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-muted rounded-md border-0 focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  {fontOptions.map((font) => (
                    <option key={font} value={font} style={{ fontFamily: font }}>
                      {font.split(',')[0]}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Radius Section */}
        <div className="border-b border-border">
          <button
            onClick={() => toggleSection('radius')}
            className="w-full px-4 py-3 flex items-center justify-between hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Square className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Border Radius</span>
            </div>
            {expandedSection === 'radius' ? (
              <ChevronUp className="w-4 h-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            )}
          </button>
          
          {expandedSection === 'radius' && (
            <div className="px-4 pb-4">
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="0"
                  max="24"
                  value={parseInt(currentRadius)}
                  onChange={(e) => updateRadius(`${e.target.value}px`)}
                  className="flex-1 accent-primary"
                />
                <span className="text-xs text-muted-foreground font-mono w-12">
                  {currentRadius}
                </span>
              </div>
              <div className="flex gap-2 mt-3">
                {['0px', '4px', '8px', '12px', '16px', '24px'].map((r) => (
                  <button
                    key={r}
                    onClick={() => updateRadius(r)}
                    className={`flex-1 py-1.5 text-xs rounded transition-colors ${
                      currentRadius === r 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted hover:bg-muted/80'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Export Section */}
        <div className="border-b border-border">
          <button
            onClick={() => toggleSection('export')}
            className="w-full px-4 py-3 flex items-center justify-between hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Download className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Export Theme</span>
            </div>
            {expandedSection === 'export' ? (
              <ChevronUp className="w-4 h-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            )}
          </button>
          
          {expandedSection === 'export' && (
            <div className="px-4 pb-4 space-y-3">
              {/* CSS Export */}
              <div className="p-3 rounded-lg bg-muted/50 border border-border">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <FileCode className="w-4 h-4 text-primary" />
                    <span className="text-xs font-medium">CSS Variables</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => copyToClipboard('css')}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs bg-background hover:bg-muted rounded-md border border-border transition-colors"
                  >
                    {copiedFormat === 'css' ? (
                      <Check className="w-3 h-3 text-green-500" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                    Copy
                  </button>
                  <button
                    onClick={() => downloadFile('css')}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs bg-primary text-primary-foreground hover:bg-primary/90 rounded-md transition-colors"
                  >
                    <Download className="w-3 h-3" />
                    Download
                  </button>
                </div>
              </div>

              {/* Tailwind Export */}
              <div className="p-3 rounded-lg bg-muted/50 border border-border">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <FileCode className="w-4 h-4 text-accent" />
                    <span className="text-xs font-medium">Tailwind Config</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => copyToClipboard('tailwind')}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs bg-background hover:bg-muted rounded-md border border-border transition-colors"
                  >
                    {copiedFormat === 'tailwind' ? (
                      <Check className="w-3 h-3 text-green-500" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                    Copy
                  </button>
                  <button
                    onClick={() => downloadFile('tailwind')}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs bg-primary text-primary-foreground hover:bg-primary/90 rounded-md transition-colors"
                  >
                    <Download className="w-3 h-3" />
                    Download
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Preview of changes */}
      {hasChanges && (
        <div className="p-4 border-t border-border bg-muted/30">
          <p className="text-xs text-muted-foreground mb-2">Preview</p>
          <div 
            className="p-3 rounded-lg border"
            style={{
              backgroundColor: `hsl(${currentColors.surface})`,
              borderColor: `hsl(${currentColors.muted})`,
              borderRadius: currentRadius,
            }}
          >
            <p 
              className="text-sm font-semibold mb-1"
              style={{ 
                fontFamily: currentFonts.heading,
                color: `hsl(${currentColors.foreground})`,
              }}
            >
              Heading
            </p>
            <p 
              className="text-xs"
              style={{ 
                fontFamily: currentFonts.body,
                color: `hsl(${currentColors.muted.replace(/%$/, '')} / 0.7)`,
              }}
            >
              Body text preview
            </p>
            <div className="flex gap-2 mt-2">
              <div 
                className="w-6 h-6 rounded"
                style={{ 
                  backgroundColor: `hsl(${currentColors.primary})`,
                  borderRadius: currentRadius,
                }}
              />
              <div 
                className="w-6 h-6 rounded"
                style={{ 
                  backgroundColor: `hsl(${currentColors.accent})`,
                  borderRadius: currentRadius,
                }}
              />
            </div>
          </div>
        </div>
      )}
      </div>
    </TooltipProvider>
  );
}
