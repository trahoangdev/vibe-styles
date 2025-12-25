import { type DesignStyle } from '@/lib/designStyles';
import {
    User, MessageCircle, MoreVertical, Send,
    Info, Check, AlertTriangle
} from 'lucide-react';

interface CommunicationPreviewProps {
    style: DesignStyle;
    cardStyle: string;
    inputStyle: string;
    isMobile?: boolean;
}

export function CommunicationPreview({ style, cardStyle, inputStyle, isMobile = false }: CommunicationPreviewProps) {
    return (
        <div className={`grid gap-8 mt-12 animate-fade-in ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'}`}>
            {/* Chat UI */}
            <div
                className={`p-6 ${cardStyle} flex flex-col h-[480px]`}
                style={{
                    backgroundColor: `hsl(${style.colors.surface})`,
                    borderRadius: style.radius,
                }}
            >
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border/50">
                    <div className="relative">
                        <div
                            className="w-12 h-12 rounded-full flex items-center justify-center bg-muted/50 border-2 border-surface"
                        >
                            <User className="w-6 h-6 opacity-40" />
                        </div>
                        <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-surface bg-success" style={{ backgroundColor: `hsl(${style.colors.success})` }} />
                    </div>
                    <div className="flex-1">
                        <p className="font-black text-xs uppercase tracking-tight">Vibe Assistant</p>
                        <p className="text-[10px] uppercase font-bold text-success animate-pulse" style={{ color: `hsl(${style.colors.success})` }}>Active Support</p>
                    </div>
                    <button className="p-2 rounded-lg hover:bg-muted/50 transition-colors">
                        <MoreVertical className="w-4 h-4 opacity-40" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto space-y-4 mb-6 pr-2 scrollbar-thin">
                    <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center bg-muted/50">
                            <MessageCircle className="w-4 h-4 opacity-40" />
                        </div>
                        <div
                            className="px-4 py-3 text-sm font-medium leading-relaxed max-w-[85%] border border-border/10"
                            style={{
                                backgroundColor: `hsl(${style.colors.muted})`,
                                borderRadius: style.radius,
                            }}
                        >
                            How are you feeling about this current design system? 🧪
                        </div>
                    </div>
                    <div className="flex gap-3 flex-row-reverse">
                        <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center bg-primary" style={{ backgroundColor: `hsl(${style.colors.primary})` }}>
                            <span className="text-[10px] font-black text-primary-foreground" style={{ color: `hsl(${style.colors.primaryForeground})` }}>YOU</span>
                        </div>
                        <div
                            className="px-4 py-3 text-sm font-medium leading-relaxed max-w-[85%] shadow-lg"
                            style={{
                                backgroundColor: `hsl(${style.colors.primary})`,
                                color: `hsl(${style.colors.primaryForeground})`,
                                borderRadius: style.radius,
                            }}
                        >
                            It feels incredibly premium. The typography scale is perfect. ⚡️
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center bg-muted/50">
                            <MessageCircle className="w-4 h-4 opacity-40" />
                        </div>
                        <div
                            className="px-4 py-3 text-sm font-medium leading-relaxed max-w-[85%] border border-border/10"
                            style={{
                                backgroundColor: `hsl(${style.colors.muted})`,
                                borderRadius: style.radius,
                            }}
                        >
                            Optimal selection. You can now deploy these tokens directly to production.
                        </div>
                    </div>
                </div>

                <div className="relative group">
                    <input
                        type="text"
                        placeholder="Relay message to Vibe..."
                        className={`w-full px-5 py-3.5 pr-14 ${inputStyle} text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all`}
                        style={{
                            backgroundColor: `hsl(${style.colors.background})`,
                            borderRadius: style.radius,
                            color: `hsl(${style.colors.foreground})`,
                        }}
                    />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-primary/10 rounded-lg transition-all group-focus-within:translate-x-1">
                        <Send className="w-4 h-4" style={{ color: `hsl(${style.colors.primary})` }} />
                    </button>
                </div>
            </div>

            {/* Profile Card + System Alerts */}
            <div className="flex flex-col gap-8">
                {/* Profile Card */}
                <div
                    className={`p-6 ${cardStyle} relative group overflow-hidden`}
                    style={{
                        backgroundColor: `hsl(${style.colors.surface})`,
                        borderRadius: style.radius,
                    }}
                >
                    <div className="flex items-start gap-5">
                        <div
                            className="w-16 h-16 rounded-2xl shadow-xl transition-transform group-hover:rotate-6 active:scale-95 cursor-pointer flex items-center justify-center"
                            style={{
                                background: `linear-gradient(135deg, hsl(${style.colors.primary}), hsl(${style.colors.accent}))`,
                            }}
                        >
                            <User className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                                <div>
                                    <p className="font-black text-lg tracking-tighter">VIBE OPERATOR</p>
                                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">Lead Architect</p>
                                </div>
                                <button
                                    className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest border border-border hover:bg-foreground hover:text-background transition-all`}
                                    style={{ borderRadius: style.radius }}
                                >
                                    Sync User
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {['Protocol', 'Systems', 'Design'].map(tag => (
                                    <span
                                        key={tag}
                                        className="px-2 py-0.5 text-[9px] font-black uppercase tracking-wider bg-muted/50 border border-border/50"
                                        style={{
                                            borderRadius: style.radius,
                                        }}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-border/50">
                        {[
                            { label: 'NODES', value: '142' },
                            { label: 'UPLINK', value: '4.8k' },
                            { label: 'RATING', value: '98%' },
                        ].map(stat => (
                            <div key={stat.label} className="text-center group-hover:scale-105 transition-transform">
                                <p className="font-black text-xl tracking-tighter" style={{ fontFamily: style.fonts.heading }}>{stat.value}</p>
                                <p className="text-[9px] font-black uppercase tracking-widest opacity-40">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* System Alerts */}
                <div
                    className={`p-6 ${cardStyle}`}
                    style={{
                        backgroundColor: `hsl(${style.colors.surface})`,
                        borderRadius: style.radius,
                    }}
                >
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-6 opacity-50" style={{ color: `hsl(${style.colors.mutedForeground})` }}>
                        INTELLIGENCE FEED
                    </h4>
                    <div className="space-y-4">
                        {[
                            { type: 'info', title: 'SYNAPTIC SYNC', message: 'New aesthetic nodes are ready for deployment.', color: style.colors.primary },
                            { type: 'success', title: 'OPTIMAL COMPLIANCE', message: 'Design system matches WCAG AA standards.', color: style.colors.success },
                            { type: 'warning', title: 'LATENCY DETECTED', message: 'Some heavy assets might impact 60fps.', color: style.colors.warning },
                        ].map((alert, i) => (
                            <div
                                key={i}
                                className="flex items-start gap-4 p-4 hover:translate-x-1 transition-transform cursor-pointer group bg-muted/20"
                                style={{
                                    borderRadius: style.radius,
                                }}
                            >
                                <div
                                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all group-hover:scale-110"
                                    style={{ backgroundColor: `hsl(${alert.color} / 0.15)` }}
                                >
                                    {alert.type === 'info' && <Info className="w-5 h-5" style={{ color: `hsl(${alert.color})` }} />}
                                    {alert.type === 'success' && <Check className="w-5 h-5" style={{ color: `hsl(${alert.color})` }} />}
                                    {alert.type === 'warning' && <AlertTriangle className="w-5 h-5" style={{ color: `hsl(${alert.color})` }} />}
                                </div>
                                <div>
                                    <p className="font-black text-[10px] uppercase tracking-widest" style={{ color: `hsl(${alert.color})` }}>{alert.title}</p>
                                    <p className="text-xs font-medium opacity-70 mt-0.5 leading-relaxed">{alert.message}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
