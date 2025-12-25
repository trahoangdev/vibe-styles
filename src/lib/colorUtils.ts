
// Contrast helper functions
export const getRelativeLuminance = (color: string) => {
    const [h, s, l] = color.split(' ').map(v => parseFloat(v));
    const sNorm = s / 100;
    const lNorm = l / 100;

    const a = sNorm * Math.min(lNorm, 1 - lNorm);
    const f = (n: number, k = (n + h / 30) % 12) => lNorm - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);

    const [r, g, b] = [f(0), f(8), f(4)];
    const [R, G, B] = [r, g, b].map(v => v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
};

export const getContrastRatio = (lum1: number, lum2: number) => {
    const l1 = Math.max(lum1, lum2);
    const l2 = Math.min(lum1, lum2);
    return (l1 + 0.05) / (l2 + 0.05);
};

export const hslToHex = (hsl: string): string => {
    const [h, s, l] = hsl.split(' ').map(v => parseFloat(v));
    const sNorm = s / 100;
    const lNorm = l / 100;

    const c = (1 - Math.abs(2 * lNorm - 1)) * sNorm;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = lNorm - c / 2;

    let r = 0, g = 0, b = 0;
    if (h < 60) { r = c; g = x; }
    else if (h < 120) { r = x; g = c; }
    else if (h < 180) { g = c; b = x; }
    else if (h < 240) { g = x; b = c; }
    else if (h < 300) { r = x; b = c; }
    else { r = c; b = x; }

    const toHex = (n: number) => Math.round((n + m) * 255).toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

export const hexToHsl = (hex: string): string => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const l = (max + min) / 2;

    if (max === min) return `0 0% ${Math.round(l * 100)}%`;

    const d = max - min;
    const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    let h = 0;
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;

    return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
};

export const smartInvert = (hsl: string): string => {
    const [h, s, l] = hsl.split(' ').map(v => parseFloat(v));

    // Invert lightness: 0% -> 100%, 100% -> 0%
    // We keep hue intact.
    // We might want to slightly adjust saturation for dark mode (usually slightly less saturated).

    const newL = 100 - l;
    const newS = newL < 20 ? s * 0.8 : s; // Desaturate deep darks slightly? Optional.

    return `${h} ${newS}% ${newL}%`;
};
