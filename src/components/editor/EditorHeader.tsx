import { RotateCcw, Undo2, Redo2, Dices, Search, PanelRight, AppWindow, History } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { HistoryPanel } from './HistoryPanel';
import { HarmonyStrategy } from '@/lib/themeGenerator';

interface EditorHeaderProps {
    hasChanges: boolean;
    onReset: () => void;
    canUndo: boolean;
    canRedo: boolean;
    onUndo?: () => void;
    onRedo?: () => void;
    onRandomize: (strategy?: HarmonyStrategy) => void;
    onGenerate: (prompt: string) => void;
    historyInfo?: { current: number; total: number };
    onSearch?: (query: string) => void;
    editorMode: 'sidebar' | 'floating';
    onToggleMode: () => void;
}

export function EditorHeader({
    hasChanges,
    onReset,
    canUndo,
    canRedo,
    onUndo,
    onRedo,
    onRandomize,
    onGenerate,
    historyInfo,
    onSearch,
    editorMode,
    onToggleMode
}: EditorHeaderProps) {

    return (
        <div className="p-6 border-b border-border bg-muted/20">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="font-black text-xs uppercase tracking-[0.2em]">Engine Config</h3>
                    <p className="text-[10px] uppercase font-bold opacity-40">Verifying aesthetic output</p>
                </div>
                <div className="flex items-center gap-2">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <button
                                onClick={onToggleMode}
                                className="p-2 rounded-lg hover:bg-primary/10 text-primary transition-all active:scale-95"
                            >
                                {editorMode === 'sidebar' ? <AppWindow className="w-4 h-4" /> : <PanelRight className="w-4 h-4" />}
                            </button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{editorMode === 'sidebar' ? "Switch to Floating Mode" : "Dock to Sidebar"}</p>
                        </TooltipContent>
                    </Tooltip>

                    <Popover>
                        <PopoverTrigger asChild>
                            <button
                                className="p-2 rounded-lg hover:bg-primary/10 text-primary transition-all active:scale-95"
                                title="History & Snapshots"
                            >
                                <History className="w-4 h-4" />
                            </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80 p-0" align="end" sideOffset={5}>
                            <HistoryPanel isOpen={true} onClose={() => { }} />
                        </PopoverContent>
                    </Popover>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <button
                                onClick={() => onRandomize()}
                                className="p-2 rounded-lg hover:bg-primary/10 text-primary transition-all active:scale-95"
                            >
                                <Dices className="w-4 h-4" />
                            </button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Random Theme</p>
                        </TooltipContent>
                    </Tooltip>

                    {hasChanges && (
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button
                                    onClick={onReset}
                                    className="p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-all active:scale-95"
                                >
                                    <RotateCcw className="w-4 h-4" />
                                </button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Wipe overrides</p>
                            </TooltipContent>
                        </Tooltip>
                    )}
                </div>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex gap-1">
                    <button
                        onClick={onUndo}
                        disabled={!canUndo}
                        className="p-2 rounded-xl bg-muted/50 border border-border disabled:opacity-20 transition-all hover:bg-muted active:scale-90"
                    >
                        <Undo2 className="w-4 h-4" />
                    </button>
                    <button
                        onClick={onRedo}
                        disabled={!canRedo}
                        className="p-2 rounded-xl bg-muted/50 border border-border disabled:opacity-20 transition-all hover:bg-muted active:scale-90"
                    >
                        <Redo2 className="w-4 h-4" />
                    </button>
                </div>
                {historyInfo && (
                    <div className="px-3 py-1 bg-foreground text-background text-[9px] font-black uppercase rounded-full">
                        Step {historyInfo.current + 1} / {historyInfo.total}
                    </div>
                )}
            </div>

            <div className="mt-4 relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 opacity-40 group-focus-within:opacity-100 transition-opacity" />
                <input
                    type="text"
                    placeholder="Search properties..."
                    className="w-full bg-muted/30 border border-border rounded-lg pl-8 pr-3 py-1.5 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-muted-foreground/50"
                    onChange={(e) => onSearch?.(e.target.value)}
                />
            </div>
        </div>
    );
}

