import { type DesignStyle } from '@/lib/designStyles';
import { TrendingUp, Users, Activity } from 'lucide-react';

interface StatsPreviewProps {
    style: DesignStyle;
    cardStyle: string;
    isMobile?: boolean;
}

export function StatsPreview({ style, cardStyle, isMobile = false }: StatsPreviewProps) {
    const stats = [
        { label: 'Network Throughput', value: '45.2 GB/s', change: '+20.1%', icon: TrendingUp },
        { label: 'Active Nodes', value: '2,405', change: '+4.2%', icon: Users },
        { label: 'Uptime Sync', value: '99.98%', change: 'Stable', icon: Activity },
    ];

    return (
        <div className={`grid gap-6 mt-8 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'}`}>
            {stats.map((stat, i) => (
                <div
                    key={i}
                    className={`p-6 ${cardStyle} animate-fade-in group hover:scale-[1.02] transition-all`}
                    style={{
                        backgroundColor: `hsl(${style.colors.surface})`,
                        borderRadius: style.radius,
                        animationDelay: `${i * 100}ms`,
                    }}
                >
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <p className="text-[10px] font-black uppercase tracking-[0.15em] opacity-50 mb-1" style={{ color: `hsl(${style.colors.mutedForeground})` }}>
                                {stat.label}
                            </p>
                            <p className="text-3xl font-black tracking-tighter" style={{ fontFamily: style.fonts.heading, color: `hsl(${style.colors.foreground})` }}>
                                {stat.value}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                                <span className={`text-[10px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider`}
                                    style={{
                                        backgroundColor: stat.change.startsWith('+') ? `hsl(${style.colors.success} / 0.2)` : `hsl(${style.colors.muted} / 0.5)`,
                                        color: stat.change.startsWith('+') ? `hsl(${style.colors.success})` : `hsl(${style.colors.mutedForeground})`,
                                    }}
                                >
                                    {stat.change}
                                </span>
                                <span className="text-[10px] uppercase tracking-widest font-bold" style={{ color: `hsl(${style.colors.mutedForeground})` }}>In last cycle</span>
                            </div>
                        </div>
                        <div className="p-2 rounded-lg bg-accent/10 group-hover:scale-110 transition-transform" style={{ color: `hsl(${style.colors.accent})` }}>
                            <stat.icon className="w-5 h-5" />
                        </div>
                    </div>
                    {i === 2 && (
                        <div className="mt-6 flex items-center gap-3">
                            <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: `hsl(${style.colors.muted} / 0.3)` }}>
                                <div
                                    className="h-full rounded-full transition-all duration-1000"
                                    style={{
                                        width: '99.98%',
                                        backgroundColor: `hsl(${style.colors.success})`,
                                    }}
                                />
                            </div>
                            <span className="text-[10px] font-black" style={{ color: `hsl(${style.colors.mutedForeground})` }}>OPTIMAL</span>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
