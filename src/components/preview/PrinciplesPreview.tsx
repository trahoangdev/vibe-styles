import { type DesignStyle } from '@/lib/designStyles';
import { motion } from 'framer-motion';
import { Shield, Zap, Eye, MousePointer2 } from 'lucide-react';

interface PrinciplesPreviewProps {
    style: DesignStyle;
    cardStyle: string;
    isMobile?: boolean;
}

export function PrinciplesPreview({ style, cardStyle, isMobile = false }: PrinciplesPreviewProps) {
    const principles = [
        {
            icon: Shield,
            title: "Consistency",
            description: "Uniformity in design elements builds trust and reduces cognitive load.",
            gradient: `linear-gradient(135deg, hsl(${style.colors.primary} / 0.1), hsl(${style.colors.primary} / 0))`
        },
        {
            icon: Eye,
            title: "Clarity",
            description: "Information architecture should guide the user's eye naturally.",
            gradient: `linear-gradient(135deg, hsl(${style.colors.accent} / 0.1), hsl(${style.colors.accent} / 0))`
        },
        {
            icon: Zap,
            title: "Efficiency",
            description: "Minimize the number of steps to achieve a goal.",
            gradient: `linear-gradient(135deg, hsl(${style.colors.success} / 0.1), hsl(${style.colors.success} / 0))`
        },
        {
            icon: MousePointer2,
            title: "Feedback",
            description: "Every interaction should have an immediate and clear response.",
            gradient: `linear-gradient(135deg, hsl(${style.colors.warning} / 0.1), hsl(${style.colors.warning} / 0))`
        }
    ];

    return (
        <div className="mt-24 border-t border-border/30 pt-16 animate-fade-in text-left">
            <div className="mb-12">
                <h3
                    className="text-4xl md:text-5xl font-black tracking-tighter mb-4"
                    style={{ fontFamily: style.fonts.heading, color: `hsl(${style.colors.foreground})` }}
                >
                    Core Principles
                </h3>
                <p
                    className="text-lg max-w-2xl"
                    style={{ fontFamily: style.fonts.body, color: `hsl(${style.colors.mutedForeground})` }}
                >
                    Our design philosophy is rooted in Swiss Modernism: content-first, grid-based, and devoid of unnecessary decoration.
                </p>
            </div>

            <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-2 md:grid-cols-4'}`}>
                {principles.map((p, index) => (
                    <motion.div
                        key={p.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -5 }}
                        className={`${cardStyle} p-6 h-full flex flex-col relative overflow-hidden group`}
                        style={{
                            backgroundColor: `hsl(${style.colors.surface})`,
                            borderRadius: style.radius,
                            borderColor: `hsl(${style.colors.border})`
                        }}
                    >
                        {/* Decorative Gradient Background */}
                        <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            style={{ background: p.gradient }}
                        />

                        <div className="relative z-10">
                            <div
                                className="w-12 h-12 rounded-lg flex items-center justify-center mb-6"
                                style={{ backgroundColor: `hsl(${style.colors.background})` }}
                            >
                                <p.icon className="w-6 h-6" style={{ color: `hsl(${style.colors.foreground})` }} />
                            </div>

                            <h4
                                className="text-xl font-bold mb-3"
                                style={{ fontFamily: style.fonts.heading, color: `hsl(${style.colors.foreground})` }}
                            >
                                {p.title}
                            </h4>

                            <p
                                className="text-sm leading-relaxed"
                                style={{ fontFamily: style.fonts.body, color: `hsl(${style.colors.mutedForeground})` }}
                            >
                                {p.description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
