import { Layers, ChevronDown, ChevronUp } from 'lucide-react';
import { ThemeOverrides } from '@/lib/designStyles';

interface ShadowsSectionProps {
    currentShadowStrength: number;
    overrides: ThemeOverrides;
    onOverridesChange: (overrides: ThemeOverrides) => void;
    isOpen: boolean;
    onToggle: () => void;
}

export function ShadowsSection({
    currentShadowStrength,
    overrides,
    onOverridesChange,
    isOpen,
    onToggle
}: ShadowsSectionProps) {

    const updateShadowStrength = (value: number) => {
        onOverridesChange({
            ...overrides,
            shadowStrength: value,
        });
    };

    return (
        <section className="border-t border-border/50">
            <button
                onClick={onToggle}
                className="w-full py-4 flex items-center justify-between group"
            >
                <div className="flex items-center gap-3">
                    <Layers className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                    <span className="text-xs font-black uppercase tracking-widest">Depth Perception</span>
                </div>
                {isOpen ? <ChevronUp className="w-4 h-4 opacity-30" /> : <ChevronDown className="w-4 h-4 opacity-30" />}
            </button>

            {isOpen && (
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
    );
}
