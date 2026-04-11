import React, { useState, useEffect, useCallback } from 'react';
import { createRoot } from 'react-dom/client';

/**
 * PORTABLE SINGLE-FILE TOAST COMPONENT
 * Pattern: High-Aesthetic, Zero-Dependency (Internal SVGs), Tailwind-Powered.
 * Reuse: Copy this file into any project's /services or /components folder.
 */

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastMessage {
    id: string;
    message: string;
    type: ToastType;
    duration?: number;
}

// Global state for simple imperative access
let toastManager: (toast: ToastMessage) => void;

/**
 * Toast Container Component
 * Renders the top-level notifications.
 */
const ToastContainer: React.FC = () => {
    const [toasts, setToasts] = useState<ToastMessage[]>([]);

    useEffect(() => {
        toastManager = (newToast: ToastMessage) => {
            setToasts(prev => [...prev, newToast]);
            
            // Auto-dismiss
            const duration = newToast.duration || 4000;
            setTimeout(() => {
                setToasts(prev => prev.filter(t => t.id !== newToast.id));
            }, duration);
        };
    }, []);

    const removeToast = (id: string) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    };

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-3 w-full max-w-xs sm:max-w-sm px-4 text-left">
            {toasts.map((toast) => (
                <div 
                    key={toast.id}
                    className={`
                        flex items-center gap-3 p-4 rounded-xl shadow-2xl border backdrop-blur-md animate-in slide-in-from-bottom-5 fade-in duration-300
                        ${toast.type === 'success' ? 'bg-emerald-50/90 border-emerald-200 text-emerald-900' : ''}
                        ${toast.type === 'error' ? 'bg-rose-50/90 border-rose-200 text-rose-900' : ''}
                        ${toast.type === 'info' ? 'bg-ocean-50/90 border-ocean-200 text-ocean-900' : ''}
                        ${toast.type === 'warning' ? 'bg-amber-50/90 border-amber-200 text-amber-900' : ''}
                    `}
                >
                    {/* ICON - Inline SVGs for zero dependencies */}
                    <div className="shrink-0">
                        {toast.type === 'success' && (
                            <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        )}
                        {toast.type === 'error' && (
                            <svg className="w-5 h-5 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        )}
                        {toast.type === 'info' && (
                            <svg className="w-5 h-5 text-ocean-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        )}
                        {toast.type === 'warning' && (
                            <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                        )}
                    </div>

                    <p className="text-sm font-semibold flex-1 leading-snug">{toast.message}</p>

                    <button 
                        onClick={() => removeToast(toast.id)}
                        className="shrink-0 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
            ))}
        </div>
    );
};

// Initialize the root element and render the container once
if (typeof window !== 'undefined') {
    const containerId = 'toast-root-container';
    let container = document.getElementById(containerId);
    if (!container) {
        container = document.createElement('div');
        container.id = containerId;
        document.body.appendChild(container);
        const root = createRoot(container);
        root.render(<ToastContainer />);
    }
}

/**
 * Imperative Toast API
 */
export const toast = {
    show: (message: string, type: ToastType = 'info', duration?: number) => {
        if (toastManager) {
            toastManager({
                id: Math.random().toString(36).substring(2, 9),
                message,
                type,
                duration
            });
        }
    },
    success: (msg: string, dur?: number) => toast.show(msg, 'success', dur),
    error: (msg: string, dur?: number) => toast.show(msg, 'error', dur),
    info: (msg: string, dur?: number) => toast.show(msg, 'info', dur),
    warning: (msg: string, dur?: number) => toast.show(msg, 'warning', dur),
};
