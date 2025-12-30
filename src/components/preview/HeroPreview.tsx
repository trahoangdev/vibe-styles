import { type DesignStyle } from '@/lib/designStyles';
import { Sparkles } from 'lucide-react';

interface HeroPreviewProps {
    style: DesignStyle;
    buttonStyle: string;
    inputStyle: string;
    isMobile?: boolean;
}

export function HeroPreview({ style, buttonStyle, inputStyle, isMobile = false }: HeroPreviewProps) {
    return (
        <div className="lg:col-span-2 animate-slide-in flex flex-col justify-center min-h-[400px]">
            {/* Badge */}
            <div
                className={`inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] ${isMobile ? 'mb-6' : 'mb-8'} border border-border w-fit`}
                style={{
                    backgroundColor: `hsl(${style.colors.muted})`,
                    color: `hsl(${style.colors.mutedForeground})`,
                    borderRadius: style.radius,
                }}
            >
                <Sparkles className="w-3 h-3" />
                Design System Explorer
            </div>

            {/* Heading - MASSIVE */}
            <h1
                className={`${isMobile ? 'mb-8' : 'mb-10'} leading-[1] tracking-tight font-black`}
                style={{ 
                    fontFamily: style.fonts.heading,
                    fontSize: isMobile ? 'clamp(3rem, 12vw, 5rem)' : 'clamp(4rem, 8vw, 7rem)',
                }}
            >
                <span style={{ color: `hsl(${style.colors.foreground})` }}>Welcome to</span>
                <br />
                <span 
                    className="bg-clip-text text-transparent"
                    style={{ 
                        backgroundImage: `linear-gradient(135deg, hsl(${style.colors.primary}), hsl(${style.colors.accent}))`,
                    }}
                >
                    Vibe Styles
                </span>
            </h1>

            {/* Author */}
            <p
                className={`${isMobile ? 'text-xl mb-8' : 'text-2xl mb-10'} font-medium tracking-wide`}
                style={{ color: `hsl(${style.colors.mutedForeground})` }}
            >
                crafted by{' '}
                <span 
                    className="font-bold"
                    style={{ color: `hsl(${style.colors.primary})` }}
                >
                    @trahoangdev
                </span>
            </p>

            {/* Description */}
            <p
                className={`${isMobile ? 'text-xl mb-10' : 'text-3xl mb-14'} max-w-2xl leading-relaxed opacity-70`}
                style={{ color: `hsl(${style.colors.mutedForeground})` }}
            >
                Experience the <strong style={{ color: `hsl(${style.colors.foreground})` }}>{style.name}</strong> aesthetic. 
                Explore, customize, and export beautiful design tokens.
            </p>

            {/* Buttons - BIGGER */}
            <div className="flex flex-wrap gap-5">
                <button
                    className={`px-10 py-5 text-lg font-bold tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 ${buttonStyle}`}
                    style={{
                        backgroundColor: `hsl(${style.colors.primary})`,
                        color: `hsl(${style.colors.primaryForeground})`,
                        borderRadius: style.radius,
                        boxShadow: `0 8px 24px hsl(${style.colors.primary} / 0.4)`,
                    }}
                >
                    Start Exploring
                </button>
                <button
                    className={`px-10 py-5 text-lg font-bold tracking-wide transition-all duration-300 hover:scale-105 active:scale-95 border-2 ${inputStyle}`}
                    style={{
                        backgroundColor: 'transparent',
                        color: `hsl(${style.colors.foreground})`,
                        borderRadius: style.radius,
                        borderColor: `hsl(${style.colors.border})`,
                    }}
                >
                    View on GitHub
                </button>
            </div>
        </div>
    );
}
