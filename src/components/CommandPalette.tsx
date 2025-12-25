import { useEffect, useState } from "react";
import {
    CommandDialog,
    CommandInput,
    CommandList,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandShortcut,
} from "@/components/ui/command";
import {
    LayoutTemplate,
    Palette,
    Monitor,
    Smartphone,
    Tablet,
    Maximize2,
    Sliders,
    Rocket,
    Moon,
    Sun,
    Bug,
    RotateCcw,
    RotateCw
} from "lucide-react";
import { DesignStyle, designStyles } from "@/lib/designStyles";
import { useTheme } from "@/hooks/use-theme";

interface CommandPaletteProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSelectStyle: (style: DesignStyle) => void;
    currentStyleId: string;
    onToggleFullScreen: () => void;
    onToggleEditor: () => void;
    onToggleDebugMode: () => void;
    isDebugMode: boolean;
    onCopyStyle: () => void;
    onUndo: () => void;
    onRedo: () => void;
}

export function CommandPalette({
    open,
    onOpenChange,
    onSelectStyle,
    currentStyleId,
    onToggleFullScreen,
    onToggleEditor,
    onToggleDebugMode,
    isDebugMode,
    onCopyStyle,
    onUndo,
    onRedo
}: CommandPaletteProps) {
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                onOpenChange(!open);
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, [onOpenChange, open]);

    const runCommand = (command: () => void) => {
        command();
        onOpenChange(false);
    };

    return (
        <CommandDialog open={open} onOpenChange={onOpenChange}>
            <CommandInput placeholder="Type a command or search for a style..." />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>

                <CommandGroup heading="Design Styles">
                    {designStyles.map((style) => (
                        <CommandItem
                            key={style.id}
                            value={style.name}
                            onSelect={() => runCommand(() => onSelectStyle(style))}
                        >
                            <LayoutTemplate className="mr-2 h-4 w-4" />
                            <span>{style.name}</span>
                            {currentStyleId === style.id && <CommandShortcut>Active</CommandShortcut>}
                        </CommandItem>
                    ))}
                </CommandGroup>

                <CommandGroup heading="Interface Actions">
                    <CommandItem onSelect={() => runCommand(onToggleEditor)}>
                        <Sliders className="mr-2 h-4 w-4" />
                        <span>Toggle Theme Editor</span>
                        <CommandShortcut>E</CommandShortcut>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(onToggleFullScreen)}>
                        <Maximize2 className="mr-2 h-4 w-4" />
                        <span>Toggle Fullscreen</span>
                        <CommandShortcut>F</CommandShortcut>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(onToggleDebugMode)}>
                        <Bug className="mr-2 h-4 w-4" />
                        <span>{isDebugMode ? 'Disable' : 'Enable'} Debug Mode</span>
                        <CommandShortcut>B</CommandShortcut>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(toggleTheme)}>
                        {theme === 'dark' ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
                        <span>Toggle {theme === 'dark' ? 'Light' : 'Dark'} Mode</span>
                        <CommandShortcut>D</CommandShortcut>
                    </CommandItem>
                </CommandGroup>

                <CommandGroup heading="Editing">
                    <CommandItem onSelect={() => runCommand(onUndo)}>
                        <RotateCcw className="mr-2 h-4 w-4" />
                        <span>Undo Change</span>
                        <CommandShortcut>⌘Z</CommandShortcut>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(onRedo)}>
                        <RotateCw className="mr-2 h-4 w-4" />
                        <span>Redo Change</span>
                        <CommandShortcut>⌘Y</CommandShortcut>
                    </CommandItem>
                </CommandGroup>

                <CommandGroup heading="System">
                    <CommandItem onSelect={() => runCommand(onCopyStyle)}>
                        <Rocket className="mr-2 h-4 w-4" />
                        <span>Copy Complete Design System Code</span>
                    </CommandItem>
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    );
}
