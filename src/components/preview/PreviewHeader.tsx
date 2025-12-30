import { type DesignStyle } from '@/lib/designStyles';
import {
    User, Maximize2, Minimize2, Sliders,
    Smartphone, Tablet, Monitor
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';

interface PreviewHeaderProps {
    style: DesignStyle;
    devicePreview: 'mobile' | 'tablet' | 'desktop';
    setDevicePreview: (device: 'mobile' | 'tablet' | 'desktop') => void;
    showEditorButton?: boolean;
    isEditorOpen?: boolean;
    onToggleEditor?: () => void;
    isFullScreen?: boolean;
    onToggleFullScreen?: () => void;
    isDebugMode?: boolean;
    onToggleDebugMode?: () => void;
    previewTheme: 'light' | 'dark';
    onTogglePreviewTheme: () => void;
}

export function PreviewHeader({
    style,
    devicePreview,
    setDevicePreview,
    showEditorButton,
    isEditorOpen,
    onToggleEditor,
    isFullScreen,
    onToggleFullScreen,
}: PreviewHeaderProps) {

    return (
        <TooltipProvider delayDuration={200}>
            <header className={`sticky top-0 z-10 py-4 flex items-center justify-between border-b border-[hsl(var(--style-border))] bg-[hsl(var(--style-bg))] backdrop-blur-md bg-opacity-80 ${devicePreview === 'mobile' ? 'px-4' : 'px-8'}`}>
                <div>
                    <div className="flex items-center gap-2">
                        <h1 className="text-xl font-semibold tracking-tight" style={{ fontFamily: style.fonts.heading }}>
                            {style.name}
                        </h1>
                        <span 
                            className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full" 
                            style={{ 
                                color: `hsl(${style.colors.mutedForeground})`,
                                backgroundColor: `hsl(${style.colors.muted} / 0.5)`
                            }}
                        >
                            {style.category?.[0] || 'style'}
                        </span>
                    </div>
                    <p className="text-xs font-medium uppercase tracking-widest opacity-60" style={{ color: `hsl(${style.colors.mutedForeground})` }}>
                        Vibe Styles Explorer
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    {/* Device Controls */}
                    <div
                        className={`flex items-center gap-0.5 p-0.5 rounded-lg mr-2 ${devicePreview === 'mobile' ? 'hidden' : ''}`}
                        style={{ 
                            borderRadius: style.radius,
                            backgroundColor: `hsl(${style.colors.muted} / 0.5)`
                        }}
                    >
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button
                                    onClick={() => setDevicePreview('mobile')}
                                    className={`p-1.5 rounded-md transition-all ${devicePreview === 'mobile' ? 'bg-surface shadow-sm' : 'opacity-50 hover:opacity-100'}`}
                                    style={{
                                        backgroundColor: devicePreview === 'mobile' ? `hsl(${style.colors.surface})` : 'transparent',
                                        borderRadius: style.radius
                                    }}
                                >
                                    <Smartphone className="w-4 h-4" style={{ color: `hsl(${style.colors.foreground})` }} />
                                </button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Mobile (390px)</p>
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button
                                    onClick={() => setDevicePreview('tablet')}
                                    className={`p-1.5 rounded-md transition-all ${devicePreview === 'tablet' ? 'bg-surface shadow-sm' : 'opacity-50 hover:opacity-100'}`}
                                    style={{
                                        backgroundColor: devicePreview === 'tablet' ? `hsl(${style.colors.surface})` : 'transparent',
                                        borderRadius: style.radius
                                    }}
                                >
                                    <Tablet className="w-4 h-4" style={{ color: `hsl(${style.colors.foreground})` }} />
                                </button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Tablet (768px)</p>
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button
                                    onClick={() => setDevicePreview('desktop')}
                                    className={`p-1.5 rounded-md transition-all ${devicePreview === 'desktop' ? 'bg-surface shadow-sm' : 'opacity-50 hover:opacity-100'}`}
                                    style={{
                                        backgroundColor: devicePreview === 'desktop' ? `hsl(${style.colors.surface})` : 'transparent',
                                        borderRadius: style.radius
                                    }}
                                >
                                    <Monitor className="w-4 h-4" style={{ color: `hsl(${style.colors.foreground})` }} />
                                </button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Desktop (Full)</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>

                    {showEditorButton && (
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button
                                    onClick={onToggleEditor}
                                    className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 active:scale-95 ${isEditorOpen ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
                                    style={{
                                        borderRadius: style.radius,
                                        backgroundColor: isEditorOpen ? `hsl(${style.colors.primary})` : 'transparent',
                                        color: isEditorOpen ? `hsl(${style.colors.primaryForeground})` : `hsl(${style.colors.mutedForeground})`
                                    }}
                                >
                                    <Sliders className="w-5 h-5" />
                                </button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{isEditorOpen ? 'Close Editor (E)' : 'Open Editor (E)'}</p>
                            </TooltipContent>
                        </Tooltip>
                    )}

                    {onToggleFullScreen && devicePreview !== 'mobile' && (
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button
                                    onClick={onToggleFullScreen}
                                    className="p-2 rounded-lg hover:bg-muted transition-all duration-300 hover:scale-110 active:scale-95"
                                    style={{ borderRadius: style.radius }}
                                >
                                    {isFullScreen ? (
                                        <Minimize2 className="w-5 h-5" style={{ color: `hsl(${style.colors.mutedForeground})` }} />
                                    ) : (
                                        <Maximize2 className="w-5 h-5" style={{ color: `hsl(${style.colors.mutedForeground})` }} />
                                    )}
                                </button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{isFullScreen ? 'Exit Fullscreen (F)' : 'Fullscreen (F)'}</p>
                            </TooltipContent>
                        </Tooltip>
                    )}

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div
                                className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 active:scale-90"
                                style={{ backgroundColor: `hsl(${style.colors.accent})` }}
                            >
                                <User className="w-4 h-4" style={{ color: `hsl(${style.colors.accentForeground})` }} />
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Profile</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
            </header>
        </TooltipProvider>
    );
}
