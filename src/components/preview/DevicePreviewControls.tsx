import { type DesignStyle } from '@/lib/designStyles';
import { Smartphone, Tablet, Monitor } from 'lucide-react';

interface DevicePreviewControlsProps {
    style: DesignStyle;
    devicePreview: 'mobile' | 'tablet' | 'desktop';
    setDevicePreview: (device: 'mobile' | 'tablet' | 'desktop') => void;
}

export function DevicePreviewControls({ style, devicePreview, setDevicePreview }: DevicePreviewControlsProps) {
    if (devicePreview === 'desktop') return null;

    return (
        <div className="sticky top-0 z-20 bg-muted/80 backdrop-blur-md border-b border-border py-2 px-4 flex items-center justify-center gap-2">
            <div
                className="flex items-center gap-1 p-1 rounded-lg bg-background/50 shadow-inner"
                style={{ borderRadius: style.radius }}
            >
                <button
                    onClick={() => setDevicePreview('mobile')}
                    className={`p-2 rounded-md transition-all duration-300 ${devicePreview === 'mobile' ? 'bg-surface shadow-md scale-105' : 'opacity-40 hover:opacity-100'}`}
                    style={{
                        backgroundColor: devicePreview === 'mobile' ? `hsl(${style.colors.surface})` : 'transparent',
                        borderRadius: style.radius
                    }}
                    title="Mobile Viewport (375px)"
                >
                    <Smartphone className="w-4 h-4" />
                </button>
                <button
                    onClick={() => setDevicePreview('tablet')}
                    className={`p-2 rounded-md transition-all duration-300 ${devicePreview === 'tablet' ? 'bg-surface shadow-md scale-105' : 'opacity-40 hover:opacity-100'}`}
                    style={{
                        backgroundColor: devicePreview === 'tablet' ? `hsl(${style.colors.surface})` : 'transparent',
                        borderRadius: style.radius
                    }}
                    title="Tablet Viewport (768px)"
                >
                    <Tablet className="w-4 h-4" />
                </button>
                <button
                    onClick={() => setDevicePreview('desktop')}
                    className="p-2 rounded-md transition-all opacity-40 hover:opacity-100 hover:scale-110"
                    style={{
                        backgroundColor: 'transparent',
                        borderRadius: style.radius
                    }}
                    title="Return to Desktop (Full Width)"
                >
                    <Monitor className="w-4 h-4" />
                </button>
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-4 hidden sm:inline">
                Simulated Viewport: {devicePreview === 'mobile' ? '390px' : '768px'}
            </span>
        </div>
    );
}
