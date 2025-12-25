import { type DesignStyle } from '@/lib/designStyles';
import { Calendar, Clock, User, Tag, Share2, Bookmark } from 'lucide-react';

interface BlogPreviewProps {
    style: DesignStyle;
    cardStyle: string;
    isMobile?: boolean; // Added isMobile prop
}

export function BlogPreview({ style, cardStyle, isMobile = false }: BlogPreviewProps) {
    return (
        <div className="mt-20 border-t border-border/30 pt-20 animate-fade-in">
            <div className={`grid gap-12 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-12'}`}>

                {/* Main Article Content */}
                <div className={isMobile ? 'col-span-1' : 'lg:col-span-8'}>
                    <div className="mb-8">
                        <div className="flex items-center gap-4 text-xs font-medium opacity-60 mb-4 uppercase tracking-wider">
                            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Dec 28, 2024</span>
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 5 min read</span>
                            <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">Design Engineering</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-[1.1]" style={{ fontFamily: style.fonts.heading }}>
                            The Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent" style={{ backgroundImage: `linear-gradient(to right, hsl(${style.colors.primary}), hsl(${style.colors.accent}))` }}>Algorithmic Design</span> Systems
                        </h1>

                        <p className="text-xl md:text-2xl leading-relaxed opacity-80 mb-8" style={{ fontFamily: style.fonts.heading, color: `hsl(${style.colors.mutedForeground})` }}>
                            How agentic workflows and token-based architectures are reshaping the way we build digital interfaces.
                        </p>
                    </div>

                    <div
                        className="w-full aspect-[2/1] rounded-2xl bg-muted mb-12 relative overflow-hidden group"
                        style={{ borderRadius: style.radius }}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=1200"
                            alt="Abstract 3D Shape"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
                    </div>

                    <article className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-p:leading-relaxed prose-p:opacity-90" style={{ color: `hsl(${style.colors.foreground})` }}>
                        <p className="mb-6">
                            In the rapidly evolving landscape of frontend development, the distinction between "design" and "engineering" is becoming increasingly blurred. We are moving towards a unified <strong>Design Protocol</strong> where tokens are the single source of truth.
                        </p>

                        <h3 className="text-2xl font-bold mt-10 mb-4" style={{ fontFamily: style.fonts.heading }}>The Atomic Shift</h3>
                        <p className="mb-6">
                            Traditional design handoffs are lossy. By adopting a system where <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono border border-border">designStyles.ts</code> drives both the Figma preview and the production React components, we eliminate the translation layer entirely.
                        </p>

                        <blockquote
                            className="pl-6 border-l-4 my-8 italic text-xl"
                            style={{
                                borderColor: `hsl(${style.colors.accent})`,
                                color: `hsl(${style.colors.mutedForeground})`
                            }}
                        >
                            "The interface is no longer a static canvas, but a function of state."
                        </blockquote>

                        <h3 className="text-2xl font-bold mt-10 mb-4" style={{ fontFamily: style.fonts.heading }}>Implementation Stats</h3>
                        <ul className="list-disc pl-6 space-y-2 mb-8 opacity-80">
                            <li><strong>40% Reduction</strong> in design debt</li>
                            <li><strong>Zero</strong> latency in style updates</li>
                            <li><strong>100%</strong> consistency across deployment nodes</li>
                        </ul>
                    </article>

                    <div className="mt-12 flex items-center justify-between pt-8 border-t border-border">
                        <div className="flex items-center gap-4">
                            <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-muted transition-colors border border-transparent hover:border-border">
                                <Share2 className="w-4 h-4" />
                                <span className="text-sm font-medium">Share</span>
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-muted transition-colors border border-transparent hover:border-border">
                                <Bookmark className="w-4 h-4" />
                                <span className="text-sm font-medium">Save</span>
                            </button>
                        </div>
                        <div className="flex gap-2">
                            {['#UI', '#Systems', '#Future'].map(tag => (
                                <span key={tag} className="text-xs font-mono opacity-50 hover:opacity-100 cursor-pointer">{tag}</span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar / Table of Contents */}
                <div className={`${isMobile ? 'col-span-1 space-y-8' : 'lg:col-span-4 space-y-8'}`}>
                    <div
                        className={`p-6 ${cardStyle}`}
                        style={{
                            backgroundColor: `hsl(${style.colors.surface})`,
                            borderRadius: style.radius
                        }}
                    >
                        <h4 className="text-xs font-black uppercase tracking-widest mb-6 opacity-50">Author</h4>
                        <div className="flex items-center gap-4 mb-4">
                            <div
                                className="w-12 h-12 rounded-full flex items-center justify-center text-white"
                                style={{ background: `linear-gradient(135deg, hsl(${style.colors.primary}), hsl(${style.colors.accent}))` }}
                            >
                                <User className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="font-bold">Sarah Jenkins</p>
                                <p className="text-xs opacity-60">Principal Architect</p>
                            </div>
                        </div>
                        <button
                            className="w-full py-2 text-xs font-bold uppercase tracking-widest border border-border hover:bg-foreground hover:text-background transition-colors"
                            style={{ borderRadius: style.radius }}
                        >
                            Follow
                        </button>
                    </div>

                    <div
                        className={`p-6 ${cardStyle}`}
                        style={{
                            backgroundColor: `hsl(${style.colors.surface})`,
                            borderRadius: style.radius
                        }}
                    >
                        <h4 className="text-xs font-black uppercase tracking-widest mb-6 opacity-50">On this page</h4>
                        <ul className="space-y-4 text-sm">
                            {[
                                { label: 'Introduction', active: false },
                                { label: 'The Atomic Shift', active: true },
                                { label: 'Code As Design', active: false },
                                { label: 'Implementation Stats', active: false },
                                { label: 'Conclusion', active: false },
                            ].map((item, i) => (
                                <li
                                    key={i}
                                    className={`flex items-center gap-3 cursor-pointer transition-colors ${item.active ? 'text-primary font-bold' : 'opacity-60 hover:opacity-100'}`}
                                    style={{ color: item.active ? `hsl(${style.colors.primary})` : 'inherit' }}
                                >
                                    <div className={`w-1.5 h-1.5 rounded-full ${item.active ? 'bg-primary' : 'bg-border'}`} style={{ backgroundColor: item.active ? `hsl(${style.colors.primary})` : undefined }} />
                                    {item.label}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Ad / Promo Unit */}
                    <div
                        className="p-8 text-center relative overflow-hidden group cursor-pointer"
                        style={{
                            backgroundColor: `hsl(${style.colors.primary})`,
                            color: `hsl(${style.colors.primaryForeground})`,
                            borderRadius: style.radius
                        }}
                    >
                        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent" />
                        <h4 className="relative font-black text-xl mb-2">Vibe Conf 2025</h4>
                        <p className="relative text-xs opacity-80 mb-4">Join the design revolution.</p>
                        <div className="relative inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded text-xs font-bold uppercase tracking-widest group-hover:bg-white/30 transition-colors">
                            Get Tickets
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
