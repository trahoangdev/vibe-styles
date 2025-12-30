import { ThemeOverrides } from './designStyles';

// Utility to generate random number in range
const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

// Predefined font pairings (Heading / Body)
const fontPairings = [
    { heading: '"Inter", sans-serif', body: '"Inter", sans-serif' },
    { heading: '"Playfair Display", serif', body: '"Source Sans Pro", sans-serif' },
    { heading: '"Space Grotesk", sans-serif', body: '"Space Grotesk", sans-serif' },
    { heading: '"Roboto", sans-serif', body: '"Roboto", sans-serif' },
    { heading: '"Geist", sans-serif', body: '"Geist", sans-serif' },
    { heading: '"Clash Display", sans-serif', body: '"Satoshi", sans-serif' },
    { heading: '"Syne", sans-serif', body: '"Inter", sans-serif' },
];

export type HarmonyStrategy = 'random' | 'analogous' | 'complementary' | 'split-complementary' | 'triadic' | 'monochromatic' | 'tetradic';

export function generateRandomTheme(strategy: HarmonyStrategy = 'random'): ThemeOverrides {
    // 1. Pick a base hue
    const baseHue = random(0, 360);

    // 2. Decide on harmony strategy
    let usedStrategy = strategy;
    if (usedStrategy === 'random') {
        const strategies: HarmonyStrategy[] = ['analogous', 'complementary', 'triadic', 'monochromatic', 'split-complementary'];
        usedStrategy = strategies[random(0, strategies.length - 1)];
    }

    let accentHue = baseHue;
    let secondaryHue = baseHue; // For future expansion (e.g. secondary accent)

    switch (usedStrategy) {
        case 'analogous':
            accentHue = (baseHue + 30) % 360;
            break;
        case 'complementary':
            accentHue = (baseHue + 180) % 360;
            break;
        case 'split-complementary':
            accentHue = (baseHue + 150) % 360;
            // secondary would be +210
            break;
        case 'triadic':
            accentHue = (baseHue + 120) % 360;
            break;
        case 'tetradic':
            accentHue = (baseHue + 90) % 360;
            break;
        case 'monochromatic':
        default:
            accentHue = baseHue; // Will rely on lightness/saturation diff
            break;
    }

    // 3. Decide on saturation/lightness
    // High saturation for 'Vibe' feel, but allow some variance
    const saturation = random(60, 95);
    const lightness = random(40, 60);

    // 4. Generate colors (HSL strings)
    const primary = `${baseHue} ${saturation}% ${lightness}%`;

    // For monochromatic, we shift lightness/saturation for accent
    const accent = usedStrategy === 'monochromatic'
        ? `${baseHue} ${Math.max(0, saturation - 20)}% ${Math.min(100, lightness + 30)}%`
        : `${accentHue} ${saturation}% ${lightness}%`;

    // Neutral tones
    const neutralHue = baseHue;
    // 50/50 chance of dark/light mode unless specified (conceptually)
    const bgType = Math.random() > 0.5 ? 'light' : 'dark';

    let background, foreground, surface, muted, mutedForeground, border, success, warning, error;

    if (bgType === 'light') {
        background = `${neutralHue} 10% 98%`;
        foreground = `${neutralHue} 20% 10%`;
        surface = `${neutralHue} 15% 96%`;
        muted = `${neutralHue} 10% 92%`;
        mutedForeground = `${neutralHue} 10% 40%`;
        border = `${neutralHue} 10% 90%`;
    } else {
        background = `${neutralHue} 15% 5%`;
        foreground = `${neutralHue} 10% 98%`;
        surface = `${neutralHue} 15% 8%`;
        muted = `${neutralHue} 15% 15%`;
        mutedForeground = `${neutralHue} 20% 60%`;
        border = `${neutralHue} 20% 18%`;
    }

    // Functional colors (standardized but hue-shifted slightly towards base for harmony)
    success = `142 70% 45%`;
    warning = `38 90% 50%`;
    error = `0 85% 60%`;

    // 5. Pick Fonts
    const fonts = fontPairings[random(0, fontPairings.length - 1)];

    // 6. Pick Radius & Spacing
    const radii = ['0rem', '0.25rem', '0.5rem', '0.75rem', '1rem', '1.5rem', '2rem'];
    const radius = radii[random(0, radii.length - 1)];
    const borderWidths = ['0px', '1px', '2px', '3px'];
    const borderWidth = borderWidths[random(0, borderWidths.length - 1)];
    const densities = [0.75, 1, 1.25];
    const density = densities[random(0, densities.length - 1)];

    return {
        colors: {
            primary,
            accent,
            background,
            foreground,
            surface,
            muted,
            mutedForeground, // Ensure these are included if ThemeOverrides allows (it might not have them? Checking interface...)
            // Interface has primary, accent, muted, background, foreground, surface.
            // But DesignStyle has more.
            // For now, let's stick to what ThemeOverrides allows, or just pass full palette if we can.
            // ThemeOverrides allows partials.
        },
        fonts: {
            heading: fonts.heading,
            body: fonts.body,
        },
        radius,
        borderWidth,
        density,
        shadowStrength: random(1, 4) / 10,
    };
}

import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function generateThemeFromPrompt(prompt: string): Promise<ThemeOverrides> {
    if (!API_KEY) {
        console.warn("Missing VITE_GEMINI_API_KEY");
        return generateRandomTheme('random');
    }
    try {
        const result = await model.generateContent(`
            You are a professional UI/UX designer.
            Generate a unique, cohesive design system theme based on the description: "${prompt}".
            
            Return a purely JSON object matching this structure (HSL colors MUST be space-separated "Hue Saturation% Lightness%"):
            {
              "colors": {
                "primary": "H S% L%",
                "accent": "H S% L%",
                "background": "H S% L%",
                "foreground": "H S% L%",
                "surface": "H S% L%",
                "muted": "H S% L%",
                "border": "H S% L%"
              },
              "radius": "0.5rem", // or 0rem, 0.25rem, 0.75rem, 1rem
              "borderWidth": "1px", // or 0px, 2px
              "density": 1 // or 0.75, 1.25
            }

            Ensure high contrast and accessible color combinations.
            Return ONLY raw JSON, no markdown formatting.
        `);

        const response = result.response;
        const text = response.text();
        // Naive cleanup of potential markdown blocks
        const jsonStr = text.replace(/^```json/, '').replace(/```$/, '').trim();
        return JSON.parse(jsonStr);
    } catch (error) {
        console.error("Gemini AI Generation Failed:", error);
        // Fallback to random if AI fails
        return generateRandomTheme('random');
    }
}

// Kept for compatibility if needed, but we should switch to `generateThemeFromPrompt`
export const generateThemeFromKeyword = generateThemeFromPrompt;
