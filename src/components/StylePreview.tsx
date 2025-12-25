import { type DesignStyle } from '@/lib/designStyles';
import { useMemo, useState, useEffect } from 'react';
import { PreviewHeader } from './preview/PreviewHeader';
import { HeroPreview } from './preview/HeroPreview';
import { AuthPreview } from './preview/AuthPreview';
import { StatsPreview } from './preview/StatsPreview';
import { BentoGridPreview } from './preview/BentoGridPreview';
import { CommunicationPreview } from './preview/CommunicationPreview';
import { DesignSystemSpecs } from './preview/DesignSystemSpecs';
import { DevicePreviewControls } from './preview/DevicePreviewControls';
import { LandingPreview } from './preview/LandingPreview';
import { EcommercePreview } from './preview/EcommercePreview';
import { BlogPreview } from './preview/BlogPreview';
import { TablePreview } from './preview/TablePreview';
import { ChartsPreview } from './preview/ChartsPreview';

type DeviceType = 'mobile' | 'tablet' | 'desktop';

const deviceWidths: Record<DeviceType, string> = {
  mobile: '375px',
  tablet: '768px',
  desktop: '100%',
};

interface StylePreviewProps {
  style: DesignStyle;
  isFullScreen?: boolean;
  onToggleFullScreen?: () => void;
  onToggleEditor?: () => void;
  showEditorButton?: boolean;
  isEditorOpen?: boolean;
  isDebugMode?: boolean;
  onToggleDebugMode?: () => void;
}

export function StylePreview({
  style,
  isFullScreen = false,
  onToggleFullScreen,
  onToggleEditor,
  showEditorButton = false,
  isEditorOpen = false,
  isDebugMode = false,
  onToggleDebugMode
}: StylePreviewProps) {
  const [devicePreview, setDevicePreview] = useState<DeviceType>('desktop');
  const [debugInfo, setDebugInfo] = useState<{ x: number, y: number, label: string } | null>(null);

  // Debug mode hover listener
  useEffect(() => {
    // Only remove helper if we are NOT in debug mode
    if (!isDebugMode) {
      setDebugInfo(null);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Simple heuristic to identify key elements
      let label = target.tagName.toLowerCase();
      if (target.className && typeof target.className === 'string') {
        const classes = target.className.split(' ').filter(c => !c.startsWith('hover:') && !c.startsWith('transition-'));
        if (classes.length > 0) label += `.${classes[0].substring(0, 15)}...`;
      }

      setDebugInfo({ x: e.clientX, y: e.clientY, label });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isDebugMode]);

  const cssVars = useMemo(() => ({
    '--style-primary': style.colors.primary,
    '--style-primary-foreground': style.colors.primaryForeground,
    '--style-accent': style.colors.accent,
    '--style-accent-foreground': style.colors.accentForeground,
    '--style-surface': style.colors.surface,
    '--style-surface-foreground': style.colors.surfaceForeground,
    '--style-muted': style.colors.muted,
    '--style-muted-foreground': style.colors.mutedForeground,
    '--style-border': style.colors.border,
    '--style-success': style.colors.success,
    '--style-warning': style.colors.warning,
    '--style-error': style.colors.error,
    '--style-radius': style.radius,
    '--style-bg': style.colors.background,
    '--style-fg': style.colors.foreground,
    '--style-heading-weight': style.fonts.headingWeight || '700',
    '--style-body-weight': style.fonts.bodyWeight || '400',
    '--style-shadow-opacity': style.shadowStrength ?? 0.2,
  } as React.CSSProperties), [style]);

  const isNeoBrutalism = style.id === 'neo-brutalism';
  const isSwissMinimal = style.id === 'swiss-minimal';
  const isPersonal = style.id === 'personal';

  const cardStyle = useMemo(() => {
    if (isNeoBrutalism) return 'border-2 border-foreground shadow-[4px_4px_0_0_hsl(var(--style-fg))] transition-all duration-300 hover:shadow-[6px_6px_0_0_hsl(var(--style-fg))] hover:-translate-x-0.5 hover:-translate-y-0.5';
    if (isSwissMinimal) return 'border border-[hsl(var(--style-border))] transition-all duration-300 hover:border-[hsl(var(--style-fg)/0.3)] shadow-none';
    return 'border border-[hsl(var(--style-border))] shadow-soft transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-[hsl(var(--style-primary)/0.3)]';
  }, [isNeoBrutalism, isSwissMinimal]);

  const buttonStyle = isNeoBrutalism
    ? 'border-2 border-foreground shadow-[3px_3px_0_0_currentColor] hover:shadow-[1px_1px_0_0_currentColor] hover:translate-x-[2px] hover:translate-y-[2px]'
    : '';

  const inputStyle = isNeoBrutalism
    ? 'border-2 border-foreground'
    : 'border border-[hsl(var(--style-border))]';

  return (
    <div
      className="flex-1 overflow-y-auto transition-all duration-500 ease-in-out scroll-smooth"
      style={{
        ...cssVars,
        backgroundColor: `hsl(${style.colors.background})`,
        color: `hsl(${style.colors.foreground})`,
        fontFamily: style.fonts.body,
      }}
    >
      <DevicePreviewControls
        style={style}
        devicePreview={devicePreview}
        setDevicePreview={setDevicePreview}
      />

      <div
        className={`mx-auto transition-all duration-500 ease-in-out ${devicePreview !== 'desktop' ? 'border-x border-border shadow-2xl relative z-10' : ''}`}
        style={{
          maxWidth: deviceWidths[devicePreview],
          minHeight: devicePreview !== 'desktop' ? 'calc(100vh - 120px)' : 'auto',
          backgroundColor: `hsl(${style.colors.background})`,
        }}
      >
        <PreviewHeader
          style={style}
          devicePreview={devicePreview}
          setDevicePreview={setDevicePreview}
          showEditorButton={showEditorButton}
          isEditorOpen={isEditorOpen}
          onToggleEditor={onToggleEditor}
          isFullScreen={isFullScreen}
          onToggleFullScreen={onToggleFullScreen}
        />

        <main
          key={style.id}
          className={`p-8 lg:p-12 mx-auto animate-fade-in ${devicePreview === 'mobile' ? 'max-w-full' : devicePreview === 'tablet' ? 'max-w-3xl' : 'max-w-7xl'}`}
        >
          {isPersonal && (
            <BentoGridPreview style={style} cardStyle={cardStyle} />
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            <HeroPreview
              style={style}
              buttonStyle={buttonStyle}
              inputStyle={inputStyle}
            />

            <style>{`
        .shadow-sm { box-shadow: 0 1px 2px 0 rgb(0 0 0 / var(--style-shadow-opacity)); }
        .shadow { box-shadow: 0 1px 3px 0 rgb(0 0 0 / var(--style-shadow-opacity)), 0 1px 2px -1px rgb(0 0 0 / var(--style-shadow-opacity)); }
        .shadow-md { box-shadow: 0 4px 6px -1px rgb(0 0 0 / var(--style-shadow-opacity)), 0 2px 4px -2px rgb(0 0 0 / var(--style-shadow-opacity)); }
        .shadow-lg { box-shadow: 0 10px 15px -3px rgb(0 0 0 / var(--style-shadow-opacity)), 0 4px 6px -4px rgb(0 0 0 / var(--style-shadow-opacity)); }
        .shadow-xl { box-shadow: 0 20px 25px -5px rgb(0 0 0 / var(--style-shadow-opacity)), 0 8px 10px -6px rgb(0 0 0 / var(--style-shadow-opacity)); }
        .shadow-2xl { box-shadow: 0 25px 50px -12px rgb(0 0 0 / var(--style-shadow-opacity)); }

        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>

            {/* Dynamic Mesh Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 opacity-30">
              <div
                className="absolute top-0 left-1/4 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"
                style={{ backgroundColor: `hsl(${style.colors.primary})` }}
              />
              <div
                className="absolute top-0 right-1/4 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"
                style={{ backgroundColor: `hsl(${style.colors.accent})` }}
              />
              <div
                className="absolute -bottom-8 left-1/3 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"
                style={{ backgroundColor: `hsl(${style.colors.primary})` }}
              />
            </div>

            <AuthPreview
              style={style}
              cardStyle={cardStyle}
              buttonStyle={buttonStyle}
              inputStyle={inputStyle}
            />
          </div>

          <StatsPreview style={style} cardStyle={cardStyle} />

          <CommunicationPreview
            style={style}
            cardStyle={cardStyle}
            inputStyle={inputStyle}
          />

          <DesignSystemSpecs
            style={style}
            cardStyle={cardStyle}
            inputStyle={inputStyle}
          />

          <LandingPreview
            style={style}
            cardStyle={cardStyle}
            buttonStyle={buttonStyle}
          />

          <EcommercePreview
            style={style}
            cardStyle={cardStyle}
          />

          <BlogPreview
            style={style}
            cardStyle={cardStyle}
          />

          <TablePreview
            style={style}
            cardStyle={cardStyle}
          />

          <ChartsPreview
            style={style}
            cardStyle={cardStyle}
          />
        </main>

        <footer className="mt-20 p-12 border-t border-border/30 opacity-40 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.3em]">
            Vibe Styles // {style.name} // Design Protocol Alpha
          </p>
        </footer>
      </div>
    </div>
  );
}
