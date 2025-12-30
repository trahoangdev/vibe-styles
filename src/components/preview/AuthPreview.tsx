import { type DesignStyle } from '@/lib/designStyles';
import { useState } from 'react';
import { Lock, Mail, Eye, EyeOff } from 'lucide-react';

interface AuthPreviewProps {
    style: DesignStyle;
    cardStyle: string;
    buttonStyle: string;
    inputStyle: string;
    isMobile?: boolean; // Added isMobile prop
}

export function AuthPreview({ style, cardStyle, buttonStyle, inputStyle, isMobile = false }: AuthPreviewProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div
            className={`p-8 ${cardStyle} animate-fade-in relative overflow-hidden group`}
            style={{
                backgroundColor: `hsl(${style.colors.surface})`,
                borderRadius: style.radius,
            }}
        >
            {/* Decorative background element */}
            <div
                className="absolute -right-10 -top-10 w-32 h-32 blur-3xl opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none"
                style={{ backgroundColor: `hsl(${style.colors.primary})` }}
            />

            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-xl font-black tracking-tighter" style={{ fontFamily: style.fonts.heading, color: `hsl(${style.colors.foreground})` }}>
                        AUTHENTICATION
                    </h3>
                    <p className="text-[10px] uppercase tracking-widest font-bold" style={{ color: `hsl(${style.colors.mutedForeground})` }}>Secure Access Portal</p>
                </div>
                <Lock className="w-5 h-5" style={{ color: `hsl(${style.colors.mutedForeground})` }} />
            </div>

            <div className="space-y-5">
                <div>
                    <label className="text-[10px] font-black uppercase tracking-widest block mb-1.5" style={{ color: `hsl(${style.colors.mutedForeground})` }}>Identity</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: `hsl(${style.colors.mutedForeground})` }} />
                        <input
                            type="email"
                            placeholder="operator@vibestyles.io"
                            className={`w-full pl-10 pr-4 py-3 text-sm ${inputStyle} transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 bg-muted/20`}
                            style={{
                                borderRadius: style.radius,
                                color: `hsl(${style.colors.foreground})`,
                            }}
                        />
                    </div>
                </div>

                <div>
                    <label className="text-[10px] font-black uppercase tracking-widest block mb-1.5" style={{ color: `hsl(${style.colors.mutedForeground})` }}>Security Key</label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: `hsl(${style.colors.mutedForeground})` }} />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="••••••••••••"
                            className={`w-full pl-10 pr-10 py-3 text-sm ${inputStyle} transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 bg-muted/20`}
                            style={{
                                borderRadius: style.radius,
                                color: `hsl(${style.colors.foreground})`,
                            }}
                        />
                        <button
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 opacity-40 hover:opacity-100 transition-opacity"
                        >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>
                </div>

                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest">
                    <label className="flex items-center gap-2 cursor-pointer group">
                        <input
                            type="checkbox"
                            defaultChecked
                            className="w-3 h-3 rounded-none"
                            style={{ accentColor: `hsl(${style.colors.primary})` }}
                        />
                        <span className="transition-opacity" style={{ color: `hsl(${style.colors.mutedForeground})` }}>Stay active</span>
                    </label>
                    <a
                        href="#"
                        className="opacity-60 hover:opacity-100 hover:text-primary transition-all underline decoration-2 underline-offset-4"
                        style={{ color: `hsl(${style.colors.primary})` }}
                    >
                        Reset Code
                    </a>
                </div>

                <button
                    className={`w-full py-3.5 text-xs font-black uppercase tracking-widest transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg ${buttonStyle}`}
                    style={{
                        backgroundColor: `hsl(${style.colors.primary})`,
                        color: `hsl(${style.colors.primaryForeground})`,
                        borderRadius: style.radius,
                    }}
                >
                    Initialize Session
                </button>

                <p className="text-[10px] text-center font-medium" style={{ color: `hsl(${style.colors.mutedForeground})` }}>
                    Authorised Personnel Only. IP logged: 192.168.1.1
                </p>
            </div>
        </div>
    );
}
