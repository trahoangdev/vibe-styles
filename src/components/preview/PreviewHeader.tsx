import { type DesignStyle } from '@/lib/designStyles';
import {
    Search, User, Maximize2, Minimize2, Sliders,
    Smartphone, Tablet, Monitor, Bug,
    Sun, Moon
} from 'lucide-react';

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
    isDebugMode,
    onToggleDebugMode,
    previewTheme,
    onTogglePreviewTheme
}: PreviewHeaderProps) {

    return (
        <header className={`sticky top-0 z-10 py-4 flex items-center justify-between border-b border-[hsl(var(--style-border))] bg-[hsl(var(--style-bg))] backdrop-blur-md bg-opacity-80 ${devicePreview === 'mobile' ? 'px-4' : 'px-8'}`}>
            <div>
                <h1 className="text-xl font-semibold tracking-tight" style={{ fontFamily: style.fonts.heading }}>
                    {style.name}
                </h1>
                <p className="text-xs font-medium uppercase tracking-widest opacity-60" style={{ color: `hsl(${style.colors.mutedForeground})` }}>
                    Vibe Styles Explorer
                </p>
            </div>
            <div className="flex items-center gap-2">
                {/* Device Controls - Hidden on Mobile Simulation to avoid clutter */}
                <div
                    className={`flex items-center gap-0.5 p-0.5 rounded-lg mr-2 bg-muted/50 ${devicePreview === 'mobile' ? 'hidden' : ''}`}
                    style={{ borderRadius: style.radius }}
                >
                    <button
                        onClick={() => setDevicePreview('mobile')}
                        className={`p-1.5 rounded-md transition-all ${devicePreview === 'mobile' ? 'bg-surface shadow-sm' : 'opacity-50 hover:opacity-100'}`}
                        style={{
                            backgroundColor: devicePreview === 'mobile' ? `hsl(${style.colors.surface})` : 'transparent',
                            borderRadius: style.radius
                        }}
                        title="Mobile preview (375px)"
                    >
                        <Smartphone className="w-4 h-4" style={{ color: `hsl(${style.colors.foreground})` }} />
                    </button>
                    <button
                        onClick={() => setDevicePreview('tablet')}
                        className={`p-1.5 rounded-md transition-all ${devicePreview === 'tablet' ? 'bg-surface shadow-sm' : 'opacity-50 hover:opacity-100'}`}
                        style={{
                            backgroundColor: devicePreview === 'tablet' ? `hsl(${style.colors.surface})` : 'transparent',
                            borderRadius: style.radius
                        }}
                        title="Tablet preview (768px)"
                    >
                        <Tablet className="w-4 h-4" style={{ color: `hsl(${style.colors.foreground})` }} />
                    </button>
                    <button
                        onClick={() => setDevicePreview('desktop')}
                        className={`p-1.5 rounded-md transition-all ${devicePreview === 'desktop' ? 'bg-surface shadow-sm' : 'opacity-50 hover:opacity-100'}`}
                        style={{
                            backgroundColor: devicePreview === 'desktop' ? `hsl(${style.colors.surface})` : 'transparent',
                            borderRadius: style.radius
                        }}
                        title="Desktop preview (full width)"
                    >
                        <Monitor className="w-4 h-4" style={{ color: `hsl(${style.colors.foreground})` }} />
                    </button>
                </div>

                {showEditorButton && (
                    <button
                        onClick={onToggleEditor}
                        className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${isEditorOpen ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
                        style={{
                            borderRadius: style.radius,
                            backgroundColor: isEditorOpen ? `hsl(${style.colors.primary})` : 'transparent',
                            color: isEditorOpen ? `hsl(${style.colors.primaryForeground})` : `hsl(${style.colors.mutedForeground})`
                        }}
                        title={isEditorOpen ? 'Close editor' : 'Open theme editor'}
                    >
                        <Sliders className="w-5 h-5" />
                    </button>
                )}

                {onToggleFullScreen && devicePreview !== 'mobile' && (
                    <button
                        onClick={onToggleFullScreen}
                        className="p-2 rounded-lg hover:bg-muted transition-all duration-300 hover:scale-110"
                        style={{ borderRadius: style.radius }}
                        title={isFullScreen ? 'Exit full screen' : 'Enter full screen'}
                    >
                        {isFullScreen ? (
                            <Minimize2 className="w-5 h-5" style={{ color: `hsl(${style.colors.mutedForeground})` }} />
                        ) : (
                            <Maximize2 className="w-5 h-5" style={{ color: `hsl(${style.colors.mutedForeground})` }} />
                        )}
                    </button>
                )}

                {onToggleDebugMode && (
                    <button
                        onClick={onToggleDebugMode}
                        className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${isDebugMode ? 'bg-destructive text-destructive-foreground' : 'hover:bg-muted'}`}
                        style={{
                            borderRadius: style.radius,
                            backgroundColor: isDebugMode ? `hsl(${style.colors.error})` : 'transparent',
                            color: isDebugMode ? 'white' : `hsl(${style.colors.mutedForeground})`
                        }}
                        title={isDebugMode ? 'Disable Debug Mode' : 'Enable CSS Debugging'}
                    >
                        <Bug className="w-5 h-5" />
                    </button>
                )}

                {devicePreview !== 'mobile' && (
                    <button
                        className="p-2 rounded-lg hover:bg-muted transition-all duration-300 hover:scale-110"
                        style={{ borderRadius: style.radius }}
                    >
                        <Search className="w-5 h-5" style={{ color: `hsl(${style.colors.mutedForeground})` }} />
                    </button>
                )}


                <button
                    onClick={onTogglePreviewTheme}
                    className="p-2 rounded-lg hover:bg-muted transition-all duration-300 hover:scale-110"
                    style={{ borderRadius: style.radius }}
                    title={`Switch to ${previewTheme === 'dark' ? 'Light' : 'Dark'} Mode`}
                >
                    {previewTheme === 'dark' ? (
                        <Moon className="w-5 h-5" style={{ color: `hsl(${style.colors.mutedForeground})` }} />
                    ) : (
                        <Sun className="w-5 h-5" style={{ color: `hsl(${style.colors.mutedForeground})` }} />
                    )}
                </button>

                <div
                    className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 active:scale-90"
                    style={{ backgroundColor: `hsl(${style.colors.accent})` }}
                >
                    <User className="w-4 h-4" style={{ color: `hsl(${style.colors.accentForeground})` }} />
                </div>
            </div>
        </header >
    );
}
