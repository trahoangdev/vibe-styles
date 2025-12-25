import { type DesignStyle } from '@/lib/designStyles';
import { useMemo, useState } from 'react';
import { 
  Search, User, Bell, Settings, Share2, TrendingUp, Users, Activity, Lock, Mail, 
  Eye, EyeOff, MoreVertical, MessageCircle, Send, Info, Check, AlertTriangle, 
  Github, ArrowDownLeft, ArrowUpRight, Maximize2, Minimize2, Sliders, Star, Heart,
  Calendar, Clock, ChevronRight, ChevronDown, Plus, Minus, Home, Folder, File,
  Image, Play, Pause, Volume2, Download, Upload, Trash2, Edit, Copy, ExternalLink,
  Zap, Shield, Award, Target, BarChart3, PieChart, LineChart, Sparkles, Rocket,
  Crown, Diamond, Gift, Bookmark, Filter, Grid, List, LayoutGrid, Moon, Sun,
  Facebook, Instagram, Linkedin, Twitter, Coffee, Globe, Code, MapPin,
  Smartphone, Tablet, Monitor
} from 'lucide-react';

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

export function StylePreview({ style, isFullScreen = false, onToggleFullScreen, onToggleEditor, showEditorButton = false, isEditorOpen = false }: StylePreviewProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [toggleOn, setToggleOn] = useState(true);
  const [selectedOption, setSelectedOption] = useState('a');
  const [activeTab, setActiveTab] = useState('overview');
  const [sliderValue, setSliderValue] = useState(65);
  const [rating, setRating] = useState(4);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [expandedAccordion, setExpandedAccordion] = useState<string | null>('item-1');
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
  } as React.CSSProperties), [style]);

  const isNeoBrutalism = style.id === 'neo-brutalism';
  const isSwissMinimal = style.id === 'swiss-minimal';
  const isPersonal = style.id === 'personal';

  const cardStyle = isNeoBrutalism 
    ? 'border-2 border-foreground shadow-[4px_4px_0_0_hsl(var(--style-fg))] transition-all duration-300 hover:shadow-[6px_6px_0_0_hsl(var(--style-fg))] hover:-translate-x-0.5 hover:-translate-y-0.5' 
    : isSwissMinimal 
      ? 'border border-[hsl(var(--style-border))] transition-all duration-300 hover:border-[hsl(var(--style-fg)/0.3)]'
      : 'border border-[hsl(var(--style-border))] shadow-soft transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-[hsl(var(--style-primary)/0.3)]';

  const cardHoverAccent = 'transition-all duration-300 hover:scale-[1.02] hover:shadow-xl';

  const buttonStyle = isNeoBrutalism
    ? 'border-2 border-foreground shadow-[3px_3px_0_0_currentColor] hover:shadow-[1px_1px_0_0_currentColor] hover:translate-x-[2px] hover:translate-y-[2px]'
    : '';

  const inputStyle = isNeoBrutalism
    ? 'border-2 border-foreground'
    : 'border border-[hsl(var(--style-border))]';

  return (
    <div 
      className="flex-1 overflow-y-auto transition-style"
      style={{
        ...cssVars,
        backgroundColor: `hsl(${style.colors.background})`,
        color: `hsl(${style.colors.foreground})`,
        fontFamily: style.fonts.body,
      }}
    >
      {/* Device Preview Controls */}
      {devicePreview !== 'desktop' && (
        <div className="sticky top-0 z-20 bg-muted/80 backdrop-blur-sm border-b border-border py-2 px-4 flex items-center justify-center gap-2">
          <div 
            className="flex items-center gap-1 p-1 rounded-lg"
            style={{ backgroundColor: `hsl(${style.colors.muted})`, borderRadius: style.radius }}
          >
            <button
              onClick={() => setDevicePreview('mobile')}
              className={`p-2 rounded-md transition-all ${devicePreview === 'mobile' ? 'shadow-sm' : 'opacity-60 hover:opacity-100'}`}
              style={{ 
                backgroundColor: devicePreview === 'mobile' ? `hsl(${style.colors.surface})` : 'transparent',
                borderRadius: style.radius 
              }}
              title="Mobile (375px)"
            >
              <Smartphone className="w-4 h-4" style={{ color: `hsl(${style.colors.foreground})` }} />
            </button>
            <button
              onClick={() => setDevicePreview('tablet')}
              className={`p-2 rounded-md transition-all ${devicePreview === 'tablet' ? 'shadow-sm' : 'opacity-60 hover:opacity-100'}`}
              style={{ 
                backgroundColor: devicePreview === 'tablet' ? `hsl(${style.colors.surface})` : 'transparent',
                borderRadius: style.radius 
              }}
              title="Tablet (768px)"
            >
              <Tablet className="w-4 h-4" style={{ color: `hsl(${style.colors.foreground})` }} />
            </button>
            <button
              onClick={() => setDevicePreview('desktop')}
              className="p-2 rounded-md transition-all opacity-60 hover:opacity-100"
              style={{ 
                backgroundColor: 'transparent',
                borderRadius: style.radius 
              }}
              title="Desktop (100%)"
            >
              <Monitor className="w-4 h-4" style={{ color: `hsl(${style.colors.foreground})` }} />
            </button>
          </div>
          <span className="text-xs text-muted-foreground ml-2">
            {devicePreview === 'mobile' ? '375px' : devicePreview === 'tablet' ? '768px' : 'Full width'}
          </span>
        </div>
      )}

      {/* Preview Container */}
      <div 
        className={`mx-auto transition-all duration-300 ${devicePreview !== 'desktop' ? 'border-x border-border shadow-lg' : ''}`}
        style={{ 
          maxWidth: deviceWidths[devicePreview],
          minHeight: devicePreview !== 'desktop' ? 'calc(100vh - 120px)' : 'auto',
        }}
      >
        {/* Header */}
        <header className="sticky top-0 z-10 px-8 py-4 flex items-center justify-between border-b border-[hsl(var(--style-border))] bg-[hsl(var(--style-bg))]">
          <div>
            <h1 className="text-xl font-semibold" style={{ fontFamily: style.fonts.heading }}>
              {style.name} Preview
            </h1>
            <p className="text-sm" style={{ color: `hsl(${style.colors.mutedForeground})` }}>
              Design System Explorer
            </p>
          </div>
          <div className="flex items-center gap-2">
            {/* Device Preview Toggle */}
            <div 
              className="flex items-center gap-0.5 p-0.5 rounded-lg mr-2"
              style={{ backgroundColor: `hsl(${style.colors.muted})`, borderRadius: style.radius }}
            >
              <button
                onClick={() => setDevicePreview('mobile')}
                className={`p-1.5 rounded-md transition-all ${devicePreview === 'mobile' ? 'shadow-sm' : 'opacity-50 hover:opacity-100'}`}
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
                className={`p-1.5 rounded-md transition-all ${devicePreview === 'tablet' ? 'shadow-sm' : 'opacity-50 hover:opacity-100'}`}
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
                className={`p-1.5 rounded-md transition-all ${devicePreview === 'desktop' ? 'shadow-sm' : 'opacity-50 hover:opacity-100'}`}
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
                className={`p-2 rounded-lg transition-colors ${isEditorOpen ? 'bg-[hsl(var(--style-primary))]' : 'hover:bg-[hsl(var(--style-muted))]'}`}
                style={{ borderRadius: style.radius }}
                title={isEditorOpen ? 'Close editor' : 'Open theme editor'}
              >
                <Sliders className="w-5 h-5" style={{ color: isEditorOpen ? `hsl(${style.colors.primaryForeground})` : `hsl(${style.colors.mutedForeground})` }} />
              </button>
            )}
            {onToggleFullScreen && (
              <button 
                onClick={onToggleFullScreen}
                className="p-2 rounded-lg hover:bg-[hsl(var(--style-muted))] transition-colors"
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
            <button 
              className="p-2 rounded-lg hover:bg-[hsl(var(--style-muted))] transition-colors"
              style={{ borderRadius: style.radius }}
            >
              <Search className="w-5 h-5" style={{ color: `hsl(${style.colors.mutedForeground})` }} />
            </button>
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `hsl(${style.colors.accent})` }}
            >
              <User className="w-4 h-4" style={{ color: `hsl(${style.colors.accentForeground})` }} />
            </div>
          </div>
        </header>

        {/* Content */}
        <main className={`p-8 mx-auto ${devicePreview === 'mobile' ? 'max-w-full' : devicePreview === 'tablet' ? 'max-w-3xl' : 'max-w-6xl'}`}>
        {/* Bento Grid for Personal Style */}
        {isPersonal && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <LayoutGrid className="w-5 h-5" style={{ color: `hsl(${style.colors.accent})` }} />
              <h3 className="text-lg font-semibold" style={{ fontFamily: style.fonts.heading }}>
                Bento Grid Portfolio
              </h3>
            </div>
            
            <div className="grid grid-cols-4 md:grid-cols-6 gap-4 auto-rows-[120px]">
              {/* Profile Card - Large */}
              <div 
                className={`col-span-2 row-span-3 p-6 ${cardStyle} flex flex-col`}
                style={{ backgroundColor: `hsl(${style.colors.surface})`, borderRadius: style.radius }}
              >
                <h2 className="text-3xl font-bold leading-tight mb-2" style={{ fontFamily: style.fonts.heading }}>
                  JOHN<br/>DOE<br/>DEV
                </h2>
                <p className="text-sm mb-2" style={{ color: `hsl(${style.colors.mutedForeground})` }}>
                  Software Engineer | Creator
                </p>
                <p className="text-xs mb-4" style={{ color: `hsl(${style.colors.mutedForeground})` }}>
                  Building digital experiences that matter.
                </p>
                <div 
                  className="mt-auto w-full h-32 rounded-lg overflow-hidden flex items-center justify-center"
                  style={{ 
                    backgroundColor: `hsl(${style.colors.primary})`,
                    borderRadius: style.radius 
                  }}
                >
                  <User className="w-16 h-16" style={{ color: `hsl(${style.colors.primaryForeground})` }} />
                </div>
              </div>

              {/* Social Links */}
              <div 
                className={`col-span-2 row-span-1 p-4 ${cardStyle} flex items-center justify-around`}
                style={{ backgroundColor: `hsl(${style.colors.surface})`, borderRadius: style.radius }}
              >
                <Facebook className="w-6 h-6 transition-all duration-200 hover:scale-125 cursor-pointer" style={{ color: `hsl(${style.colors.foreground})` }} />
                <Instagram className="w-6 h-6 transition-all duration-200 hover:scale-125 cursor-pointer" style={{ color: `hsl(${style.colors.foreground})` }} />
                <Github className="w-6 h-6 transition-all duration-200 hover:scale-125 cursor-pointer" style={{ color: `hsl(${style.colors.foreground})` }} />
                <Linkedin className="w-6 h-6 transition-all duration-200 hover:scale-125 cursor-pointer" style={{ color: `hsl(${style.colors.foreground})` }} />
              </div>

              {/* Title Badge */}
              <div 
                className="col-span-2 row-span-1 p-4 flex items-center justify-center transition-all duration-300 hover:scale-[1.02] hover:shadow-lg cursor-pointer"
                style={{ 
                  backgroundColor: `hsl(${style.colors.primary})`,
                  color: `hsl(${style.colors.primaryForeground})`,
                  borderRadius: style.radius 
                }}
              >
                <div className="text-center">
                  <p className="text-xs uppercase tracking-wider opacity-80">Architect of Flow</p>
                  <p className="font-bold">DEVELOPER</p>
                </div>
              </div>

              {/* Welcome Message */}
              <div 
                className={`col-span-2 row-span-2 p-5 ${cardStyle}`}
                style={{ backgroundColor: `hsl(${style.colors.surface})`, borderRadius: style.radius }}
              >
                <p className="font-semibold mb-2">
                  Hello, World! <span role="img" aria-label="wave">👋</span>
                </p>
                <p className="text-sm leading-relaxed" style={{ color: `hsl(${style.colors.mutedForeground})` }}>
                  Welcome to my digital space! I build web apps, explore AI, and share what I learn. 
                  Let's create something amazing together.
                </p>
                <div className="flex gap-2 mt-3">
                  <span 
                    className="px-2 py-1 text-xs"
                    style={{ 
                      backgroundColor: `hsl(${style.colors.muted})`,
                      borderRadius: style.radius,
                      border: `1px solid hsl(${style.colors.border})`
                    }}
                  >
                    AI Engineer
                  </span>
                  <span 
                    className="px-2 py-1 text-xs"
                    style={{ 
                      backgroundColor: `hsl(${style.colors.muted})`,
                      borderRadius: style.radius,
                      border: `1px solid hsl(${style.colors.border})`
                    }}
                  >
                    Web Dev
                  </span>
                </div>
              </div>

              {/* Clock */}
              <div 
                className={`col-span-2 row-span-2 p-5 ${cardStyle} flex flex-col items-center justify-center`}
                style={{ backgroundColor: `hsl(${style.colors.surface})`, borderRadius: style.radius }}
              >
                <p className="text-xs uppercase tracking-widest mb-1" style={{ color: `hsl(${style.colors.mutedForeground})` }}>
                  - - - - -
                </p>
                <p className="font-bold">MIND</p>
                <p className="text-xs mb-2">CHANNEL</p>
                <p className="text-2xl font-mono font-bold" style={{ fontFamily: style.fonts.mono }}>
                  12:34:56
                </p>
                <p className="text-xs" style={{ color: `hsl(${style.colors.mutedForeground})` }}>UTC+7 LIVE</p>
              </div>

              {/* Connect & Matrix Buttons */}
              <div 
                className={`col-span-2 row-span-1 p-3 ${cardStyle} flex items-center gap-3`}
                style={{ backgroundColor: `hsl(${style.colors.surface})`, borderRadius: style.radius }}
              >
                <button 
                  className="flex-1 py-2 text-sm font-medium transition-all duration-200 hover:scale-105 hover:shadow-md"
                  style={{ 
                    border: `1px solid hsl(${style.colors.border})`,
                    borderRadius: style.radius 
                  }}
                >
                  Connect
                </button>
                <button 
                  className="flex-1 py-2 text-sm font-medium transition-all duration-200 hover:scale-105 hover:shadow-md"
                  style={{ 
                    border: `1px solid hsl(${style.colors.border})`,
                    borderRadius: style.radius 
                  }}
                >
                  My Matrix
                </button>
              </div>

              {/* Coffee Card */}
              <div 
                className={`col-span-2 row-span-1 p-4 ${cardStyle} flex items-center gap-3`}
                style={{ backgroundColor: `hsl(${style.colors.surface})`, borderRadius: style.radius }}
              >
                <div className="flex-1">
                  <p className="font-semibold text-sm">
                    Fuel My Code <Coffee className="inline w-4 h-4 ml-1" />
                  </p>
                  <p className="text-xs" style={{ color: `hsl(${style.colors.mutedForeground})` }}>
                    Support the journey!
                  </p>
                </div>
                <button 
                  className="px-3 py-1.5 text-xs font-medium transition-all duration-200 hover:scale-110 hover:shadow-lg"
                  style={{ 
                    backgroundColor: `hsl(${style.colors.accent})`,
                    color: `hsl(${style.colors.accentForeground})`,
                    borderRadius: style.radius 
                  }}
                >
                  Buy me a coffee
                </button>
              </div>

              {/* Daily Quote */}
              <div 
                className={`col-span-2 row-span-2 p-5 ${cardStyle}`}
                style={{ backgroundColor: `hsl(${style.colors.surface})`, borderRadius: style.radius }}
              >
                <p className="text-sm font-semibold mb-2">
                  Daily Fuel <Sparkles className="inline w-4 h-4" style={{ color: `hsl(${style.colors.accent})` }} />
                </p>
                <p className="text-sm italic leading-relaxed" style={{ color: `hsl(${style.colors.mutedForeground})` }}>
                  "Life is the most complex project you'll ever maintain. No documentation, changing requirements, 
                  and plenty of unexpected bugs. But that's where the fun is!"
                </p>
                <p className="text-xs mt-3 italic" style={{ color: `hsl(${style.colors.accent})` }}>
                  Code with heart. Ship with pride.
                </p>
              </div>

              {/* Website Info */}
              <div 
                className={`col-span-2 row-span-1 p-4 ${cardStyle}`}
                style={{ backgroundColor: `hsl(${style.colors.surface})`, borderRadius: style.radius }}
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-semibold uppercase tracking-wide">Website Info</p>
                  <Globe className="w-4 h-4" style={{ color: `hsl(${style.colors.mutedForeground})` }} />
                </div>
                <div className="flex justify-between text-xs" style={{ color: `hsl(${style.colors.mutedForeground})` }}>
                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3" /> 
                    <span>1,234 Visitors</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Code className="w-3 h-3" /> 
                    <span>Built with React</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Hero Section */}
          <div className="lg:col-span-2">
            {/* Badge */}
            <div 
              className="inline-block px-3 py-1 text-xs font-medium mb-6"
              style={{ 
                backgroundColor: `hsl(${style.colors.muted})`,
                color: `hsl(${style.colors.mutedForeground})`,
                borderRadius: style.radius,
              }}
            >
              DESIGN LANGUAGE
            </div>

            {/* Heading */}
            <h2 
              className="text-5xl lg:text-6xl font-bold leading-tight mb-6"
              style={{ fontFamily: style.fonts.heading }}
            >
              Build with<br />
              <span style={{ color: `hsl(${style.colors.mutedForeground})` }}>Style & Precision.</span>
            </h2>

            {/* Description */}
            <p 
              className="text-lg mb-8 max-w-xl leading-relaxed"
              style={{ color: `hsl(${style.colors.mutedForeground})` }}
            >
              {style.description} This is a preview of how typography, colors, and shapes interact in the {style.name} design system.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3">
              <button 
                className={`px-5 py-2.5 font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg ${buttonStyle}`}
                style={{ 
                  backgroundColor: `hsl(${style.colors.primary})`,
                  color: `hsl(${style.colors.primaryForeground})`,
                  borderRadius: style.radius,
                }}
              >
                Get Started
              </button>
              <button 
                className={`px-5 py-2.5 font-medium transition-all duration-200 hover:scale-105 hover:shadow-md ${inputStyle}`}
                style={{ 
                  backgroundColor: 'transparent',
                  color: `hsl(${style.colors.foreground})`,
                  borderRadius: style.radius,
                }}
              >
                Documentation
              </button>
            </div>
          </div>

          {/* Auth Card */}
          <div 
            className={`p-6 ${cardStyle} animate-fade-in`}
            style={{ 
              backgroundColor: `hsl(${style.colors.surface})`,
              borderRadius: style.radius,
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold" style={{ fontFamily: style.fonts.heading }}>
                Authentication
              </h3>
              <Lock className="w-5 h-5" style={{ color: `hsl(${style.colors.mutedForeground})` }} />
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium block mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: `hsl(${style.colors.mutedForeground})` }} />
                  <input 
                    type="email"
                    placeholder="you@example.com"
                    className={`w-full pl-10 pr-4 py-2.5 ${inputStyle} transition-colors focus:outline-none`}
                    style={{ 
                      backgroundColor: `hsl(${style.colors.surface})`,
                      borderRadius: style.radius,
                      color: `hsl(${style.colors.foreground})`,
                    }}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium block mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: `hsl(${style.colors.mutedForeground})` }} />
                  <input 
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className={`w-full pl-10 pr-10 py-2.5 ${inputStyle} transition-colors focus:outline-none`}
                    style={{ 
                      backgroundColor: `hsl(${style.colors.surface})`,
                      borderRadius: style.radius,
                      color: `hsl(${style.colors.foreground})`,
                    }}
                  />
                  <button 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" style={{ color: `hsl(${style.colors.mutedForeground})` }} />
                    ) : (
                      <Eye className="w-4 h-4" style={{ color: `hsl(${style.colors.mutedForeground})` }} />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2">
                  <input 
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4"
                    style={{ accentColor: `hsl(${style.colors.primary})` }}
                  />
                  <span>Remember me</span>
                </label>
                <a 
                  href="#" 
                  className="hover:underline"
                  style={{ color: `hsl(${style.colors.primary})` }}
                >
                  Forgot password?
                </a>
              </div>

              <button 
                className={`w-full py-2.5 font-medium transition-all ${buttonStyle}`}
                style={{ 
                  backgroundColor: `hsl(${style.colors.primary})`,
                  color: `hsl(${style.colors.primaryForeground})`,
                  borderRadius: style.radius,
                }}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {[
            { label: 'Total Revenue', value: '$45,231.89', change: '+20.1%', icon: TrendingUp },
            { label: 'Active Users', value: '2,405', icon: Users },
            { label: 'Sessions', value: '12.5k', icon: Activity },
          ].map((stat, i) => (
            <div 
              key={i}
              className={`p-5 ${cardStyle} animate-fade-in`}
              style={{ 
                backgroundColor: `hsl(${style.colors.surface})`,
                borderRadius: style.radius,
                animationDelay: `${i * 100}ms`,
              }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm" style={{ color: `hsl(${style.colors.mutedForeground})` }}>
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold mt-1" style={{ fontFamily: style.fonts.heading }}>
                    {stat.value}
                  </p>
                  {stat.change && (
                    <p className="text-sm mt-1" style={{ color: `hsl(${style.colors.success})` }}>
                      {stat.change} <span style={{ color: `hsl(${style.colors.mutedForeground})` }}>vs last month</span>
                    </p>
                  )}
                </div>
                <stat.icon className="w-5 h-5" style={{ color: `hsl(${style.colors.accent})` }} />
              </div>
              {i === 2 && (
                <div className="mt-4 h-2 rounded-full overflow-hidden" style={{ backgroundColor: `hsl(${style.colors.muted})` }}>
                  <div 
                    className="h-full rounded-full"
                    style={{ 
                      width: '75%',
                      backgroundColor: `hsl(${style.colors.primary})`,
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Typography, Palette, Interactive */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {/* Typography */}
          <div 
            className={`p-5 ${cardStyle}`}
            style={{ 
              backgroundColor: `hsl(${style.colors.surface})`,
              borderRadius: style.radius,
            }}
          >
            <h4 className="text-sm font-medium mb-4" style={{ color: `hsl(${style.colors.mutedForeground})` }}>
              TYPOGRAPHY
            </h4>
            <div className="space-y-4">
              <div>
                <h1 className="text-3xl font-bold" style={{ fontFamily: style.fonts.heading }}>
                  Heading 1
                </h1>
                <p className="text-xs mt-1" style={{ color: `hsl(${style.colors.mutedForeground})`, fontFamily: style.fonts.mono }}>
                  font-heading font-bold tracking-tight
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-semibold" style={{ fontFamily: style.fonts.heading }}>
                  Heading 2
                </h2>
                <p className="text-xs mt-1" style={{ color: `hsl(${style.colors.mutedForeground})`, fontFamily: style.fonts.mono }}>
                  Semi-bold / Bold
                </p>
              </div>
              <div>
                <h3 className="text-xl font-medium" style={{ fontFamily: style.fonts.heading }}>
                  Heading 3
                </h3>
                <p className="text-xs mt-1" style={{ color: `hsl(${style.colors.mutedForeground})`, fontFamily: style.fonts.mono }}>
                  Tracking: Tight
                </p>
              </div>
            </div>
          </div>

          {/* Palette */}
          <div 
            className={`p-5 ${cardStyle}`}
            style={{ 
              backgroundColor: `hsl(${style.colors.surface})`,
              borderRadius: style.radius,
            }}
          >
            <h4 className="text-sm font-medium mb-4" style={{ color: `hsl(${style.colors.mutedForeground})` }}>
              PALETTE
            </h4>
            <div className="space-y-3">
              {[
                { name: 'Primary', color: style.colors.primary },
                { name: 'Accent', color: style.colors.accent },
                { name: 'Muted', color: style.colors.muted },
              ].map((item) => (
                <div key={item.name} className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-lg flex-shrink-0"
                    style={{ 
                      backgroundColor: `hsl(${item.color})`,
                      borderRadius: style.radius,
                    }}
                  />
                  <div>
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-xs" style={{ color: `hsl(${style.colors.mutedForeground})`, fontFamily: style.fonts.mono }}>
                      {item.color}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive */}
          <div 
            className={`p-5 ${cardStyle}`}
            style={{ 
              backgroundColor: `hsl(${style.colors.surface})`,
              borderRadius: style.radius,
            }}
          >
            <h4 className="text-sm font-medium mb-4" style={{ color: `hsl(${style.colors.mutedForeground})` }}>
              INTERACTIVE
            </h4>
            <div className="space-y-4">
              {/* Toggle */}
              <div className="flex items-center justify-between">
                <span className="text-sm">Toggle Switch</span>
                <button
                  onClick={() => setToggleOn(!toggleOn)}
                  className={`relative w-11 h-6 rounded-full transition-colors ${isNeoBrutalism ? 'border-2 border-foreground' : ''}`}
                  style={{ 
                    backgroundColor: toggleOn ? `hsl(${style.colors.primary})` : `hsl(${style.colors.muted})`,
                  }}
                >
                  <span 
                    className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white shadow transition-transform ${toggleOn ? 'left-[calc(100%-22px)]' : 'left-0.5'}`}
                    style={{ 
                      boxShadow: isNeoBrutalism ? 'none' : '0 1px 3px rgba(0,0,0,0.2)',
                    }}
                  />
                </button>
              </div>

              {/* Radio */}
              <div className="flex items-center gap-4">
                {['a', 'b'].map((opt) => (
                  <label key={opt} className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="option"
                      checked={selectedOption === opt}
                      onChange={() => setSelectedOption(opt)}
                      style={{ accentColor: `hsl(${style.colors.primary})` }}
                    />
                    <span>Option {opt.toUpperCase()}</span>
                  </label>
                ))}
              </div>

              {/* Icons */}
              <div className="flex items-center gap-3 pt-2">
                {[Bell, Settings, Share2].map((Icon, i) => (
                  <button
                    key={i}
                    className={`p-2 transition-colors ${inputStyle}`}
                    style={{ 
                      backgroundColor: `hsl(${style.colors.muted})`,
                      borderRadius: style.radius,
                    }}
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                ))}
              </div>

              {/* Progress */}
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span style={{ color: `hsl(${style.colors.mutedForeground})` }}>Downloading</span>
                  <span>75%</span>
                </div>
                <div 
                  className="h-2 rounded-full overflow-hidden"
                  style={{ backgroundColor: `hsl(${style.colors.muted})` }}
                >
                  <div 
                    className="h-full rounded-full transition-all"
                    style={{ 
                      width: '75%',
                      backgroundColor: `hsl(${style.colors.primary})`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chat, Profile Card, System Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          {/* Chat UI */}
          <div 
            className={`p-5 ${cardStyle}`}
            style={{ 
              backgroundColor: `hsl(${style.colors.surface})`,
              borderRadius: style.radius,
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `hsl(${style.colors.muted})` }}
              >
                <User className="w-5 h-5" style={{ color: `hsl(${style.colors.mutedForeground})` }} />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">Support Agent</p>
                <p className="text-xs" style={{ color: `hsl(${style.colors.success})` }}>● Online</p>
              </div>
              <button className="p-1">
                <MoreVertical className="w-4 h-4" style={{ color: `hsl(${style.colors.mutedForeground})` }} />
              </button>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="flex gap-2">
                <div className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: `hsl(${style.colors.muted})` }}>
                  <MessageCircle className="w-3 h-3" style={{ color: `hsl(${style.colors.mutedForeground})` }} />
                </div>
                <div 
                  className="px-3 py-2 text-sm max-w-[80%]"
                  style={{ 
                    backgroundColor: `hsl(${style.colors.muted})`,
                    borderRadius: style.radius,
                  }}
                >
                  Hello! Does this design style match your vision?
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <div 
                  className="px-3 py-2 text-sm max-w-[80%]"
                  style={{ 
                    backgroundColor: `hsl(${style.colors.primary})`,
                    color: `hsl(${style.colors.primaryForeground})`,
                    borderRadius: style.radius,
                  }}
                >
                  Yes, the contrast and spacing look perfect.
                </div>
                <div className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: `hsl(${style.colors.primary})` }}>
                  <span className="text-xs" style={{ color: `hsl(${style.colors.primaryForeground})` }}>Me</span>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: `hsl(${style.colors.muted})` }}>
                  <MessageCircle className="w-3 h-3" style={{ color: `hsl(${style.colors.mutedForeground})` }} />
                </div>
                <div 
                  className="px-3 py-2 text-sm max-w-[80%]"
                  style={{ 
                    backgroundColor: `hsl(${style.colors.muted})`,
                    borderRadius: style.radius,
                  }}
                >
                  Great! You can copy the code using the button in the sidebar.
                </div>
              </div>
            </div>
            
            <div className="relative">
              <input 
                type="text"
                placeholder="Type a message..."
                className={`w-full px-4 py-2.5 pr-10 ${inputStyle} text-sm`}
                style={{ 
                  backgroundColor: `hsl(${style.colors.background})`,
                  borderRadius: style.radius,
                  color: `hsl(${style.colors.foreground})`,
                }}
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2">
                <Send className="w-4 h-4" style={{ color: `hsl(${style.colors.primary})` }} />
              </button>
            </div>
          </div>

          {/* Profile Card + System Alerts */}
          <div className="space-y-6">
            {/* Profile Card */}
            <div 
              className={`p-5 ${cardStyle}`}
              style={{ 
                backgroundColor: `hsl(${style.colors.surface})`,
                borderRadius: style.radius,
              }}
            >
              <div className="flex items-start gap-4">
                <div 
                  className="w-12 h-12 rounded-full"
                  style={{ 
                    background: `linear-gradient(135deg, hsl(${style.colors.primary}), hsl(${style.colors.accent}))`,
                  }}
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">Alex Morgan</p>
                      <p className="text-xs" style={{ color: `hsl(${style.colors.mutedForeground})` }}>Senior Developer</p>
                    </div>
                    <button 
                      className={`px-3 py-1.5 text-xs font-medium ${inputStyle}`}
                      style={{ borderRadius: style.radius }}
                    >
                      Follow
                    </button>
                  </div>
                  <div className="flex gap-2 mt-2">
                    {['React', 'Tailwind'].map(tag => (
                      <span 
                        key={tag}
                        className="px-2 py-0.5 text-xs"
                        style={{ 
                          backgroundColor: `hsl(${style.colors.muted})`,
                          color: `hsl(${style.colors.mutedForeground})`,
                          borderRadius: style.radius,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t" style={{ borderColor: `hsl(${style.colors.border})` }}>
                {[
                  { label: 'REPOS', value: '24' },
                  { label: 'FOLLOWERS', value: '1.2k' },
                  { label: 'STARS', value: '85' },
                ].map(stat => (
                  <div key={stat.label} className="text-center">
                    <p className="font-bold" style={{ fontFamily: style.fonts.heading }}>{stat.value}</p>
                    <p className="text-xs" style={{ color: `hsl(${style.colors.mutedForeground})` }}>{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* System Alerts */}
            <div 
              className={`p-5 ${cardStyle}`}
              style={{ 
                backgroundColor: `hsl(${style.colors.surface})`,
                borderRadius: style.radius,
              }}
            >
              <h4 className="text-sm font-medium mb-4" style={{ color: `hsl(${style.colors.mutedForeground})` }}>
                SYSTEM ALERTS
              </h4>
              <div className="space-y-3">
                {[
                  { type: 'info', title: 'System Update', message: 'Version 2.0 is now live with new features.', color: style.colors.primary },
                  { type: 'success', title: 'Success', message: 'Your changes have been saved successfully.', color: style.colors.success },
                  { type: 'warning', title: 'Warning', message: 'Your subscription expires in 3 days.', color: style.colors.warning },
                ].map((alert, i) => (
                  <div 
                    key={i}
                    className="flex items-start gap-3 p-3"
                    style={{ 
                      backgroundColor: `hsl(${style.colors.muted})`,
                      borderRadius: style.radius,
                    }}
                  >
                    <div 
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: `hsl(${alert.color} / 0.2)` }}
                    >
                      {alert.type === 'info' && <Info className="w-3 h-3" style={{ color: `hsl(${alert.color})` }} />}
                      {alert.type === 'success' && <Check className="w-3 h-3" style={{ color: `hsl(${alert.color})` }} />}
                      {alert.type === 'warning' && <AlertTriangle className="w-3 h-3" style={{ color: `hsl(${alert.color})` }} />}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{alert.title}</p>
                      <p className="text-xs" style={{ color: `hsl(${style.colors.mutedForeground})` }}>{alert.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Form Layouts */}
        <div className="mt-8">
          <h4 className="text-sm font-medium mb-4" style={{ color: `hsl(${style.colors.mutedForeground})` }}>
            FORM LAYOUTS
          </h4>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Shipping Form */}
            <div 
              className={`p-6 ${cardStyle}`}
              style={{ 
                backgroundColor: `hsl(${style.colors.surface})`,
                borderRadius: style.radius,
              }}
            >
              <h5 className="font-semibold mb-1" style={{ fontFamily: style.fonts.heading }}>Shipping Information</h5>
              <p className="text-sm mb-4" style={{ color: `hsl(${style.colors.mutedForeground})` }}>Where should we send your order?</p>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-xs font-medium block mb-1.5">First Name</label>
                  <input 
                    type="text"
                    placeholder="Jane"
                    className={`w-full px-3 py-2 ${inputStyle} text-sm`}
                    style={{ 
                      backgroundColor: `hsl(${style.colors.background})`,
                      borderRadius: style.radius,
                      color: `hsl(${style.colors.foreground})`,
                    }}
                  />
                </div>
                <div>
                  <label className="text-xs font-medium block mb-1.5">Last Name</label>
                  <input 
                    type="text"
                    placeholder="Doe"
                    className={`w-full px-3 py-2 ${inputStyle} text-sm`}
                    style={{ 
                      backgroundColor: `hsl(${style.colors.background})`,
                      borderRadius: style.radius,
                      color: `hsl(${style.colors.foreground})`,
                    }}
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="text-xs font-medium block mb-1.5">Address</label>
                <input 
                  type="text"
                  placeholder="123 Design Street"
                  className={`w-full px-3 py-2 ${inputStyle} text-sm`}
                  style={{ 
                    backgroundColor: `hsl(${style.colors.background})`,
                    borderRadius: style.radius,
                    color: `hsl(${style.colors.foreground})`,
                  }}
                />
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="text-xs font-medium block mb-1.5">City</label>
                  <input 
                    type="text"
                    placeholder="New York"
                    className={`w-full px-3 py-2 ${inputStyle} text-sm`}
                    style={{ 
                      backgroundColor: `hsl(${style.colors.background})`,
                      borderRadius: style.radius,
                      color: `hsl(${style.colors.foreground})`,
                    }}
                  />
                </div>
                <div>
                  <label className="text-xs font-medium block mb-1.5">State</label>
                  <select 
                    className={`w-full px-3 py-2 ${inputStyle} text-sm`}
                    style={{ 
                      backgroundColor: `hsl(${style.colors.background})`,
                      borderRadius: style.radius,
                      color: `hsl(${style.colors.foreground})`,
                    }}
                  >
                    <option>NY</option>
                    <option>CA</option>
                    <option>TX</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium block mb-1.5">Zip</label>
                  <input 
                    type="text"
                    placeholder="10001"
                    className={`w-full px-3 py-2 ${inputStyle} text-sm`}
                    style={{ 
                      backgroundColor: `hsl(${style.colors.background})`,
                      borderRadius: style.radius,
                      color: `hsl(${style.colors.foreground})`,
                    }}
                  />
                </div>
              </div>
              
              <div className="flex gap-3 justify-end">
                <button 
                  className={`px-4 py-2 text-sm font-medium ${inputStyle}`}
                  style={{ borderRadius: style.radius }}
                >
                  Cancel
                </button>
                <button 
                  className={`px-4 py-2 text-sm font-medium ${buttonStyle}`}
                  style={{ 
                    backgroundColor: `hsl(${style.colors.primary})`,
                    color: `hsl(${style.colors.primaryForeground})`,
                    borderRadius: style.radius,
                  }}
                >
                  Save Address
                </button>
              </div>
            </div>

            {/* Newsletter + Quick Access */}
            <div className="space-y-6">
              {/* Newsletter */}
              <div 
                className={`p-6 ${cardStyle}`}
                style={{ 
                  backgroundColor: `hsl(${style.colors.surface})`,
                  borderRadius: style.radius,
                }}
              >
                <h5 className="font-semibold mb-1" style={{ fontFamily: style.fonts.heading }}>Subscribe to Newsletter</h5>
                <p className="text-sm mb-4" style={{ color: `hsl(${style.colors.mutedForeground})` }}>Get the latest design updates.</p>
                
                <div className="flex gap-2">
                  <input 
                    type="email"
                    placeholder="email@example.com"
                    className={`flex-1 px-3 py-2.5 ${inputStyle} text-sm`}
                    style={{ 
                      backgroundColor: `hsl(${style.colors.background})`,
                      borderRadius: style.radius,
                      color: `hsl(${style.colors.foreground})`,
                    }}
                  />
                  <button 
                    className={`px-4 py-2.5 text-sm font-medium ${buttonStyle}`}
                    style={{ 
                      backgroundColor: `hsl(${style.colors.primary})`,
                      color: `hsl(${style.colors.primaryForeground})`,
                      borderRadius: style.radius,
                    }}
                  >
                    Subscribe
                  </button>
                </div>
                <p className="text-xs mt-2" style={{ color: `hsl(${style.colors.mutedForeground})` }}>
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </div>

              {/* Quick Access */}
              <div 
                className={`p-6 ${cardStyle}`}
                style={{ 
                  backgroundColor: `hsl(${style.colors.surface})`,
                  borderRadius: style.radius,
                }}
              >
                <div className="flex flex-col items-center text-center mb-4">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
                    style={{ backgroundColor: `hsl(${style.colors.muted})` }}
                  >
                    <Lock className="w-5 h-5" style={{ color: `hsl(${style.colors.mutedForeground})` }} />
                  </div>
                  <h5 className="font-semibold" style={{ fontFamily: style.fonts.heading }}>Quick Access</h5>
                </div>
                
                <div className="space-y-2">
                  <button 
                    className={`w-full px-4 py-2.5 text-sm font-medium flex items-center justify-center gap-2 ${inputStyle}`}
                    style={{ borderRadius: style.radius }}
                  >
                    <Github className="w-4 h-4" />
                    Continue with GitHub
                  </button>
                  <button 
                    className={`w-full px-4 py-2.5 text-sm font-medium flex items-center justify-center gap-2 ${inputStyle}`}
                    style={{ borderRadius: style.radius }}
                  >
                    <span className="font-bold">G</span>
                    Continue with Google
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="mt-8">
          <div 
            className={`${cardStyle} overflow-hidden`}
            style={{ 
              backgroundColor: `hsl(${style.colors.surface})`,
              borderRadius: style.radius,
            }}
          >
            <div className="p-5 flex items-center justify-between border-b" style={{ borderColor: `hsl(${style.colors.border})` }}>
              <div>
                <h4 className="font-semibold" style={{ fontFamily: style.fonts.heading }}>Recent Transactions</h4>
                <p className="text-sm" style={{ color: `hsl(${style.colors.mutedForeground})` }}>Manage your latest financial activity.</p>
              </div>
              <div className="flex gap-1">
                {['All', 'Paid', 'Pending', 'Failed'].map((filter, i) => (
                  <button
                    key={filter}
                    className={`px-3 py-1.5 text-xs font-medium transition-colors`}
                    style={{ 
                      backgroundColor: i === 0 ? `hsl(${style.colors.foreground})` : 'transparent',
                      color: i === 0 ? `hsl(${style.colors.background})` : `hsl(${style.colors.mutedForeground})`,
                      borderRadius: style.radius,
                    }}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: `1px solid hsl(${style.colors.border})` }}>
                    <th className="text-left px-5 py-3 font-medium" style={{ color: `hsl(${style.colors.mutedForeground})` }}>TRANSACTION</th>
                    <th className="text-left px-5 py-3 font-medium" style={{ color: `hsl(${style.colors.mutedForeground})` }}>DATE</th>
                    <th className="text-left px-5 py-3 font-medium" style={{ color: `hsl(${style.colors.mutedForeground})` }}>STATUS</th>
                    <th className="text-right px-5 py-3 font-medium" style={{ color: `hsl(${style.colors.mutedForeground})` }}>AMOUNT</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { type: 'Payment Received', id: '#1001', date: 'Oct 21, 2024', status: 'Pending', amount: '+$219.50', isPositive: true },
                    { type: 'Payment Sent', id: '#1002', date: 'Oct 22, 2024', status: 'Completed', amount: '-$340.00', isPositive: false },
                    { type: 'Payment Received', id: '#1003', date: 'Oct 23, 2024', status: 'Pending', amount: '+$460.50', isPositive: true },
                    { type: 'Payment Sent', id: '#1004', date: 'Oct 24, 2024', status: 'Completed', amount: '-$581.00', isPositive: false },
                    { type: 'Payment Received', id: '#1005', date: 'Oct 25, 2024', status: 'Pending', amount: '+$701.50', isPositive: true },
                  ].map((tx, i) => (
                    <tr 
                      key={i} 
                      style={{ borderBottom: i < 4 ? `1px solid hsl(${style.colors.border})` : 'none' }}
                    >
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-8 h-8 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: `hsl(${style.colors.muted})` }}
                          >
                            {tx.isPositive ? (
                              <ArrowDownLeft className="w-4 h-4" style={{ color: `hsl(${style.colors.success})` }} />
                            ) : (
                              <ArrowUpRight className="w-4 h-4" style={{ color: `hsl(${style.colors.mutedForeground})` }} />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{tx.type}</p>
                            <p className="text-xs" style={{ color: `hsl(${style.colors.mutedForeground})` }}>Invoice {tx.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3" style={{ color: `hsl(${style.colors.mutedForeground})` }}>{tx.date}</td>
                      <td className="px-5 py-3">
                        <span 
                          className="px-2 py-1 text-xs font-medium"
                          style={{ 
                            backgroundColor: tx.status === 'Completed' 
                              ? `hsl(${style.colors.success} / 0.15)` 
                              : `hsl(${style.colors.warning} / 0.15)`,
                            color: tx.status === 'Completed' 
                              ? `hsl(${style.colors.success})` 
                              : `hsl(${style.colors.warning})`,
                            borderRadius: style.radius,
                          }}
                        >
                          {tx.status}
                        </span>
                      </td>
                      <td 
                        className="px-5 py-3 text-right font-medium"
                        style={{ color: tx.isPositive ? `hsl(${style.colors.success})` : `hsl(${style.colors.foreground})` }}
                      >
                        {tx.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mt-8">
          <h4 className="text-sm font-medium mb-4" style={{ color: `hsl(${style.colors.mutedForeground})` }}>
            NAVIGATION & TABS
          </h4>
          <div 
            className={`${cardStyle} overflow-hidden`}
            style={{ 
              backgroundColor: `hsl(${style.colors.surface})`,
              borderRadius: style.radius,
            }}
          >
            {/* Tab Bar */}
            <div className="flex border-b" style={{ borderColor: `hsl(${style.colors.border})` }}>
              {['overview', 'analytics', 'reports', 'settings'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-3 text-sm font-medium capitalize transition-colors relative`}
                  style={{ 
                    color: activeTab === tab ? `hsl(${style.colors.primary})` : `hsl(${style.colors.mutedForeground})`,
                  }}
                >
                  {tab}
                  {activeTab === tab && (
                    <span 
                      className="absolute bottom-0 left-0 right-0 h-0.5"
                      style={{ backgroundColor: `hsl(${style.colors.primary})` }}
                    />
                  )}
                </button>
              ))}
            </div>
            
            {/* Tab Content */}
            <div className="p-5">
              {activeTab === 'overview' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <p className="font-medium">Project Overview</p>
                      <p className="text-sm" style={{ color: `hsl(${style.colors.mutedForeground})` }}>
                        View your project statistics and recent activity
                      </p>
                    </div>
                    <button 
                      className={`px-3 py-1.5 text-sm ${buttonStyle}`}
                      style={{ 
                        backgroundColor: `hsl(${style.colors.primary})`,
                        color: `hsl(${style.colors.primaryForeground})`,
                        borderRadius: style.radius,
                      }}
                    >
                      View All
                    </button>
                  </div>
                </div>
              )}
              {activeTab === 'analytics' && (
                <div className="text-center py-8">
                  <BarChart3 className="w-12 h-12 mx-auto mb-3" style={{ color: `hsl(${style.colors.mutedForeground})` }} />
                  <p className="font-medium">Analytics Dashboard</p>
                  <p className="text-sm" style={{ color: `hsl(${style.colors.mutedForeground})` }}>
                    Deep insights into your data
                  </p>
                </div>
              )}
              {activeTab === 'reports' && (
                <div className="text-center py-8">
                  <File className="w-12 h-12 mx-auto mb-3" style={{ color: `hsl(${style.colors.mutedForeground})` }} />
                  <p className="font-medium">Generate Reports</p>
                  <p className="text-sm" style={{ color: `hsl(${style.colors.mutedForeground})` }}>
                    Export and share your data
                  </p>
                </div>
              )}
              {activeTab === 'settings' && (
                <div className="text-center py-8">
                  <Settings className="w-12 h-12 mx-auto mb-3" style={{ color: `hsl(${style.colors.mutedForeground})` }} />
                  <p className="font-medium">Settings</p>
                  <p className="text-sm" style={{ color: `hsl(${style.colors.mutedForeground})` }}>
                    Configure your preferences
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="mt-8">
          <h4 className="text-sm font-medium mb-4" style={{ color: `hsl(${style.colors.mutedForeground})` }}>
            PRICING CARDS
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { 
                name: 'Starter', 
                price: '$9', 
                period: '/month',
                description: 'Perfect for individuals',
                features: ['5 Projects', '10GB Storage', 'Basic Support'],
                icon: Zap,
                popular: false
              },
              { 
                name: 'Pro', 
                price: '$29', 
                period: '/month',
                description: 'Best for professionals',
                features: ['Unlimited Projects', '100GB Storage', 'Priority Support', 'Advanced Analytics'],
                icon: Crown,
                popular: true
              },
              { 
                name: 'Enterprise', 
                price: '$99', 
                period: '/month',
                description: 'For large teams',
                features: ['Everything in Pro', 'Custom Integrations', 'Dedicated Manager', 'SLA Guarantee'],
                icon: Diamond,
                popular: false
              },
            ].map((plan, i) => (
              <div 
                key={i}
                className={`p-6 ${cardStyle} relative`}
                style={{ 
                  backgroundColor: `hsl(${style.colors.surface})`,
                  borderRadius: style.radius,
                  boxShadow: plan.popular ? `0 0 0 2px hsl(${style.colors.primary})` : undefined,
                }}
              >
                {plan.popular && (
                  <div 
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-medium"
                    style={{ 
                      backgroundColor: `hsl(${style.colors.primary})`,
                      color: `hsl(${style.colors.primaryForeground})`,
                      borderRadius: style.radius,
                    }}
                  >
                    Most Popular
                  </div>
                )}
                <div className="flex items-center gap-3 mb-4">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ 
                      backgroundColor: plan.popular ? `hsl(${style.colors.primary})` : `hsl(${style.colors.muted})`,
                    }}
                  >
                    <plan.icon className="w-5 h-5" style={{ color: plan.popular ? `hsl(${style.colors.primaryForeground})` : `hsl(${style.colors.mutedForeground})` }} />
                  </div>
                  <div>
                    <p className="font-semibold" style={{ fontFamily: style.fonts.heading }}>{plan.name}</p>
                    <p className="text-xs" style={{ color: `hsl(${style.colors.mutedForeground})` }}>{plan.description}</p>
                  </div>
                </div>
                <div className="mb-4">
                  <span className="text-3xl font-bold" style={{ fontFamily: style.fonts.heading }}>{plan.price}</span>
                  <span className="text-sm" style={{ color: `hsl(${style.colors.mutedForeground})` }}>{plan.period}</span>
                </div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4" style={{ color: `hsl(${style.colors.success})` }} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  className={`w-full py-2.5 font-medium text-sm ${buttonStyle}`}
                  style={{ 
                    backgroundColor: plan.popular ? `hsl(${style.colors.primary})` : 'transparent',
                    color: plan.popular ? `hsl(${style.colors.primaryForeground})` : `hsl(${style.colors.foreground})`,
                    border: plan.popular ? 'none' : `1px solid hsl(${style.colors.border})`,
                    borderRadius: style.radius,
                  }}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Components */}
        <div className="mt-8">
          <h4 className="text-sm font-medium mb-4" style={{ color: `hsl(${style.colors.mutedForeground})` }}>
            INTERACTIVE COMPONENTS
          </h4>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Slider & Controls */}
            <div 
              className={`p-6 ${cardStyle}`}
              style={{ 
                backgroundColor: `hsl(${style.colors.surface})`,
                borderRadius: style.radius,
              }}
            >
              <h5 className="font-semibold mb-4" style={{ fontFamily: style.fonts.heading }}>Slider & Controls</h5>
              
              {/* Slider */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Volume</span>
                  <span className="text-sm font-medium">{sliderValue}%</span>
                </div>
                <div className="relative">
                  <div 
                    className="h-2 rounded-full"
                    style={{ backgroundColor: `hsl(${style.colors.muted})` }}
                  >
                    <div 
                      className="h-full rounded-full transition-all"
                      style={{ 
                        width: `${sliderValue}%`,
                        backgroundColor: `hsl(${style.colors.primary})`,
                      }}
                    />
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={sliderValue}
                    onChange={(e) => setSliderValue(parseInt(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              </div>

              {/* Stepper */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm">Quantity</span>
                <div className="flex items-center gap-3">
                  <button 
                    className={`p-1.5 ${inputStyle}`}
                    style={{ borderRadius: style.radius }}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-medium">3</span>
                  <button 
                    className={`p-1.5 ${inputStyle}`}
                    style={{ borderRadius: style.radius }}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center justify-between">
                <span className="text-sm">Rating</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button 
                      key={star} 
                      onClick={() => setRating(star)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star 
                        className="w-5 h-5" 
                        fill={star <= rating ? `hsl(${style.colors.warning})` : 'transparent'}
                        style={{ color: `hsl(${style.colors.warning})` }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions & Badges */}
            <div 
              className={`p-6 ${cardStyle}`}
              style={{ 
                backgroundColor: `hsl(${style.colors.surface})`,
                borderRadius: style.radius,
              }}
            >
              <h5 className="font-semibold mb-4" style={{ fontFamily: style.fonts.heading }}>Actions & Badges</h5>
              
              {/* Like & Bookmark */}
              <div className="flex items-center gap-4 mb-6">
                <button 
                  onClick={() => setLiked(!liked)}
                  className={`flex items-center gap-2 px-4 py-2 ${inputStyle} transition-colors`}
                  style={{ 
                    borderRadius: style.radius,
                    backgroundColor: liked ? `hsl(${style.colors.error} / 0.1)` : 'transparent',
                  }}
                >
                  <Heart 
                    className="w-4 h-4" 
                    fill={liked ? `hsl(${style.colors.error})` : 'transparent'}
                    style={{ color: `hsl(${style.colors.error})` }}
                  />
                  <span className="text-sm">{liked ? 'Liked' : 'Like'}</span>
                </button>
                <button 
                  onClick={() => setBookmarked(!bookmarked)}
                  className={`flex items-center gap-2 px-4 py-2 ${inputStyle} transition-colors`}
                  style={{ 
                    borderRadius: style.radius,
                    backgroundColor: bookmarked ? `hsl(${style.colors.primary} / 0.1)` : 'transparent',
                  }}
                >
                  <Bookmark 
                    className="w-4 h-4" 
                    fill={bookmarked ? `hsl(${style.colors.primary})` : 'transparent'}
                    style={{ color: `hsl(${style.colors.primary})` }}
                  />
                  <span className="text-sm">{bookmarked ? 'Saved' : 'Save'}</span>
                </button>
              </div>

              {/* View Toggle */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm">View Mode</span>
                <div 
                  className="flex p-1"
                  style={{ 
                    backgroundColor: `hsl(${style.colors.muted})`,
                    borderRadius: style.radius,
                  }}
                >
                  <button 
                    onClick={() => setViewMode('grid')}
                    className="p-2 transition-colors"
                    style={{ 
                      backgroundColor: viewMode === 'grid' ? `hsl(${style.colors.surface})` : 'transparent',
                      borderRadius: style.radius,
                    }}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setViewMode('list')}
                    className="p-2 transition-colors"
                    style={{ 
                      backgroundColor: viewMode === 'list' ? `hsl(${style.colors.surface})` : 'transparent',
                      borderRadius: style.radius,
                    }}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                <span 
                  className="px-2.5 py-1 text-xs font-medium flex items-center gap-1"
                  style={{ 
                    backgroundColor: `hsl(${style.colors.primary})`,
                    color: `hsl(${style.colors.primaryForeground})`,
                    borderRadius: style.radius,
                  }}
                >
                  <Sparkles className="w-3 h-3" /> New
                </span>
                <span 
                  className="px-2.5 py-1 text-xs font-medium flex items-center gap-1"
                  style={{ 
                    backgroundColor: `hsl(${style.colors.success} / 0.15)`,
                    color: `hsl(${style.colors.success})`,
                    borderRadius: style.radius,
                  }}
                >
                  <Check className="w-3 h-3" /> Verified
                </span>
                <span 
                  className="px-2.5 py-1 text-xs font-medium flex items-center gap-1"
                  style={{ 
                    backgroundColor: `hsl(${style.colors.warning} / 0.15)`,
                    color: `hsl(${style.colors.warning})`,
                    borderRadius: style.radius,
                  }}
                >
                  <Rocket className="w-3 h-3" /> Trending
                </span>
                <span 
                  className="px-2.5 py-1 text-xs font-medium flex items-center gap-1"
                  style={{ 
                    backgroundColor: `hsl(${style.colors.error} / 0.15)`,
                    color: `hsl(${style.colors.error})`,
                    borderRadius: style.radius,
                  }}
                >
                  <Gift className="w-3 h-3" /> Limited
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Accordion & Timeline */}
        <div className="mt-8">
          <h4 className="text-sm font-medium mb-4" style={{ color: `hsl(${style.colors.mutedForeground})` }}>
            ACCORDION & TIMELINE
          </h4>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Accordion */}
            <div 
              className={`${cardStyle} overflow-hidden`}
              style={{ 
                backgroundColor: `hsl(${style.colors.surface})`,
                borderRadius: style.radius,
              }}
            >
              {[
                { id: 'item-1', title: 'What is this design system?', content: 'This is a comprehensive design system showcase that demonstrates various UI components, color palettes, and typography styles.' },
                { id: 'item-2', title: 'How do I customize colors?', content: 'Use the theme editor on the right to modify colors, fonts, and other design tokens in real-time.' },
                { id: 'item-3', title: 'Can I export the code?', content: 'Yes! Click the copy button to export CSS variables and Tailwind configuration for your project.' },
              ].map((item, i) => (
                <div 
                  key={item.id}
                  className={i < 2 ? 'border-b' : ''}
                  style={{ borderColor: `hsl(${style.colors.border})` }}
                >
                  <button 
                    onClick={() => setExpandedAccordion(expandedAccordion === item.id ? null : item.id)}
                    className="w-full flex items-center justify-between p-4 text-left"
                  >
                    <span className="font-medium text-sm">{item.title}</span>
                    <ChevronDown 
                      className={`w-4 h-4 transition-transform ${expandedAccordion === item.id ? 'rotate-180' : ''}`}
                      style={{ color: `hsl(${style.colors.mutedForeground})` }}
                    />
                  </button>
                  {expandedAccordion === item.id && (
                    <div 
                      className="px-4 pb-4 text-sm"
                      style={{ color: `hsl(${style.colors.mutedForeground})` }}
                    >
                      {item.content}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Timeline */}
            <div 
              className={`p-6 ${cardStyle}`}
              style={{ 
                backgroundColor: `hsl(${style.colors.surface})`,
                borderRadius: style.radius,
              }}
            >
              <h5 className="font-semibold mb-4" style={{ fontFamily: style.fonts.heading }}>Activity Timeline</h5>
              <div className="space-y-4">
                {[
                  { time: '2 min ago', title: 'New comment', desc: 'Someone commented on your post', icon: MessageCircle, color: style.colors.primary },
                  { time: '1 hour ago', title: 'File uploaded', desc: 'design-system.fig uploaded', icon: Upload, color: style.colors.success },
                  { time: '3 hours ago', title: 'New follower', desc: 'Alex Morgan started following you', icon: Users, color: style.colors.accent },
                  { time: 'Yesterday', title: 'Achievement unlocked', desc: 'You earned the "Early Adopter" badge', icon: Award, color: style.colors.warning },
                ].map((event, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `hsl(${event.color} / 0.15)` }}
                      >
                        <event.icon className="w-4 h-4" style={{ color: `hsl(${event.color})` }} />
                      </div>
                      {i < 3 && (
                        <div 
                          className="w-0.5 h-full min-h-[20px] mt-2"
                          style={{ backgroundColor: `hsl(${style.colors.border})` }}
                        />
                      )}
                    </div>
                    <div className="pb-4">
                      <p className="text-xs mb-0.5" style={{ color: `hsl(${style.colors.mutedForeground})` }}>{event.time}</p>
                      <p className="font-medium text-sm">{event.title}</p>
                      <p className="text-sm" style={{ color: `hsl(${style.colors.mutedForeground})` }}>{event.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Avatar Groups & Media Controls */}
        <div className="mt-8">
          <h4 className="text-sm font-medium mb-4" style={{ color: `hsl(${style.colors.mutedForeground})` }}>
            AVATARS & MEDIA
          </h4>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Avatar Group */}
            <div 
              className={`p-6 ${cardStyle}`}
              style={{ 
                backgroundColor: `hsl(${style.colors.surface})`,
                borderRadius: style.radius,
              }}
            >
              <h5 className="font-semibold mb-4" style={{ fontFamily: style.fonts.heading }}>Team Members</h5>
              
              {/* Stacked Avatars */}
              <div className="flex items-center mb-6">
                <div className="flex -space-x-3">
                  {['A', 'B', 'C', 'D', 'E'].map((letter, i) => (
                    <div 
                      key={i}
                      className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium border-2"
                      style={{ 
                        background: `linear-gradient(135deg, hsl(${style.colors.primary}), hsl(${style.colors.accent}))`,
                        color: `hsl(${style.colors.primaryForeground})`,
                        borderColor: `hsl(${style.colors.surface})`,
                        filter: `brightness(${1 - i * 0.1})`,
                      }}
                    >
                      {letter}
                    </div>
                  ))}
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-medium border-2"
                    style={{ 
                      backgroundColor: `hsl(${style.colors.muted})`,
                      color: `hsl(${style.colors.mutedForeground})`,
                      borderColor: `hsl(${style.colors.surface})`,
                    }}
                  >
                    +12
                  </div>
                </div>
                <span className="ml-4 text-sm" style={{ color: `hsl(${style.colors.mutedForeground})` }}>
                  17 members online
                </span>
              </div>

              {/* Status Indicators */}
              <div className="space-y-3">
                {[
                  { name: 'John Doe', status: 'Online', statusColor: style.colors.success },
                  { name: 'Jane Smith', status: 'Away', statusColor: style.colors.warning },
                  { name: 'Bob Wilson', status: 'Offline', statusColor: style.colors.muted },
                ].map((user, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="relative">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium"
                        style={{ 
                          backgroundColor: `hsl(${style.colors.muted})`,
                        }}
                      >
                        {user.name.charAt(0)}
                      </div>
                      <span 
                        className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2"
                        style={{ 
                          backgroundColor: `hsl(${user.statusColor})`,
                          borderColor: `hsl(${style.colors.surface})`,
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs" style={{ color: `hsl(${style.colors.mutedForeground})` }}>{user.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Media Player */}
            <div 
              className={`p-6 ${cardStyle}`}
              style={{ 
                backgroundColor: `hsl(${style.colors.surface})`,
                borderRadius: style.radius,
              }}
            >
              <h5 className="font-semibold mb-4" style={{ fontFamily: style.fonts.heading }}>Now Playing</h5>
              
              <div className="flex items-center gap-4 mb-4">
                <div 
                  className="w-16 h-16 rounded-lg flex items-center justify-center"
                  style={{ 
                    background: `linear-gradient(135deg, hsl(${style.colors.primary}), hsl(${style.colors.accent}))`,
                  }}
                >
                  <Image className="w-8 h-8" style={{ color: `hsl(${style.colors.primaryForeground})` }} />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Ambient Waves</p>
                  <p className="text-sm" style={{ color: `hsl(${style.colors.mutedForeground})` }}>Lo-Fi Beats</p>
                </div>
                <button>
                  <Heart className="w-5 h-5" style={{ color: `hsl(${style.colors.mutedForeground})` }} />
                </button>
              </div>

              {/* Progress */}
              <div className="mb-4">
                <div 
                  className="h-1 rounded-full mb-2"
                  style={{ backgroundColor: `hsl(${style.colors.muted})` }}
                >
                  <div 
                    className="h-full rounded-full"
                    style={{ 
                      width: '35%',
                      backgroundColor: `hsl(${style.colors.primary})`,
                    }}
                  />
                </div>
                <div className="flex justify-between text-xs" style={{ color: `hsl(${style.colors.mutedForeground})` }}>
                  <span>1:24</span>
                  <span>3:45</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-4">
                <button className="p-2">
                  <ChevronDown className="w-5 h-5 -rotate-90" style={{ color: `hsl(${style.colors.mutedForeground})` }} />
                </button>
                <button 
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `hsl(${style.colors.primary})` }}
                >
                  <Play className="w-5 h-5 ml-1" style={{ color: `hsl(${style.colors.primaryForeground})` }} />
                </button>
                <button className="p-2">
                  <ChevronDown className="w-5 h-5 rotate-90" style={{ color: `hsl(${style.colors.mutedForeground})` }} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Breadcrumb & Pagination */}
        <div className="mt-8">
          <h4 className="text-sm font-medium mb-4" style={{ color: `hsl(${style.colors.mutedForeground})` }}>
            NAVIGATION ELEMENTS
          </h4>
          <div 
            className={`p-6 ${cardStyle}`}
            style={{ 
              backgroundColor: `hsl(${style.colors.surface})`,
              borderRadius: style.radius,
            }}
          >
            {/* Breadcrumb */}
            <div className="mb-6">
              <p className="text-xs font-medium mb-2" style={{ color: `hsl(${style.colors.mutedForeground})` }}>BREADCRUMB</p>
              <div className="flex items-center gap-2 text-sm">
                <a href="#" className="hover:underline" style={{ color: `hsl(${style.colors.mutedForeground})` }}>Home</a>
                <ChevronRight className="w-4 h-4" style={{ color: `hsl(${style.colors.mutedForeground})` }} />
                <a href="#" className="hover:underline" style={{ color: `hsl(${style.colors.mutedForeground})` }}>Products</a>
                <ChevronRight className="w-4 h-4" style={{ color: `hsl(${style.colors.mutedForeground})` }} />
                <span style={{ color: `hsl(${style.colors.foreground})` }}>Design System</span>
              </div>
            </div>

            {/* Pagination */}
            <div>
              <p className="text-xs font-medium mb-2" style={{ color: `hsl(${style.colors.mutedForeground})` }}>PAGINATION</p>
              <div className="flex items-center gap-1">
                <button 
                  className={`px-3 py-1.5 text-sm ${inputStyle}`}
                  style={{ borderRadius: style.radius }}
                >
                  Previous
                </button>
                {[1, 2, 3, '...', 8, 9, 10].map((page, i) => (
                  <button 
                    key={i}
                    className={`w-9 h-9 text-sm font-medium ${page === 2 ? '' : ''}`}
                    style={{ 
                      backgroundColor: page === 2 ? `hsl(${style.colors.primary})` : 'transparent',
                      color: page === 2 ? `hsl(${style.colors.primaryForeground})` : `hsl(${style.colors.foreground})`,
                      borderRadius: style.radius,
                    }}
                  >
                    {page}
                  </button>
                ))}
                <button 
                  className={`px-3 py-1.5 text-sm ${inputStyle}`}
                  style={{ borderRadius: style.radius }}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Characteristics */}
        <div 
          className={`p-6 mt-8 ${cardStyle}`}
          style={{ 
            backgroundColor: `hsl(${style.colors.surface})`,
            borderRadius: style.radius,
          }}
        >
          <h4 className="font-semibold mb-4" style={{ fontFamily: style.fonts.heading }}>
            Design Characteristics
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {style.characteristics.map((char, i) => (
              <div 
                key={i}
                className="flex items-start gap-2 text-sm"
              >
                <span style={{ color: `hsl(${style.colors.accent})` }}>•</span>
                <span>{char}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
      </div>
    </div>
  );
}
