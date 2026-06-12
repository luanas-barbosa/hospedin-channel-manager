import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface DialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children?: React.ReactNode
}

const DialogContext = React.createContext<{ onClose: () => void }>({ onClose: () => {} })

function Dialog({ open = false, onOpenChange, children }: DialogProps) {
  const onClose = () => onOpenChange?.(false)

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape" && open) onClose() }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [open])

  if (!open) return null

  return (
    <DialogContext.Provider value={{ onClose }}>
      <div
        className="fixed inset-0 z-50 bg-ui-neutral-900/50 backdrop-blur-[2px] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div
          role="dialog"
          aria-modal="true"
          className="relative w-full max-w-[500px] rounded-md border overflow-hidden shadow-[0px_8px_24px_rgba(0,0,0,0.12)] bg-white border-ui-neutral-200 dark:bg-[#1B2B4C] dark:border-[#374E7A]"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </DialogContext.Provider>
  )
}

function DialogHeader({ title, className }: { title?: string; className?: string }) {
  const { onClose } = React.useContext(DialogContext)
  return (
    <div className={cn("flex h-[56px] items-center justify-between px-4 border-b border-ui-neutral-200 dark:border-[#374E7A]", className)}>
      <h2 className="text-sm font-bold text-ui-neutral-800 dark:text-ui-neutral-100">{title}</h2>
      <button
        type="button"
        onClick={onClose}
        className="inline-flex size-[30px] items-center justify-center rounded transition-colors text-ui-neutral-500 hover:bg-ui-neutral-100 hover:text-ui-neutral-800 dark:text-ui-neutral-400 dark:hover:bg-[#374E7A]/50 dark:hover:text-white"
        aria-label="Fechar"
      >
        <svg className="size-[14px]" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
          <line x1="2" y1="2" x2="12" y2="12" />
          <line x1="12" y1="2" x2="2" y2="12" />
        </svg>
      </button>
    </div>
  )
}

function DialogContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("min-h-[120px] px-4 py-6 text-sm text-ui-neutral-700 dark:text-ui-neutral-300 leading-6", className)} {...props}>
      {children}
    </div>
  )
}

function DialogFooter({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex h-[72px] items-center justify-end gap-2 px-4 border-t border-ui-neutral-200 dark:border-[#374E7A]", className)} {...props}>
      {children}
    </div>
  )
}

/* ── Convenience: AlertDialog ────────────────────────────────────── */

interface AlertDialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  title?: string
  description?: React.ReactNode
  confirmLabel?: string
  cancelLabel?: string
  variant?: "confirm" | "destructive"
  onConfirm?: () => void
}

function AlertDialog({
  open,
  onOpenChange,
  title = "Confirmar ação",
  description,
  confirmLabel = "Confirmar",
  cancelLabel = "Voltar",
  variant = "confirm",
  onConfirm,
}: AlertDialogProps) {
  const handleConfirm = () => { onConfirm?.(); onOpenChange?.(false) }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader title={title} />
      <DialogContent>{description}</DialogContent>
      <DialogFooter>
        <Button variant="neutral" onClick={() => onOpenChange?.(false)}>{cancelLabel}</Button>
        <Button variant={variant === "destructive" ? "destructive" : "primary"} onClick={handleConfirm}>{confirmLabel}</Button>
      </DialogFooter>
    </Dialog>
  )
}

export { Dialog, DialogHeader, DialogContent, DialogFooter, AlertDialog }
