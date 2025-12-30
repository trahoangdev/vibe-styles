import { DesignStyle } from '@/lib/designStyles';
import {
    Home, BarChart2, Users, Settings, Bell, Search,
    TrendingUp, TrendingDown, DollarSign, Activity,
    MoreVertical, PieChart, Layers
} from 'lucide-react';
import React, { useState } from 'react';
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
        <section 
            className={`rounded-3xl overflow-hidden ${isMobile ? 'h-auto' : 'h-[600px]'} flex relative shadow-2xl @container`}
            style={{ 
                backgroundColor: `hsl(${style.colors.muted} / 0.2)`,
                border: `1px solid hsl(${style.colors.border})`
            }}
        >
            {/* Backdrop Blur for "Desktop within Desktop" feel */}
            <div className="absolute inset-0 backdrop-blur-[1px] pointer-events-none -z-10" />

            {/* Simulated Sidebar */}
            <aside
                className={`w-16 @lg:w-64 flex flex-col transition-all ${isMobile ? 'hidden' : 'flex'}`}
                style={{ 
                    backgroundColor: `hsl(${style.colors.surface})`,
                    borderRight: `1px solid hsl(${style.colors.border})`
                }}
            >
                <div 
                    className="h-16 flex items-center px-6"
                    style={{ borderBottom: `1px solid hsl(${style.colors.border} / 0.5)` }}
                >
                    <div 
                        className="w-6 h-6 rounded mr-3" 
                        style={{ backgroundColor: `hsl(${style.colors.primary})` }}
                    />
                    <span 
                        className="font-bold text-lg tracking-tight hidden @lg:block" 
                        style={{ fontFamily: style.fonts.heading, color: `hsl(${style.colors.foreground})` }}
                    >
                        Acme Corp.
                    </span>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {sidebarItems.map((item, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveTab(item.label)}
                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium"
                            style={{ 
                                borderRadius: style.radius,
                                backgroundColor: activeTab === item.label ? `hsl(${style.colors.primary})` : 'transparent',
                                color: activeTab === item.label 
                                    ? `hsl(${style.colors.primaryForeground})` 
                                    : `hsl(${style.colors.mutedForeground})`
                            }}
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="hidden @lg:block">{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div 
                    className="p-4"
                    style={{ borderTop: `1px solid hsl(${style.colors.border} / 0.5)` }}
                >
                    <div 
                        className="p-4 hidden @lg:block" 
                        style={{ 
                            borderRadius: style.radius,
                            backgroundColor: `hsl(${style.colors.muted} / 0.5)`
                        }}
                    >
                        <h4 
                            className="text-xs font-bold mb-1"
                            style={{ color: `hsl(${style.colors.foreground})` }}
                        >
                            Pro Plan
                        </h4>
                        <p 
                            className="text-[10px] mb-3"
                            style={{ color: `hsl(${style.colors.mutedForeground})` }}
                        >
                            Your team has used 80% of your free spots.
                        </p>
                        <div 
                            className="h-1.5 w-full rounded-full overflow-hidden mb-3"
                            style={{ backgroundColor: `hsl(${style.colors.muted})` }}
                        >
                            <div 
                                className="h-full w-4/5 rounded-full" 
                                style={{ backgroundColor: `hsl(${style.colors.primary})` }}
                            />
                        </div>
                        <button 
                            className="text-[10px] font-bold hover:underline"
                            style={{ color: `hsl(${style.colors.primary})` }}
                        >
                            Upgrade Plan
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div 
                className="flex-1 flex flex-col min-w-0"
                style={{ backgroundColor: `hsl(${style.colors.background} / 0.5)` }}
            >
                {/* Simulated Header */}
                <header 
                    className="h-16 flex items-center justify-between px-6 backdrop-blur-md sticky top-0 z-10"
                    style={{ 
                        borderBottom: `1px solid hsl(${style.colors.border} / 0.5)`,
                        backgroundColor: `hsl(${style.colors.surface} / 0.8)`
                    }}
                >
                    <div 
                        className="flex items-center gap-4"
                        style={{ color: `hsl(${style.colors.mutedForeground})` }}
                    >
                        <Search className="w-4 h-4" />
                        <span className="text-sm">Search detailed reports...</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <button 
                            className="relative p-2 rounded-full transition-colors"
                            style={{ color: `hsl(${style.colors.foreground})` }}
                        >
                            <Bell className="w-4 h-4" />
                            <span 
                                className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
                                style={{ 
                                    backgroundColor: `hsl(${style.colors.error || '0 84% 60%'})`,
                                    border: `2px solid hsl(${style.colors.surface})`
                                }}
                            />
                        </button>
                        <div 
                            className="w-8 h-8 rounded-full"
                            style={{ 
                                background: `linear-gradient(to top right, hsl(${style.colors.primary}), hsl(${style.colors.accent}))`,
                                border: `2px solid hsl(${style.colors.surface})`
                            }}
                        />
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
                                    <h2 
                                        className="text-2xl font-bold tracking-tight" 
                                        style={{ fontFamily: style.fonts.heading, color: `hsl(${style.colors.foreground})` }}
                                    >
                                        Dashboard
                                    </h2>
                                    <button 
                                        className="px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                                        style={{ 
                                            backgroundColor: `hsl(${style.colors.primary})`,
                                            color: `hsl(${style.colors.primaryForeground})`,
                                            borderRadius: style.radius
                                        }}
                                    >
                                        Download Report
                                    </button>
                                </div>

                                {/* Stats Grid */}
                                <div className="grid grid-cols-1 @md:grid-cols-3 gap-6 mb-8">
                                    {stats.map((stat, i) => (
                                        <div 
                                            key={i} 
                                            className={`${cardStyle} p-6`} 
                                            style={{ 
                                                borderRadius: style.radius,
                                                backgroundColor: `hsl(${style.colors.surface})`
                                            }}
                                        >
                                            <div className="flex items-center justify-between mb-4">
                                                <span 
                                                    className="text-sm font-medium"
                                                    style={{ color: `hsl(${style.colors.mutedForeground})` }}
                                                >
                                                    {stat.label}
                                                </span>
                                                <stat.icon 
                                                    className="w-4 h-4" 
                                                    style={{ color: `hsl(${style.colors.mutedForeground})` }}
                                                />
                                            </div>
                                            <div className="flex items-baseline gap-2">
                                                <h3 
                                                    className="text-2xl font-bold"
                                                    style={{ color: `hsl(${style.colors.foreground})` }}
                                                >
                                                    {stat.value}
                                                </h3>
                                                <span className={`text-xs font-medium flex items-center ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                                                    {stat.trend === 'up' ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                                                    {stat.change}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Chart & Activity Grid */}
                                <div className="grid grid-cols-1 @3xl:grid-cols-3 gap-8">
                                    {/* Main Chart Placeholder */}
                                    <div 
                                        className={`@3xl:col-span-2 ${cardStyle} p-6 min-h-[300px] flex flex-col`} 
                                        style={{ 
                                            borderRadius: style.radius,
                                            backgroundColor: `hsl(${style.colors.surface})`
                                        }}
                                    >
                                        <div className="flex items-center justify-between mb-6">
                                            <h3 
                                                className="font-bold"
                                                style={{ color: `hsl(${style.colors.foreground})` }}
                                            >
                                                Revenue Overview
                                            </h3>
                                            <div 
                                                className="flex rounded-lg p-0.5"
                                                style={{ backgroundColor: `hsl(${style.colors.muted} / 0.5)` }}
                                            >
                                                {['D', 'W', 'M', 'Y'].map(t => (
                                                    <button 
                                                        key={t} 
                                                        className="px-3 py-1 text-xs font-medium rounded-md"
                                                        style={{ 
                                                            backgroundColor: t === 'M' ? `hsl(${style.colors.background})` : 'transparent',
                                                            color: t === 'M' ? `hsl(${style.colors.foreground})` : `hsl(${style.colors.mutedForeground})`,
                                                            boxShadow: t === 'M' ? '0 1px 2px rgba(0,0,0,0.1)' : 'none'
                                                        }}
                                                    >
                                                        {t}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div 
                                            className="flex-1 w-full rounded-lg border-dashed flex items-end justify-between px-4 pb-0 pt-8 gap-2 overflow-hidden"
                                            style={{ 
                                                backgroundColor: `hsl(${style.colors.muted} / 0.1)`,
                                                border: `1px dashed hsl(${style.colors.border})`
                                            }}
                                        >
                                            {/* Fake Bars */}
                                            {Array.from({ length: 12 }).map((_, i) => {
                                                // eslint-disable-next-line react-hooks/rules-of-hooks
                                                const height = React.useMemo(() => Math.random() * 60 + 20, []);
                                                return (
                                                    <motion.div
                                                        key={i}
                                                        className="w-full rounded-t-sm transition-colors cursor-pointer"
                                                        style={{ backgroundColor: `hsl(${style.colors.primary} / 0.2)` }}
                                                        initial={{ height: 0 }}
                                                        whileInView={{ height: `${height}%` }}
                                                        viewport={{ once: true }}
                                                        transition={{ duration: 0.8, delay: i * 0.05, ease: "easeOut" }}
                                                        whileHover={{ scaleY: 1.1 }}
                                                    />
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Recent Activity */}
                                    <div 
                                        className={`${cardStyle} p-6`} 
                                        style={{ 
                                            borderRadius: style.radius,
                                            backgroundColor: `hsl(${style.colors.surface})`
                                        }}
                                    >
                                        <div className="flex items-center justify-between mb-6">
                                            <h3 
                                                className="font-bold"
                                                style={{ color: `hsl(${style.colors.foreground})` }}
                                            >
                                                Recent Activity
                                            </h3>
                                            <MoreVertical 
                                                className="w-4 h-4 cursor-pointer" 
                                                style={{ color: `hsl(${style.colors.mutedForeground})` }}
                                            />
                                        </div>
                                        <div className="space-y-6">
                                            {[1, 2, 3, 4].map((_, i) => (
                                                <div key={i} className="flex gap-4">
                                                    <div className="relative">
                                                        <div 
                                                            className="w-2 h-2 rounded-full mt-1.5" 
                                                            style={{ backgroundColor: `hsl(${style.colors.primary})` }}
                                                        />
                                                        {i !== 3 && (
                                                            <div 
                                                                className="absolute top-3.5 left-1 w-px h-10" 
                                                                style={{ backgroundColor: `hsl(${style.colors.border})` }}
                                                            />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p 
                                                            className="text-sm font-medium"
                                                            style={{ color: `hsl(${style.colors.foreground})` }}
                                                        >
                                                            New project created
                                                        </p>
                                                        <p 
                                                            className="text-xs"
                                                            style={{ color: `hsl(${style.colors.mutedForeground})` }}
                                                        >
                                                            2 minutes ago
                                                        </p>
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
                                <div 
                                    className="w-24 h-24 rounded-full mb-6 flex items-center justify-center"
                                    style={{ backgroundColor: `hsl(${style.colors.muted})` }}
                                >
                                    <Settings 
                                        className="w-10 h-10" 
                                        style={{ color: `hsl(${style.colors.mutedForeground})` }}
                                    />
                                </div>
                                <h2 
                                    className="text-2xl font-bold mb-2"
                                    style={{ color: `hsl(${style.colors.foreground})` }}
                                >
                                    {activeTab} Page
                                </h2>
                                <p style={{ color: `hsl(${style.colors.mutedForeground})` }}>
                                    This simulates navigation to the {activeTab} section.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </main>
            </div>
        </section>
    );
}
