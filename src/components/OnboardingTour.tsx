import { useState, useEffect } from 'react';
import { X, Sparkles, Palette, Code, Layers, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function OnboardingTour() {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const hasSeenTour = localStorage.getItem('vibestyle-tour-seen');
        if (!hasSeenTour) {
            setIsOpen(true);
            setTimeout(() => setIsVisible(true), 100);
        }
    }, []);

    const handleDismiss = () => {
        setIsVisible(false);
        setTimeout(() => {
            setIsOpen(false);
            localStorage.setItem('vibestyle-tour-seen', 'true');
        }, 300);
    };

    if (!isOpen) return null;

    const steps = [
        {
            icon: Sparkles,
            title: 'Generate & Explore',
            desc: 'Use "Feeling Lucky" to discover harmonized themes instantly.',
            color: 'text-amber-500',
            bg: 'bg-amber-500/10'
        },
        {
            icon: Palette,
            title: 'Deep Customization',
            desc: 'Tweak Google Fonts, A11y scans, and physics in real-time.',
            color: 'text-purple-500',
            bg: 'bg-purple-500/10'
        },
        {
            icon: Code,
            title: 'Export Everywhere',
            desc: 'Production-ready CSS, Tailwind, SCSS, & Figma tokens.',
            color: 'text-green-500',
            bg: 'bg-green-500/10'
        }
    ];

    return (
        <div
            className={cn(
                "fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-500",
                isVisible ? "bg-background/80 backdrop-blur-md opacity-100" : "bg-transparent backdrop-blur-none opacity-0"
            )}
        >
            <div
                className={cn(
                    "relative w-full max-w-2xl bg-card/50 border border-white/10 shadow-2xl rounded-3xl overflow-hidden transition-all duration-500 transform",
                    isVisible ? "scale-100 translate-y-0 opacity-100" : "scale-95 translate-y-8 opacity-0"
                )}
                style={{
                    backdropFilter: 'blur(24px)',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                }}
            >
                {/* Decorative Background Gradients */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/20 rounded-full blur-3xl opacity-30" />
                    <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl opacity-30" />
                </div>

                <div className="relative p-8 md:p-10 flex flex-col items-center text-center">
                    <button
                        onClick={handleDismiss}
                        className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/5 transition-colors text-muted-foreground hover:text-foreground"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <div className="mb-8 relative">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center border border-white/10 shadow-card">
                            <img src="/logo.png" alt="Vibe Styles Logo" className="w-12 h-12 object-contain" />
                        </div>
                        <div className="absolute -z-10 inset-0 bg-primary/20 blur-xl animate-pulse" />
                    </div>

                    <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
                        Welcome to Vibe Styles
                    </h2>

                    <p className="text-lg text-muted-foreground max-w-md mb-10 leading-relaxed">
                        The ultimate design system generator. Build, customize, and deploy consistent interfaces in seconds.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-10">
                        {steps.map((step, i) => (
                            <div
                                key={i}
                                className="group relative p-6 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-4 mx-auto transition-transform group-hover:scale-110", step.bg, step.color)}>
                                    <step.icon className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-base mb-2">{step.title}</h3>
                                <p className="text-sm text-muted-foreground/80 leading-snug">
                                    {step.desc}
                                </p>
                            </div>
                        ))}
                    </div>

                    <Button
                        onClick={handleDismiss}
                        className="group relative px-8 py-6 h-auto text-lg font-bold rounded-xl shadow-lg hover:shadow-primary/25 transition-all w-full md:w-auto overflow-hidden"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            Start Creating <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 opacity-100 transition-opacity" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
