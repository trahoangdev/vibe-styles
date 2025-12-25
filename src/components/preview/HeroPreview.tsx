import { type DesignStyle } from '@/lib/designStyles';

interface HeroPreviewProps {
    style: DesignStyle;
    buttonStyle: string;
    inputStyle: string;
}

export function HeroPreview({ style, buttonStyle, inputStyle }: HeroPreviewProps) {
    return (
        <div className="lg:col-span-2 animate-slide-in">
            {/* Badge */}
            <div
                className="inline-block px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] mb-8 shadow-sm border border-border"
                style={{
                    backgroundColor: `hsl(${style.colors.muted})`,
                    color: `hsl(${style.colors.mutedForeground})`,
                    borderRadius: style.radius,
                }}
            >
                Design Evolution
            </div>

            {/* Heading */}
            <h2
                className="text-6xl lg:text-7xl leading-[0.9] mb-8 tracking-tighter"
                style={{ fontFamily: style.fonts.heading, fontWeight: 'var(--style-heading-weight)' }}
            >
                The Next<br />
                <span className="opacity-40" style={{ color: `hsl(${style.colors.mutedForeground})` }}>Generation UI.</span>
            </h2>

            {/* Description */}
            <p
                className="text-xl mb-10 max-w-lg leading-relaxed opacity-80 font-medium"
                style={{ color: `hsl(${style.colors.mutedForeground})` }}
            >
                Experience the {style.name} aesthetic. A meticulous blend of radical typography and functional density, crafted for the modern web.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
                <button
                    className={`px-8 py-3.5 text-sm font-black uppercase tracking-widest transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl ${buttonStyle}`}
                    style={{
                        backgroundColor: `hsl(${style.colors.primary})`,
                        color: `hsl(${style.colors.primaryForeground})`,
                        borderRadius: style.radius,
                    }}
                >
                    Explore Assets
                </button>
                <button
                    className={`px-8 py-3.5 text-sm font-black uppercase tracking-widest transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg border border-border ${inputStyle}`}
                    style={{
                        backgroundColor: 'transparent',
                        color: `hsl(${style.colors.foreground})`,
                        borderRadius: style.radius,
                    }}
                >
                    View Docs
                </button>
            </div>
        </div>
    );
}
