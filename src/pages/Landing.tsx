import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Palette,
  Zap,
  Download,
  Eye,
  Keyboard,
  ArrowRight,
  Github,
  Check,
  Monitor,
  Tablet,
  Smartphone,
  Moon,
  Sun,
  Play,
  ChevronDown,
} from 'lucide-react';
import {
  SiLinear,
  SiSpotify,
  SiVercel,
  SiStripe,
  SiGithub,
  SiDiscord,
  SiNotion,
  SiApple,
  SiTailwindcss,
} from '@icons-pack/react-simple-icons';
import { Button } from '@/components/ui/button';
import { useState, useEffect, useRef } from 'react';

const designStyles = [
  { name: 'Linear', icon: SiLinear, color: '#5E6AD2' },
  { name: 'Spotify', icon: SiSpotify, color: '#1DB954' },
  { name: 'Vercel', icon: SiVercel, color: 'currentColor' },
  { name: 'Stripe', icon: SiStripe, color: '#635BFF' },
  { name: 'GitHub', icon: SiGithub, color: 'currentColor' },
  { name: 'Discord', icon: SiDiscord, color: '#5865F2' },
  { name: 'Notion', icon: SiNotion, color: 'currentColor' },
  { name: 'Apple', icon: SiApple, color: 'currentColor' },
  { name: 'Tailwind', icon: SiTailwindcss, color: '#06B6D4' },
];

const features = [
  {
    icon: Palette,
    title: '19+ Design Presets',
    description: 'From Linear, Spotify to Vercel - explore the world\'s best design systems.',
    gradient: 'from-violet-500 to-purple-500',
  },
  {
    icon: Zap,
    title: 'Real-time Editor',
    description: 'Edit colors, typography, radius and see changes instantly.',
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    icon: Download,
    title: 'One-Click Export',
    description: 'Export CSS Variables or Tailwind Config ready for production.',
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    icon: Eye,
    title: 'Live Previews',
    description: 'Preview your theme on 20+ components: Dashboard, E-commerce, Auth...',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Keyboard,
    title: 'Keyboard First',
    description: 'Command Palette (Ctrl+K), shortcuts and fast navigation.',
    gradient: 'from-pink-500 to-rose-500',
  },
];

const previewComponents = [
  'Dashboard', 'E-commerce', 'Authentication', 'Blog', 'Kanban',
  'Charts', 'Music Player', 'Fintech', 'Landing', 'Tables',
];

// Floating particles component
const FloatingParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-zinc-500/20 to-zinc-400/20"
        initial={{
          x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
          y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
        }}
        animate={{
          x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
          y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
        }}
        transition={{
          duration: Math.random() * 20 + 20,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'linear',
        }}
      />
    ))}
  </div>
);

export default function Landing() {
  const [isDark, setIsDark] = useState(true);
  const [activeStyle, setActiveStyle] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStyle((prev) => (prev + 1) % designStyles.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Gradient Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-500/5 via-transparent to-zinc-400/5" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-zinc-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-zinc-400/10 rounded-full blur-3xl" />
      </div>
      
      <FloatingParticles />

      {/* Navigation */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-xl border-b border-border/50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-600 to-zinc-800 rounded-lg blur opacity-50" />
                <img src="/logo.png" alt="Vibe Styles" className="relative w-8 h-8 rounded-lg" />
              </div>
              <span className="font-bold text-lg tracking-tight">Vibe Styles</span>
            </motion.div>
            <div className="flex items-center gap-2">
              <motion.button
                onClick={() => setIsDark(!isDark)}
                className="p-2.5 rounded-xl hover:bg-muted transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  initial={false}
                  animate={{ rotate: isDark ? 0 : 180 }}
                  transition={{ duration: 0.3 }}
                >
                  {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </motion.div>
              </motion.button>
              <motion.a
                href="https://github.com/trahoangdev/vibe-styles"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl hover:bg-muted transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="w-5 h-5" />
              </motion.a>
              <Link to="/app">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button size="sm" className="ml-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 shadow-lg shadow-zinc-500/25">
                    Launch App
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </motion.div>
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col justify-center"
        style={{ opacity: heroOpacity, scale: heroScale }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            {/* Animated Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <motion.div 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-zinc-500/10 to-zinc-400/10 border border-zinc-500/20 backdrop-blur-sm"
                whileHover={{ scale: 1.02, borderColor: 'rgba(113, 113, 122, 0.4)' }}
              >
                <motion.div
                  className="w-2 h-2 rounded-full bg-green-500"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-sm font-medium text-foreground">
                  Design System Generator
                </span>
              </motion.div>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="block">Build beautiful</span>
              <span className="block mt-2 text-foreground">
                Design Systems
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Explore, customize and export design systems from top brands.
              From Linear to Spotify, all in one tool.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link to="/app">
                <motion.div 
                  whileHover={{ scale: 1.02, y: -2 }} 
                  whileTap={{ scale: 0.98 }}
                  className="relative group"
                >
                  <div className="absolute -inset-1 bg-zinc-900 dark:bg-white rounded-2xl blur opacity-40 group-hover:opacity-60 transition duration-300" />
                  <Button size="lg" className="relative w-full sm:w-auto text-base px-8 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 border-0">
                    <Play className="w-5 h-5 mr-2 fill-current" />
                    Get Started
                  </Button>
                </motion.div>
              </Link>
              <motion.a
                href="https://github.com/trahoangdev/vibe-styles"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-base px-8 rounded-xl border-border/50 hover:bg-muted/50 backdrop-blur-sm">
                  <Github className="w-5 h-5 mr-2" />
                  View on GitHub
                </Button>
              </motion.a>
            </motion.div>
          </div>

          {/* Animated Brand Icons */}
          <motion.div
            className="mt-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <motion.p 
              className="text-center text-sm text-muted-foreground mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Inspired by the world's best design systems
            </motion.p>
            <div className="flex flex-wrap justify-center gap-3">
              {designStyles.map((style, index) => (
                <motion.div
                  key={style.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.05 }}
                  whileHover={{ scale: 1.08, y: -4 }}
                  className={`flex items-center gap-2.5 px-5 py-2.5 rounded-full border backdrop-blur-sm transition-all duration-300 cursor-pointer ${
                    activeStyle === index
                      ? 'border-zinc-500/50 bg-zinc-500/10 shadow-lg shadow-zinc-500/10'
                      : 'border-border/50 bg-card/50 hover:border-border hover:bg-card'
                  }`}
                >
                  <style.icon size={18} color={style.color} />
                  <span className="text-sm font-medium">{style.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="flex flex-col items-center gap-2 text-muted-foreground"
            >
              <span className="text-xs">Scroll to explore</span>
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Preview Mockup */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Glow Effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-zinc-500/20 via-zinc-400/20 to-zinc-500/20 rounded-3xl blur-2xl opacity-50" />
            
            <div className="relative rounded-2xl overflow-hidden border border-border/50 bg-card/80 backdrop-blur-xl shadow-2xl">
              {/* Browser Chrome */}
              <div className="flex items-center gap-4 px-4 py-3 bg-muted/30 border-b border-border/50">
                <div className="flex gap-2">
                  <motion.div 
                    className="w-3 h-3 rounded-full bg-red-500/80"
                    whileHover={{ scale: 1.2 }}
                  />
                  <motion.div 
                    className="w-3 h-3 rounded-full bg-yellow-500/80"
                    whileHover={{ scale: 1.2 }}
                  />
                  <motion.div 
                    className="w-3 h-3 rounded-full bg-green-500/80"
                    whileHover={{ scale: 1.2 }}
                  />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="px-6 py-1.5 rounded-lg bg-background/50 border border-border/50 text-xs text-muted-foreground flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                    vibe-styles.app
                  </div>
                </div>
                <div className="w-16" />
              </div>
              
              {/* App Preview */}
              <motion.div 
                className="aspect-video bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 relative overflow-hidden"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="/og-image.png"
                  alt="Vibe Styles Preview"
                  className="w-full h-full object-cover"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent" />
        
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.span 
              className="inline-block text-sm font-medium text-zinc-500 mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              FEATURES
            </motion.span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Everything you need to create
              <br />
              <span className="text-foreground">
                the perfect Design System
              </span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A comprehensive tool to explore, customize and export design systems in minutes.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="group relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <motion.div
                  className="relative p-8 rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm h-full transition-all duration-300 hover:border-zinc-500/30 hover:bg-card/80"
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                >
                  {/* Icon with gradient background */}
                  <motion.div 
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-lg`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <feature.icon className="w-7 h-7 text-white" />
                  </motion.div>
                  
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  
                  {/* Hover glow */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`} />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Responsive Preview Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block text-sm font-medium text-zinc-500 mb-4">
                RESPONSIVE
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                Preview on
                <br />
                <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                  every device
                </span>
              </h2>
              <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
                Test your design system on Desktop, Tablet and Mobile with one click.
                Ensure perfect UI across all screen sizes.
              </p>
              <div className="flex gap-8">
                {[
                  { icon: Monitor, label: 'Desktop', color: 'text-zinc-500' },
                  { icon: Tablet, label: 'Tablet', color: 'text-blue-500' },
                  { icon: Smartphone, label: 'Mobile', color: 'text-emerald-500' },
                ].map((device, i) => (
                  <motion.div 
                    key={device.label}
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <device.icon className={`w-5 h-5 ${device.color}`} />
                    <span className="text-muted-foreground">{device.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative flex items-end justify-center gap-4">
                {/* Desktop */}
                <motion.div 
                  className="relative"
                  whileHover={{ y: -8 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="absolute -inset-2 bg-gradient-to-r from-zinc-500/20 to-zinc-400/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="w-64 rounded-xl border border-border/50 bg-card/80 backdrop-blur-sm p-2 shadow-xl">
                    <div className="aspect-video rounded-lg bg-gradient-to-br from-zinc-500/20 via-zinc-400/10 to-zinc-500/20 flex items-center justify-center">
                      <Monitor className="w-10 h-10 text-zinc-500/50" />
                    </div>
                  </div>
                </motion.div>
                
                {/* Tablet */}
                <motion.div 
                  className="relative -ml-8"
                  whileHover={{ y: -8 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="w-32 rounded-xl border border-border/50 bg-card/80 backdrop-blur-sm p-2 shadow-xl">
                    <div className="aspect-[3/4] rounded-lg bg-gradient-to-br from-blue-500/20 via-cyan-500/10 to-teal-500/20 flex items-center justify-center">
                      <Tablet className="w-8 h-8 text-blue-500/50" />
                    </div>
                  </div>
                </motion.div>
                
                {/* Mobile */}
                <motion.div 
                  className="relative -ml-6"
                  whileHover={{ y: -8 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="w-20 rounded-xl border border-border/50 bg-card/80 backdrop-blur-sm p-1.5 shadow-xl">
                    <div className="aspect-[9/16] rounded-lg bg-gradient-to-br from-emerald-500/20 via-green-500/10 to-teal-500/20 flex items-center justify-center">
                      <Smartphone className="w-5 h-5 text-emerald-500/50" />
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Components Preview */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent" />
        
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block text-sm font-medium text-zinc-500 mb-4">
              PREVIEWS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              20+ Component Previews
            </h2>
            <p className="text-muted-foreground text-lg">
              See your theme on real-world use cases
            </p>
          </motion.div>

          {/* Animated Tags */}
          <div className="relative">
            <motion.div
              className="flex flex-wrap justify-center gap-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              {previewComponents.map((component, index) => (
                <motion.div
                  key={component}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.08, y: -4 }}
                  className="px-5 py-2.5 rounded-full bg-card/50 border border-border/50 backdrop-blur-sm text-sm font-medium cursor-pointer hover:border-zinc-500/30 hover:bg-zinc-500/5 transition-all duration-300"
                >
                  {component}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Export Options */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              className="order-2 lg:order-1"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative group">
                {/* Glow effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-zinc-500/20 to-zinc-400/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                
                <div className="relative rounded-2xl border border-border/50 bg-zinc-950 overflow-hidden shadow-2xl">
                  {/* Code header */}
                  <div className="flex items-center gap-3 px-4 py-3 bg-zinc-900/50 border-b border-zinc-800">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                      <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <span className="text-zinc-500 text-sm font-mono">tailwind.config.ts</span>
                  </div>
                  
                  {/* Code content */}
                  <motion.pre 
                    className="p-6 text-sm font-mono overflow-x-auto"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <code className="text-zinc-300">
                      <span className="text-purple-400">export default</span> {'{'}
                      {'\n'}  <span className="text-zinc-500">theme:</span> {'{'}
                      {'\n'}    <span className="text-zinc-500">extend:</span> {'{'}
                      {'\n'}      <span className="text-zinc-500">colors:</span> {'{'}
                      {'\n'}        <span className="text-emerald-400">primary</span>: <span className="text-amber-300">"hsl(259 94% 68%)"</span>,
                      {'\n'}        <span className="text-emerald-400">accent</span>: <span className="text-amber-300">"hsl(259 94% 68%)"</span>,
                      {'\n'}        <span className="text-emerald-400">background</span>: <span className="text-amber-300">"hsl(228 14% 8%)"</span>,
                      {'\n'}        <span className="text-emerald-400">surface</span>: <span className="text-amber-300">"hsl(228 14% 11%)"</span>,
                      {'\n'}      {'}'},
                      {'\n'}      <span className="text-zinc-500">borderRadius:</span> {'{'}
                      {'\n'}        <span className="text-emerald-400">DEFAULT</span>: <span className="text-amber-300">"0.625rem"</span>,
                      {'\n'}      {'}'},
                      {'\n'}    {'}'},
                      {'\n'}  {'}'},
                      {'\n'}{'}'}
                    </code>
                  </motion.pre>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="order-1 lg:order-2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block text-sm font-medium text-zinc-500 mb-4">
                EXPORT
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                Production
                <br />
                <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                  Ready Export
                </span>
              </h2>
              <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
                Export your theme as CSS Variables or Tailwind Config.
                Copy and paste directly into your project.
              </p>
              <ul className="space-y-4">
                {[
                  'CSS Variables with full color palette',
                  'Tailwind Config with custom theme',
                  'Typography and spacing tokens',
                  'Component class examples',
                ].map((item, index) => (
                  <motion.li 
                    key={item} 
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    <motion.div 
                      className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20"
                      whileHover={{ scale: 1.2 }}
                    >
                      <Check className="w-3.5 h-3.5 text-white" />
                    </motion.div>
                    <span className="text-foreground">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="relative text-center p-16 rounded-3xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-500/20 via-zinc-400/10 to-zinc-500/20" />
            <div className="absolute inset-0 backdrop-blur-3xl" />
            <div className="absolute inset-[1px] rounded-3xl bg-card/50" />
            
            {/* Animated border */}
            <div className="absolute inset-0 rounded-3xl border border-zinc-500/20" />
            
            {/* Content */}
            <div className="relative">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-zinc-900 dark:bg-white flex items-center justify-center shadow-2xl shadow-zinc-500/30"
              >
                <Zap className="w-10 h-10 text-white dark:text-zinc-900" />
              </motion.div>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                Ready to create your Design System?
              </h2>
              <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
                Start for free. No signup required. Explore the world's best design systems now.
              </p>
              <Link to="/app">
                <motion.div 
                  whileHover={{ scale: 1.02, y: -2 }} 
                  whileTap={{ scale: 0.98 }}
                  className="inline-block"
                >
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-zinc-900 dark:bg-white rounded-2xl blur opacity-40 group-hover:opacity-60 transition duration-300" />
                    <Button size="lg" className="relative px-10 py-6 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 border-0 text-lg font-semibold">
                      Launch Vibe Styles
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-zinc-600 rounded-lg blur opacity-30" />
                <img src="/logo.png" alt="Vibe Styles" className="relative w-6 h-6 rounded-lg" />
              </div>
              <span className="font-semibold">Vibe Styles</span>
            </motion.div>
            <p className="text-sm text-muted-foreground">
              Built with ❤️ using React, Tailwind CSS & Framer Motion by trahoangdev
            </p>
            <motion.a
              href="https://github.com/trahoangdev/vibe-styles"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl hover:bg-muted transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-5 h-5" />
            </motion.a>
          </div>
        </div>
      </footer>
    </div>
  );
}
