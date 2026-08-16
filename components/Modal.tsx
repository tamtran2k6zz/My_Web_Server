import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
  useId,
  ReactNode,
  HTMLAttributes,
  ButtonHTMLAttributes,
} from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

// ============================================================================
// Types & Context
// ============================================================================

interface ModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  titleId: string;
  descriptionId: string;
}

const ModalContext = createContext<ModalContextType | null>(null);

function useModalContext() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('Các sub-component của Modal phải được bọc bên trong <Modal>');
  }
  return context;
}

// ============================================================================
// 1. Root Modal Component
// ============================================================================

export interface ModalProps {
  children: ReactNode;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
}

export function Modal({
  children,
  isOpen: controlledOpen,
  onOpenChange,
  defaultOpen = false,
}: ModalProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;

  const id = useId();
  const titleId = `modal-title-${id}`;
  const descriptionId = `modal-desc-${id}`;

  const openModal = useCallback(() => {
    if (!isControlled) setUncontrolledOpen(true);
    onOpenChange?.(true);
  }, [isControlled, onOpenChange]);

  const closeModal = useCallback(() => {
    if (!isControlled) setUncontrolledOpen(false);
    onOpenChange?.(false);
  }, [isControlled, onOpenChange]);

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        openModal,
        closeModal,
        titleId,
        descriptionId,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

// ============================================================================
// 2. Modal Trigger
// ============================================================================

export interface ModalTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export function ModalTrigger({
  children,
  onClick,
  asChild = false,
  ...props
}: ModalTriggerProps) {
  const { openModal } = useModalContext();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    if (!e.defaultPrevented) {
      openModal();
    }
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
        (children.props as any)?.onClick?.(e);
        handleClick(e);
      },
    });
  }

  return (
    <button type="button" onClick={handleClick} {...props}>
      {children}
    </button>
  );
}

// ============================================================================
// 3. Modal Portal
// ============================================================================

export interface ModalPortalProps {
  children: ReactNode;
  container?: Element | null;
}

export function ModalPortal({ children, container }: ModalPortalProps) {
  const { isOpen } = useModalContext();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isOpen) return null;

  return createPortal(children, container || document.body);
}

// ============================================================================
// 4. Modal Overlay (Backdrop)
// ============================================================================

export interface ModalOverlayProps extends HTMLAttributes<HTMLDivElement> {
  closeOnClick?: boolean;
}

export function ModalOverlay({
  className = '',
  closeOnClick = true,
  ...props
}: ModalOverlayProps) {
  const { closeModal } = useModalContext();

  return (
    <div
      aria-hidden="true"
      onClick={closeOnClick ? closeModal : undefined}
      className={`fixed inset-0 z-50 bg-black/40 dark:bg-black/60 backdrop-blur-sm transition-opacity animate-fade-in ${className}`}
      {...props}
    />
  );
}

// ============================================================================
// 5. Modal Content (Focus Trap, ESC Handler, Scroll Lock)
// ============================================================================

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export interface ModalContentProps extends HTMLAttributes<HTMLDivElement> {
  closeOnEscape?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const SIZE_CLASSES = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-2xl',
};

export function ModalContent({
  children,
  className = '',
  closeOnEscape = true,
  size = 'md',
  ...props
}: ModalContentProps) {
  const { isOpen, closeModal, titleId, descriptionId } = useModalContext();
  const contentRef = useRef<HTMLDivElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  // Lưu focus element trước khi mở modal để khôi phục khi đóng
  useEffect(() => {
    if (isOpen) {
      previousActiveElementRef.current = document.activeElement as HTMLElement;
    }
  }, [isOpen]);

  // Khóa cuộn trang (Scroll Lock)
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  // Xử lý Focus Trap & Escape key
  useEffect(() => {
    if (!isOpen || !contentRef.current) return;

    const modalEl = contentRef.current;
    const focusableElements = modalEl.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Focus vào phần tử đầu tiên khi modal mở ra
    if (firstElement) {
      firstElement.focus();
    } else {
      modalEl.focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      // Phím ESC
      if (closeOnEscape && e.key === 'Escape') {
        e.preventDefault();
        closeModal();
        return;
      }

      // Phím Tab - Focus Trap
      if (e.key === 'Tab') {
        if (focusableElements.length === 0) {
          e.preventDefault();
          return;
        }

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      // Khôi phục focus về nút đã mở modal
      previousActiveElementRef.current?.focus();
    };
  }, [isOpen, closeOnEscape, closeModal]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
      <div
        ref={contentRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        tabIndex={-1}
        className={`relative w-full ${SIZE_CLASSES[size]} bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-6 pointer-events-auto animate-pop-in outline-none transition-all ${className}`}
        {...props}
      >
        {children}
      </div>
    </div>
  );
}

// ============================================================================
// 6. Sub-components bổ trợ
// ============================================================================

export function ModalHeader({ className = '', children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-700 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function ModalTitle({ className = '', children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  const { titleId } = useModalContext();
  return (
    <h3 id={titleId} className={`text-lg font-bold text-slate-800 dark:text-white ${className}`} {...props}>
      {children}
    </h3>
  );
}

export function ModalDescription({ className = '', children, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  const { descriptionId } = useModalContext();
  return (
    <p id={descriptionId} className={`text-sm text-slate-500 dark:text-slate-400 ${className}`} {...props}>
      {children}
    </p>
  );
}

export function ModalBody({ className = '', children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`space-y-4 ${className}`} {...props}>{children}</div>;
}

export function ModalFooter({ className = '', children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`flex items-center justify-end gap-3 pt-4 mt-6 border-t border-slate-100 dark:border-slate-700 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function ModalCloseButton({ className = '', ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { closeModal } = useModalContext();
  return (
    <button
      type="button"
      onClick={closeModal}
      className={`p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${className}`}
      aria-label="Đóng"
      {...props}
    >
      <X size={20} />
    </button>
  );
}

// ============================================================================
// Compound Component Namespace Export
// ============================================================================

Modal.Trigger = ModalTrigger;
Modal.Portal = ModalPortal;
Modal.Overlay = ModalOverlay;
Modal.Content = ModalContent;
Modal.Header = ModalHeader;
Modal.Title = ModalTitle;
Modal.Description = ModalDescription;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
Modal.CloseButton = ModalCloseButton;
export default Modal;
