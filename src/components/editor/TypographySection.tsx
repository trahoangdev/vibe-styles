import { Type, ChevronDown, ChevronUp } from 'lucide-react';
import { ThemeOverrides } from '@/lib/designStyles';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

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
        scale?: number;
    };
    overrides: ThemeOverrides;
    onOverridesChange: (overrides: ThemeOverrides) => void;
    isOpen: boolean;
    onToggle: () => void;
    searchQuery?: string;
}

export function TypographySection({
    currentFonts,
    overrides,
    onOverridesChange,
    isOpen,
    onToggle,
    searchQuery = ''
}: TypographySectionProps) {

    const updateFont = (key: keyof typeof currentFonts, value: string | number) => {
        onOverridesChange({
            ...overrides,
            fonts: {
                ...overrides.fonts,
                [key]: value,
            },
        });
    };

    const isHeadingMatch = 'heading'.includes(searchQuery.toLowerCase());
    const isBodyMatch = 'body'.includes(searchQuery.toLowerCase());
    const isWeightMatch = 'weight'.includes(searchQuery.toLowerCase());
    const isFontMatch = 'font'.includes(searchQuery.toLowerCase());
    const isScaleMatch = 'scale'.includes(searchQuery.toLowerCase());
    const isGenericMatch = isFontMatch || searchQuery === '';

    const showHeading = isHeadingMatch || isGenericMatch;
    const showBody = isBodyMatch || isGenericMatch;
    const showScale = isScaleMatch || isGenericMatch;

    if (!showHeading && !showBody && !isWeightMatch && !showScale && !isGenericMatch) return null;

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
                    {(showHeading || isWeightMatch) && (
                        <div>
                            {showHeading && (
                                <>
                                    <label className="text-[9px] font-black tracking-[0.2em] opacity-40 block mb-2">HEADING FONT</label>
                                    <Select
                                        value={currentFonts.heading}
                                        onValueChange={(val) => updateFont('heading', val)}
                                    >
                                        <SelectTrigger className="w-full h-10 mb-2 bg-muted/50 border-border">
                                            <SelectValue placeholder="Select Heading Font" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {fontOptions.map((font) => (
                                                <SelectItem key={font} value={font} className="font-medium text-xs">
                                                    {font.split(',')[0]}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

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
                                </>
                            )}

                            {(isWeightMatch || showHeading) && (
                                <div className="mt-2">
                                    <label className="text-[9px] font-black tracking-[0.2em] opacity-40 block mb-2">HEADING WEIGHT</label>
                                    <div className="grid grid-cols-6 gap-1">
                                        {weightOptions.map(option => (
                                            <Tooltip key={option.value}>
                                                <TooltipTrigger asChild>
                                                    <button
                                                        onClick={() => updateFont('headingWeight', option.value)}
                                                        className={`h-8 rounded flex items-center justify-center text-[10px] font-medium transition-colors ${currentFonts.headingWeight === option.value ? 'bg-primary text-primary-foreground' : 'bg-muted/50 hover:bg-muted'}`}
                                                    >
                                                        {option.value}
                                                    </button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>{option.label}</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Body Font Select */}
                    {(showBody || isWeightMatch) && (
                        <div className="mt-4">
                            {showBody && (
                                <>
                                    <label className="text-[9px] font-black tracking-[0.2em] opacity-40 block mb-2">BODY FONT</label>
                                    <Select
                                        value={currentFonts.body}
                                        onValueChange={(val) => updateFont('body', val)}
                                    >
                                        <SelectTrigger className="w-full h-10 mb-2 bg-muted/50 border-border">
                                            <SelectValue placeholder="Select Body Font" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {fontOptions.map((font) => (
                                                <SelectItem key={font} value={font} className="font-medium text-xs">
                                                    {font.split(',')[0]}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

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
                                </>
                            )}

                            {(isWeightMatch || showBody) && (
                                <div className="mt-2">
                                    <label className="text-[9px] font-black tracking-[0.2em] opacity-40 block mb-2">BODY WEIGHT</label>
                                    <div className="grid grid-cols-6 gap-1">
                                        {weightOptions.map(option => (
                                            <Tooltip key={option.value}>
                                                <TooltipTrigger asChild>
                                                    <button
                                                        onClick={() => updateFont('bodyWeight', option.value)}
                                                        className={`h-8 rounded flex items-center justify-center text-[10px] font-medium transition-colors ${currentFonts.bodyWeight === option.value ? 'bg-primary text-primary-foreground' : 'bg-muted/50 hover:bg-muted'}`}
                                                    >
                                                        {option.value}
                                                    </button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>{option.label}</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Type Scale */}
                    {showScale && (
                        <div className="mt-4 pt-4 border-t border-border/30">
                            <div className="flex items-center justify-between mb-2">
                                <label className="text-[9px] font-black tracking-[0.2em] opacity-40">TYPE SCALE</label>
                                <span className="text-[10px] font-mono opacity-60">{(currentFonts.scale || 1.25).toFixed(3)}</span>
                            </div>
                            <input
                                type="range"
                                min="1.000"
                                max="1.618"
                                step="0.001"
                                value={currentFonts.scale || 1.25}
                                onChange={(e) => updateFont('scale', parseFloat(e.target.value))}
                                className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                            />
                            <div className="flex justify-between mt-1 text-[9px] text-muted-foreground opacity-50 font-mono">
                                <span>1.0</span>
                                <span>Major Third (1.25)</span>
                                <span>Golden (1.618)</span>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </section>
    );
}
