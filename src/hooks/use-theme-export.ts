import { useCallback } from 'react';

export interface ThemeConfig {
    colors: {
        primary: string;
        accent: string;
        muted: string;
        background: string;
        foreground: string;
        surface: string;
    };
    fonts: {
        heading: string;
        body: string;
        headingWeight: string;
        bodyWeight: string;
    };
    radius: string;
    shadowStrength: number;
    borderWidth: string;
    density: number;
}

export function useThemeExport(theme: ThemeConfig) {
    const generateCSSExport = useCallback(() => {
        const lines = [':root {'];
        lines.push(`  /* Colors (HSL) */`);
        lines.push(`  --primary: ${theme.colors.primary};`);
        lines.push(`  --accent: ${theme.colors.accent};`);
        lines.push(`  --muted: ${theme.colors.muted};`);
        lines.push(`  --background: ${theme.colors.background};`);
        lines.push(`  --foreground: ${theme.colors.foreground};`);
        lines.push(`  --surface: ${theme.colors.surface};`);
        lines.push('');
        lines.push(`  /* Typography */`);
        lines.push(`  --font-heading: "${theme.fonts.heading.split(',')[0]}";`);
        lines.push(`  --font-body: "${theme.fonts.body.split(',')[0]}";`);
        lines.push('');
        lines.push(`  /* Layout */`);
        lines.push(`  --radius: ${theme.radius};`);
        lines.push(`  --border-width: ${theme.borderWidth};`);
        lines.push(`  --spacing-multiplier: ${theme.density};`);
        lines.push('');
        lines.push(`  /* Effects */`);
        lines.push(`  --shadow-strength: ${theme.shadowStrength};`);
        lines.push('}');
        return lines.join('\n');
    }, [theme]);

    const generateTailwindExport = useCallback(() => {
        const config = {
            theme: {
                extend: {
                    colors: {
                        primary: `hsl(${theme.colors.primary})`,
                        accent: `hsl(${theme.colors.accent})`,
                        muted: `hsl(${theme.colors.muted})`,
                        background: `hsl(${theme.colors.background})`,
                        foreground: `hsl(${theme.colors.foreground})`,
                        surface: `hsl(${theme.colors.surface})`,
                    },
                    fontFamily: {
                        heading: [theme.fonts.heading.split(',')[0]],
                        body: [theme.fonts.body.split(',')[0]],
                    },
                    borderRadius: {
                        DEFAULT: theme.radius,
                    },
                    borderWidth: {
                        DEFAULT: theme.borderWidth,
                    },
                    // Density handled via utility class or CSS variable
                },
            },
        };
        return `// tailwind.config.ts\nmodule.exports = ${JSON.stringify(config, null, 2)}`;
    }, [theme]);

    const generateJSONExport = useCallback(() => {
        return JSON.stringify({
            name: 'Vibe Custom Theme',
            version: '1.0.0',
            ...theme
        }, null, 2);
    }, [theme]);

    const generateSCSSExport = useCallback(() => {
        const lines = [
            `// Colors`,
            `$primary: hsl(${theme.colors.primary});`,
            `$accent: hsl(${theme.colors.accent});`,
            `$muted: hsl(${theme.colors.muted});`,
            `$background: hsl(${theme.colors.background});`,
            `$foreground: hsl(${theme.colors.foreground});`,
            `$surface: hsl(${theme.colors.surface});`,
            ``,
            `// Typography`,
            `$font-heading: "${theme.fonts.heading.split(',')[0]}";`,
            `$font-body: "${theme.fonts.body.split(',')[0]}";`,
            ``,
            `// Layout`,
            `$radius: ${theme.radius};`,
            `$border-width: ${theme.borderWidth};`
        ];
        return lines.join('\n');
    }, [theme]);

    const generateStyledComponentsExport = useCallback(() => {
        const config = {
            colors: {
                primary: `hsl(${theme.colors.primary})`,
                accent: `hsl(${theme.colors.accent})`,
                muted: `hsl(${theme.colors.muted})`,
                background: `hsl(${theme.colors.background})`,
                foreground: `hsl(${theme.colors.foreground})`,
                surface: `hsl(${theme.colors.surface})`,
            },
            fonts: {
                heading: theme.fonts.heading.split(',')[0],
                body: theme.fonts.body.split(',')[0],
            },
            radii: {
                default: theme.radius,
            },
            borderWidths: {
                default: theme.borderWidth
            }
        };
        return `export const theme = ${JSON.stringify(config, null, 2)};`;
    }, [theme]);

    const generateFigmaTokensExport = useCallback(() => {
        const tokens = {
            global: {
                colors: Object.entries(theme.colors).reduce((acc, [key, val]) => ({
                    ...acc,
                    [key]: { value: `hsl(${val})`, type: 'color' }
                }), {}),
                fontFamilies: {
                    heading: { value: theme.fonts.heading.split(',')[0], type: 'fontFamilies' },
                    body: { value: theme.fonts.body.split(',')[0], type: 'fontFamilies' }
                },
                borderRadius: {
                    default: { value: theme.radius, type: 'borderRadius' }
                },
                borderWidth: {
                    default: { value: theme.borderWidth, type: 'borderWidth' }
                }
            }
        };
        return JSON.stringify(tokens, null, 2);
    }, [theme]);

    return {
        generateCSSExport,
        generateTailwindExport,
        generateJSONExport,
        generateSCSSExport,
        generateStyledComponentsExport,
        generateFigmaTokensExport
    };
}
