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
];

export function generateRandomTheme(): ThemeOverrides {
    // 1. Pick a base hue
    const baseHue = random(0, 360);

    // 2. Decide on harmony strategy
    const strategy = Math.random();
    let accentHue = baseHue;

    if (strategy < 0.33) {
        // Analogous
        accentHue = (baseHue + 30) % 360;
    } else if (strategy < 0.66) {
        // Complementary
        accentHue = (baseHue + 180) % 360;
    } else {
        // Triadic
        accentHue = (baseHue + 120) % 360;
    }

    // 3. Decide on saturation/lightness for "Vibe"
    const saturation = random(60, 95);
    const lightness = random(40, 60);

    // 4. Generate colors (HSL strings)
    const primary = `${baseHue} ${saturation}% ${lightness}%`;
    const accent = `${accentHue} ${saturation}% ${lightness}%`;

    // Neutral tones
    // slightly tinted grays
    const neutralHue = baseHue;
    const bgType = Math.random() > 0.5 ? 'light' : 'dark';

    let background, foreground, surface, muted;

    if (bgType === 'light') {
        background = `${neutralHue} 10% 98%`;
        foreground = `${neutralHue} 20% 10%`;
        surface = `${neutralHue} 10% 95%`;
        muted = `${neutralHue} 10% 90%`;
    } else {
        background = `${neutralHue} 10% 5%`;
        foreground = `${neutralHue} 10% 98%`;
        surface = `${neutralHue} 10% 10%`;
        muted = `${neutralHue} 10% 15%`;
    }

    // 5. Pick Fonts
    const fonts = fontPairings[random(0, fontPairings.length - 1)];

    // 6. Pick Radius
    const radii = ['0rem', '0.25rem', '0.5rem', '0.75rem', '1rem', '1.5rem'];
    const radius = radii[random(0, radii.length - 1)];

    return {
        colors: {
            primary,
            accent,
            background,
            foreground,
            surface,
            muted,
        },
        fonts: {
            heading: fonts.heading,
            body: fonts.body,
        },
        radius,
        shadowStrength: random(1, 4) / 10,
    };
}
