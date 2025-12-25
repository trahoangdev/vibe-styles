import { DesignStyle } from '@/lib/designStyles';
import { ChevronLeft, ChevronRight, Clock, Plus, MapPin } from 'lucide-react';

interface CalendarPreviewProps {
    style: DesignStyle;
    cardStyle: string;
    isMobile?: boolean;
}

export function CalendarPreview({ style, cardStyle, isMobile = false }: CalendarPreviewProps) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const timeSlots = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00'];

    // Mock current month: October 2024
    const dates = Array.from({ length: 35 }, (_, i) => {
        const day = i - 1; // Start from late prev month
        return {
            day: day > 0 && day <= 31 ? day : day <= 0 ? 30 + day : day - 31,
            isCurrentMonth: day > 0 && day <= 31,
            isToday: day === 24,
            hasEvent: [8, 15, 24, 28].includes(day),
        };
    });

    const events = [
        { title: 'Design Review', time: '10:00 - 11:30', type: 'work', color: 'text-blue-500 bg-blue-500/10' },
        { title: 'Lunch with Sarah', time: '12:30 - 13:30', type: 'personal', color: 'text-orange-500 bg-orange-500/10' },
        { title: 'Client Sync', time: '15:00 - 16:00', type: 'work', color: 'text-purple-500 bg-purple-500/10' }
    ];

    return (
        <section className={`grid gap-8 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-3'}`}>
            {/* Main Calendar View */}
            <div className={`col-span-2 ${cardStyle} p-6`} style={{ borderRadius: style.radius }}>
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight" style={{ fontFamily: style.fonts.heading }}>October 2024</h2>
                        <p className="text-sm opacity-60">Thursday, Oct 24th</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="p-2 rounded-full hover:bg-muted transition-colors">
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button className="p-2 rounded-full hover:bg-muted transition-colors">
                            <ChevronRight className="w-4 h-4" />
                        </button>
                        <button
                            className="ml-2 px-4 py-2 text-sm font-semibold rounded-lg bg-primary text-primary-foreground transition-all active:scale-95 flex items-center gap-2"
                            style={{ borderRadius: style.radius }}
                        >
                            <Plus className="w-4 h-4" />
                            {isMobile ? '' : 'Add Event'}
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-7 mb-4">
                    {days.map(day => (
                        <div key={day} className="text-center text-xs font-bold uppercase tracking-wider opacity-40 py-2">
                            {day}
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-7 grid-rows-5 gap-2 h-96">
                    {dates.map((date, i) => (
                        <div
                            key={i}
                            className={`
                                relative p-2 rounded-lg border transition-all hover:border-primary/50 cursor-pointer group
                                ${date.isCurrentMonth ? 'bg-surface' : 'bg-muted/30 text-muted-foreground'}
                                ${date.isToday ? 'ring-2 ring-primary ring-offset-2' : 'border-transparent'}
                            `}
                            style={{ borderRadius: style.radius }}
                        >
                            <span className={`text-sm font-medium ${date.isToday ? 'text-primary' : ''}`}>
                                {date.day}
                            </span>

                            {date.hasEvent && (
                                <div className="mt-2 space-y-1">
                                    <div
                                        className="h-1.5 w-full rounded-full bg-accent/80"
                                        style={{ backgroundColor: `hsl(${style.colors.accent})` }}
                                    />
                                    <div className="h-1.5 w-2/3 rounded-full bg-muted-foreground/30" />
                                </div>
                            )}

                            {/* Hover Add Button */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-background/50 backdrop-blur-[1px] rounded-lg">
                                <Plus className="w-4 h-4 text-primary" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Schedule Sidebar */}
            <div className="space-y-6">
                {/* Mini Calendar Widget */}
                <div className={`${cardStyle} p-6`} style={{ borderRadius: style.radius }}>
                    <h3 className="text-sm font-bold uppercase tracking-wider opacity-60 mb-4">Schedule</h3>
                    <div className="space-y-4">
                        {events.map((event, i) => (
                            <div key={i} className="flex gap-4 group cursor-pointer">
                                <div className="flex flex-col items-center gap-1 min-w-[3rem]">
                                    <span className="text-xs font-bold opacity-60">{event.time.split(' - ')[0]}</span>
                                    <div className="w-px h-full bg-border group-last:hidden" />
                                </div>
                                <div
                                    className={`flex-1 p-3 rounded-xl border border-transparent hover:border-border transition-all hover:bg-muted/50 ${event.color}`}
                                    style={{ borderRadius: style.radius }}
                                >
                                    <h4 className="text-sm font-bold">{event.title}</h4>
                                    <div className="flex items-center gap-2 mt-1 opacity-70">
                                        <Clock className="w-3 h-3" />
                                        <span className="text-[10px] uppercase font-medium">{event.time}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Upcoming Widget */}
                <div className={`${cardStyle} p-4 bg-primary text-primary-foreground`} style={{ borderRadius: style.radius, color: `hsl(${style.colors.primaryForeground})`, backgroundColor: `hsl(${style.colors.primary})` }}>
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-xs font-medium opacity-80 mb-1">Up Next</p>
                            <h3 className="text-lg font-bold">Product Strategy</h3>
                            <div className="flex items-center gap-2 mt-2 text-sm opacity-90">
                                <Clock className="w-4 h-4" />
                                <span>16:30 - 17:30</span>
                            </div>
                            <div className="flex items-center gap-2 mt-1 text-sm opacity-90">
                                <MapPin className="w-4 h-4" />
                                <span>Room 404</span>
                            </div>
                        </div>
                        <div className="p-2 bg-white/20 rounded-lg">
                            <Clock className="w-6 h-6" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
