import { Square, ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';
import { ThemeOverrides } from '@/lib/designStyles';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface RadiusSectionProps {
    currentRadius: string;
    baseRadius?: string;
    overrides: ThemeOverrides;
    onOverridesChange: (overrides: ThemeOverrides) => void;
    isOpen: boolean;
    onToggle: () => void;
    searchQuery?: string;
}

export function RadiusSection({
    currentRadius,
    baseRadius,
    overrides,
    onOverridesChange,
    isOpen,
    onToggle,
    searchQuery = ''
}: RadiusSectionProps) {

    const updateRadius = (value: string) => {
        onOverridesChange({
            ...overrides,
            radius: value,
        });
    };

    const resetRadius = () => {
        const { radius, ...rest } = overrides;
        onOverridesChange(rest);
    };

    const hasChanges = overrides.radius !== undefined;
    const terms = ['radius', 'curvature', 'corner', 'round'];
    const isMatch = searchQuery === '' || terms.some(t => t.includes(searchQuery.toLowerCase()));

    if (!isMatch) return null;

    return (
        <section className="border-t border-border/50">
            <button
                onClick={onToggle}
                className="w-full py-4 flex items-center justify-between group"
            >
                <div className="flex items-center gap-3">
                    <Square className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                    <span className="text-xs font-black uppercase tracking-widest">Curvature Density</span>
                    {hasChanges && (
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    )}
                </div>
                <div className="flex items-center gap-2">
                    {hasChanges && (
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        resetRadius();
                                    }}
                                    className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    <RotateCcw className="w-3 h-3" />
                                </button>
                            </TooltipTrigger>
                            <TooltipContent>Reset to default</TooltipContent>
                        </Tooltip>
                    )}
                    {isOpen ? <ChevronUp className="w-4 h-4 opacity-30" /> : <ChevronDown className="w-4 h-4 opacity-30" />}
                </div>
            </button>

            {isOpen && (
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
    );
}
