import { render, screen, fireEvent, act } from '@testing-library/react';
import { ThemeEditor } from './ThemeEditor';
import { useThemeStore } from '@/store/themeStore';
import { beforeEach, describe, it, expect } from 'vitest';

// Mock Lucide icons for smaller snapshot/render footprint and to avoid issues
// However, since we are doing integration testing, we might want real icons if possible.
// But some icons might cause issues in jsdom. Let's try without mocking first.

describe('ThemeEditor Integration', () => {
    beforeEach(() => {
        // Reset store to initial state
        const state = useThemeStore.getState();

        // We need to set initial state similar to what store creation does
        // Using setState to reset
        act(() => {
            useThemeStore.setState({
                // Ensure valid style is selected
                selectedStyle: state.selectedStyle || undefined,
                themeOverrides: {},
                history: [{}],
                historyIndex: 0,
                // Reset other UI states
            });
        });
    });

    it('renders the editor header and key sections', () => {
        render(<ThemeEditor />);

        expect(screen.getByText('Engine Config')).toBeInTheDocument();
        expect(screen.getByText('Chromatic Array')).toBeInTheDocument(); // Colors section title
    });

    it('updates overrides and history when "Randomize" is clicked', () => {
        render(<ThemeEditor />);

        // Find the "Feeling Lucky" button by title
        const randomizeBtn = screen.getByTitle('Feeling Lucky? (Randomize)');
        expect(randomizeBtn).toBeInTheDocument();

        // Initial state check
        let state = useThemeStore.getState();
        const initialOverridesCount = Object.keys(state.themeOverrides).length;
        expect(initialOverridesCount).toBe(0);

        // Click randomize
        fireEvent.click(randomizeBtn);

        // Check state update
        state = useThemeStore.getState();
        // Randomize theme sets a full object of overrides
        expect(Object.keys(state.themeOverrides.colors || {}).length).toBeGreaterThan(0);

        // Check history updated
        expect(state.history.length).toBeGreaterThan(1);
    });
});
