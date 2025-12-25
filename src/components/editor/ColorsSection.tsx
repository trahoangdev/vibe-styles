import { Palette, ChevronDown, ChevronUp } from 'lucide-react';
import { ThemeOverrides } from '@/lib/designStyles';
import { hslToHex, hexToHsl } from '@/lib/colorUtils';

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
                <div className="space-y-6 pb-4 animate-fade-in pl-1">
                    {[
                        { key: 'background', label: 'VOID (BG)' },
                        { key: 'foreground', label: 'CONTENT (FG)' },
                        { key: 'primary', label: 'ENGINE (PRIMARY)' },
                        { key: 'accent', label: 'DETAIL (ACCENT)' },
                    ].map(({ key, label }) => {
                        const colorKey = key as keyof typeof currentColors;
                        const colorParts = currentColors[colorKey].split(' ');
                        const hue = parseInt(colorParts[0]);

                        return (
                            <div key={key} className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <label className="text-[9px] font-black tracking-[0.2em] opacity-50">{label}</label>
                                    <span className="text-[10px] font-mono opacity-40">HEX: {hslToHex(currentColors[colorKey]).toUpperCase()}</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <input
                                        type="color"
                                        value={hslToHex(currentColors[colorKey])}
                                        onChange={(e) => updateColor(colorKey, e.target.value)}
                                        className="w-12 h-12 rounded-xl cursor-pointer bg-transparent border-0 outline-none"
                                    />
                                    <div className="flex-1 space-y-2">
                                        <input
                                            type="range"
                                            min="0" max="360"
                                            value={hue}
                                            onChange={(e) => updateColorHSLComponent(colorKey, 0, parseInt(e.target.value))}
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
    );
}
