export type StyleCategory = 'all' | 'tech' | 'editorial' | 'dark' | 'minimalist';

export const styleCategories: { id: StyleCategory; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'tech', label: 'Tech' },
  { id: 'editorial', label: 'Editorial' },
  { id: 'dark', label: 'Dark Mode' },
  { id: 'minimalist', label: 'Minimalist' },
];

export interface ColorPalette {
  primary: string;
  primaryForeground: string;
  accent: string;
  accentForeground: string;
  background: string;
  foreground: string;
  surface: string;
  surfaceForeground: string;
  muted: string;
  mutedForeground: string;
  border: string;
  success: string;
  warning: string;
  error: string;
}

export interface Typography {
  heading: string;
  body: string;
  mono?: string;
  headingWeight?: string;
  bodyWeight?: string;
  scale?: number; // Modular scale ratio (e.g. 1.2, 1.25, 1.333, 1.414, 1.5, 1.618)
}

export interface Gradients {
  background?: string;
  text?: string;
}

export interface DesignStyle {
  id: string;
  name: string;
  description: string;
  icon: string;
  theme: 'light' | 'dark';
  category: StyleCategory[];
  fonts: Typography;
  colors: ColorPalette;
  gradients?: Gradients;
  radius: string;
  shadowStrength?: number; // 0 to 1 scale
  borderWidth: string; // e.g. '1px'
  density?: number; // 0.5 (compact) to 1.5 (relaxed), default 1
  characteristics: string[];
}

export interface ThemeOverrides {
  colors?: Partial<ColorPalette>;
  fonts?: {
    heading?: string;
    body?: string;
    headingWeight?: string;
    bodyWeight?: string;
    scale?: number;
  };
  gradients?: Gradients;
  radius?: string;
  shadowStrength?: number;
  borderWidth?: string;
  density?: number;
}

export interface Preset {
  id: string;
  name: string;
  overrides: ThemeOverrides;
  createdAt: number;
}

export type ColorBlindnessMode = 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia' | 'achromatopsia';

export const designStyles: DesignStyle[] = [
  {
    id: 'cupertino',
    name: 'Cupertino',
    description: 'Clean, airy, and functional. Heavily inspired by Apple\'s ecosystem.',
    icon: 'apple',
    theme: 'light',
    category: ['tech', 'minimalist'],
    fonts: {
      heading: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
      body: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
      mono: '"SF Mono", Menlo, monospace',
    },
    colors: {
      primary: '211 100% 50%',
      primaryForeground: '0 0% 100%',
      accent: '142 71% 45%',
      accentForeground: '0 0% 100%',
      background: '0 0% 98%',
      foreground: '0 0% 10%',
      surface: '0 0% 100%',
      surfaceForeground: '0 0% 10%',
      muted: '220 14% 96%',
      mutedForeground: '220 10% 46%',
      border: '220 13% 91%',
      success: '142 71% 45%',
      warning: '38 92% 50%',
      error: '0 84% 60%',
    },
    radius: '0.75rem',
    borderWidth: '1px',
    characteristics: [
      'Generous whitespace and breathing room',
      'Subtle translucent blur effects',
      'Smooth rounded corners (12px)',
      'Soft shadows with depth',
      'SF Pro typography family',
      'Vibrant accent colors on neutral base',
    ],
  },
  {
    id: 'spotify',
    name: 'Spotify',
    description: 'Bold, high-contrast dark theme with vibrant green accents.',
    icon: 'music',
    theme: 'dark',
    category: ['tech', 'dark'],
    fonts: {
      heading: '"Circular", "Helvetica Neue", Helvetica, Arial, sans-serif',
      body: '"Circular", "Helvetica Neue", Helvetica, Arial, sans-serif',
      mono: '"Fira Code", "SF Mono", monospace',
    },
    colors: {
      primary: '141 73% 42%',
      primaryForeground: '0 0% 0%',
      accent: '141 73% 42%',
      accentForeground: '0 0% 0%',
      background: '0 0% 7%',
      foreground: '0 0% 100%',
      surface: '0 0% 12%',
      surfaceForeground: '0 0% 100%',
      muted: '0 0% 18%',
      mutedForeground: '0 0% 65%',
      border: '0 0% 20%',
      success: '141 73% 42%',
      warning: '45 93% 47%',
      error: '0 72% 51%',
    },
    radius: '0.5rem',
    borderWidth: '0px',
    characteristics: [
      'Pure black background (#121212)',
      'Signature Spotify Green (#1DB954)',
      'High contrast text hierarchy',
      'Circular typeface or similar',
      'Minimal borders, depth via elevation',
      'Rounded but not overly soft (8px)',
    ],
  },
  {
    id: 'kinfolk',
    name: 'Kinfolk',
    description: 'Editorial, warm, and intentionally sparse. Magazine-inspired minimalism.',
    icon: 'feather',
    theme: 'light',
    category: ['editorial', 'minimalist'],
    fonts: {
      heading: '"Playfair Display", Georgia, "Times New Roman", serif',
      body: '"Work Sans", "Helvetica Neue", sans-serif',
      mono: '"IBM Plex Mono", monospace',
    },
    colors: {
      primary: '30 10% 20%',
      primaryForeground: '40 30% 96%',
      accent: '30 20% 50%',
      accentForeground: '0 0% 100%',
      background: '40 30% 96%',
      foreground: '30 10% 20%',
      surface: '40 25% 98%',
      surfaceForeground: '30 10% 20%',
      muted: '35 20% 92%',
      mutedForeground: '30 8% 50%',
      border: '35 15% 88%',
      success: '150 30% 40%',
      warning: '35 80% 50%',
      error: '5 60% 50%',
    },
    radius: '0.125rem',
    borderWidth: '1px',
    characteristics: [
      'Warm, cream-toned backgrounds',
      'Elegant serif headings (Playfair, Garamond)',
      'Generous line height and letter spacing',
      'Almost no border radius (2px)',
      'Earth tones and muted palette',
      'Editorial grid layouts',
    ],
  },
  {
    id: 'swiss-minimal',
    name: 'Swiss Minimal',
    description: 'Ultra-minimalist. Radical reduction to black, white, and grays.',
    icon: 'minus',
    theme: 'light',
    category: ['minimalist'],
    fonts: {
      heading: '"Inter", "Helvetica Neue", Arial, sans-serif',
      body: '"Inter", "Helvetica Neue", Arial, sans-serif',
      mono: '"JetBrains Mono", "Fira Code", monospace',
    },
    colors: {
      primary: '0 0% 0%',
      primaryForeground: '0 0% 100%',
      accent: '0 0% 40%',
      accentForeground: '0 0% 100%',
      background: '0 0% 100%',
      foreground: '0 0% 0%',
      surface: '0 0% 100%',
      surfaceForeground: '0 0% 0%',
      muted: '0 0% 96%',
      mutedForeground: '0 0% 45%',
      border: '0 0% 88%',
      success: '0 0% 30%',
      warning: '0 0% 50%',
      error: '0 0% 20%',
    },
    radius: '0',
    borderWidth: '1px',
    characteristics: [
      'Pure black and white only',
      'No shadows, pure borders',
      'Sharp corners (0 radius)',
      'Inter or Helvetica typography',
      'Strict grid alignment',
      'Maximum negative space',
    ],
  },
  {
    id: 'neo-brutalism',
    name: 'Neo-Brutalism',
    description: 'Raw, bold, and unapologetic. Hard shadows and bright colors.',
    icon: 'square',
    theme: 'light',
    category: ['editorial'],
    fonts: {
      heading: '"Space Grotesk", "Work Sans", sans-serif',
      body: '"Space Grotesk", "Work Sans", sans-serif',
      mono: '"Space Mono", "Courier New", monospace',
    },
    colors: {
      primary: '0 0% 0%',
      primaryForeground: '0 0% 100%',
      accent: '50 100% 50%',
      accentForeground: '0 0% 0%',
      background: '60 100% 97%',
      foreground: '0 0% 0%',
      surface: '0 0% 100%',
      surfaceForeground: '0 0% 0%',
      muted: '60 30% 94%',
      mutedForeground: '0 0% 30%',
      border: '0 0% 0%',
      success: '150 80% 40%',
      warning: '50 100% 50%',
      error: '0 90% 55%',
    },
    radius: '0.25rem',
    borderWidth: '3px',
    characteristics: [
      'Hard black borders (2-3px)',
      'Offset box shadows (4px 4px)',
      'Bright, saturated accent colors',
      'Cream or white backgrounds',
      'Bold, chunky typography',
      'Intentionally "unpolished" feel',
    ],
  },
  {
    id: 'editorial',
    name: 'Editorial',
    description: 'Sophisticated, magazine-inspired with refined serif typography.',
    icon: 'newspaper',
    theme: 'light',
    category: ['editorial'],
    fonts: {
      heading: '"Playfair Display", "Georgia", serif',
      body: '"Source Sans Pro", "Helvetica Neue", sans-serif',
      mono: '"Source Code Pro", monospace',
    },
    colors: {
      primary: '220 20% 20%',
      primaryForeground: '0 0% 98%',
      accent: '15 80% 55%',
      accentForeground: '0 0% 100%',
      background: '0 0% 100%',
      foreground: '220 20% 15%',
      surface: '40 20% 98%',
      surfaceForeground: '220 20% 15%',
      muted: '40 10% 95%',
      mutedForeground: '220 10% 50%',
      border: '40 10% 88%',
      success: '160 50% 40%',
      warning: '40 90% 50%',
      error: '0 70% 50%',
    },
    radius: '0.375rem',
    borderWidth: '1px',
    characteristics: [
      'Elegant serif/sans pairing',
      'Subtle warm undertones',
      'Refined spacing and proportion',
      'Understated accent colors',
      'Print-inspired layouts',
      'Careful typographic hierarchy',
    ],
  },
  {
    id: 'material',
    name: 'Material Design',
    description: 'Google\'s design language. Layered surfaces, bold colors, and purposeful motion.',
    icon: 'layers',
    theme: 'light',
    category: ['tech'],
    fonts: {
      heading: '"Roboto", "Noto Sans", sans-serif',
      body: '"Roboto", "Noto Sans", sans-serif',
      mono: '"Roboto Mono", monospace',
    },
    colors: {
      primary: '262 80% 50%',
      primaryForeground: '0 0% 100%',
      accent: '173 80% 40%',
      accentForeground: '0 0% 100%',
      background: '0 0% 99%',
      foreground: '0 0% 13%',
      surface: '0 0% 100%',
      surfaceForeground: '0 0% 13%',
      muted: '260 10% 95%',
      mutedForeground: '0 0% 45%',
      border: '0 0% 88%',
      success: '122 39% 49%',
      warning: '36 100% 50%',
      error: '4 90% 58%',
    },
    radius: '0.75rem',
    borderWidth: '0px',
    characteristics: [
      'Elevated surfaces with layered shadows',
      'Primary purple/deep purple tones',
      'Roboto font family throughout',
      'FAB (Floating Action Button) pattern',
      'Ripple effects on interactions',
      'Material elevation system (dp)',
    ],
  },
  {
    id: 'tailwind-ui',
    name: 'Tailwind UI',
    description: 'Modern, utility-first aesthetic. Clean whites, indigo accents, and crisp edges.',
    icon: 'wind',
    theme: 'light',
    category: ['tech', 'minimalist'],
    fonts: {
      heading: '"Inter", system-ui, sans-serif',
      body: '"Inter", system-ui, sans-serif',
      mono: '"Fira Code", "JetBrains Mono", monospace',
    },
    colors: {
      primary: '239 84% 67%',
      primaryForeground: '0 0% 100%',
      accent: '239 84% 67%',
      accentForeground: '0 0% 100%',
      background: '0 0% 100%',
      foreground: '224 71% 4%',
      surface: '0 0% 100%',
      surfaceForeground: '224 71% 4%',
      muted: '220 14% 96%',
      mutedForeground: '220 9% 46%',
      border: '220 13% 91%',
      success: '142 71% 45%',
      warning: '38 92% 50%',
      error: '0 84% 60%',
    },
    radius: '0.5rem',
    borderWidth: '1px',
    characteristics: [
      'Indigo-600 as primary accent',
      'Clean white backgrounds',
      'Subtle gray-100/200 surfaces',
      'Inter typeface throughout',
      'Consistent 8px spacing grid',
      'Ring focus states (ring-2)',
    ],
  },
  {
    id: 'linear',
    name: 'Linear',
    description: 'Ultra-refined dark mode. Purple gradients, glass morphism, and buttery animations.',
    icon: 'hexagon',
    theme: 'dark',
    category: ['tech', 'dark'],
    fonts: {
      heading: '"Inter", "SF Pro Display", system-ui, sans-serif',
      body: '"Inter", "SF Pro Text", system-ui, sans-serif',
      mono: '"JetBrains Mono", "SF Mono", monospace',
    },
    colors: {
      primary: '259 94% 68%',
      primaryForeground: '0 0% 100%',
      accent: '259 94% 68%',
      accentForeground: '0 0% 100%',
      background: '228 14% 8%',
      foreground: '0 0% 98%',
      surface: '228 14% 11%',
      surfaceForeground: '0 0% 98%',
      muted: '228 14% 15%',
      mutedForeground: '228 10% 55%',
      border: '228 14% 18%',
      success: '142 70% 50%',
      warning: '38 92% 50%',
      error: '0 72% 51%',
    },
    radius: '0.625rem',
    borderWidth: '1px',
    characteristics: [
      'Dark navy/charcoal backgrounds',
      'Signature purple/violet accent',
      'Glassmorphism and blur effects',
      'Smooth 60fps animations',
      'Keyboard-first navigation',
      'Subtle gradient overlays',
    ],
  },
  {
    id: 'notion',
    name: 'Notion',
    description: 'Content-first minimalism. Warm grays, readable typography, and block-based thinking.',
    icon: 'file-text',
    theme: 'light',
    category: ['tech', 'minimalist'],
    fonts: {
      heading: '"Georgia", "Times New Roman", serif',
      body: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      mono: '"SFMono-Regular", Consolas, monospace',
    },
    colors: {
      primary: '0 0% 15%',
      primaryForeground: '0 0% 100%',
      accent: '24 75% 50%',
      accentForeground: '0 0% 100%',
      background: '0 0% 100%',
      foreground: '0 0% 15%',
      surface: '40 20% 98%',
      surfaceForeground: '0 0% 15%',
      muted: '40 15% 95%',
      mutedForeground: '0 0% 50%',
      border: '40 10% 90%',
      success: '145 60% 40%',
      warning: '38 90% 55%',
      error: '0 70% 55%',
    },
    radius: '0.25rem',
    borderWidth: '1px',
    characteristics: [
      'White/off-white backgrounds',
      'Georgia serif for headings',
      'System sans-serif for body',
      'Inline slash commands style',
      'Block-based content structure',
      'Warm, welcoming color palette',
    ],
  },
  {
    id: 'github',
    name: 'GitHub',
    description: 'Developer-focused clarity. Monospace accents, blue links, and functional density.',
    icon: 'github',
    theme: 'light',
    category: ['tech'],
    fonts: {
      heading: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
      body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
      mono: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace',
    },
    colors: {
      primary: '212 92% 45%',
      primaryForeground: '0 0% 100%',
      accent: '212 92% 45%',
      accentForeground: '0 0% 100%',
      background: '0 0% 100%',
      foreground: '210 12% 16%',
      surface: '210 17% 98%',
      surfaceForeground: '210 12% 16%',
      muted: '210 14% 96%',
      mutedForeground: '210 10% 40%',
      border: '210 14% 89%',
      success: '137 55% 40%',
      warning: '40 94% 42%',
      error: '0 72% 51%',
    },
    radius: '0.375rem',
    borderWidth: '1px',
    characteristics: [
      'Functional, no-nonsense layouts',
      'Blue link color (#0969da)',
      'Monospace for code elements',
      'Light gray surface backgrounds',
      'Compact information density',
      'Clear visual hierarchy',
    ],
  },
  {
    id: 'discord',
    name: 'Discord',
    description: 'Gaming-friendly dark mode. Blurple accents, rounded elements, and chat-optimized.',
    icon: 'message-circle',
    theme: 'dark',
    category: ['tech', 'dark'],
    fonts: {
      heading: '"gg sans", "Noto Sans", "Helvetica Neue", sans-serif',
      body: '"gg sans", "Noto Sans", "Helvetica Neue", sans-serif',
      mono: '"Consolas", "Andale Mono WT", monospace',
    },
    colors: {
      primary: '235 86% 65%',
      primaryForeground: '0 0% 100%',
      accent: '235 86% 65%',
      accentForeground: '0 0% 100%',
      background: '220 7% 18%',
      foreground: '210 10% 90%',
      surface: '220 7% 21%',
      surfaceForeground: '210 10% 90%',
      muted: '220 7% 25%',
      mutedForeground: '215 8% 55%',
      border: '220 6% 28%',
      success: '139 47% 44%',
      warning: '38 96% 54%',
      error: '359 82% 59%',
    },
    radius: '0.5rem',
    borderWidth: '0px',
    characteristics: [
      'Dark gray backgrounds (#313338)',
      'Blurple accent (#5865F2)',
      'Rounded, friendly UI elements',
      'Chat-optimized text sizing',
      'Icon-heavy navigation',
      'Hover states with lighter shades',
    ],
  },
  {
    id: 'stripe',
    name: 'Stripe',
    description: 'Premium fintech polish. Gradient accents, crisp typography, and trust-inspiring.',
    icon: 'credit-card',
    theme: 'light',
    category: ['tech'],
    fonts: {
      heading: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      mono: '"Source Code Pro", monospace',
    },
    colors: {
      primary: '250 87% 60%',
      primaryForeground: '0 0% 100%',
      accent: '168 75% 42%',
      accentForeground: '0 0% 100%',
      background: '0 0% 100%',
      foreground: '230 25% 18%',
      surface: '220 20% 98%',
      surfaceForeground: '230 25% 18%',
      muted: '220 14% 96%',
      mutedForeground: '230 10% 45%',
      border: '220 13% 91%',
      success: '158 64% 40%',
      warning: '38 92% 50%',
      error: '0 84% 60%',
    },
    radius: '0.5rem',
    borderWidth: '1px',
    characteristics: [
      'Signature purple/indigo (#635BFF)',
      'Gradient mesh backgrounds',
      'Premium, trust-inspiring feel',
      'Crisp system typography',
      'Generous padding and spacing',
      'Subtle shadows and depth',
    ],
  },
  {
    id: 'vercel',
    name: 'Vercel',
    description: 'Stark minimalism. Pure black and white with zero-compromise aesthetics.',
    icon: 'triangle',
    theme: 'dark',
    category: ['tech', 'dark', 'minimalist'],
    fonts: {
      heading: '"Geist", "Inter", system-ui, sans-serif',
      body: '"Geist", "Inter", system-ui, sans-serif',
      mono: '"Geist Mono", "JetBrains Mono", monospace',
    },
    colors: {
      primary: '0 0% 100%',
      primaryForeground: '0 0% 0%',
      accent: '0 0% 100%',
      accentForeground: '0 0% 0%',
      background: '0 0% 0%',
      foreground: '0 0% 100%',
      surface: '0 0% 7%',
      surfaceForeground: '0 0% 100%',
      muted: '0 0% 13%',
      mutedForeground: '0 0% 55%',
      border: '0 0% 20%',
      success: '142 70% 45%',
      warning: '45 93% 47%',
      error: '0 90% 60%',
    },
    radius: '0.5rem',
    borderWidth: '1px',
    characteristics: [
      'Pure black (#000) background',
      'White text and accents',
      'Geist font family',
      'Triangle logo motif',
      'No color, pure contrast',
      'Sharp, technical aesthetic',
    ],
  },
  {
    id: 'dribbble',
    name: 'Dribbble',
    description: 'Playful and creative. Pink accents, soft shadows, and designer-friendly warmth.',
    icon: 'dribbble',
    theme: 'light',
    category: ['editorial'],
    fonts: {
      heading: '"Haas Grotesk", "Helvetica Neue", Helvetica, Arial, sans-serif',
      body: '"Haas Grotesk", "Helvetica Neue", Helvetica, Arial, sans-serif',
      mono: '"SF Mono", "Fira Code", monospace',
    },
    colors: {
      primary: '337 79% 61%',
      primaryForeground: '0 0% 100%',
      accent: '337 79% 61%',
      accentForeground: '0 0% 100%',
      background: '0 0% 100%',
      foreground: '210 11% 15%',
      surface: '0 0% 100%',
      surfaceForeground: '210 11% 15%',
      muted: '210 16% 97%',
      mutedForeground: '210 10% 45%',
      border: '210 14% 91%',
      success: '145 63% 42%',
      warning: '38 92% 50%',
      error: '0 84% 60%',
    },
    radius: '0.75rem',
    borderWidth: '0px',
    characteristics: [
      'Signature Dribbble pink (#EA4C89)',
      'Soft, rounded corners (12px)',
      'Playful, creative energy',
      'Card-based layouts',
      'Generous white space',
      'Soft shadow elevation',
    ],
  },

  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    description: 'High-tech low-life. Neon glows, glitch effects, and futuristic maximalism.',
    icon: 'cpu',
    theme: 'dark',
    category: ['tech', 'dark'],
    fonts: {
      heading: '"Orbitron", "Exo 2", sans-serif',
      body: '"Exo 2", "Rajdhani", sans-serif',
      mono: '"Share Tech Mono", monospace',
    },
    colors: {
      primary: '320 100% 55%', // Neon Pink
      primaryForeground: '0 0% 100%',
      accent: '180 100% 50%', // Cyan
      accentForeground: '0 0% 0%',
      background: '260 50% 10%', // Deep Purple/Black
      foreground: '180 10% 90%',
      surface: '260 50% 15%',
      surfaceForeground: '180 10% 90%',
      muted: '260 40% 20%',
      mutedForeground: '260 20% 70%',
      border: '320 80% 40%', // Pinkish border
      success: '120 100% 50%', // Neon Green
      warning: '60 100% 50%', // Neon Yellow
      error: '0 100% 60%',
    },
    radius: '0', // Sharp corners
    borderWidth: '2px',
    characteristics: [
      'Neon glow effects',
      'Sharp, angular corners',
      'Grid lines and technical markings',
      'Glitch data visualization',
      'High contrast cyber-palette',
      'HUD-inspired interface elements',
    ],
  },
  {
    id: 'vibe-official',
    name: 'Vibe Styles',
    description: 'The ultimate agentic design system. Deep glassmorphism, high-contrast monochrome with violet sparks.',
    icon: 'zap',
    theme: 'dark',
    category: ['tech', 'dark'],
    fonts: {
      heading: '"Inter", sans-serif',
      body: '"Inter", sans-serif',
      mono: '"JetBrains Mono", monospace',
    },
    colors: {
      primary: '265 100% 65%',
      primaryForeground: '0 0% 100%',
      accent: '265 100% 65%',
      accentForeground: '0 0% 100%',
      background: '240 10% 4%',
      foreground: '0 0% 100%',
      surface: '240 10% 6%',
      surfaceForeground: '0 0% 100%',
      muted: '240 10% 12%',
      mutedForeground: '240 5% 65%',
      border: '240 10% 15%',
      success: '142 70% 50%',
      warning: '40 95% 60%',
      error: '0 91% 60%',
    },
    radius: '1.25rem',
    borderWidth: '1px',
    characteristics: [
      'True Black depth (#0A0A0B)',
      'Electric Violet accents (#A855F7)',
      'Ultra-thick glassmorphism (20px blur)',
      'Inter tight tracking (-0.02em)',
      'Subtle border glows and high-contrast lines',
      'Fluid motion and spring-based hovers',
    ],
  },
  {
    id: 'partify',
    name: 'Partify',
    description: 'Modern 3D dashboard aesthetic. Crisp white surfaces, bright lime accents, and soft tech feel.',
    icon: 'box',
    theme: 'light',
    category: ['tech', 'minimalist'],
    fonts: {
      heading: '"Space Grotesk", "Inter", sans-serif',
      body: '"Inter", sans-serif',
      mono: '"Space Mono", monospace',
    },
    colors: {
      primary: '75 95% 55%',
      primaryForeground: '0 0% 0%',
      accent: '75 95% 55%',
      accentForeground: '0 0% 0%',
      background: '220 10% 94%',
      foreground: '220 15% 10%',
      surface: '0 0% 100%',
      surfaceForeground: '220 15% 10%',
      muted: '220 10% 96%',
      mutedForeground: '220 10% 45%',
      border: '220 10% 90%',
      success: '76 90% 60%',
      warning: '40 95% 60%',
      error: '0 85% 60%',
    },
    radius: '1rem',
    borderWidth: '1px',
    characteristics: [
      'Bright Lime Green (#CFFF04) accents',
      'Soft gray background (#F0F0F3)',
      'Clean white cards with soft shadows',
      'Space Grotesk for technical feel',
      'Rounded, accessible UI elements',
      '3D-ready canvas aesthetic',
    ],
  },
];

export function generateStyleCSS(style: DesignStyle): string {
  return `/* ${style.name} Design System
 * ${style.description}
 * 
 * Characteristics:
${style.characteristics.map(c => ` * - ${c}`).join('\n')}
 */

:root {
  /* Color Palette */
  --primary: ${style.colors.primary};
  --primary-foreground: ${style.colors.primaryForeground};
  --accent: ${style.colors.accent};
  --accent-foreground: ${style.colors.accentForeground};
  --background: ${style.colors.background};
  --foreground: ${style.colors.foreground};
  --surface: ${style.colors.surface};
  --surface-foreground: ${style.colors.surfaceForeground};
  --muted: ${style.colors.muted};
  --muted-foreground: ${style.colors.mutedForeground};
  --border: ${style.colors.border};
  --success: ${style.colors.success};
  --warning: ${style.colors.warning};
  --error: ${style.colors.error};
  
  /* Border Radius & Width */
  --radius: ${style.radius};
  --border-width: ${style.borderWidth};

  /* Spacing */
  --spacing-multiplier: ${style.density || 1};
  
  /* Typography */
  --font-heading: ${style.fonts.heading};
  --font-body: ${style.fonts.body};
  ${style.fonts.mono ? `--font-mono: ${style.fonts.mono};` : ''}
}

/* Base Styles */
body {
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
  font-family: var(--font-body);
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
}

/* Component Classes */
.btn-primary {
  background-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
  border-radius: var(--radius);
  padding: 0.625rem 1.25rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s;
}

.btn-primary:hover {
  opacity: 0.9;
}

.btn-secondary {
  background-color: transparent;
  color: hsl(var(--foreground));
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius);
  padding: 0.625rem 1.25rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-secondary:hover {
  background-color: hsl(var(--muted));
}

.card {
  background-color: hsl(var(--surface));
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius);
  padding: 1.5rem;
}

.input {
  background-color: hsl(var(--surface));
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius);
  padding: 0.625rem 0.875rem;
  font-family: var(--font-body);
  color: hsl(var(--foreground));
  width: 100%;
}

.input:focus {
  outline: none;
  border-color: hsl(var(--primary));
}

.badge {
  background-color: hsl(var(--muted));
  color: hsl(var(--muted-foreground));
  border-radius: calc(var(--radius) * 2);
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 500;
}

/* Utility Classes */
.text-muted {
  color: hsl(var(--muted-foreground));
}

.bg-surface {
  background-color: hsl(var(--surface));
}

.border-default {
  border: 1px solid hsl(var(--border));
}
`;
}

export function generateTailwindConfig(style: DesignStyle): string {
  return `// tailwind.config.ts - ${style.name} Theme
// ${style.description}

import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: [${style.fonts.heading.split(',').map(f => `"${f.trim().replace(/"/g, '')}"`).join(', ')}],
        body: [${style.fonts.body.split(',').map(f => `"${f.trim().replace(/"/g, '')}"`).join(', ')}],
      },
      colors: {
        primary: {
          DEFAULT: "hsl(${style.colors.primary})",
          foreground: "hsl(${style.colors.primaryForeground})",
        },
        accent: {
          DEFAULT: "hsl(${style.colors.accent})",
          foreground: "hsl(${style.colors.accentForeground})",
        },
        background: "hsl(${style.colors.background})",
        foreground: "hsl(${style.colors.foreground})",
        surface: {
          DEFAULT: "hsl(${style.colors.surface})",
          foreground: "hsl(${style.colors.surfaceForeground})",
        },
        muted: {
          DEFAULT: "hsl(${style.colors.muted})",
          foreground: "hsl(${style.colors.mutedForeground})",
        },
        border: "hsl(${style.colors.border})",
      },
      borderRadius: {
        DEFAULT: "${style.radius}",
      },
    },
  },
  plugins: [],
} satisfies Config;
`;
}

export function getFullExportCode(style: DesignStyle): string {
  return `/*
 * ═══════════════════════════════════════════════════════════════
 * ${style.name.toUpperCase()} DESIGN SYSTEM
 * ═══════════════════════════════════════════════════════════════
 * 
 * ${style.description}
 * 
 * CHARACTERISTICS:
${style.characteristics.map(c => ` * • ${c}`).join('\n')}
 * 
 * USAGE:
 * 1. Copy the CSS variables below into your global styles
 * 2. Import the suggested fonts (links provided below)
 * 3. Apply the component classes as needed
 * 
 * ═══════════════════════════════════════════════════════════════
 */

/* FONT IMPORTS */
/* Add these to your HTML <head> or import in CSS: */
/*
${getFontImports(style)}
*/

/* ─────────────────────────────────────────────────────────────── */
/* CSS VARIABLES */
/* ─────────────────────────────────────────────────────────────── */

${generateStyleCSS(style)}

/* ─────────────────────────────────────────────────────────────── */
/* TAILWIND CONFIG (optional) */
/* ─────────────────────────────────────────────────────────────── */

/*
${generateTailwindConfig(style)}
*/
`;
}

function getFontImports(style: DesignStyle): string {
  const imports: string[] = [];

  if (style.fonts.heading.includes('Playfair')) {
    imports.push('<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet">');
  }
  if (style.fonts.body.includes('Work Sans')) {
    imports.push('<link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">');
  }
  if (style.fonts.body.includes('Inter') || style.fonts.heading.includes('Inter')) {
    imports.push('<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">');
  }
  if (style.fonts.heading.includes('Space Grotesk') || style.fonts.body.includes('Space Grotesk')) {
    imports.push('<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">');
  }
  if (style.fonts.body.includes('Source Sans')) {
    imports.push('<link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;600&display=swap" rel="stylesheet">');
  }
  if (style.fonts.body.includes('Roboto') || style.fonts.heading.includes('Roboto')) {
    imports.push('<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">');
  }
  if (style.fonts.mono?.includes('Roboto Mono')) {
    imports.push('<link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500&display=swap" rel="stylesheet">');
  }
  if (style.fonts.mono?.includes('JetBrains Mono')) {
    imports.push('<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">');
  }
  if (style.fonts.mono?.includes('Fira Code')) {
    imports.push('<link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500&display=swap" rel="stylesheet">');
  }

  return imports.length > 0 ? imports.join('\n') : '<!-- System fonts used - no imports needed -->';
}
