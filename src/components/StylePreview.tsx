import { type DesignStyle } from '@/lib/designStyles';
import { useMemo, useState } from 'react';
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
}

export function StylePreview({
  style,
  isFullScreen = false,
  onToggleFullScreen,
  onToggleEditor,
  showEditorButton = false,
  isEditorOpen = false
}: StylePreviewProps) {
  const [devicePreview, setDevicePreview] = useState<DeviceType>('desktop');

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

        <main className={`p-8 lg:p-12 mx-auto ${devicePreview === 'mobile' ? 'max-w-full' : devicePreview === 'tablet' ? 'max-w-3xl' : 'max-w-7xl'}`}>
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
      `}</style>

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
