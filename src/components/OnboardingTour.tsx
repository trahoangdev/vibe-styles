import { useState, useEffect } from 'react';
import { X, Sparkles, Palette, Code, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function OnboardingTour() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const hasSeenTour = localStorage.getItem('vibestyle-tour-seen');
        if (!hasSeenTour) {
            // Small delay to let the app load
            const timer = setTimeout(() => setIsOpen(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleDismiss = () => {
        setIsOpen(false);
        localStorage.setItem('vibestyle-tour-seen', 'true');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm animate-fade-in">
            <div className="bg-card border border-border rounded-2xl shadow-2xl max-w-lg w-full p-8 mx-4 relative animate-scale-in">
                <button
                    onClick={handleDismiss}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors opacity-50 hover:opacity-100"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="flex flex-col items-center text-center mb-8">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                        <Sparkles className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight mb-2">Welcome to Vibe Styles</h2>
                    <p className="text-muted-foreground">
                        Your professional design system generator. Here's a quick guide to get you started.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="flex flex-col items-center text-center gap-3 p-4 rounded-xl bg-muted/30">
                        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                            <Layers className="w-5 h-5" />
                        </div>
                        <h3 className="font-semibold text-sm">Pick a Style</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            Browse curated presets from the sidebar to start with a solid foundation.
                        </p>
                    </div>

                    <div className="flex flex-col items-center text-center gap-3 p-4 rounded-xl bg-muted/30">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                            <Palette className="w-5 h-5" />
                        </div>
                        <h3 className="font-semibold text-sm">Customize</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            Open the <b>Theme Editor</b> to tweak colors, fonts, and physics.
                        </p>
                    </div>

                    <div className="flex flex-col items-center text-center gap-3 p-4 rounded-xl bg-muted/30">
                        <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center text-success">
                            <Code className="w-5 h-5" />
                        </div>
                        <h3 className="font-semibold text-sm">Export</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            Copy CSS variables or Tailwind config ready for production.
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-center">
                    <Button
                        onClick={handleDismiss}
                        className="w-full md:w-auto px-8 py-6 text-base font-bold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
                    >
                        Start Creating
                    </Button>
                </div>
            </div>
        </div>
    );
}
