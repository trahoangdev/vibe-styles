import { type DesignStyle } from '@/lib/designStyles';
import { useState } from 'react';
import { Bell, Settings, Share2 } from 'lucide-react';

interface DesignSystemSpecsProps {
    style: DesignStyle;
    cardStyle: string;
    inputStyle: string;
}

export function DesignSystemSpecs({ style, cardStyle, inputStyle }: DesignSystemSpecsProps) {
    const [toggleOn, setToggleOn] = useState(true);
    const [selectedOption, setSelectedOption] = useState('a');

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 animate-fade-in">
            {/* Typography */}
            <div
                className={`p-6 ${cardStyle}`}
                style={{
                    backgroundColor: `hsl(${style.colors.surface})`,
                    borderRadius: style.radius,
                }}
            >
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-6 opacity-50" style={{ color: `hsl(${style.colors.mutedForeground})` }}>
                    TYPOGRAPHIC SCALE
                </h4>
                <div className="space-y-6">
                    <div>
                        <h1 className="text-4xl font-black tracking-tighter" style={{ fontFamily: style.fonts.heading }}>
                            H1 / BLACK
                        </h1>
                        <p className="text-[10px] mt-1 font-mono uppercase opacity-40" style={{ color: `hsl(${style.colors.mutedForeground})` }}>
                            {style.fonts.heading.split(',')[0]} / Bold
                        </p>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight" style={{ fontFamily: style.fonts.heading }}>
                            H2 / Semibold
                        </h2>
                    </div>
                    <div>
                        <h3 className="text-lg font-medium tracking-normal" style={{ fontFamily: style.fonts.heading }}>
                            H3 / Medium
                        </h3>
                    </div>
                    <div>
                        <p className="text-sm leading-relaxed opacity-80" style={{ fontFamily: style.fonts.body }}>
                            Body text uses {style.fonts.body.split(',')[0]}. It is optimized for long-form readability and balanced whitespace.
                        </p>
                    </div>
                </div>
            </div>

            {/* Palette */}
            <div
                className={`p-6 ${cardStyle}`}
                style={{
                    backgroundColor: `hsl(${style.colors.surface})`,
                    borderRadius: style.radius,
                }}
            >
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-6 opacity-50" style={{ color: `hsl(${style.colors.mutedForeground})` }}>
                    COLOR TOKENS
                </h4>
                <div className="space-y-4">
                    {[
                        { name: 'Primary', color: style.colors.primary, desc: 'Action & Brand' },
                        { name: 'Accent', color: style.colors.accent, desc: 'Visual Interest' },
                        { name: 'Muted', color: style.colors.muted, desc: 'Low Emphasis' },
                        { name: 'Surface', color: style.colors.surface, desc: 'Component Base' },
                    ].map((item) => (
                        <div key={item.name} className="flex items-center gap-4 group cursor-pointer">
                            <div
                                className="w-12 h-12 rounded-xl flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform"
                                style={{
                                    backgroundColor: `hsl(${item.color})`,
                                    borderRadius: style.radius,
                                }}
                            />
                            <div className="flex-1">
                                <p className="font-black text-xs uppercase tracking-tight">{item.name}</p>
                                <p className="text-[10px] uppercase tracking-widest opacity-40 font-mono">
                                    {item.color}
                                </p>
                                <p className="text-[9px] font-bold text-accent uppercase tracking-tighter" style={{ color: `hsl(${style.colors.accent})` }}>
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Interactive */}
            <div
                className={`p-6 ${cardStyle}`}
                style={{
                    backgroundColor: `hsl(${style.colors.surface})`,
                    borderRadius: style.radius,
                }}
            >
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-6 opacity-50" style={{ color: `hsl(${style.colors.mutedForeground})` }}>
                    ATOM COMPONENTS
                </h4>
                <div className="space-y-6">
                    {/* Toggle */}
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-70">Switch Controller</span>
                        <button
                            onClick={() => setToggleOn(!toggleOn)}
                            className="relative w-12 h-6 rounded-full transition-all duration-300"
                            style={{
                                backgroundColor: toggleOn ? `hsl(${style.colors.primary})` : `hsl(${style.colors.muted})`,
                            }}
                        >
                            <span
                                className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-xl transition-all duration-300 ${toggleOn ? 'left-[calc(100%-20px)] scale-110' : 'left-1'}`}
                            />
                        </button>
                    </div>

                    {/* Radio */}
                    <div className="flex items-center gap-6">
                        {['a', 'b'].map((opt) => (
                            <label key={opt} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest cursor-pointer group">
                                <div className="relative w-4 h-4 rounded-full border-2 border-muted flex items-center justify-center transition-all group-hover:border-primary">
                                    <input
                                        type="radio"
                                        name="option"
                                        className="sr-only"
                                        checked={selectedOption === opt}
                                        onChange={() => setSelectedOption(opt)}
                                    />
                                    {selectedOption === opt && (
                                        <div className="w-2 h-2 rounded-full bg-primary" style={{ backgroundColor: `hsl(${style.colors.primary})` }} />
                                    )}
                                </div>
                                <span className={selectedOption === opt ? 'opacity-100' : 'opacity-40'}>MODE {opt.toUpperCase()}</span>
                            </label>
                        ))}
                    </div>

                    {/* Icons */}
                    <div className="flex items-center gap-4 pt-2">
                        {[Bell, Settings, Share2].map((Icon, i) => (
                            <button
                                key={i}
                                className={`p-3 transition-all duration-300 hover:scale-110 hover:bg-primary/10 border border-transparent hover:border-primary/20 bg-muted/20`}
                                style={{
                                    borderRadius: style.radius,
                                }}
                            >
                                <Icon className="w-4 h-4 opacity-70 group-hover:opacity-100" />
                            </button>
                        ))}
                    </div>

                    {/* Progress */}
                    <div>
                        <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest mb-2">
                            <span className="opacity-60">System Load</span>
                            <span style={{ color: `hsl(${style.colors.primary})` }}>75%</span>
                        </div>
                        <div
                            className="h-1.5 rounded-full overflow-hidden bg-muted/20"
                        >
                            <div
                                className="h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(var(--style-primary),0.5)]"
                                style={{
                                    width: '75%',
                                    backgroundColor: `hsl(${style.colors.primary})`,
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
