import { type DesignStyle } from '@/lib/designStyles';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';
import { TrendingUp, Activity, PieChart as PieChartIcon, ArrowUpRight } from 'lucide-react';

interface ChartsPreviewProps {
    style: DesignStyle;
    cardStyle: string;
    isMobile?: boolean; // Added isMobile prop
}

export function ChartsPreview({ style, cardStyle, isMobile = false }: ChartsPreviewProps) {
    const areaData = [
        { name: 'Mon', value: 4000, uv: 2400 },
        { name: 'Tue', value: 3000, uv: 1398 },
        { name: 'Wed', value: 2000, uv: 9800 },
        { name: 'Thu', value: 2780, uv: 3908 },
        { name: 'Fri', value: 1890, uv: 4800 },
        { name: 'Sat', value: 2390, uv: 3800 },
        { name: 'Sun', value: 3490, uv: 4300 },
    ];

    const barData = [
        { name: 'Jan', value: 40 },
        { name: 'Feb', value: 30 },
        { name: 'Mar', value: 20 },
        { name: 'Apr', value: 27 },
        { name: 'May', value: 18 },
        { name: 'Jun', value: 23 },
        { name: 'Jul', value: 34 },
    ];

    const pieData = [
        { name: 'Mobile', value: 400 },
        { name: 'Desktop', value: 300 },
        { name: 'Tablet', value: 300 },
        { name: 'Other', value: 200 },
    ];

    // Colors for charts
    const colors = [
        style.colors.primary,
        style.colors.accent,
        style.colors.success,
        style.colors.warning
    ];

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div
                    className="p-3 text-xs shadow-xl border backdrop-blur-md"
                    style={{
                        backgroundColor: `hsl(${style.colors.surface} / 0.8)`,
                        borderColor: `hsl(${style.colors.border})`,
                        borderRadius: style.radius,
                        color: `hsl(${style.colors.foreground})`
                    }}
                >
                    <p className="font-bold mb-1">{label}</p>
                    {payload.map((p: any, i: number) => (
                        <p key={i} style={{ color: p.color }}>
                            {p.name}: {p.value}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="mt-20 border-t border-border/30 pt-20 animate-fade-in">
            <div className="flex flex-col mb-8">
                <h3 className="text-2xl font-black uppercase tracking-tighter" style={{ fontFamily: style.fonts.heading }}>
                    Analytics Core
                </h3>
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">Real-time Visualization</p>
            </div>

            <div className={`grid gap-8 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'}`}>
                {/* Area Chart Card */}
                <div
                    className={`p-6 ${cardStyle} min-h-[300px] flex flex-col`}
                    style={{
                        backgroundColor: `hsl(${style.colors.surface})`,
                        borderRadius: style.radius
                    }}
                >
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <div className="p-2 rounded-lg bg-primary/10 text-primary" style={{ color: `hsl(${style.colors.primary})` }}>
                                <TrendingUp className="w-4 h-4" />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm">Revenue Flow</h4>
                                <p className="text-[10px] opacity-60">+12.5% vs last week</p>
                            </div>
                        </div>
                        <button className="text-xs font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity">
                            Weekly
                        </button>
                    </div>

                    <div className="flex-1 w-full h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={areaData}>
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={`hsl(${style.colors.primary})`} stopOpacity={0.3} />
                                        <stop offset="95%" stopColor={`hsl(${style.colors.primary})`} stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={`hsl(${style.colors.accent})`} stopOpacity={0.3} />
                                        <stop offset="95%" stopColor={`hsl(${style.colors.accent})`} stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke={`hsl(${style.colors.border})`} opacity={0.5} vertical={false} />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: `hsl(${style.colors.mutedForeground})`, fontSize: 10 }}
                                    dy={10}
                                />
                                <YAxis hide />
                                <Tooltip content={<CustomTooltip />} cursor={{ stroke: `hsl(${style.colors.mutedForeground})`, strokeWidth: 1, strokeDasharray: '3 3' }} />
                                <Area
                                    type="monotone"
                                    dataKey="value"
                                    stroke={`hsl(${style.colors.primary})`}
                                    strokeWidth={2}
                                    fillOpacity={1}
                                    fill="url(#colorValue)"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="uv"
                                    stroke={`hsl(${style.colors.accent})`}
                                    strokeWidth={2}
                                    fillOpacity={1}
                                    fill="url(#colorUv)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Side Stack: Bar + Pie */}
                <div className="flex flex-col gap-8">
                    {/* Bar Chart */}
                    <div
                        className={`p-6 ${cardStyle} flex-1`}
                        style={{
                            backgroundColor: `hsl(${style.colors.surface})`,
                            borderRadius: style.radius
                        }}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <BarChart className="w-4 h-4 opacity-60" />
                                <h4 className="font-bold text-sm">User Acquisition</h4>
                            </div>
                            <div className="px-2 py-0.5 rounded text-[10px] font-bold bg-success/10 text-success" style={{ color: `hsl(${style.colors.success})` }}>
                                On Track
                            </div>
                        </div>

                        <div className="h-[120px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={barData}>
                                    <Tooltip content={<CustomTooltip />} cursor={{ fill: `hsl(${style.colors.muted})`, opacity: 0.5 }} />
                                    <Bar
                                        dataKey="value"
                                        fill={`hsl(${style.colors.primary})`}
                                        radius={[4, 4, 0, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Pie Chart Row */}
                    <div className={`grid gap-8 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
                        <div
                            className={`p-6 ${cardStyle} flex flex-col items-center justify-center`}
                            style={{
                                backgroundColor: `hsl(${style.colors.surface})`,
                                borderRadius: style.radius
                            }}
                        >
                            <div className="relative w-24 h-24">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={pieData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={30}
                                            outerRadius={40}
                                            paddingAngle={5}
                                            dataKey="value"
                                            stroke="none"
                                        >
                                            {pieData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={`hsl(${colors[index % colors.length]})`} />
                                            ))}
                                        </Pie>
                                        <Tooltip content={<CustomTooltip />} />
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <PieChartIcon className="w-4 h-4 opacity-40" />
                                </div>
                            </div>
                            <div className="mt-2 text-center">
                                <p className="text-xs font-bold">Traffic</p>
                                <p className="text-[10px] opacity-60">Source Breakdown</p>
                            </div>
                        </div>

                        <div
                            className={`p-6 ${cardStyle} flex flex-col justify-between`}
                            style={{
                                backgroundColor: `hsl(${style.colors.surface})`,
                                borderRadius: style.radius
                            }}
                        >
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-1">Total Conversion</p>
                                <p className="text-3xl font-black tracking-tight flex items-start gap-1">
                                    84.3%
                                    <ArrowUpRight className="w-3 h-3 text-success translate-y-1" style={{ color: `hsl(${style.colors.success})` }} />
                                </p>
                            </div>
                            <div className="space-y-1">
                                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                    <div className="h-full bg-primary w-[84%]" style={{ backgroundColor: `hsl(${style.colors.primary})` }} />
                                </div>
                                <p className="text-[10px] text-right opacity-60">Target: 80%</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
