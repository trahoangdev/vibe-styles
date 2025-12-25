import { type DesignStyle } from '@/lib/designStyles';
import {
    LayoutGrid, User, Facebook, Instagram, Github, Linkedin,
    Coffee, Sparkles, Globe, Eye, Code
} from 'lucide-react';

interface BentoGridPreviewProps {
    style: DesignStyle;
    cardStyle: string;
}

export function BentoGridPreview({ style, cardStyle }: BentoGridPreviewProps) {
    return (
        <div className="mb-12 animate-fade-in">
            <div className="flex items-center gap-2 mb-6">
                <LayoutGrid className="w-5 h-5" style={{ color: `hsl(${style.colors.accent})` }} />
                <h3 className="text-lg font-semibold tracking-tight" style={{ fontFamily: style.fonts.heading }}>
                    Bento Grid Portfolio
                </h3>
            </div>

            <div className="grid grid-cols-4 md:grid-cols-6 gap-4 auto-rows-[120px]">
                {/* Profile Card - Large */}
                <div
                    className={`col-span-4 md:col-span-2 row-span-3 p-6 ${cardStyle} flex flex-col`}
                    style={{ backgroundColor: `hsl(${style.colors.surface})`, borderRadius: style.radius }}
                >
                    <h2 className="text-3xl font-bold leading-tight mb-2 uppercase tracking-tighter" style={{ fontFamily: style.fonts.heading }}>
                        VIBE<br />STYLES<br />PRO
                    </h2>
                    <p className="text-sm mb-2 font-medium" style={{ color: `hsl(${style.colors.mutedForeground})` }}>
                        Design System | Framework
                    </p>
                    <p className="text-xs mb-4 leading-relaxed opacity-70" style={{ color: `hsl(${style.colors.mutedForeground})` }}>
                        Crafting beautiful interfaces with physics-based animations.
                    </p>
                    <div
                        className="mt-auto w-full h-32 rounded-lg overflow-hidden flex items-center justify-center transition-transform hover:scale-[1.02]"
                        style={{
                            backgroundColor: `hsl(${style.colors.primary})`,
                            borderRadius: style.radius
                        }}
                    >
                        <User className="w-16 h-16" style={{ color: `hsl(${style.colors.primaryForeground})` }} />
                    </div>
                </div>

                {/* Social Links */}
                <div
                    className={`col-span-4 md:col-span-2 row-span-1 p-4 ${cardStyle} flex items-center justify-around`}
                    style={{ backgroundColor: `hsl(${style.colors.surface})`, borderRadius: style.radius }}
                >
                    <Facebook className="w-5 h-5 transition-all duration-300 hover:scale-125 hover:rotate-6 cursor-pointer" style={{ color: `hsl(${style.colors.foreground})` }} />
                    <Instagram className="w-5 h-5 transition-all duration-300 hover:scale-125 hover:-rotate-6 cursor-pointer" style={{ color: `hsl(${style.colors.foreground})` }} />
                    <Github className="w-5 h-5 transition-all duration-300 hover:scale-125 hover:rotate-6 cursor-pointer" style={{ color: `hsl(${style.colors.foreground})` }} />
                    <Linkedin className="w-5 h-5 transition-all duration-300 hover:scale-125 hover:-rotate-6 cursor-pointer" style={{ color: `hsl(${style.colors.foreground})` }} />
                </div>

                {/* Title Badge */}
                <div
                    className="col-span-4 md:col-span-2 row-span-1 p-4 flex items-center justify-center transition-all duration-300 hover:scale-[1.02] hover:shadow-lg cursor-pointer active:scale-95"
                    style={{
                        backgroundColor: `hsl(${style.colors.primary})`,
                        color: `hsl(${style.colors.primaryForeground})`,
                        borderRadius: style.radius
                    }}
                >
                    <div className="text-center">
                        <p className="text-[10px] uppercase tracking-widest opacity-80 font-bold">The Gold Standard</p>
                        <p className="font-black text-xl tracking-tighter">DESIGNER</p>
                    </div>
                </div>

                {/* Welcome Message */}
                <div
                    className={`col-span-4 md:col-span-2 row-span-2 p-5 ${cardStyle} group`}
                    style={{ backgroundColor: `hsl(${style.colors.surface})`, borderRadius: style.radius }}
                >
                    <p className="font-semibold mb-2 flex items-center gap-2">
                        Hey there! <span className="inline-block transition-transform group-hover:animate-bounce">👋</span>
                    </p>
                    <p className="text-sm leading-relaxed opacity-80" style={{ color: `hsl(${style.colors.mutedForeground})` }}>
                        Welcome to the future of UI. We combine radical minimalism with premium aesthetics to build tools that inspire.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                        {['React', 'Motion', 'Design'].map(tag => (
                            <span
                                key={tag}
                                className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-muted/50 border border-border"
                                style={{
                                    borderRadius: style.radius,
                                }}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Clock */}
                <div
                    className={`col-span-2 md:col-span-2 row-span-2 p-5 ${cardStyle} flex flex-col items-center justify-center text-center`}
                    style={{ backgroundColor: `hsl(${style.colors.surface})`, borderRadius: style.radius }}
                >
                    <p className="text-[10px] uppercase tracking-[0.2em] mb-2 opacity-50" style={{ color: `hsl(${style.colors.mutedForeground})` }}>
                        Vibe Pulse
                    </p>
                    <p className="text-3xl font-mono font-black tracking-tighter mb-1" style={{ fontFamily: style.fonts.mono }}>
                        12:34
                    </p>
                    <p className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 bg-accent text-accentForeground rounded-full" style={{ backgroundColor: `hsl(${style.colors.accent})`, color: `hsl(${style.colors.accentForeground})` }}>
                        LIVE FEED
                    </p>
                </div>

                {/* Connect & Matrix Buttons */}
                <div
                    className={`col-span-2 md:col-span-2 row-span-1 p-3 ${cardStyle} flex items-center gap-3`}
                    style={{ backgroundColor: `hsl(${style.colors.surface})`, borderRadius: style.radius }}
                >
                    <button
                        className="flex-1 py-2 text-[10px] font-black uppercase tracking-widest transition-all duration-300 hover:bg-foreground hover:text-background border border-border active:scale-95"
                        style={{
                            borderRadius: style.radius
                        }}
                    >
                        Connect
                    </button>
                    <button
                        className="flex-1 py-2 text-[10px] font-black uppercase tracking-widest transition-all duration-300 hover:bg-primary hover:text-primary-foreground border border-border active:scale-95"
                        style={{
                            borderRadius: style.radius
                        }}
                    >
                        Matrix
                    </button>
                </div>

                {/* Coffee Card */}
                <div
                    className={`col-span-4 md:col-span-2 row-span-1 p-4 ${cardStyle} flex items-center gap-4 group cursor-pointer`}
                    style={{ backgroundColor: `hsl(${style.colors.surface})`, borderRadius: style.radius }}
                >
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-muted/50 transition-transform group-hover:rotate-12">
                        <Coffee className="w-5 h-5 text-accent" style={{ color: `hsl(${style.colors.accent})` }} />
                    </div>
                    <div className="flex-1">
                        <p className="font-bold text-xs uppercase tracking-tight">Support Us</p>
                        <p className="text-[10px] opacity-60" style={{ color: `hsl(${style.colors.mutedForeground})` }}>
                            Buy us a workspace coffee.
                        </p>
                    </div>
                </div>

                {/* Daily Quote */}
                <div
                    className={`col-span-4 md:col-span-2 row-span-2 p-6 ${cardStyle} flex flex-col justify-center`}
                    style={{ backgroundColor: `hsl(${style.colors.surface})`, borderRadius: style.radius }}
                >
                    <Sparkles className="w-5 h-5 mb-4 text-accent animate-pulse" style={{ color: `hsl(${style.colors.accent})` }} />
                    <p className="text-sm italic font-medium leading-relaxed opacity-90">
                        "Design is not just what it looks like and feels like. Design is how it works."
                    </p>
                </div>

                {/* Website Info */}
                <div
                    className={`col-span-4 md:col-span-2 row-span-1 p-4 ${cardStyle} flex flex-col justify-between`}
                    style={{ backgroundColor: `hsl(${style.colors.surface})`, borderRadius: style.radius }}
                >
                    <div className="flex items-center justify-between">
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-50">Status</p>
                        <Globe className="w-3 h-3 text-success animate-spin-slow" style={{ color: `hsl(${style.colors.success})` }} />
                    </div>
                    <div className="flex justify-between items-end">
                        <div className="flex items-center gap-1.5 text-[10px] font-bold">
                            <Eye className="w-3 h-3" />
                            <span>VIBE ACTIVE</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] font-bold">
                            <Code className="w-3 h-3" />
                            <span>v1.0.4</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
