import { Type, ChevronDown, ChevronUp } from 'lucide-react';
import { ThemeOverrides } from '@/lib/designStyles';

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

interface TypographySectionProps {
    currentFonts: {
        heading: string;
        body: string;
        headingWeight: string;
        bodyWeight: string;
    };
    overrides: ThemeOverrides;
    onOverridesChange: (overrides: ThemeOverrides) => void;
    isOpen: boolean;
    onToggle: () => void;
}

export function TypographySection({
    currentFonts,
    overrides,
    onOverridesChange,
    isOpen,
    onToggle
}: TypographySectionProps) {

    const updateFont = (key: keyof typeof currentFonts, value: string) => {
        onOverridesChange({
            ...overrides,
            fonts: {
                ...overrides.fonts,
                [key]: value,
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
                    <Type className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                    <span className="text-xs font-black uppercase tracking-widest">Glyph Engine</span>
                </div>
                {isOpen ? <ChevronUp className="w-4 h-4 opacity-30" /> : <ChevronDown className="w-4 h-4 opacity-30" />}
            </button>

            {isOpen && (
                <div className="space-y-4 pb-4 animate-fade-in pl-1">
                    {/* Heading Font Select */}
                    <div>
                        <label className="text-[9px] font-black tracking-[0.2em] opacity-40 block mb-2">HEADING FONT</label>
                        <select
                            value={currentFonts.heading}
                            onChange={(e) => updateFont('heading', e.target.value)}
                            className="w-full px-4 py-3 text-xs bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none font-bold mb-2"
                        >
                            {fontOptions.map((font) => (
                                <option key={font} value={font}>{font.split(',')[0]}</option>
                            ))}
                        </select>
                        <input
                            type="text"
                            placeholder="Or type Google Font name (e.g. Outfit)"
                            className="w-full px-4 py-2 text-[10px] bg-muted/20 border border-border/50 rounded-lg focus:outline-none focus:border-primary/50 transition-colors"
                            onBlur={(e) => {
                                const val = e.target.value.trim();
                                if (val) {
                                    const link = document.createElement('link');
                                    link.href = `https://fonts.googleapis.com/css2?family=${val.replace(/ /g, '+')}:wght@300;400;500;700;900&display=swap`;
                                    link.rel = 'stylesheet';
                                    document.head.appendChild(link);
                                    updateFont('heading', `"${val}", sans-serif`);
                                }
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.currentTarget.blur();
                                }
                            }}
                        />
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

                    {/* Body Font Select */}
                    <div className="mt-4">
                        <label className="text-[9px] font-black tracking-[0.2em] opacity-40 block mb-2">BODY FONT</label>
                        <select
                            value={currentFonts.body}
                            onChange={(e) => updateFont('body', e.target.value)}
                            className="w-full px-4 py-3 text-xs bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none mb-2"
                        >
                            {fontOptions.map((font) => (
                                <option key={font} value={font}>{font.split(',')[0]}</option>
                            ))}
                        </select>
                        <input
                            type="text"
                            placeholder="Or type Google Font name (e.g. Satoshi)"
                            className="w-full px-4 py-2 text-[10px] bg-muted/20 border border-border/50 rounded-lg focus:outline-none focus:border-primary/50 transition-colors"
                            onBlur={(e) => {
                                const val = e.target.value.trim();
                                if (val) {
                                    const link = document.createElement('link');
                                    link.href = `https://fonts.googleapis.com/css2?family=${val.replace(/ /g, '+')}:wght@300;400;500;700;900&display=swap`;
                                    link.rel = 'stylesheet';
                                    document.head.appendChild(link);
                                    updateFont('body', `"${val}", sans-serif`);
                                }
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.currentTarget.blur();
                                }
                            }}
                        />
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
    );
}
