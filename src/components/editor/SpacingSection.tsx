import { MoveHorizontal, ChevronDown, ChevronUp, ScanLine, Maximize, Minus, AlignJustify } from 'lucide-react';
import { ThemeOverrides } from '@/lib/designStyles';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

interface SpacingSectionProps {
    overrides: ThemeOverrides;
    onOverridesChange: (overrides: ThemeOverrides) => void;
    isOpen: boolean;
    onToggle: () => void;
}

export function SpacingSection({
    overrides,
    onOverridesChange,
    isOpen,
    onToggle
}: SpacingSectionProps) {

    const currentBorderWidth = parseInt(overrides.borderWidth?.replace('px', '') || '1');
    const currentDensity = overrides.density || 1;

    const handleBorderWidthChange = (val: number[]) => {
        onOverridesChange({
            ...overrides,
            borderWidth: `${val[0]}px`
        });
    };

    const handleDensityChange = (val: number[]) => {
        onOverridesChange({
            ...overrides,
            density: val[0]
        });
    };

    return (
        <section className="border-t border-border/50">
            <button
                onClick={onToggle}
                className="w-full py-4 flex items-center justify-between group"
            >
                <div className="flex items-center gap-3">
                    <ScanLine className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                    <span className="text-xs font-black uppercase tracking-widest">Layout & Spacing</span>
                </div>
                {isOpen ? <ChevronUp className="w-4 h-4 opacity-30" /> : <ChevronDown className="w-4 h-4 opacity-30" />}
            </button>

            {isOpen && (
                <div className="space-y-6 pb-6 animate-fade-in pl-1">

                    {/* Border Width */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <label className="text-[9px] font-black tracking-[0.2em] opacity-50">BORDER WIDTH</label>
                            <span className="text-[10px] font-mono opacity-50">{currentBorderWidth}px</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Minus className="w-3 h-3 opacity-30" />
                            <Slider
                                value={[currentBorderWidth]}
                                min={0}
                                max={4}
                                step={1}
                                onValueChange={handleBorderWidthChange}
                                className="flex-1"
                            />
                            <div className="w-3 h-3 border border-current opacity-30" style={{ borderWidth: Math.max(1, currentBorderWidth) }} />
                        </div>
                        <div className="flex justify-between px-1">
                            {[0, 1, 2, 3, 4].map((v) => (
                                <button
                                    key={v}
                                    onClick={() => handleBorderWidthChange([v])}
                                    className={cn(
                                        "w-6 h-6 rounded-md text-[9px] font-mono border transition-all",
                                        currentBorderWidth === v
                                            ? "border-primary bg-primary/10 text-primary"
                                            : "border-transparent hover:bg-muted text-muted-foreground"
                                    )}
                                >
                                    {v}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Density */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <label className="text-[9px] font-black tracking-[0.2em] opacity-50">DENSITY</label>
                            <span className="text-[10px] font-mono opacity-50">{currentDensity}x</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <AlignJustify className="w-3 h-3 opacity-30" />
                            <Slider
                                value={[currentDensity]}
                                min={0.5}
                                max={1.5}
                                step={0.1}
                                onValueChange={handleDensityChange}
                                className="flex-1"
                            />
                            <Maximize className="w-3 h-3 opacity-30" />
                        </div>
                        <div className="flex justify-between text-[8px] opacity-40 uppercase tracking-wider font-medium px-1">
                            <span>Compact</span>
                            <span>Normal</span>
                            <span>Relaxed</span>
                        </div>
                    </div>

                </div>
            )}
        </section>
    );
}
