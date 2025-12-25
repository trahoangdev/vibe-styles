import { Palette, ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';
import { ThemeOverrides } from '@/lib/designStyles';
import { hslToHex, hexToHsl } from '@/lib/colorUtils';
import { useState } from 'react';
import { toast } from 'sonner';

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
}

export function ColorsSection({
    currentColors,
    overrides,
    onOverridesChange,
    isOpen,
    onToggle
}: ColorsSectionProps) {
    const [copiedKey, setCopiedKey] = useState<string | null>(null);

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

    const copyToClipboard = (hex: string, key: string) => {
        navigator.clipboard.writeText(hex);
        setCopiedKey(key);
        toast.success(`Copied ${hex} to clipboard`);
        setTimeout(() => setCopiedKey(null), 2000);
    };

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
                <div className="space-y-8 pb-6 animate-fade-in pl-1">
                    {[
                        { key: 'background', label: 'VOID (BG)' },
                        { key: 'foreground', label: 'CONTENT (FG)' },
                        { key: 'primary', label: 'ENGINE (PRIMARY)' },
                        { key: 'accent', label: 'DETAIL (ACCENT)' },
                    ].map(({ key, label }) => {
                        const colorKey = key as keyof typeof currentColors;
                        const colorParts = currentColors[colorKey].split(' ');
                        const hue = parseInt(colorParts[0]);
                        const sat = parseInt(colorParts[1]);
                        const light = parseInt(colorParts[2]);
                        const hex = hslToHex(currentColors[colorKey]).toUpperCase();

                        return (
                            <div key={key} className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <label className="text-[9px] font-black tracking-[0.2em] opacity-50">{label}</label>
                                    <button
                                        onClick={() => copyToClipboard(hex, key)}
                                        className="flex items-center gap-1.5 text-[10px] font-mono opacity-40 hover:opacity-100 transition-opacity"
                                    >
                                        {hex}
                                        {copiedKey === key ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                    </button>
                                </div>
                                <div className="flex gap-4">
                                    <div className="relative group/picker">
                                        <input
                                            type="color"
                                            value={hex}
                                            onChange={(e) => updateColor(colorKey, e.target.value)}
                                            className="w-12 h-20 rounded-lg cursor-pointer bg-transparent border-0 opacity-0 absolute inset-0 z-10"
                                        />
                                        <div
                                            className="w-12 h-20 rounded-lg border border-border shadow-sm group-hover/picker:scale-105 transition-transform"
                                            style={{ backgroundColor: `hsl(${currentColors[colorKey]})` }}
                                        />
                                    </div>

                                    <div className="flex-1 space-y-3 pt-1">
                                        {/* Hue Slider */}
                                        <div className="space-y-1">
                                            <input
                                                type="range"
                                                min="0" max="360"
                                                value={hue}
                                                onChange={(e) => updateColorHSLComponent(colorKey, 0, parseInt(e.target.value))}
                                                className="w-full h-1.5 appearance-none rounded-full accent-foreground cursor-pointer"
                                                style={{ background: 'linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)' }}
                                            />
                                            <div className="flex justify-between text-[8px] font-bold opacity-30">
                                                <span>HUE</span>
                                                <span>{hue}°</span>
                                            </div>
                                        </div>

                                        {/* Saturation Slider */}
                                        <div className="space-y-1">
                                            <input
                                                type="range"
                                                min="0" max="100"
                                                value={sat}
                                                onChange={(e) => updateColorHSLComponent(colorKey, 1, parseInt(e.target.value))}
                                                className="w-full h-1.5 appearance-none rounded-full accent-foreground cursor-pointer"
                                                style={{ background: `linear-gradient(to right, hsl(${hue}, 0%, ${light}%), hsl(${hue}, 100%, ${light}%))` }}
                                            />
                                            <div className="flex justify-between text-[8px] font-bold opacity-30">
                                                <span>SAT</span>
                                                <span>{sat}%</span>
                                            </div>
                                        </div>

                                        {/* Lightness Slider */}
                                        <div className="space-y-1">
                                            <input
                                                type="range"
                                                min="0" max="100"
                                                value={light}
                                                onChange={(e) => updateColorHSLComponent(colorKey, 2, parseInt(e.target.value))}
                                                className="w-full h-1.5 appearance-none rounded-full accent-foreground cursor-pointer"
                                                style={{ background: `linear-gradient(to right, black, hsl(${hue}, ${sat}%, 50%), white)` }}
                                            />
                                            <div className="flex justify-between text-[8px] font-bold opacity-30">
                                                <span>LIG</span>
                                                <span>{light}%</span>
                                            </div>
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
}
