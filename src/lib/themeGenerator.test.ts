import { describe, it, expect } from 'vitest';
import { generateRandomTheme } from './themeGenerator';

describe('themeGenerator', () => {
    it('should generate a valid theme object', () => {
        const theme = generateRandomTheme();

        expect(theme).toHaveProperty('colors');
        expect(theme).toHaveProperty('fonts');
        expect(theme).toHaveProperty('radius');
        expect(theme).toHaveProperty('shadowStrength');
    });

    it('should generate valid HSL color strings', () => {
        const theme = generateRandomTheme();
        const hslRegex = /^\d+\s+\d+%\s+\d+%$/;

        // Optional colors might be undefined, but the generator always sets them
        if (theme.colors?.primary) expect(theme.colors.primary).toMatch(hslRegex);
        if (theme.colors?.accent) expect(theme.colors.accent).toMatch(hslRegex);
        // Background can be slightly different depending on logic, but let's check basic structure
        // Logic in generator: `${neutralHue} 10% 98%`
        if (theme.colors?.background) expect(theme.colors.background).toMatch(hslRegex);
    });

    it('should generate valid fonts', () => {
        const theme = generateRandomTheme();

        expect(typeof theme.fonts?.heading).toBe('string');
        expect(typeof theme.fonts?.body).toBe('string');
    });

    it('should generate shadowStrength between 0 and 1', () => {
        const theme = generateRandomTheme();
        const strength = theme.shadowStrength ?? 0;
        expect(strength).toBeGreaterThanOrEqual(0);
        expect(strength).toBeLessThanOrEqual(1);
    });
});
