import { useState, useEffect } from 'react';
import { Bookmark, ChevronDown, ChevronUp, Save, Trash2 } from 'lucide-react';
import { ThemeOverrides, Preset } from '@/lib/designStyles';
import { useToast } from '@/hooks/use-toast';

interface PresetsSectionProps {
    overrides: ThemeOverrides;
    onOverridesChange: (overrides: ThemeOverrides) => void;
    isOpen: boolean;
    onToggle: () => void;
}

export function PresetsSection({
    overrides,
    onOverridesChange,
    isOpen,
    onToggle
}: PresetsSectionProps) {
    const { toast } = useToast();
    const [presets, setPresets] = useState<Preset[]>([]);
    const [newPresetName, setNewPresetName] = useState('');

    // Load presets from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('vibe_theme_presets');
        if (saved) {
            try {
                setPresets(JSON.parse(saved));
            } catch (e) {
                console.error('Failed to load presets', e);
            }
        }
    }, []);

    const savePreset = () => {
        if (!newPresetName.trim()) return;

        const newPreset: Preset = {
            id: crypto.randomUUID(),
            name: newPresetName.trim(),
            overrides,
            createdAt: Date.now(),
        };

        const updatedPresets = [...presets, newPreset];
        setPresets(updatedPresets);
        localStorage.setItem('vibe_theme_presets', JSON.stringify(updatedPresets));

        setNewPresetName('');
        toast({
            title: 'Preset Saved',
            description: `Theme "${newPreset.name}" has been saved.`,
        });
    };

    const loadPreset = (preset: Preset) => {
        onOverridesChange(preset.overrides);
        toast({
            title: 'Preset Loaded',
            description: `Applied theme "${preset.name}".`,
        });
    };

    const deletePreset = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        const updatedPresets = presets.filter(p => p.id !== id);
        setPresets(updatedPresets);
        localStorage.setItem('vibe_theme_presets', JSON.stringify(updatedPresets));
    };

    const hasChanges = Object.keys(overrides.colors || {}).length > 0 ||
        Object.keys(overrides.fonts || {}).length > 0 ||
        overrides.radius !== undefined ||
        overrides.shadowStrength !== undefined;

    return (
        <section className="mb-2">
            <button
                onClick={onToggle}
                className="w-full py-4 flex items-center justify-between group"
            >
                <div className="flex items-center gap-3">
                    <Bookmark className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                    <span className="text-xs font-black uppercase tracking-widest">Saved Presets</span>
                </div>
                {isOpen ? <ChevronUp className="w-4 h-4 opacity-30" /> : <ChevronDown className="w-4 h-4 opacity-30" />}
            </button>

            {isOpen && (
                <div className="space-y-4 pb-4 animate-fade-in pl-1">
                    {/* Save Current */}
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={newPresetName}
                            onChange={(e) => setNewPresetName(e.target.value)}
                            placeholder="New preset name..."
                            className="flex-1 px-3 py-2 text-xs bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                        <button
                            onClick={savePreset}
                            disabled={!hasChanges || !newPresetName}
                            className="p-2 bg-primary text-primary-foreground rounded-lg disabled:opacity-50"
                        >
                            <Save className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Preset List */}
                    <div className="space-y-2">
                        {presets.length === 0 ? (
                            <p className="text-[10px] text-muted-foreground italic text-center py-2">No saved presets yet</p>
                        ) : (
                            presets.map(preset => (
                                <div
                                    key={preset.id}
                                    className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/60 border border-transparent hover:border-border transition-all cursor-pointer group"
                                    onClick={() => loadPreset(preset)}
                                >
                                    <div>
                                        <p className="text-xs font-bold">{preset.name}</p>
                                        <p className="text-[9px] opacity-40">{new Date(preset.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <button
                                        onClick={(e) => deletePreset(preset.id, e)}
                                        className="p-1.5 rounded text-muted-foreground hover:text-error hover:bg-error/10 opacity-0 group-hover:opacity-100 transition-all"
                                    >
                                        <Trash2 className="w-3 h-3" />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </section>
    );
}
