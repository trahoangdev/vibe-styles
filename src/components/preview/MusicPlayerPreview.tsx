import { type DesignStyle } from '@/lib/designStyles';
import { motion } from 'framer-motion';
import { Play, SkipBack, SkipForward, Disc, Signal, Heart, Share2, ListMusic } from 'lucide-react';
import { useMemo } from 'react';

interface MusicPlayerPreviewProps {
    style: DesignStyle;
    isMobile?: boolean;
}

export function MusicPlayerPreview({ style, isMobile = false }: MusicPlayerPreviewProps) {
    const isCyberpunk = style.id === 'cyberpunk';

    // Dynamic styles based on the theme
    const containerStyle = useMemo(() => {
        if (isCyberpunk) {
            return {
                background: `linear-gradient(135deg, hsl(${style.colors.background}), hsl(${style.colors.surface}))`,
                boxShadow: `0 0 20px hsl(${style.colors.primary} / 0.2), inset 0 0 0 1px hsl(${style.colors.border})`,
                clipPath: 'polygon(0 0, 100% 0, 100% 85%, 95% 100%, 0 100%)' // Angled corner
            };
        }
        return {
            backgroundColor: `hsl(${style.colors.surface})`,
            borderRadius: style.radius,
            borderColor: `hsl(${style.colors.border})`,
            borderWidth: '1px',
        };
    }, [style, isCyberpunk]);

    const progressGradient = isCyberpunk
        ? `linear-gradient(90deg, hsl(${style.colors.primary}), hsl(${style.colors.accent}))`
        : `hsl(${style.colors.primary})`;

    return (
        <div className="w-full max-w-md mx-auto relative group">
            {/* Glow Effect for Cyberpunk */}
            {isCyberpunk && (
                <div className="absolute -inset-1 blur-xl opacity-40 bg-gradient-to-r from-[hsl(var(--style-primary))] to-[hsl(var(--style-accent))] rounded-lg animate-pulse" />
            )}

            {/* Main Player Card */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative overflow-hidden p-6"
                style={containerStyle}
            >
                {/* Header / HUD Elements */}
                <div className="flex justify-between items-center mb-6 opacity-80">
                    {isCyberpunk ? (
                        <div className="text-[10px] font-mono tracking-widest text-[hsl(var(--style-accent))]">
                            SYS.AUDIO_V2 // <span className="animate-pulse">ONLINE</span>
                        </div>
                    ) : (
                        <div className="text-xs font-medium tracking-wide uppercase opacity-50">Now Playing</div>
                    )}
                    <ListMusic className="w-5 h-5 cursor-pointer hover:opacity-80" />
                </div>

                {/* Album Art */}
                <div className="relative aspect-square mb-8 mx-auto w-full max-w-[280px]">
                    <div
                        className={`absolute inset-0 ${isCyberpunk ? 'border-2 border-[hsl(var(--style-primary))] shadow-[0_0_15px_hsl(var(--style-primary)/0.5)]' : 'rounded-2xl shadow-2xl'}`}
                        style={{
                            background: `linear-gradient(45deg, hsl(${style.colors.surface}), hsl(${style.colors.muted}))`,
                            borderRadius: isCyberpunk ? '0' : '24px'
                        }}
                    >
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Disc className={`w-24 h-24 ${isCyberpunk ? 'animate-spin-slow opacity-80 text-[hsl(var(--style-accent))]' : 'opacity-20'}`} />
                        </div>

                        {/* Visualizer bars overlay */}
                        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end h-12 gap-1">
                            {[40, 70, 50, 80, 60, 90, 40, 60].map((h, i) => (
                                <motion.div
                                    key={i}
                                    animate={{ height: [h + '%', (h - 20) + '%', h + '%'] }}
                                    transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1, ease: "easeInOut" }}
                                    className="w-full opacity-60"
                                    style={{
                                        backgroundColor: isCyberpunk ? `hsl(${style.colors.accent})` : `hsl(${style.colors.foreground})`,
                                        borderRadius: isCyberpunk ? 0 : 4
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Song Info */}
                <div className="text-center mb-8 space-y-2">
                    <h3
                        className={`text-2xl font-bold truncate ${isCyberpunk ? 'font-mono uppercase tracking-tighter glitch-effect' : ''}`}
                        style={{ fontFamily: style.fonts.heading }}
                    >
                        Neon Nightdrive
                    </h3>
                    <p className="text-sm opacity-60">Cyberpunk Orchestra</p>
                </div>

                {/* Controls */}
                <div className="space-y-6">
                    {/* Progress Bar */}
                    <div className="space-y-2">
                        <div className="h-1.5 w-full bg-[hsl(var(--style-muted))] relative overflow-hidden"
                            style={{ borderRadius: isCyberpunk ? 0 : 999 }}>
                            <div
                                className="absolute top-0 left-0 h-full w-[65%]"
                                style={{ background: progressGradient }}
                            />
                        </div>
                        <div className={`flex justify-between text-xs font-mono opacity-50 ${isCyberpunk ? 'text-[hsl(var(--style-accent))]' : ''}`}>
                            <span>02:14</span>
                            <span>03:45</span>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-between items-center sm:px-4">
                        <button className="p-2 hover:opacity-70 transition-opacity">
                            <Share2 className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-6">
                            <button className="p-2 hover:scale-110 transition-transform">
                                <SkipBack className="w-6 h-6 fill-current" />
                            </button>

                            <button
                                className={`p-4 hover:scale-105 transition-transform flex items-center justify-center
                            ${isCyberpunk ? 'shadow-[0_0_20px_hsl(var(--style-primary)/0.4)] border border-[hsl(var(--style-primary))]' : 'rounded-full shadow-lg'}
                        `}
                                style={{
                                    backgroundColor: isCyberpunk ? `hsl(${style.colors.background})` : `hsl(${style.colors.primary})`,
                                    color: isCyberpunk ? `hsl(${style.colors.primary})` : `hsl(${style.colors.primaryForeground})`,
                                    borderRadius: isCyberpunk ? '0' : '999px'
                                }}
                            >
                                <Play className="w-8 h-8 fill-current ml-1" />
                            </button>

                            <button className="p-2 hover:scale-110 transition-transform">
                                <SkipForward className="w-6 h-6 fill-current" />
                            </button>
                        </div>

                        <button className="p-2 hover:opacity-70 transition-opacity">
                            <Heart className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Decorative Grid for Cyberpunk */}
                {isCyberpunk && (
                    <div
                        className="absolute inset-0 pointer-events-none opacity-10"
                        style={{
                            backgroundImage: `linear-gradient(0deg, transparent 24%, hsl(${style.colors.border}) 25%, hsl(${style.colors.border}) 26%, transparent 27%, transparent 74%, hsl(${style.colors.border}) 75%, hsl(${style.colors.border}) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, hsl(${style.colors.border}) 25%, hsl(${style.colors.border}) 26%, transparent 27%, transparent 74%, hsl(${style.colors.border}) 75%, hsl(${style.colors.border}) 76%, transparent 77%, transparent)`,
                            backgroundSize: '30px 30px'
                        }}
                    />
                )}
            </motion.div>
        </div>
    );
}
