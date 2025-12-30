import { useState, useEffect } from 'react';
import { ChevronDown, RefreshCw, X } from 'lucide-react';
import { ThemeOverrides } from '@/lib/designStyles';
import { cn } from '@/lib/utils';
import { HexColorPicker } from 'react-colorful';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface GradientsSectionProps {
    overrides: ThemeOverrides;
    onOverridesChange: (overrides: ThemeOverrides) => void;
    isOpen: boolean;
    onToggle: () => void;
}

export function GradientsSection({
    overrides,
    onOverridesChange,
    isOpen,
    onToggle
}: GradientsSectionProps) {
    const [angle, setAngle] = useState(135);
    const [stop1, setStop1] = useState('#ff0000');
    const [stop2, setStop2] = useState('#0000ff');
    const [enabled, setEnabled] = useState(false);

    // Sync state with overrides on mount or external change (if simple)
    useEffect(() => {
        const bgGradient = overrides.gradients?.background;
        if (bgGradient) {
            setEnabled(true);
            // Very basic parsing attempt, otherwise keep local defaults
            // e.g. linear-gradient(135deg, #ff0000, #0000ff)
            const match = bgGradient.match(/linear-gradient\((\d+)deg,\s*(#[\da-fA-F]{3,6}),\s*(#[\da-fA-F]{3,6})\)/);
            if (match) {
                setAngle(parseInt(match[1]));
                setStop1(match[2]);
                setStop2(match[3]);
            }
        } else {
            setEnabled(false);
        }
    }, [overrides.gradients?.background]);

    const updateGradient = (newAngle: number, s1: string, s2: string) => {
        const gradient = `linear-gradient(${newAngle}deg, ${s1}, ${s2})`;
        onOverridesChange({
            ...overrides,
            gradients: {
                ...overrides.gradients,
                background: gradient
            }
        });
    };

    const handleToggle = () => {
        if (enabled) {
            // Disable
            const newGradients = { ...overrides.gradients };
            delete newGradients.background;
            onOverridesChange({ ...overrides, gradients: newGradients });
            setEnabled(false);
        } else {
            // Enable with current local state
            updateGradient(angle, stop1, stop2);
            setEnabled(true);
        }
    };

    return (
        <div className="border-b border-border">
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
            >
                <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">Gradients</span>
                    {overrides.gradients?.background && (
                        <span className="w-2 h-2 rounded-full bg-primary" />
                    )}
                </div>
                <ChevronDown className={cn("w-4 h-4 transition-transform", isOpen && "rotate-180")} />
            </button>

            {isOpen && (
                <div className="p-4 space-y-6 animate-slide-in">
                    {/* Background Gradient */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Background Gradient</label>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button
                                        onClick={handleToggle}
                                        className={cn(
                                            "w-10 h-5 rounded-full transition-colors relative",
                                            enabled ? "bg-primary" : "bg-muted"
                                        )}
                                    >
                                        <div className={cn(
                                            "absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition-transform shadow-sm",
                                            enabled ? "translate-x-5" : ""
                                        )} />
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{enabled ? 'Disable Gradient' : 'Enable Gradient'}</p>
                                </TooltipContent>
                            </Tooltip>
                        </div>

                        {enabled && (
                            <div className="space-y-4 p-4 bg-muted/30 rounded-xl border border-border/50">
                                {/* Angle Slider */}
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-xs">Angle</span>
                                        <span className="text-xs font-mono text-muted-foreground">{angle}°</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="360"
                                        value={angle}
                                        onChange={(e) => {
                                            const val = parseInt(e.target.value);
                                            setAngle(val);
                                            updateGradient(val, stop1, stop2);
                                        }}
                                        className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                                    />
                                </div>

                                {/* Stops */}
                                <div className="flex items-center gap-4">
                                    {/* Stop 1 */}
                                    <div className="flex-1 space-y-2">
                                        <span className="text-xs text-muted-foreground">Start</span>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <button
                                                    className="w-full h-8 rounded-lg border border-border shadow-sm transition-transform active:scale-95"
                                                    style={{ backgroundColor: stop1 }}
                                                />
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-3">
                                                <HexColorPicker color={stop1} onChange={(c) => {
                                                    setStop1(c);
                                                    updateGradient(angle, c, stop2);
                                                }} />
                                            </PopoverContent>
                                        </Popover>
                                    </div>

                                    {/* Stop 2 */}
                                    <div className="flex-1 space-y-2">
                                        <span className="text-xs text-muted-foreground">End</span>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <button
                                                    className="w-full h-8 rounded-lg border border-border shadow-sm transition-transform active:scale-95"
                                                    style={{ backgroundColor: stop2 }}
                                                />
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-3">
                                                <HexColorPicker color={stop2} onChange={(c) => {
                                                    setStop2(c);
                                                    updateGradient(angle, stop1, c);
                                                }} />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                </div>

                                {/* Preview Bar */}
                                <div className="h-4 rounded-full w-full border border-border/50"
                                    style={{ background: `linear-gradient(${angle}deg, ${stop1}, ${stop2})` }}
                                />
                            </div>
                        )}
                    </div>

                    {/* Future Text Gradient Implementation */}
                    <div className="opacity-50 pointer-events-none grayscale">
                        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">Text Gradient</label>
                        <div className="p-3 bg-muted/20 rounded-lg text-xs text-center border border-dashed border-border">
                            Coming soon
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
}
