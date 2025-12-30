import { useState, useMemo } from 'react';
import { Download, ChevronDown, ChevronUp, Copy, Check, FileCode, Eye } from 'lucide-react';
import { useThemeExport, ThemeConfig } from '@/hooks/use-theme-export';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

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

    const [previewFormat, setPreviewFormat] = useState<string>('css');
    const [copied, setCopied] = useState(false);

    const codeContent = useMemo(() => {
        switch (previewFormat) {
            case 'css': return generateCSSExport();
            case 'tailwind': return generateTailwindExport();
            case 'json': return generateJSONExport();
            default: return '';
        }
    }, [previewFormat, currentTheme, generateCSSExport, generateTailwindExport, generateJSONExport]);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(codeContent);
        setCopied(true);
        toast({
            title: 'Copied to Clipboard',
            description: `${previewFormat.toUpperCase()} code copied.`,
        });
        setTimeout(() => setCopied(false), 2000);
    };

    const copyFormat = async (formatName: string, content: string) => {
        await navigator.clipboard.writeText(content);
        toast({
            title: 'Copied to Clipboard',
            description: `Exported as ${formatName}`,
        });
    };

    return (
        <section className="border-t border-border/50 mb-8">
            <button
                onClick={onToggle}
                className="w-full py-4 flex items-center justify-between group"
            >
                <div className="flex items-center gap-3">
                    <Download className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                    <span className="text-xs font-black uppercase tracking-widest">Sync</span>
                </div>
                {isOpen ? <ChevronUp className="w-4 h-4 opacity-30" /> : <ChevronDown className="w-4 h-4 opacity-30" />}
            </button>

            {isOpen && (
                <div className="space-y-6 pb-4 animate-fade-in pl-1">

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <h4 className="text-[9px] font-black uppercase tracking-[0.2em] opacity-40 pl-1">Code Preview</h4>
                        </div>

                        <Tabs defaultValue="css" onValueChange={setPreviewFormat} className="w-full">
                            <div className="flex items-center justify-between mb-2">
                                <TabsList className="h-8 p-0.5 bg-muted/50 rounded-lg">
                                    <TabsTrigger value="css" className="text-[10px] h-7 px-3 rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm">CSS</TabsTrigger>
                                    <TabsTrigger value="tailwind" className="text-[10px] h-7 px-3 rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm">Tailwind</TabsTrigger>
                                    <TabsTrigger value="json" className="text-[10px] h-7 px-3 rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm">JSON</TabsTrigger>
                                </TabsList>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <button
                                            onClick={handleCopy}
                                            className="h-7 px-2 flex items-center gap-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-md transition-colors"
                                        >
                                            <span className="text-[10px] font-bold uppercase">{copied ? 'Copied' : 'Copy'}</span>
                                            {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                        </button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Copy code to clipboard</p>
                                    </TooltipContent>
                                </Tooltip>
                            </div>

                            <div className="relative group/code">
                                <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/5 pointer-events-none rounded-lg" />
                                <TabsContent value="css" className="mt-0">
                                    <pre className="p-3 rounded-lg bg-[#1e1e1e] border border-white/5 text-[10px] font-mono leading-relaxed text-gray-300 overflow-x-auto max-h-[300px] scrollbar-thin">
                                        <code>{codeContent}</code>
                                    </pre>
                                </TabsContent>
                                <TabsContent value="tailwind" className="mt-0">
                                    <pre className="p-3 rounded-lg bg-[#1e1e1e] border border-white/5 text-[10px] font-mono leading-relaxed text-gray-300 overflow-x-auto max-h-[300px] scrollbar-thin">
                                        <code>{codeContent}</code>
                                    </pre>
                                </TabsContent>
                                <TabsContent value="json" className="mt-0">
                                    <pre className="p-3 rounded-lg bg-[#1e1e1e] border border-white/5 text-[10px] font-mono leading-relaxed text-gray-300 overflow-x-auto max-h-[300px] scrollbar-thin">
                                        <code>{codeContent}</code>
                                    </pre>
                                </TabsContent>
                            </div>
                        </Tabs>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-border/10">
                        <h4 className="text-[9px] font-black uppercase tracking-[0.2em] opacity-40 pl-1">Other Formats</h4>
                        <div className="grid grid-cols-2 gap-2">
                            <button
                                onClick={() => copyFormat('SCSS', generateSCSSExport())}
                                className="p-3 bg-muted/30 border border-border/50 rounded-xl hover:bg-muted transition-colors text-left"
                            >
                                <p className="text-[10px] font-bold">SCSS</p>
                                <p className="text-[8px] opacity-50">Sass Modules</p>
                            </button>
                            <button
                                onClick={() => copyFormat('Figma Tokens', generateFigmaTokensExport())}
                                className="p-3 bg-muted/30 border border-border/50 rounded-xl hover:bg-muted transition-colors text-left"
                            >
                                <p className="text-[10px] font-bold">Figma</p>
                                <p className="text-[8px] opacity-50">Tokens Studio</p>
                            </button>
                            <button
                                onClick={() => copyFormat('Styled Components', generateStyledComponentsExport())}
                                className="p-3 bg-muted/30 border border-border/50 rounded-xl hover:bg-muted transition-colors text-left col-span-2"
                            >
                                <p className="text-[10px] font-bold">Styled Components</p>
                                <p className="text-[8px] opacity-50">CSS-in-JS Object</p>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
