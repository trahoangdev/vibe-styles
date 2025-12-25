import { useMemo } from 'react';
import { Eye, ChevronDown, ChevronUp, ShieldCheck, Activity } from 'lucide-react';
import { ColorBlindnessMode } from '@/lib/designStyles';
import { getRelativeLuminance, getContrastRatio } from '@/lib/colorUtils';

interface A11yPanelProps {
    currentColors: {
        background: string;
        foreground: string;
        primary: string;
    };
    colorBlindnessMode: ColorBlindnessMode;
    onColorBlindnessModeChange: (mode: ColorBlindnessMode) => void;
    isOpen: boolean;
    onToggle: () => void;
}

export function A11yPanel({
    currentColors,
    colorBlindnessMode,
    onColorBlindnessModeChange,
    isOpen,
    onToggle
}: A11yPanelProps) {

    const contrastInfo = useMemo(() => {
        const bgLum = getRelativeLuminance(currentColors.background);
        const fgLum = getRelativeLuminance(currentColors.foreground);
        const primaryLum = getRelativeLuminance(currentColors.primary);

        const ratio = getContrastRatio(bgLum, fgLum);
        const primaryRatio = getContrastRatio(bgLum, primaryLum);

        return {
            main: {
                ratio: ratio.toFixed(2),
                pass: ratio >= 4.5,
                largePass: ratio >= 3,
            },
            primary: {
                ratio: primaryRatio.toFixed(2),
                pass: primaryRatio >= 4.5,
            }
        };
    }, [currentColors.background, currentColors.foreground, currentColors.primary]);

    return (
        <section className="border-t border-border/50">
            <button
                onClick={onToggle}
                className="w-full py-4 flex items-center justify-between group"
            >
                <div className="flex items-center gap-3">
                    <Eye className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                    <span className="text-xs font-black uppercase tracking-widest">Visual Auditory</span>
                </div>
                {isOpen ? <ChevronUp className="w-4 h-4 opacity-30" /> : <ChevronDown className="w-4 h-4 opacity-30" />}
            </button>

            {isOpen && (
                <div className="space-y-6 pb-4 animate-fade-in pl-1">
                    {/* Simulation Dropdown */}
                    <div className="space-y-2">
                        <label className="text-[9px] font-black tracking-[0.2em] opacity-40 block">VISION SIMULATOR</label>
                        <select
                            value={colorBlindnessMode}
                            onChange={(e) => onColorBlindnessModeChange(e.target.value as ColorBlindnessMode)}
                            className="w-full px-4 py-3 text-xs bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none font-bold placeholder-muted-foreground"
                        >
                            <option value="none">Standard Vision</option>
                            <option value="protanopia">Protanopia (Red-Blind)</option>
                            <option value="deuteranopia">Deuteranopia (Green-Blind)</option>
                            <option value="tritanopia">Tritanopia (Blue-Blind)</option>
                            <option value="achromatopsia">Achromatopsia (Monochromacy)</option>
                        </select>
                        {colorBlindnessMode !== 'none' && (
                            <p className="text-[10px] text-muted-foreground bg-primary/5 p-2 rounded-lg border border-primary/10">
                                <Activity className="w-3 h-3 inline mr-1 mb-0.5" />
                                Previewing filter active.
                            </p>
                        )}
                    </div>

                    {/* Contrast Scan */}
                    <div className="p-4 rounded-2xl bg-muted/40 border border-border/50">
                        <div className="flex items-center justify-between mb-4 text-[10px] font-black uppercase tracking-widest opacity-60">
                            <ShieldCheck className="w-3 h-3" />
                            <span>WCAG 2.1 Scan</span>
                        </div>

                        <div className="space-y-3">
                            <div className="space-y-1">
                                <div className="flex items-center justify-between">
                                    <span className="text-[11px] font-bold">Content Legibility</span>
                                    <span className={`text-[11px] font-black ${contrastInfo.main.pass ? 'text-success' : 'text-error'}`}>
                                        {contrastInfo.main.ratio}:1
                                    </span>
                                </div>
                                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full transition-all duration-500 ${contrastInfo.main.pass ? 'bg-success' : 'bg-error'}`}
                                        style={{ width: `${Math.min(parseFloat(contrastInfo.main.ratio) * 10, 100)}%` }}
                                    />
                                </div>
                                {!contrastInfo.main.pass && (
                                    <p className="text-[9px] text-error mt-0.5">Fails AA Requirement (4.5:1)</p>
                                )}
                            </div>

                            <div className="pt-2 border-t border-border/10 space-y-1">
                                <div className="flex items-center justify-between">
                                    <span className="text-[11px] font-bold">Brand Visibility</span>
                                    <span className={`text-[11px] font-black ${contrastInfo.primary.pass ? 'text-success' : 'text-warning'}`}>
                                        {contrastInfo.primary.ratio}:1
                                    </span>
                                </div>
                                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full transition-all duration-500 ${contrastInfo.primary.pass ? 'bg-success' : 'bg-warning'}`}
                                        style={{ width: `${Math.min(parseFloat(contrastInfo.primary.ratio) * 10, 100)}%` }}
                                    />
                                </div>
                                {!contrastInfo.primary.pass && (
                                    <p className="text-[9px] text-warning mt-0.5">Low contrast for text on primary</p>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            )}
        </section>
    );
}
