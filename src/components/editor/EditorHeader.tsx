import { RotateCcw, Undo2, Redo2, Dices } from 'lucide-react';

interface EditorHeaderProps {
    hasChanges: boolean;
    onReset: () => void;
    canUndo: boolean;
    canRedo: boolean;
    onUndo?: () => void;
    onRedo?: () => void;
    onRandomize?: () => void;
    historyInfo?: { current: number; total: number };
}

export function EditorHeader({
    hasChanges,
    onReset,
    canUndo,
    canRedo,
    onUndo,
    onRedo,
    onRandomize,
    historyInfo
}: EditorHeaderProps) {

    return (
        <div className="p-6 border-b border-border bg-muted/20">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="font-black text-xs uppercase tracking-[0.2em]">Engine Config</h3>
                    <p className="text-[10px] uppercase font-bold opacity-40">Verifying aesthetic output</p>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={onRandomize}
                        className="p-2 rounded-lg hover:bg-primary/10 text-primary transition-all active:scale-95"
                        title="Feeling Lucky? (Randomize)"
                    >
                        <Dices className="w-4 h-4" />
                    </button>
                    {hasChanges && (
                        <button
                            onClick={onReset}
                            className="p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-all active:scale-95"
                            title="Wipe overrides"
                        >
                            <RotateCcw className="w-4 h-4" />
                        </button>
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
        </div>
    );
}
