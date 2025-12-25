import { useState } from 'react';
import { Download, ChevronDown, ChevronUp, Copy, FileCode } from 'lucide-react';
import { useThemeExport, ThemeConfig } from '@/hooks/use-theme-export';
import { useToast } from '@/hooks/use-toast';

interface ExportSectionProps {
    currentTheme: ThemeConfig;
    isOpen: boolean;
    onToggle: () => void;
}

export function ExportSection({
    currentTheme,
    isOpen,
    onToggle
}: ExportSectionProps) {
    const { toast } = useToast();
    const {
        generateCSSExport,
        generateTailwindExport,
        generateJSONExport,
        generateSCSSExport,
        generateStyledComponentsExport,
        generateFigmaTokensExport
    } = useThemeExport(currentTheme);
    const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

    const copyToClipboard = async (format: 'css' | 'tailwind' | 'json' | 'scss' | 'styled' | 'figma') => {
        let content = '';
        switch (format) {
            case 'css': content = generateCSSExport(); break;
            case 'tailwind': content = generateTailwindExport(); break;
            case 'json': content = generateJSONExport(); break;
            case 'scss': content = generateSCSSExport(); break;
            case 'styled': content = generateStyledComponentsExport(); break;
            case 'figma': content = generateFigmaTokensExport(); break;
        }

        await navigator.clipboard.writeText(content);
        setCopiedFormat(format);
        toast({
            title: 'Copied to Clipboard!',
            description: `Target: ${format.toUpperCase()}`,
        });
        setTimeout(() => setCopiedFormat(null), 2000);
    };

    const downloadJSON = () => {
        // ... (existing implementation)
    };

    return (
        <section className="border-t border-border/50 mb-8">
            <button
                onClick={onToggle}
                className="w-full py-4 flex items-center justify-between group"
            >
                <div className="flex items-center gap-3">
                    <Download className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                    <span className="text-xs font-black uppercase tracking-widest">Sync & Deploy</span>
                </div>
                {isOpen ? <ChevronUp className="w-4 h-4 opacity-30" /> : <ChevronDown className="w-4 h-4 opacity-30" />}
            </button>

            {isOpen && (
                <div className="space-y-6 pb-4 animate-fade-in pl-1">

                    {/* Web Standards */}
                    <div className="space-y-2">
                        <h4 className="text-[9px] font-black uppercase tracking-[0.2em] opacity-40 pl-1">Web Standards</h4>
                        <div className="grid grid-cols-2 gap-2">
                            <button onClick={() => copyToClipboard('css')} className="p-3 bg-muted/50 border border-border rounded-xl hover:bg-muted transition-colors text-left group">
                                <p className="text-[10px] font-bold">CSS Variables</p>
                                <p className="text-[8px] opacity-50">Native Support</p>
                            </button>
                            <button onClick={() => copyToClipboard('scss')} className="p-3 bg-muted/50 border border-border rounded-xl hover:bg-muted transition-colors text-left group">
                                <p className="text-[10px] font-bold">SCSS</p>
                                <p className="text-[8px] opacity-50">Sass Modules</p>
                            </button>
                        </div>
                    </div>

                    {/* Frameworks */}
                    <div className="space-y-2">
                        <h4 className="text-[9px] font-black uppercase tracking-[0.2em] opacity-40 pl-1">Frameworks</h4>
                        <div className="space-y-2">
                            <button
                                onClick={() => copyToClipboard('tailwind')}
                                className="w-full flex items-center justify-between px-4 py-3 bg-muted/30 border border-border rounded-xl transition-all hover:bg-muted group"
                            >
                                <div className="text-left">
                                    <p className="text-[10px] font-bold">Tailwind Config</p>
                                    <p className="text-[8px] opacity-50">config.js / config.ts</p>
                                </div>
                                <FileCode className="w-3 h-3 opacity-30 group-hover:opacity-100" />
                            </button>
                            <button
                                onClick={() => copyToClipboard('styled')}
                                className="w-full flex items-center justify-between px-4 py-3 bg-muted/30 border border-border rounded-xl transition-all hover:bg-muted group"
                            >
                                <div className="text-left">
                                    <p className="text-[10px] font-bold">Styled Components</p>
                                    <p className="text-[8px] opacity-50">CSS-in-JS Theme</p>
                                </div>
                                <FileCode className="w-3 h-3 opacity-30 group-hover:opacity-100" />
                            </button>
                        </div>
                    </div>

                    {/* Design to Code */}
                    <div className="space-y-2">
                        <h4 className="text-[9px] font-black uppercase tracking-[0.2em] opacity-40 pl-1">Design Tokens</h4>
                        <div className="grid grid-cols-2 gap-2">
                            <button onClick={() => copyToClipboard('json')} className="p-3 bg-muted/50 border border-border rounded-xl hover:bg-muted transition-colors text-left">
                                <p className="text-[10px] font-bold">Raw JSON</p>
                                <p className="text-[8px] opacity-50">Universal Format</p>
                            </button>
                            <button onClick={() => copyToClipboard('figma')} className="p-3 bg-muted/50 border border-border rounded-xl hover:bg-muted transition-colors text-left">
                                <p className="text-[10px] font-bold">Figma Tokens</p>
                                <p className="text-[8px] opacity-50">Tokens Studio</p>
                            </button>
                        </div>
                    </div>

                    <div className="pt-2">
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                toast({ title: "Deployment Ready", description: "Connect your Git repository to Vercel to ship this theme.", });
                            }}
                            className="block text-center text-[10px] font-medium text-muted-foreground hover:text-foreground transition-colors"
                        >
                            deploy with vercel
                        </a>
                    </div>
                </div>
            )}
        </section>
    );
}
