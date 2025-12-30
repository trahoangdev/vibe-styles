
import React from "react";
import { motion } from "framer-motion";
import {
    Upload,
    FileText,
    Truck,
    CheckCircle,
    Edit3,
    Trash2,
    RotateCcw,
    Maximize2,
    Link as LinkIcon
} from "lucide-react";
import { DesignStyle } from "@/lib/designStyles";
import { cn } from "@/lib/utils";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

// Mock 3D Viewer Component
const ModelViewer = () => {
    return (
        <div className="relative w-full aspect-square bg-card rounded-3xl p-8 shadow-sm border border-border/40 flex items-center justify-center overflow-hidden group">
            {/* Grid Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                }}
            />

            {/* Controls Overlay */}
            <div className="absolute top-4 left-4 flex gap-2">
                <div className="bg-card/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium border border-border/50 flex items-center gap-2 shadow-sm">
                    <RotateCcw className="w-3 h-3" /> Y axis: 80%
                </div>
            </div>

            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 bg-card rounded-full shadow-sm hover:shadow-md transition-all text-xs font-medium flex items-center gap-1 border border-border/50">
                    <Edit3 className="w-3 h-3" /> Edit
                </button>
                <button className="p-2 bg-card rounded-full shadow-sm hover:shadow-md transition-all text-destructive border border-border/50">
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>

            <div className="absolute bottom-4 right-4 flex gap-2">
                <div className="bg-card/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium border border-border/50 flex items-center gap-2 shadow-sm">
                    <Maximize2 className="w-3 h-3" /> X axis: 67%
                </div>
            </div>

            {/* Abstract 3D Shape */}
            <motion.div
                className="relative w-48 h-48 bg-primary/20 rounded-2xl shadow-xl backdrop-blur-sm border border-primary/30"
                style={{ transformStyle: 'preserve-3d', transform: 'rotateX(20deg) rotateY(-30deg)' }}
                animate={{
                    rotateY: [0, 360],
                    rotateX: [20, 10, 20]
                }}
                transition={{
                    rotateY: { duration: 20, repeat: Infinity, ease: "linear" },
                    rotateX: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                }}
            >
                <div className="absolute inset-0 bg-primary/40 rounded-2xl" style={{ transform: 'translateZ(-20px)' }}></div>
                <div className="absolute inset-0 border-4 border-primary/30 rounded-2xl"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-card rounded-full shadow-inner opacity-80"></div>
            </motion.div>

            {/* Sliders */}
            <div className="absolute left-6 top-1/2 -translate-y-1/2 h-48 w-1 bg-muted rounded-full flex flex-col justify-end">
                <div className="w-3 h-3 bg-foreground rounded-full -ml-1 shadow-md cursor-pointer relative top-0 hover:scale-125 transition-transform" style={{ top: '20%' }}></div>
            </div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-48 h-1 bg-muted rounded-full">
                <div className="w-3 h-3 bg-foreground rounded-full -mt-1 shadow-md cursor-pointer relative left-[70%] hover:scale-125 transition-transform"></div>
            </div>

        </div>
    );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const StepItem = ({ icon: Icon, step, title, active = false }: any) => (
    <div className={cn(
        "flex flex-col items-start gap-1 p-4 rounded-2xl transition-all border border-transparent",
        active ? "bg-card shadow-sm border-border/40" : "opacity-60 grayscale hover:grayscale-0 hover:opacity-100"
    )}>
        <div className="flex items-center gap-3 mb-2">
            <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            )}>
                <Icon className="w-5 h-5" />
            </div>
        </div>
        <div className="flex flex-col">
            <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Step {step}</span>
            <span className="text-sm font-bold text-foreground">{title}</span>
        </div>
    </div>
);

interface PartifyPreviewProps {
    style: DesignStyle;
    isMobile?: boolean;
}

export const PartifyPreview = ({ style, isMobile }: PartifyPreviewProps) => {
    return (
        <div className="w-full space-y-8">
            <div className="flex flex-col space-y-2">
                <h2 className="text-2xl font-bold tracking-tight">Manufacturing Layout</h2>
                <p className="text-muted-foreground">Complex forms and 3D visualization components.</p>
            </div>

            <div className={cn(
                "rounded-[2rem] overflow-hidden border border-border/40 bg-muted/30 p-6 md:p-10",
                style.id === 'partify' ? 'font-sans' : ''
            )}>

                {/* Steps Progress */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                    <StepItem title="Upload 3D Files" step="one" icon={Upload} active={true} />
                    <StepItem title="Quotation" step="two" icon={FileText} />
                    <StepItem title="Payment" step="three" icon={Truck} />
                    <StepItem title="Confirm" step="four" icon={CheckCircle} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                    {/* Left Column: 3D Editor */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-1">Editing Model</h1>
                                <p className="text-muted-foreground font-medium flex items-center gap-2">
                                    PO number: <span className="text-foreground font-bold">634534</span>
                                    <span className="bg-foreground text-background text-[10px] px-2 py-0.5 rounded-full uppercase font-bold">Edit</span>
                                </p>
                            </div>
                            <button className="px-5 py-2.5 bg-card border border-border shadow-sm rounded-full text-xs font-bold uppercase tracking-wide hover:bg-accent hover:text-accent-foreground transition-colors">
                                Upload More
                            </button>
                        </div>

                        <ModelViewer />
                    </div>

                    {/* Right Column: Spec Form */}
                    <div className="lg:col-span-5 space-y-8">

                        {/* General Info Section */}
                        <div>
                            <h3 className="text-sm font-black uppercase tracking-wider mb-4 text-foreground/80">General Information</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="relative group">
                                    <Select defaultValue="specifications">
                                        <SelectTrigger className="w-full h-12 px-4 bg-card border-border rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary/50 focus:border-primary">
                                            <SelectValue placeholder="Select type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="specifications">Specifications</SelectItem>
                                            <SelectItem value="blueprint">Blueprint</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="flex items-center gap-2 bg-card border border-border rounded-xl px-4 h-12 group focus-within:ring-2 focus-within:ring-primary/50 focus-within:border-primary transition-all">
                                    <span className="text-sm text-muted-foreground whitespace-nowrap">Qty:</span>
                                    <input type="number" defaultValue="1" className="w-full bg-transparent outline-none text-sm font-bold text-foreground" />
                                </div>
                            </div>
                        </div>

                        {/* Specifications Section */}
                        <div>
                            <h3 className="text-sm font-black uppercase tracking-wider mb-4 text-foreground/80">Specifications</h3>
                            <div className="space-y-4 p-6 bg-card rounded-3xl border border-border/40 shadow-sm">

                                <div className="grid grid-cols-[80px,1fr] items-center gap-4">
                                    <span className="text-xs font-semibold text-muted-foreground">Tech:</span>
                                    <Select defaultValue="sls">
                                        <SelectTrigger className="w-full h-10 bg-muted/50 border-transparent hover:bg-muted text-sm font-medium rounded-lg">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="sls">Selective Laser Sintering</SelectItem>
                                            <SelectItem value="fdm">Deposition Modeling</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="grid grid-cols-[80px,1fr] items-center gap-4">
                                    <span className="text-xs font-semibold text-muted-foreground">Material:</span>
                                    <div className="grid grid-cols-2 gap-3">
                                        <Select defaultValue="pa12">
                                            <SelectTrigger className="w-full h-10 bg-muted/50 border-transparent hover:bg-muted text-sm font-medium rounded-lg">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="pa12">PA 12</SelectItem>
                                                <SelectItem value="resin">Resin</SelectItem>
                                            </SelectContent>
                                        </Select>

                                        <div className="grid grid-cols-[auto,1fr] items-center gap-2">
                                            <span className="text-xs font-semibold text-muted-foreground text-right">Finish:</span>
                                            <Select defaultValue="dyeing">
                                                <SelectTrigger className="w-full h-10 bg-muted/50 border-transparent hover:bg-muted text-sm font-medium rounded-lg">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="dyeing">Dyeing</SelectItem>
                                                    <SelectItem value="smooth">Smooth</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-[80px,1fr] items-center gap-4">
                                    <span className="text-xs font-semibold text-muted-foreground">Color:</span>
                                    <div className="grid grid-cols-[1fr,1.2fr] gap-4 items-center">
                                        <div className="flex items-center gap-2">
                                            <button className="w-5 h-5 rounded-full bg-primary ring-2 ring-primary ring-offset-2"></button>
                                            <button className="w-5 h-5 rounded-full bg-foreground hover:ring-2 hover:ring-foreground hover:ring-offset-2 transition-all"></button>
                                            <div className="flex items-center gap-2 px-3 py-1.5 bg-muted/50 rounded-full ml-1">
                                                <div className="w-3 h-3 rounded-full bg-indigo-300"></div>
                                                <span className="text-xs font-mono">#B3BBFD</span>
                                            </div>
                                            <LinkIcon className="w-3 h-3 text-muted-foreground cursor-pointer hover:text-foreground" />
                                        </div>

                                        <Select defaultValue="inspected">
                                            <SelectTrigger className="w-full h-10 bg-transparent border border-border hover:border-primary focus:ring-2 focus:ring-primary/20 text-sm font-medium rounded-lg">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="inspected">Inspected</SelectItem>
                                                <SelectItem value="standard">Standard</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* Footer Actions */}
                        <div className="flex items-center justify-between pt-4">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div className="w-5 h-5 border-2 border-border rounded flex items-center justify-center group-hover:border-primary transition-colors bg-card">
                                    {/* Checkbox state would go here */}
                                </div>
                                <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">Mark as default</span>
                            </label>

                            <button className="px-10 py-4 bg-primary text-primary-foreground font-black uppercase tracking-wider rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 transition-all">
                                Save
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};
