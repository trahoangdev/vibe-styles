import { type DesignStyle, ColorBlindnessMode } from '@/lib/designStyles';
import { useMemo, useState, useEffect, lazy, Suspense } from 'react';
import { smartInvert } from '@/lib/colorUtils';
import { motion, AnimatePresence } from 'framer-motion';
import { PreviewHeader } from './PreviewHeader';
import { HeroPreview } from './HeroPreview';
import { AuthPreview } from './AuthPreview';
import { StatsPreview } from './StatsPreview';
import { CommunicationPreview } from './CommunicationPreview';
import { DesignSystemSpecs } from './DesignSystemSpecs';
import { DevicePreviewControls } from './DevicePreviewControls';
import { LandingPreview } from './LandingPreview';

// Lazy load heavy components to optimize bundle size
const EcommercePreview = lazy(() => import('./EcommercePreview').then(m => ({ default: m.EcommercePreview })));
const BlogPreview = lazy(() => import('./BlogPreview').then(m => ({ default: m.BlogPreview })));
const TablePreview = lazy(() => import('./TablePreview').then(m => ({ default: m.TablePreview })));
const KanbanPreview = lazy(() => import('./KanbanPreview').then(m => ({ default: m.KanbanPreview })));
const CalendarPreview = lazy(() => import('./CalendarPreview').then(m => ({ default: m.CalendarPreview })));
const DashboardPreview = lazy(() => import('./DashboardPreview').then(m => ({ default: m.DashboardPreview })));
const ChartsPreview = lazy(() => import('./ChartsPreview').then(m => ({ default: m.ChartsPreview })));

type DeviceType = 'mobile' | 'tablet' | 'desktop';

const deviceWidths: Record<DeviceType, string> = {
  mobile: '390px',
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
  colorBlindnessMode?: ColorBlindnessMode;
}

export function StylePreview({
  style,
  isFullScreen = false,
  onToggleFullScreen,
  onToggleEditor,
  showEditorButton = false,
  isEditorOpen = false,
  isDebugMode = false,
  onToggleDebugMode,
  colorBlindnessMode = 'none'
}: StylePreviewProps) {
  const [devicePreview, setDevicePreview] = useState<DeviceType>('desktop');
  const [debugInfo, setDebugInfo] = useState<{ x: number, y: number, label: string } | null>(null);
  const [previewTheme, setPreviewTheme] = useState<'light' | 'dark'>(style.theme);

  // Sync preview theme when style changes
  useEffect(() => {
    setPreviewTheme(style.theme);
  }, [style.id, style.theme]);

  // Debug mode hover listener
  useEffect(() => {
    if (!isDebugMode) {
      setDebugInfo(null);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

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

  const activeColors = useMemo(() => {
    if (previewTheme === style.theme) return style.colors;

    // Smart invert for preview mode mismatch
    const inverted: Record<string, string> = {};
    Object.entries(style.colors).forEach(([key, value]) => {
      inverted[key] = smartInvert(value);
    });

    return inverted as unknown as typeof style.colors;
  }, [style.colors, style.theme, previewTheme]);

  const cssVars = useMemo(() => ({
    '--style-primary': activeColors.primary,
    '--style-primary-foreground': activeColors.primaryForeground,
    '--style-accent': activeColors.accent,
    '--style-accent-foreground': activeColors.accentForeground,
    '--style-surface': activeColors.surface,
    '--style-surface-foreground': activeColors.surfaceForeground,
    '--style-muted': activeColors.muted,
    '--style-muted-foreground': activeColors.mutedForeground,
    '--style-border': activeColors.border,
    '--style-success': activeColors.success,
    '--style-warning': activeColors.warning,
    '--style-error': activeColors.error,
    '--style-radius': style.radius,
    '--style-bg': activeColors.background,
    '--style-fg': activeColors.foreground,
    '--style-heading-weight': style.fonts.headingWeight || '700',
    '--style-body-weight': style.fonts.bodyWeight || '400',
    '--style-shadow-opacity': style.shadowStrength ?? 0.2,

    // Map standard Tailwind variables to the preview style
    '--primary': activeColors.primary,
    '--primary-foreground': activeColors.primaryForeground,
    '--muted': activeColors.muted,
    '--muted-foreground': activeColors.mutedForeground,
    '--accent': activeColors.accent,
    '--accent-foreground': activeColors.accentForeground,
    '--background': activeColors.background,
    '--foreground': activeColors.foreground,
    '--card': activeColors.surface,
    '--card-foreground': activeColors.surfaceForeground,
    '--popover': activeColors.surface,
    '--popover-foreground': activeColors.surfaceForeground,
    '--border': activeColors.border,
    '--input': activeColors.border,
    '--ring': activeColors.primary,
    '--radius': style.radius,
  } as React.CSSProperties), [activeColors, style.radius, style.fonts, style.shadowStrength]);

  const isNeoBrutalism = style.id === 'neo-brutalism';
  const isSwissMinimal = style.id === 'swiss-minimal';


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

  const activeStyle = useMemo(() => ({
    ...style,
    colors: activeColors,
  }), [style, activeColors]);

  return (
    <div
      className="flex-1 overflow-y-auto transition-all duration-500 ease-in-out scroll-smooth"
      style={{
        ...cssVars,
        backgroundColor: `hsl(${activeColors.background})`,
        color: `hsl(${activeColors.foreground})`,
        fontFamily: style.fonts.body,
        filter: colorBlindnessMode !== 'none' ? `url(#${colorBlindnessMode})` : undefined,
      }}
    >
      {/* ... (svg filters) ... */}

      <DevicePreviewControls
        style={activeStyle}
        devicePreview={devicePreview}
        setDevicePreview={setDevicePreview}
      />

      <motion.div
        layout
        className={`mx-auto ${devicePreview !== 'desktop' ? 'border-[10px] border-zinc-800 rounded-[2.5rem] shadow-2xl my-8 overflow-hidden relative z-10' : ''}`}
        style={{
          width: deviceWidths[devicePreview],
          maxWidth: '100%',
          minHeight: devicePreview !== 'desktop' ? 'calc(100vh - 120px)' : 'auto',
          backgroundColor: `hsl(${activeColors.background})`,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <PreviewHeader
          style={activeStyle}
          devicePreview={devicePreview}
          setDevicePreview={setDevicePreview}
          showEditorButton={showEditorButton}
          isEditorOpen={isEditorOpen}
          onToggleEditor={onToggleEditor}
          isFullScreen={isFullScreen}
          onToggleFullScreen={onToggleFullScreen}
          isDebugMode={isDebugMode}
          onToggleDebugMode={onToggleDebugMode}
          previewTheme={previewTheme}
          onTogglePreviewTheme={() => setPreviewTheme(t => t === 'light' ? 'dark' : 'light')}
        />

        <main
          key={style.id}
          className={`p-4 md:p-8 lg:p-12 mx-auto animate-fade-in flex flex-col gap-24 ${devicePreview === 'mobile' ? 'max-w-full' : devicePreview === 'tablet' ? 'max-w-3xl' : 'max-w-7xl'}`}
        >

          <div className={`grid gap-12 items-start ${devicePreview === 'desktop' ? 'grid-cols-1 lg:grid-cols-3' : 'grid-cols-1'}`}>
            <HeroPreview
              style={activeStyle}
              buttonStyle={buttonStyle}
              inputStyle={inputStyle}
              isMobile={devicePreview === 'mobile'}
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
                style={{ backgroundColor: `hsl(${activeColors.primary})` }}
              />
              <div
                className="absolute top-0 right-1/4 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"
                style={{ backgroundColor: `hsl(${activeColors.accent})` }}
              />
              <div
                className="absolute -bottom-8 left-1/3 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"
                style={{ backgroundColor: `hsl(${activeColors.primary})` }}
              />
            </div>

            <AuthPreview
              style={activeStyle}
              cardStyle={cardStyle}
              buttonStyle={buttonStyle}
              inputStyle={inputStyle}
              isMobile={devicePreview === 'mobile'}
            />
          </div>

          <StatsPreview style={activeStyle} cardStyle={cardStyle} isMobile={devicePreview === 'mobile'} />

          <CommunicationPreview
            style={activeStyle}
            cardStyle={cardStyle}
            inputStyle={inputStyle}
            isMobile={devicePreview === 'mobile'}
          />

          <DesignSystemSpecs
            style={activeStyle}
            cardStyle={cardStyle}
            inputStyle={inputStyle}
            isMobile={devicePreview === 'mobile'}
          />

          <LandingPreview
            style={activeStyle}
            cardStyle={cardStyle}
            buttonStyle={buttonStyle}
            isMobile={devicePreview === 'mobile'}
          />

          <Suspense fallback={<div className="w-full h-96 bg-muted/5 animate-pulse rounded-3xl border border-dashed border-border/30 flex items-center justify-center"><p className="text-muted-foreground text-xs font-bold tracking-widest uppercase opacity-50">Loading Preview...</p></div>}>
            <EcommercePreview
              style={activeStyle}
              cardStyle={cardStyle}
              isMobile={devicePreview === 'mobile'}
            />
          </Suspense>

          <Suspense fallback={<div className="w-full h-96 bg-muted/5 animate-pulse rounded-3xl" />}>
            <BlogPreview
              style={activeStyle}
              cardStyle={cardStyle}
              isMobile={devicePreview === 'mobile'}
            />
          </Suspense>

          <Suspense fallback={<div className="w-full h-96 bg-muted/5 animate-pulse rounded-3xl" />}>
            <TablePreview
              style={activeStyle}
              cardStyle={cardStyle}
              isMobile={devicePreview === 'mobile'}
            />
          </Suspense>

          <Suspense fallback={<div className="w-full h-96 bg-muted/5 animate-pulse rounded-3xl" />}>
            <KanbanPreview
              style={activeStyle}
              cardStyle={cardStyle}
              isMobile={devicePreview === 'mobile'}
            />
          </Suspense>

          <Suspense fallback={<div className="w-full h-96 bg-muted/5 animate-pulse rounded-3xl" />}>
            <CalendarPreview
              style={activeStyle}
              cardStyle={cardStyle}
              isMobile={devicePreview === 'mobile'}
            />
          </Suspense>

          <Suspense fallback={<div className="w-full h-[600px] bg-muted/5 animate-pulse rounded-3xl" />}>
            <DashboardPreview
              style={activeStyle}
              cardStyle={cardStyle}
              isMobile={devicePreview === 'mobile'}
            />
          </Suspense>

          <Suspense fallback={<div className="w-full h-96 bg-muted/5 animate-pulse rounded-3xl" />}>
            <ChartsPreview
              style={activeStyle}
              cardStyle={cardStyle}
              isMobile={devicePreview === 'mobile'}
            />
          </Suspense>
        </main>

        <footer className="mt-20 p-12 border-t border-border/30 opacity-40 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.3em]">
            Vibe Styles // {style.name} // Design Protocol Alpha
          </p>
        </footer>
      </motion.div>
    </div>
  );
}
