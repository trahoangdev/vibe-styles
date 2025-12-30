import { DesignStyle } from '@/lib/designStyles';
import { MoreHorizontal, Plus, Calendar, Paperclip, MessageSquare } from 'lucide-react';

interface KanbanPreviewProps {
    style: DesignStyle;
    cardStyle: string;
    isMobile?: boolean; // Added isMobile prop
}

export function KanbanPreview({ style, cardStyle, isMobile = false }: KanbanPreviewProps) {
    const columns = [
        {
            title: 'To Do',
            count: 3,
            cards: [
                { title: 'Research competitors', tag: 'Strategy', tagColor: 'text-orange-500 bg-orange-500/10', members: 2, comments: 4 },
                { title: 'Draft product requirements', tag: 'Product', tagColor: 'text-blue-500 bg-blue-500/10', members: 1, comments: 2 },
                { title: 'Design system audit', tag: 'Design', tagColor: 'text-purple-500 bg-purple-500/10', members: 3, comments: 8 },
            ]
        },
        {
            title: 'In Progress',
            count: 2,
            cards: [
                { title: 'Implement dark mode', tag: 'Dev', tagColor: 'text-green-500 bg-green-500/10', members: 2, comments: 12, image: true },
                { title: 'Update dependencies', tag: 'Dev', tagColor: 'text-green-500 bg-green-500/10', members: 1, comments: 0 },
            ]
        },
        {
            title: 'Done',
            count: 4,
            cards: [
                { title: 'Q3 Goals Review', tag: 'Business', tagColor: 'text-rose-500 bg-rose-500/10', members: 5, comments: 2 },
            ],
            hiddenOnMobile: true
        }
    ];

    return (
        <section className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-bold tracking-tight mb-1" style={{ fontFamily: style.fonts.heading, color: `hsl(${style.colors.foreground})` }}>Project Board</h2>
                    <p className="text-sm" style={{ color: `hsl(${style.colors.mutedForeground})` }}>Visualizing workflow and task status.</p>
                </div>
                <button
                    className="px-3 py-1.5 text-xs font-bold rounded-lg transition-transform active:scale-95 bg-primary text-primary-foreground"
                    style={{ borderRadius: style.radius }}
                >
                    <Plus className="w-3 h-3 inline mr-1" />
                    New Issue
                </button>
            </div>

            <div className={`grid gap-6 items-start overflow-x-auto pb-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-3'}`}>
                {columns.map((col, i) => (
                    <div
                        key={i}
                        className={`space-y-4 ${col.hiddenOnMobile && isMobile ? 'hidden' : ''}`}
                    >
                        <div className="flex items-center justify-between px-1">
                            <div className="flex items-center gap-2">
                                <h3 className="text-xs font-bold uppercase tracking-wider" style={{ color: `hsl(${style.colors.mutedForeground})` }}>{col.title}</h3>
                                <span className="text-[10px] px-1.5 py-0.5 rounded-full font-medium" style={{ backgroundColor: `hsl(${style.colors.muted})`, color: `hsl(${style.colors.mutedForeground})` }}>
                                    {col.count}
                                </span>
                            </div>
                            <MoreHorizontal className="w-4 h-4 cursor-pointer" style={{ color: `hsl(${style.colors.mutedForeground})` }} />
                        </div>

                        <div className="space-y-3">
                            {col.cards.map((card, idx) => (
                                <div
                                    key={idx}
                                    className={`${cardStyle} p-4 group cursor-grab active:cursor-grabbing hover:-translate-y-1 bg-surface`}
                                    style={{ borderRadius: style.radius }}
                                >
                                    {card.image && (
                                        <div className="mb-3 h-24 rounded-md bg-muted/50 w-full overflow-hidden relative">
                                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20" />
                                        </div>
                                    )}
                                    <div className="flex items-start justify-between mb-2">
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${card.tagColor}`}>
                                            {card.tag}
                                        </span>
                                        <MoreHorizontal className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    <h4 className="text-sm font-semibold mb-3 leading-snug" style={{ color: `hsl(${style.colors.foreground})` }}>{card.title}</h4>

                                    <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: `hsl(${style.colors.border} / 0.4)` }}>
                                        <div className="flex -space-x-2">
                                            {[...Array(card.members)].map((_, midx) => (
                                                <div
                                                    key={midx}
                                                    className="w-5 h-5 rounded-full border flex items-center justify-center text-[8px] font-bold"
                                                    style={{ 
                                                        backgroundColor: midx === 0 ? `hsl(${style.colors.accent})` : `hsl(${style.colors.muted})`, 
                                                        color: midx === 0 ? `hsl(${style.colors.accentForeground})` : `hsl(${style.colors.foreground})`,
                                                        borderColor: `hsl(${style.colors.surface})`
                                                    }}
                                                >
                                                    {String.fromCharCode(65 + midx)}
                                                </div>
                                            ))}
                                        </div>
                                        <div className="flex items-center gap-3 text-[10px] font-medium" style={{ color: `hsl(${style.colors.mutedForeground})` }}>
                                            {card.comments > 0 && (
                                                <div className="flex items-center gap-1">
                                                    <MessageSquare className="w-3 h-3" />
                                                    {card.comments}
                                                </div>
                                            )}
                                            <div className="flex items-center gap-1">
                                                <Paperclip className="w-3 h-3" />
                                                {Math.floor(Math.random() * 3)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {/* Add card ghost */}
                            <button className="w-full py-2 border border-dashed rounded-lg text-xs transition-all flex items-center justify-center gap-1" style={{ borderColor: `hsl(${style.colors.border})`, color: `hsl(${style.colors.mutedForeground})` }}>
                                <Plus className="w-3 h-3" />
                                Add Card
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
