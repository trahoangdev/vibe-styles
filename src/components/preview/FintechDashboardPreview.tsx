import { type DesignStyle } from '@/lib/designStyles';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, TrendingDown, CreditCard, Activity, ArrowUpRight, ArrowDownRight, Wallet, PieChart } from 'lucide-react';
import { useMemo } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, TooltipProps, XAxis, YAxis } from 'recharts';

interface FintechDashboardPreviewProps {
    style: DesignStyle;
    isMobile?: boolean;
}

// Mock Data
const data = [
    { name: 'Mon', value: 4000, income: 2400, expense: 1600 },
    { name: 'Tue', value: 3000, income: 1398, expense: 2000 },
    { name: 'Wed', value: 2000, income: 9800, expense: 1200 },
    { name: 'Thu', value: 2780, income: 3908, expense: 2400 },
    { name: 'Fri', value: 1890, income: 4800, expense: 1000 },
    { name: 'Sat', value: 2390, income: 3800, expense: 1500 },
    { name: 'Sun', value: 3490, income: 4300, expense: 1200 },
];

const transactions = [
    { id: 1, name: 'Apple Store', date: 'Today, 10:42 AM', amount: -240.50, type: 'expense' },
    { id: 2, name: 'Freelance Payout', date: 'Yesterday, 4:20 PM', amount: 1250.00, type: 'income' },
    { id: 3, name: 'Uber Trip', date: 'Yesterday, 8:30 AM', amount: -18.20, type: 'expense' },
    { id: 4, name: 'Spotify Sub', date: 'Aug 24, 2024', amount: -12.99, type: 'expense' },
];

export function FintechDashboardPreview({ style, isMobile = false }: FintechDashboardPreviewProps) {
    const isNeoBrutalism = style.id === 'neo-brutalism';

    // brutalist specific styles
    const cardClass = isNeoBrutalism
        ? "border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all bg-white text-black"
        : "bg-[hsl(var(--style-surface))] border border-[hsl(var(--style-border))] shadow-sm rounded-[var(--style-radius)]";

    const buttonClass = isNeoBrutalism
        ? "px-4 py-2 font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all uppercase tracking-tight"
        : "px-4 py-2 rounded-[var(--style-radius)] font-medium shadow-sm transition-opacity hover:opacity-90";

    // Chart customization
    const chartColors = useMemo(() => ({
        stroke: isNeoBrutalism ? '#000000' : `hsl(${style.colors.primary})`,
        fill: isNeoBrutalism ? style.colors.accent : `hsl(${style.colors.primary} / 0.2)`
    }), [style, isNeoBrutalism]);

    const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
        if (active && payload && payload.length) {
            return (
                <div className={`${isNeoBrutalism ? 'bg-white border-2 border-black p-2 shadow-[4px_4px_0_0_#000]' : 'bg-[hsl(var(--style-surface))] border border-[hsl(var(--style-border))] p-3 rounded shadow-lg'}`}>
                    <p className={`font-bold ${isNeoBrutalism ? 'font-mono' : ''}`}>{label}</p>
                    <p className="text-sm">
                        Total: ${payload[0].value}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="w-full space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className={`text-3xl font-black mb-1 ${isNeoBrutalism ? 'uppercase tracking-tighter' : ''}`} style={{ fontFamily: style.fonts.heading }}>
                        Financial Overview
                    </h2>
                    <p className="opacity-60">Welcome back, Crypto Check.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        className={buttonClass}
                        style={{
                            backgroundColor: isNeoBrutalism ? '#fff' : `hsl(${style.colors.background})`,
                            color: isNeoBrutalism ? '#000' : `hsl(${style.colors.foreground})`
                        }}
                    >
                        Export
                    </button>
                    <button
                        className={buttonClass}
                        style={{
                            backgroundColor: isNeoBrutalism ? style.colors.primary : `hsl(${style.colors.primary})`,
                            color: isNeoBrutalism ? '#fff' : `hsl(${style.colors.primaryForeground})`
                        }}
                    >
                        + Add Transaction
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'}`}>
                {[
                    { title: 'Total Balance', value: '$24,562.00', change: '+12.5%', icon: Wallet, color: style.colors.accent },
                    { title: 'Income', value: '$8,240.50', change: '+2.1%', icon: TrendingUp, color: style.colors.success },
                    { title: 'Expenses', value: '$3,420.20', change: '-4.3%', icon: TrendingDown, color: style.colors.error },
                ].map((stat, i) => (
                    <motion.div
                        key={stat.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`${cardClass} p-6 relative overflow-hidden`}
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-full flex items-center justify-center ${isNeoBrutalism ? 'border-2 border-black bg-white' : 'bg-muted'}`}>
                                <stat.icon className="w-6 h-6" style={{ color: isNeoBrutalism ? '#000' : `hsl(${style.colors.foreground})` }} />
                            </div>
                            <span className={`text-sm font-bold flex items-center gap-1 ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-500'} ${isNeoBrutalism ? 'bg-white border-2 border-black px-2 py-0.5 shadow-[2px_2px_0_0_#000]' : ''}`}>
                                {stat.change}
                                {stat.change.startsWith('+') ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                            </span>
                        </div>
                        <h3 className="text-sm opacity-60 font-medium uppercase tracking-wider mb-1">{stat.title}</h3>
                        <p className={`text-2xl font-black ${isNeoBrutalism ? 'font-mono' : ''}`}>{stat.value}</p>

                        {/* Decorative background blob for Neo-Brutalism */}
                        {isNeoBrutalism && (
                            <div
                                className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full border-2 border-black opacity-20"
                                style={{ backgroundColor: `hsl(${stat.color})` }}
                            />
                        )}
                    </motion.div>
                ))}
            </div>

            {/* Main Content Grid */}
            <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-3'}`}>
                {/* Chart Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className={`${cardClass} col-span-2 p-6 min-h-[400px] flex flex-col`}
                >
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-lg flex items-center gap-2">
                            <Activity className="w-5 h-5" />
                            Cash Flow
                        </h3>
                        <div className="flex gap-2">
                            {/* Small toggles */}
                            {['1W', '1M', '1Y'].map(t => (
                                <button key={t} className={`text-xs font-bold px-2 py-1 ${isNeoBrutalism ? 'border border-black hover:bg-black hover:text-white transition-colors' : 'bg-muted rounded hover:opacity-80'}`}>
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 w-full h-full min-h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={`hsl(${chartColors.fill})`} stopOpacity={0.8} />
                                        <stop offset="95%" stopColor={`hsl(${chartColors.fill})`} stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke={isNeoBrutalism ? '#000' : 'hsl(var(--style-border))'} opacity={0.2} />
                                <XAxis
                                    dataKey="name"
                                    stroke={isNeoBrutalism ? '#000' : 'hsl(var(--style-muted-foreground))'}
                                    tick={{ fontSize: 12 }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <YAxis
                                    stroke={isNeoBrutalism ? '#000' : 'hsl(var(--style-muted-foreground))'}
                                    tick={{ fontSize: 12 }}
                                    axisLine={false}
                                    tickLine={false}
                                    tickFormatter={(value) => `$${value}`}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Area
                                    type="monotone"
                                    dataKey="value"
                                    stroke={chartColors.stroke}
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorValue)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Recent Transactions */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className={`${cardClass} col-span-1 p-6`}
                >
                    <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                        <CreditCard className="w-5 h-5" />
                        Recent
                    </h3>
                    <div className="space-y-4">
                        {transactions.map((tx, i) => (
                            <div key={tx.id} className={`flex justify-between items-center p-3 ${isNeoBrutalism ? 'border-b-2 border-black last:border-0 hover:bg-yellow-100 transition-colors cursor-pointer' : 'border-b border-border/50 last:border-0 hover:bg-muted/50 rounded-lg transition-colors'}`}>
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isNeoBrutalism ? 'bg-white border-2 border-black' : 'bg-muted text-muted-foreground'}`}>
                                        {tx.type === 'income' ? <DollarSign className="w-5 h-5" /> : <CreditCard className="w-5 h-5" />}
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm truncate max-w-[120px]">{tx.name}</p>
                                        <p className="text-xs opacity-60">{tx.date}</p>
                                    </div>
                                </div>
                                <div className={`font-bold text-sm ${tx.type === 'income' ? 'text-green-600' : ''}`}>
                                    {tx.amount > 0 ? '+' : ''}{tx.amount.toFixed(2)}
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className={`w-full mt-6 ${buttonClass} text-sm`} style={{ backgroundColor: isNeoBrutalism ? '#fff' : 'transparent', border: isNeoBrutalism ? '2px solid black' : '1px solid hsl(var(--style-border))' }}>
                        View All
                    </button>

                    {/* Neo-brutalism extra decoration */}
                    {isNeoBrutalism && (
                        <div className="mt-8 p-4 bg-teal-300 border-2 border-black shadow-[4px_4px_0_0_#000]">
                            <h4 className="font-black uppercase text-sm mb-2">Pro Tip:</h4>
                            <p className="text-xs font-mono">Invest 20% in savings to maximize your wealth growth.</p>
                        </div>
                    )}
                </motion.div>
            </div>

            {/* Quick Actions / Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Send Money', 'Request', 'Pay Bill', 'Top Up'].map((action, i) => (
                    <motion.button
                        key={action}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`${cardClass} p-4 flex flex-col items-center justify-center gap-2 aspect-[4/3] font-bold`}
                    >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isNeoBrutalism ? 'bg-purple-400 border-2 border-black' : 'bg-primary/10 text-primary'}`}>
                            {i === 0 ? <ArrowUpRight /> : i === 1 ? <ArrowDownRight /> : i === 2 ? <CreditCard /> : <Wallet />}
                        </div>
                        {action}
                    </motion.button>
                ))}
            </div>
        </div>
    );
}
