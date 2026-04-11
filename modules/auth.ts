import { supabase } from './supabase';

/**
 * ADAPTIVE AUTH SERVICE
 * Industry Practice: Use Redirects for production reliability/mobile.
 * AI Studio Support: Use Popups for iFrame sandbox compatibility.
 * 
 * Pattern: Single-File Portable Service.
 */

export const isEmbedded = (): boolean => {
    if (typeof window === 'undefined') return false;
    try {
        return window.self !== window.top;
    } catch (e) {
        // Cross-origin access to window.top throws error in some restricted frames
        return true;
    }
};

export const authService = {
    /**
     * Adaptive Sign In
     * Chooses between popup and redirect based on the environment.
     */
    signInWithGoogle: async () => {
        const embedded = isEmbedded();
        const currentOrigin = typeof window !== 'undefined' ? window.location.origin : '';
        const redirectUrl = currentOrigin.replace(/\/$/, '') + '/';

        console.log(`[AuthService] Initializing Google Sign-In (Mode: ${embedded ? 'Popup' : 'Redirect'})`);

        const options: any = {
            provider: 'google',
            options: {
                scopes: 'https://www.googleapis.com/auth/tasks https://www.googleapis.com/auth/calendar.readonly',
                redirectTo: redirectUrl,
            }
        };

        if (embedded) {
            // Adaptive Fallback: Popups work inside iframes where top-level redirects are blocked
            return await supabase.auth.signInWithPopup(options);
        } else {
            // Production Standard: Redirects are most reliable on mobile and diverse browsers
            return await supabase.auth.signInWithOAuth(options);
        }
    },

    signOut: async () => {
        return await supabase.auth.signOut();
    },

    getSession: async () => {
        return await supabase.auth.getSession();
    },

    onAuthStateChange: (callback: (event: string, session: any) => void) => {
        return supabase.auth.onAuthStateChange(callback);
    }
};
