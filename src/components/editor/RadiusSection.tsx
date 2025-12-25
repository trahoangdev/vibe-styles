import { Square, ChevronDown, ChevronUp } from 'lucide-react';
import { ThemeOverrides } from '@/lib/designStyles';

interface RadiusSectionProps {
    currentRadius: string;
    overrides: ThemeOverrides;
    onOverridesChange: (overrides: ThemeOverrides) => void;
    isOpen: boolean;
    onToggle: () => void;
}

export function RadiusSection({
    currentRadius,
    overrides,
    onOverridesChange,
    isOpen,
    onToggle
}: RadiusSectionProps) {

    const updateRadius = (value: string) => {
        onOverridesChange({
            ...overrides,
            radius: value,
        });
    };

    return (
        <section className="border-t border-border/50">
            <button
                onClick={onToggle}
                className="w-full py-4 flex items-center justify-between group"
            >
                <div className="flex items-center gap-3">
                    <Square className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                    <span className="text-xs font-black uppercase tracking-widest">Curvature Density</span>
                </div>
                {isOpen ? <ChevronUp className="w-4 h-4 opacity-30" /> : <ChevronDown className="w-4 h-4 opacity-30" />}
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
