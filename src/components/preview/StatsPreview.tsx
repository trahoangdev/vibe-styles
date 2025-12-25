import { type DesignStyle } from '@/lib/designStyles';
import { TrendingUp, Users, Activity } from 'lucide-react';

interface StatsPreviewProps {
    style: DesignStyle;
    cardStyle: string;
}

export function StatsPreview({ style, cardStyle }: StatsPreviewProps) {
    const stats = [
        { label: 'Network Throughput', value: '45.2 GB/s', change: '+20.1%', icon: TrendingUp },
        { label: 'Active Nodes', value: '2,405', change: '+4.2%', icon: Users },
        { label: 'Uptime Sync', value: '99.98%', change: 'Stable', icon: Activity },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
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
                            <p className="text-3xl font-black tracking-tighter" style={{ fontFamily: style.fonts.heading }}>
                                {stat.value}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                                <span className={`text-[10px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider ${stat.change.startsWith('+') ? 'bg-success/20 text-success' : 'bg-muted/50 text-muted-foreground'}`}
                                    style={{
                                        color: stat.change.startsWith('+') ? `hsl(${style.colors.success})` : 'inherit',
                                    }}
                                >
                                    {stat.change}
                                </span>
                                <span className="text-[10px] opacity-40 uppercase tracking-widest font-bold">In last cycle</span>
                            </div>
                        </div>
                        <div className="p-2 rounded-lg bg-accent/10 group-hover:scale-110 transition-transform" style={{ color: `hsl(${style.colors.accent})` }}>
                            <stat.icon className="w-5 h-5" />
                        </div>
                    </div>
                    {i === 2 && (
                        <div className="mt-6 flex items-center gap-3">
                            <div className="flex-1 h-1.5 rounded-full overflow-hidden bg-muted/30">
                                <div
                                    className="h-full rounded-full transition-all duration-1000"
                                    style={{
                                        width: '99.98%',
                                        backgroundColor: `hsl(${style.colors.success})`,
                                    }}
                                />
                            </div>
                            <span className="text-[10px] font-black opacity-60">OPTIMAL</span>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
