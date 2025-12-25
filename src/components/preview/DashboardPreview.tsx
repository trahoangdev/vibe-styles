import { DesignStyle } from '@/lib/designStyles';
import {
    Home, BarChart2, Users, Settings, Bell, Search,
    TrendingUp, TrendingDown, DollarSign, Activity,
    MoreVertical, PieChart, Layers
} from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DashboardPreviewProps {
    style: DesignStyle;
    cardStyle: string;
    isMobile?: boolean;
}

export function DashboardPreview({ style, cardStyle, isMobile = false }: DashboardPreviewProps) {
    const [activeTab, setActiveTab] = useState('Overview');

    const sidebarItems = [
        { icon: Home, label: 'Overview' },
        { icon: BarChart2, label: 'Analytics' },
        { icon: Users, label: 'Customers' },
        { icon: Layers, label: 'Projects' },
        { icon: PieChart, label: 'Reports' },
        { icon: Settings, label: 'Settings' },
    ];

    const stats = [
        { label: 'Total Revenue', value: '$45,231.89', change: '+20.1%', trend: 'up', icon: DollarSign },
        { label: 'Active Users', value: '+2350', change: '+180.1%', trend: 'up', icon: Users },
        { label: 'Bounce Rate', value: '12.23%', change: '-4.5%', trend: 'down', icon: Activity },
    ];

    return (
        <section className={`rounded-3xl border border-border overflow-hidden bg-muted/20 ${isMobile ? 'h-auto' : 'h-[600px]'} flex relative shadow-2xl`}>
            {/* Backdrop Blur for "Desktop within Desktop" feel */}
            <div className="absolute inset-0 backdrop-blur-[1px] pointer-events-none -z-10" />

            {/* Simulated Sidebar */}
            <aside
                className={`w-16 md:w-64 bg-surface border-r border-border flex flex-col transition-all ${isMobile ? 'hidden' : 'flex'}`}
                style={{ backgroundColor: `hsl(${style.colors.surface})` }}
            >
                <div className="h-16 flex items-center px-6 border-b border-border/50">
                    <div className="w-6 h-6 rounded bg-primary mr-3" />
                    <span className="font-bold text-lg tracking-tight hidden md:block" style={{ fontFamily: style.fonts.heading }}>Acme Corp.</span>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {sidebarItems.map((item, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveTab(item.label)}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium
                                ${activeTab === item.label
                                    ? 'bg-primary text-primary-foreground shadow-sm'
                                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                }`}
                            style={{ borderRadius: style.radius }}
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="hidden md:block">{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-border/50">
                    <div className={`p-4 rounded-xl bg-muted/50 hidden md:block`} style={{ borderRadius: style.radius }}>
                        <h4 className="text-xs font-bold mb-1">Pro Plan</h4>
                        <p className="text-[10px] text-muted-foreground mb-3">Your team has used 80% of your free spots.</p>
                        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden mb-3">
                            <div className="h-full w-4/5 bg-primary rounded-full" />
                        </div>
                        <button className="text-[10px] font-bold text-primary hover:underline">Upgrade Plan</button>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 bg-background/50">
                {/* Simulated Header */}
                <header className="h-16 border-b border-border/50 flex items-center justify-between px-6 bg-surface/80 backdrop-blur-md sticky top-0 z-10">
                    <div className="flex items-center gap-4 text-muted-foreground">
                        <Search className="w-4 h-4" />
                        <span className="text-sm">Search detailed reports...</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="relative p-2 rounded-full hover:bg-muted transition-colors">
                            <Bell className="w-4 h-4 text-foreground" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-surface" />
                        </button>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-accent border-2 border-surface" />
                    </div>
                </header>

                {/* Dashboard Content */}
                <main className="flex-1 p-6 overflow-y-auto relative">
                    <AnimatePresence mode="wait">
                        {activeTab === 'Overview' ? (
                            <motion.div
                                key="overview"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="mb-6 flex items-center justify-between">
                                    <h2 className="text-2xl font-bold tracking-tight" style={{ fontFamily: style.fonts.heading }}>Dashboard</h2>
                                    <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                                        Download Report
                                    </button>
                                </div>

                                {/* Stats Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                    {stats.map((stat, i) => (
                                        <div key={i} className={`${cardStyle} p-6 bg-surface`} style={{ borderRadius: style.radius }}>
                                            <div className="flex items-center justify-between mb-4">
                                                <span className="text-sm font-medium text-muted-foreground">{stat.label}</span>
                                                <stat.icon className="w-4 h-4 text-muted-foreground" />
                                            </div>
                                            <div className="flex items-baseline gap-2">
                                                <h3 className="text-2xl font-bold">{stat.value}</h3>
                                                <span className={`text-xs font-medium flex items-center ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                                                    {stat.trend === 'up' ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                                                    {stat.change}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Chart & Activity Grid */}
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                    {/* Main Chart Placeholder */}
                                    <div className={`col-span-2 ${cardStyle} p-6 min-h-[300px] flex flex-col`} style={{ borderRadius: style.radius }}>
                                        <div className="flex items-center justify-between mb-6">
                                            <h3 className="font-bold">Revenue Overview</h3>
                                            <div className="flex bg-muted/50 rounded-lg p-0.5">
                                                {['D', 'W', 'M', 'Y'].map(t => (
                                                    <button key={t} className={`px-3 py-1 text-xs font-medium rounded-md ${t === 'M' ? 'bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>
                                                        {t}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex-1 w-full bg-muted/10 rounded-lg border border-dashed border-border flex items-end justify-between px-4 pb-0 pt-8 gap-2 overflow-hidden">
                                            {/* Fake Bars */}
                                            {Array.from({ length: 12 }).map((_, i) => (
                                                <div
                                                    key={i}
                                                    className="w-full bg-primary/20 rounded-t-sm hover:bg-primary/40 transition-colors"
                                                    style={{ height: `${Math.random() * 60 + 20}%` }}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    {/* Recent Activity */}
                                    <div className={`${cardStyle} p-6`} style={{ borderRadius: style.radius }}>
                                        <div className="flex items-center justify-between mb-6">
                                            <h3 className="font-bold">Recent Activity</h3>
                                            <MoreVertical className="w-4 h-4 text-muted-foreground cursor-pointer" />
                                        </div>
                                        <div className="space-y-6">
                                            {[1, 2, 3, 4].map((_, i) => (
                                                <div key={i} className="flex gap-4">
                                                    <div className="relative">
                                                        <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                                                        {i !== 3 && <div className="absolute top-3.5 left-1 w-px h-10 bg-border" />}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium">New project created</p>
                                                        <p className="text-xs text-muted-foreground">2 minutes ago</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="placeholder"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.05 }}
                                transition={{ duration: 0.2 }}
                                className="h-full flex flex-col items-center justify-center text-center p-12 opacity-50"
                            >
                                <div className="w-24 h-24 rounded-full bg-muted mb-6 flex items-center justify-center">
                                    <Settings className="w-10 h-10 text-muted-foreground" />
                                </div>
                                <h2 className="text-2xl font-bold mb-2">{activeTab} Page</h2>
                                <p>This simulates navigation to the {activeTab} section.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </main>
            </div>
        </section>
    );
}
