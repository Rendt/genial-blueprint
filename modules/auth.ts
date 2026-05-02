/**
 * PORTABLE SUPABASE AUTH SERVICE
 * 
 * Version: 2.1.0
 * Date: 2026-05-02
 * Pattern: Adaptive Auth (Redirect vs Popup).
 * 
 * FEATURES:
 * - Intelligent Environment Detection (isEmbedded).
 * - Automatic "SignInWithPopup" fallback for iFrames/Sandboxes.
 * - Dynamic Redirect URL resolution.
 * - Zero external dependencies (beyond supabase client).
 */

import { SupabaseClient } from '@supabase/supabase-js';

export interface AuthConfig {
    scopes?: string;
    redirectTo?: string;
}

export const isEmbedded = (): boolean => {
    if (typeof window === 'undefined') return false;
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
};

/**
 * Creates a configured Auth Service bound to a Supabase instance.
 */
export const createAuthService = (supabase: SupabaseClient, config: AuthConfig = {}) => {
    return {
        signInWithGoogle: async (overrideConfig?: AuthConfig) => {
            const embedded = isEmbedded();
            const currentOrigin = typeof window !== 'undefined' ? window.location.origin : '';
            const defaultRedirect = currentOrigin.replace(/\/$/, '') + '/';

            const activeScopes = overrideConfig?.scopes || config.scopes || '';
            const activeRedirect = overrideConfig?.redirectTo || config.redirectTo || defaultRedirect;

            const options: any = {
                provider: 'google',
                options: {
                    scopes: activeScopes,
                    redirectTo: activeRedirect,
                }
            };

            if (embedded) {
                return await supabase.auth.signInWithPopup(options);
            } else {
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
            const { data: { subscription } } = supabase.auth.onAuthStateChange(callback);
            return subscription;
        }
    };
};
