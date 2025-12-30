import { useEffect } from "react";
import {
    CommandDialog,
    CommandInput,
    CommandList,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandShortcut,
    CommandSeparator,
} from "@/components/ui/command";
import {
    LayoutTemplate,
    Maximize2,
    Sliders,
    Moon,
    Sun,
    RotateCcw,
    RotateCw,
    Copy,
    Download,
    Shuffle,
    Keyboard,
    HelpCircle,
} from "lucide-react";
import { DesignStyle, designStyles } from "@/lib/designStyles";
import { useTheme } from "@/hooks/use-theme";
import { useThemeStore } from "@/store/themeStore";

interface CommandPaletteProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSelectStyle: (style: DesignStyle) => void;
    currentStyleId: string;
    onToggleFullScreen: () => void;
    onToggleEditor: () => void;
    onCopyStyle: () => void;
    onUndo: () => void;
    onRedo: () => void;
    onShowShortcuts?: () => void;
}

export function CommandPalette({
    open,
    onOpenChange,
    onSelectStyle,
    currentStyleId,
    onToggleFullScreen,
    onToggleEditor,
    onCopyStyle,
    onUndo,
    onRedo,
    onShowShortcuts
}: CommandPaletteProps) {
    const { theme, toggleTheme } = useTheme();
    const store = useThemeStore();

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
                    <CommandItem onSelect={() => runCommand(toggleTheme)}>
                        {theme === 'dark' ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
                        <span>Toggle {theme === 'dark' ? 'Light' : 'Dark'} Mode</span>
                        <CommandShortcut>D</CommandShortcut>
                    </CommandItem>
                    {onShowShortcuts && (
                        <CommandItem onSelect={() => runCommand(onShowShortcuts)}>
                            <Keyboard className="mr-2 h-4 w-4" />
                            <span>Show Keyboard Shortcuts</span>
                            <CommandShortcut>?</CommandShortcut>
                        </CommandItem>
                    )}
                </CommandGroup>

                <CommandSeparator />

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
                    <CommandItem onSelect={() => runCommand(() => store.randomizeTheme())}>
                        <Shuffle className="mr-2 h-4 w-4" />
                        <span>Randomize Theme</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => store.resetOverrides())}>
                        <RotateCcw className="mr-2 h-4 w-4" />
                        <span>Reset All Changes</span>
                    </CommandItem>
                </CommandGroup>

                <CommandSeparator />

                <CommandGroup heading="Export">
                    <CommandItem onSelect={() => runCommand(onCopyStyle)}>
                        <Copy className="mr-2 h-4 w-4" />
                        <span>Copy Design System Code</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => {
                        onCopyStyle();
                        // Could add more export options here
                    })}>
                        <Download className="mr-2 h-4 w-4" />
                        <span>Export Theme</span>
                    </CommandItem>
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    );
}
