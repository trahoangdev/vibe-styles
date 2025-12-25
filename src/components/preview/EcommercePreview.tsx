import { type DesignStyle } from '@/lib/designStyles';
import { ShoppingCart, Heart, Star, Filter, ArrowRight } from 'lucide-react';

interface EcommercePreviewProps {
    style: DesignStyle;
    cardStyle: string;
}

export function EcommercePreview({ style, cardStyle }: EcommercePreviewProps) {
    const products = [
        { name: 'Vibe Core Node', price: '$299', rating: 5, category: 'Hardware' },
        { name: 'Neural Link v2', price: '$89', rating: 4, category: 'Interface' },
        { name: 'Protocol Alpha', price: '$599', rating: 5, category: 'Enterprise' },
        { name: 'Sync Module', price: '$149', rating: 4, category: 'Utility' },
    ];

    return (
        <div className="mt-20 border-t border-border/30 pt-20 animate-fade-in">
            <div className="flex items-center justify-between mb-10">
                <div>
                    <h3 className="text-2xl font-black uppercase tracking-tighter" style={{ fontFamily: style.fonts.heading }}>
                        Product Catalog
                    </h3>
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">Aesthetic Hardware Solutions</p>
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-2.5 rounded-xl border border-border hover:bg-muted transition-all">
                        <Filter className="w-4 h-4 opacity-40" />
                    </button>
                    <div className="relative">
                        <button className="p-2.5 rounded-xl bg-foreground text-background shadow-lg active:scale-95 transition-all">
                            <ShoppingCart className="w-4 h-4" />
                        </button>
                        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-[8px] font-black flex items-center justify-center border-2 border-surface" style={{ backgroundColor: `hsl(${style.colors.primary})`, color: `hsl(${style.colors.primaryForeground})` }}>
                            3
                        </span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product, i) => (
                    <div
                        key={i}
                        className={`group ${cardStyle} overflow-hidden flex flex-col`}
                        style={{
                            backgroundColor: `hsl(${style.colors.surface})`,
                            borderRadius: style.radius
                        }}
                    >
                        <div className="aspect-square bg-muted/30 relative overflow-hidden group-hover:scale-[1.02] transition-transform">
                            <div
                                className="absolute inset-0 opacity-10 blur-2xl group-hover:opacity-20 transition-opacity"
                                style={{ backgroundColor: `hsl(${style.colors.primary})` }}
                            />
                            <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-40 group-hover:rotate-12 transition-all">
                                <Star className="w-20 h-20" />
                            </div>
                            <button className="absolute top-3 right-3 p-2 rounded-full bg-surface/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all hover:text-error">
                                <Heart className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="p-5 flex-1 flex flex-col">
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-[8px] font-black uppercase tracking-widest opacity-40">{product.category}</span>
                                <div className="flex gap-0.5">
                                    {[...Array(5)].map((_, j) => (
                                        <Star
                                            key={j}
                                            className={`w-2 h-2 ${j < product.rating ? 'fill-accent text-accent' : 'text-muted-foreground/20'}`}
                                            style={{ color: j < product.rating ? `hsl(${style.colors.accent})` : 'inherit' }}
                                        />
                                    ))}
                                </div>
                            </div>
                            <h4 className="font-black text-sm uppercase tracking-tight mb-4 group-hover:text-primary transition-colors">{product.name}</h4>
                            <div className="mt-auto flex items-center justify-between pt-4 border-t border-border/30">
                                <p className="font-black text-lg tracking-tighter">{product.price}</p>
                                <button
                                    className="p-2 rounded-lg bg-muted hover:bg-foreground hover:text-background transition-all active:scale-90"
                                    style={{ borderRadius: style.radius }}
                                >
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
