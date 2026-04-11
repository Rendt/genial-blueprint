import React, { useEffect } from 'react';

/**
 * PORTABLE MODAL COMPONENT
 * Pattern: Consistent, Accessible, Tailwind-Styled.
 */

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Modal: React.FC<ModalProps> = ({ 
    isOpen, 
    onClose, 
    title, 
    children, 
    footer,
    size = 'md'
}) => {
    // Handle Escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const sizeClasses = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl'
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
                onClick={onClose}
            />
            
            {/* Modal Content */}
            <div className={`relative w-full ${sizeClasses[size]} bg-white rounded-xl shadow-2xl flex flex-col max-h-[90vh] animate-in zoom-in-95 fade-in duration-200 overflow-hidden`}>
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white">
                    <h3 className="text-lg font-bold text-slate-900">{title}</h3>
                    <button 
                        onClick={onClose}
                        className="p-1 rounded-full text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
                
                {/* Body */}
                <div className="flex-1 overflow-y-auto px-6 py-6 overflow-x-hidden bg-white text-left">
                    {children}
                </div>
                
                {/* Footer */}
                {footer && (
                    <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
};

/**
 * CONVENIENCE: CONFIRMATION DIALOG
 */
interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    variant?: 'primary' | 'danger';
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    variant = 'primary'
}) => {
    return (
        <Modal 
            isOpen={isOpen} 
            onClose={onClose} 
            title={title}
            size="sm"
            footer={
                <>
                    <button 
                        className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                        onClick={onClose}
                    >
                        {cancelText}
                    </button>
                    <button 
                        className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors ${
                            variant === 'danger' ? 'bg-red-600 hover:bg-red-700' : 'bg-ocean-600 hover:bg-ocean-700'
                        }`}
                        onClick={() => { onConfirm(); onClose(); }}
                    >
                        {confirmText}
                    </button>
                </>
            }
        >
            <p className="text-sm text-slate-600 leading-relaxed">{message}</p>
        </Modal>
    );
};
