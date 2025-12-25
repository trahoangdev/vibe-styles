import { type DesignStyle } from '@/lib/designStyles';
import {
    ArrowRight, CheckCircle2, Star, Zap,
    Shield, Rocket, Globe, BarChart3
} from 'lucide-react';

interface LandingPreviewProps {
    style: DesignStyle;
    cardStyle: string;
    buttonStyle: string;
}

export function LandingPreview({ style, cardStyle, buttonStyle }: LandingPreviewProps) {
    return (
        <div className="mt-20 border-t border-border/30 pt-20 animate-fade-in">
            <div className="text-center mb-16">
                <div
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted/50 border border-border mb-6"
                >
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ backgroundColor: `hsl(${style.colors.primary})` }} />
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-60">System Ready for Launch</span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-black tracking-tighter mb-6" style={{ fontFamily: style.fonts.heading }}>
                    Deploy at the <span style={{ color: `hsl(${style.colors.primary})` }}>Speed of Sound.</span>
                </h2>
                <p className="max-w-2xl mx-auto text-lg opacity-60" style={{ color: `hsl(${style.colors.mutedForeground})` }}>
                    Vibe Styles provides a unified design protocol for high-performance engineering teams.
                    Build, sync, and deploy consistent interfaces across every node in your network.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    {
                        title: 'Neural Sync',
                        desc: 'Real-time design tokens distribution across all platforms.',
                        icon: Zap,
                        color: style.colors.primary
                    },
                    {
                        title: 'Hardened Shield',
                        desc: 'Built-in accessibility and performance compliance by default.',
                        icon: Shield,
                        color: style.colors.success
                    },
                    {
                        title: 'Global Uplink',
                        desc: 'Multi-region deployment with zero latency architecture.',
                        icon: Globe,
                        color: style.colors.accent
                    },
                ].map((feature, i) => (
                    <div
                        key={i}
                        className={`p-8 ${cardStyle} group hover:translate-y-[-4px] transition-all`}
                        style={{
                            backgroundColor: `hsl(${style.colors.surface})`,
                            borderRadius: style.radius
                        }}
                    >
                        <div
                            className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg"
                            style={{ backgroundColor: `hsl(${feature.color} / 0.1)`, color: `hsl(${feature.color})` }}
                        >
                            <feature.icon className="w-6 h-6" />
                        </div>
                        <h4 className="text-lg font-black tracking-tight mb-3 uppercase">{feature.title}</h4>
                        <p className="text-sm opacity-60 leading-relaxed mb-6">{feature.desc}</p>
                        <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:gap-3 transition-all">
                            Initialize <ArrowRight className="w-3 h-3" />
                        </button>
                    </div>
                ))}
            </div>

            {/* Trust Bar */}
            <div className="mt-20 p-8 rounded-3xl bg-muted/20 border border-border/50 flex flex-wrap items-center justify-around gap-8">
                {[
                    { icon: Rocket, label: 'SpaceX' },
                    { icon: Star, label: 'Linear' },
                    { icon: Zap, label: 'Vercel' },
                    { icon: BarChart3, label: 'Stripe' },
                ].map((logo, i) => (
                    <div key={i} className="flex items-center gap-2 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all cursor-crosshair">
                        <logo.icon className="w-5 h-5" />
                        <span className="font-black text-sm uppercase tracking-tighter">{logo.label}</span>
                    </div>
                ))}
            </div>

            {/* CTA Section */}
            <div
                className="mt-20 p-12 text-center relative overflow-hidden group"
                style={{
                    backgroundColor: `hsl(${style.colors.primary})`,
                    color: `hsl(${style.colors.primaryForeground})`,
                    borderRadius: style.radius
                }}
            >
                <div className="relative z-10">
                    <h3 className="text-3xl font-black mb-4 tracking-tighter">Ready to Evolve?</h3>
                    <p className="mb-8 opacity-80 max-w-lg mx-auto font-medium">Join 10,000+ architectures already powered by the Vibe protocol.</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <button
                            className={`px-8 py-3 bg-foreground text-background text-sm font-black uppercase tracking-widest shadow-2xl active:scale-95 transition-all`}
                            style={{ borderRadius: style.radius, backgroundColor: `hsl(${style.colors.surface})`, color: `hsl(${style.colors.foreground})` }}
                        >
                            Join the Network
                        </button>
                        <button
                            className="px-8 py-3 border border-current text-sm font-black uppercase tracking-widest hover:bg-white/10 transition-all active:scale-95"
                            style={{ borderRadius: style.radius }}
                        >
                            Consult Archives
                        </button>
                    </div>
                </div>
                {/* Abstract background shapes */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full border-[40px] border-white animate-spin-slow" />
                    <div className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full border-[20px] border-white animate-reverse-spin" />
                </div>
            </div>
        </div>
    );
}
