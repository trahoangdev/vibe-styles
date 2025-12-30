import { useState } from 'react';
import { useThemeStore } from '@/store/themeStore';
import { cn } from '@/lib/utils';
import { Clock, Bookmark, RotateCcw, Trash2, Camera } from 'lucide-react';

interface HistoryPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

export function HistoryPanel({ isOpen, onClose }: HistoryPanelProps) {
    const store = useThemeStore();
    const [activeTab, setActiveTab] = useState<'history' | 'snapshots'>('history');

    if (!isOpen) return null;

    return (
        <div className="w-full bg-card flex flex-col max-h-[500px]">
            {/* Header */}
            <div className="p-3 border-b border-border bg-muted/30 flex items-center justify-between">
                <div className="flex gap-1 bg-muted rounded-lg p-1">
                    <button
                        onClick={() => setActiveTab('history')}
                        className={cn(
                            "px-3 py-1 rounded-md text-xs font-semibold transition-all",
                            activeTab === 'history' ? "bg-background shadow text-foreground" : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        History
                    </button>
                    <button
                        onClick={() => setActiveTab('snapshots')}
                        className={cn(
                            "px-3 py-1 rounded-md text-xs font-semibold transition-all",
                            activeTab === 'snapshots' ? "bg-background shadow text-foreground" : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        Snapshots
                    </button>
                </div>
                <button className="p-1 hover:bg-muted rounded" onClick={onClose}><span className="sr-only">Close</span></button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-2 scrollbar-thin">
                {activeTab === 'history' && (
                    <div className="space-y-1">
                        {store.history.map((step, index) => {
                            const isActive = index === store.historyIndex;
                            // Try to determine key changes slightly
                            const hasColors = step.colors && Object.keys(step.colors).length > 0;
                            const hasFonts = step.fonts && Object.keys(step.fonts).length > 0;

                            return (
                                <button
                                    key={index}
                                    onClick={() => store.jumpToHistory(index)}
                                    className={cn(
                                        "w-full text-left p-2 rounded-lg text-xs flex items-center gap-3 transition-colors",
                                        isActive ? "bg-primary/10 border border-primary/20" : "hover:bg-muted"
                                    )}
                                >
                                    <div className={cn(
                                        "w-6 h-6 rounded-full flex items-center justify-center font-mono text-[10px]",
                                        isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                                    )}>
                                        {index}
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-semibold">
                                            {index === 0 ? "Initial State" : "Change applied"}
                                        </div>
                                        <div className="text-[10px] text-muted-foreground opacity-70">
                                            {hasColors && "Colors "}{hasFonts && "Fonts"}
                                        </div>
                                    </div>
                                    {isActive && <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />}
                                </button>
                            )
                        })}
                        <div ref={(el) => el?.scrollIntoView({ behavior: 'smooth' })} />
                    </div>
                )}

                {activeTab === 'snapshots' && (
                    <div className="space-y-2">
                        <button
                            onClick={() => {
                                store.addSnapshot();
                            }}
                            className="w-full flex items-center justify-center gap-2 p-2 border border-dashed border-border rounded-lg hover:bg-muted/50 transition-colors text-xs font-semibold"
                        >
                            <Camera className="w-4 h-4" />
                            Take Snapshot
                        </button>

                        {store.snapshots.length === 0 && (
                            <div className="text-center py-8 text-muted-foreground text-xs opacity-50">
                                No snapshots saved.
                            </div>
                        )}

                        {store.snapshots.map((snap, index) => (
                            <div key={index} className="group flex items-center justify-between p-2 rounded-lg border border-border bg-card hover:shadow-sm transition-all">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full border border-border flex overflow-hidden">
                                        <div className="flex-1" style={{ backgroundColor: snap.colors?.primary || '#888' }} />
                                        <div className="flex-1" style={{ backgroundColor: snap.colors?.background || '#fff' }} />
                                    </div>
                                    <div>
                                        <div className="text-xs font-semibold">Snapshot #{index + 1}</div>
                                        <div className="text-[10px] text-muted-foreground">{Object.keys(snap.colors || {}).length} overrides</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => store.restoreSnapshot(index)}
                                        className="p-1.5 hover:bg-primary/10 text-primary rounded-md"
                                        title="Restore"
                                    >
                                        <RotateCcw className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                        onClick={() => store.deleteSnapshot(index)}
                                        className="p-1.5 hover:bg-destructive/10 text-destructive rounded-md"
                                        title="Delete"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
