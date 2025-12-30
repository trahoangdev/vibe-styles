
import { Palette, ChevronDown, ChevronUp, Copy, Check, Pipette, Lock, Unlock } from 'lucide-react';
import { ThemeOverrides } from '@/lib/designStyles';
import { hslToHex } from '@/lib/colorUtils';
import { useState, memo } from 'react';
import { toast } from 'sonner';
import { HslColorPicker } from 'react-colorful';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface ColorsSectionProps {
    currentColors: {
        primary: string;
        accent: string;
        muted: string;
        background: string;
        foreground: string;
        surface: string;
    };
    overrides: ThemeOverrides;
    onOverridesChange: (overrides: ThemeOverrides) => void;
    isOpen: boolean;
    onToggle: () => void;
    searchQuery?: string;
    lockedColors?: string[];
    onToggleLock?: (key: string) => void;
}

// Helper to convert "h s% l%" string to {h,s,l} object
const parseHsl = (hslString: string) => {
    const [h, s, l] = hslString.split(' ').map(v => parseFloat(v));
    return { h: h || 0, s: s || 0, l: l || 0 };
};

// Helper to convert {h,s,l} object to "h s% l%" string
const formatHsl = ({ h, s, l }: { h: number; s: number; l: number }) => {
    return `${Math.round(h)} ${Math.round(s)}% ${Math.round(l)}% `;
};

export const ColorsSection = memo(function ColorsSection({
    currentColors,
    overrides,
    onOverridesChange,
    isOpen,
    onToggle,
    searchQuery = '',
    lockedColors = [],
    onToggleLock
}: ColorsSectionProps) {
    const [copiedKey, setCopiedKey] = useState<string | null>(null);

    const updateColor = (key: keyof typeof currentColors, newHsl: { h: number; s: number; l: number }) => {
        const hslString = formatHsl(newHsl);
        onOverridesChange({
            ...overrides,
            colors: {
                ...overrides.colors,
                [key]: hslString,
            },
        });
    };

    const copyToClipboard = (hex: string, key: string) => {
        navigator.clipboard.writeText(hex);
        setCopiedKey(key);
        toast.success(`Copied to clipboard`);
        setTimeout(() => setCopiedKey(null), 2000);
    };

    const allColors = [
        { key: 'background', label: 'VOID (BG)' },
        { key: 'foreground', label: 'CONTENT (FG)' },
        { key: 'primary', label: 'ENGINE (PRIMARY)' },
        { key: 'accent', label: 'DETAIL (ACCENT)' },
        { key: 'surface', label: 'SURFACE' },
        { key: 'muted', label: 'MUTED' }
    ];

    const filteredColors = allColors.filter(c =>
        searchQuery === '' ||
        c.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.label.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (searchQuery && filteredColors.length === 0) return null;

    return (
        <section className="border-t border-border/50">
            <button
                onClick={onToggle}
                className="w-full py-4 flex items-center justify-between group"
            >
                <div className="flex items-center gap-3">
                    <Palette className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                    <span className="text-xs font-black uppercase tracking-widest">Chromatic Array</span>
                </div>
                {isOpen ? <ChevronUp className="w-4 h-4 opacity-30" /> : <ChevronDown className="w-4 h-4 opacity-30" />}
            </button>

            {isOpen && (
                <div className="space-y-6 pb-6 animate-fade-in pl-1">
                    {filteredColors.map(({ key, label }) => {
                        const colorKey = key as keyof typeof currentColors;
                        const colorVal = currentColors[colorKey] || '0 0% 0%';
                        const hslObj = parseHsl(colorVal);
                        const hex = hslToHex(colorVal).toUpperCase();
                        const isLocked = lockedColors.includes(key);

                        return (
                            <div key={key} className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <label className="text-[9px] font-black tracking-[0.2em] opacity-50">{label}</label>
                                    <div className="flex items-center gap-2">
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <button
                                                    onClick={() => onToggleLock?.(key)}
                                                    className={`p-1 rounded-md transition-all ${isLocked ? 'text-primary bg-primary/10' : 'text-muted-foreground/30 hover:text-muted-foreground'} `}
                                                >
                                                    {isLocked ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                                                </button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>{isLocked ? "Unlock color" : "Lock color (prevent randomization)"}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                        <button
                                            onClick={() => copyToClipboard(hex, key)}
                                            className="flex items-center gap-1.5 text-[10px] font-mono opacity-40 hover:opacity-100 transition-opacity"
                                        >
                                            {hex}
                                            {copiedKey === key ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                        </button>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <button className="relative group/picker w-12 h-12 rounded-xl border border-border/50 shadow-sm overflow-hidden transition-transform active:scale-95 hover:shadow-md">
                                                <div
                                                    className="absolute inset-0"
                                                    style={{ backgroundColor: `hsl(${colorVal})` }}
                                                />
                                                <div className="absolute inset-0 bg-black/0 group-hover/picker:bg-black/10 flex items-center justify-center transition-colors">
                                                    <Pipette className="w-4 h-4 text-white opacity-0 group-hover/picker:opacity-100 drop-shadow-md" />
                                                </div>
                                            </button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-3" align="start">
                                            <HslColorPicker color={hslObj} onChange={(newVal) => updateColor(colorKey, newVal)} />
                                            <div className="mt-3 flex gap-2">
                                                <div className="text-[10px] uppercase font-bold opacity-50">HSL</div>
                                                <input
                                                    className="flex-1 bg-transparent text-[10px] font-mono outline-none text-right"
                                                    value={formatHsl(hslObj)}
                                                    readOnly
                                                />
                                            </div>
                                        </PopoverContent>
                                    </Popover>

                                    <div className="flex-1 space-y-2 pt-1">
                                        {/* Simple sliders for quick adjustments using native range inputs but managed via same HSL update */}
                                        {/* Saturation */}
                                        <div className="flex items-center gap-3">
                                            <span className="text-[8px] font-bold opacity-30 w-4">SAT</span>
                                            <input
                                                type="range"
                                                min="0" max="100"
                                                value={hslObj.s}
                                                onChange={(e) => updateColor(colorKey, { ...hslObj, s: parseFloat(e.target.value) })}
                                                className="flex-1 h-1.5 appearance-none rounded-full accent-foreground cursor-pointer bg-muted"
                                            />
                                            <span className="text-[8px] font-mono opacity-50 w-6 text-right">{Math.round(hslObj.s)}%</span>
                                        </div>

                                        {/* Lightness */}
                                        <div className="flex items-center gap-3">
                                            <span className="text-[8px] font-bold opacity-30 w-4">LIG</span>
                                            <input
                                                type="range"
                                                min="0" max="100"
                                                value={hslObj.l}
                                                onChange={(e) => updateColor(colorKey, { ...hslObj, l: parseFloat(e.target.value) })}
                                                className="flex-1 h-1.5 appearance-none rounded-full accent-foreground cursor-pointer bg-muted"
                                            />
                                            <span className="text-[8px] font-mono opacity-50 w-6 text-right">{Math.round(hslObj.l)}%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </section>
    );
});
