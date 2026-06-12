import * as React from "react"
import { cn } from "@/lib/utils"

const cardBase = "rounded-md border shadow-card overflow-hidden bg-white border-ui-neutral-200 dark:bg-[#1B2B4C] dark:border-[#374E7A]"
const cardHeader = "flex items-center justify-between px-4 border-b border-ui-neutral-200 shrink-0 dark:border-[#374E7A]"
const iconBtn = "inline-flex size-6 items-center justify-center rounded transition-colors text-ui-neutral-500 hover:text-ui-neutral-800 hover:bg-ui-neutral-100 dark:text-ui-neutral-400 dark:hover:text-white dark:hover:bg-[#374E7A]/50"

const MaximizeIcon = () => (
  <svg className="size-[16px]" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <polyline points="10,2 14,2 14,6" />
    <polyline points="6,14 2,14 2,10" />
    <line x1="14" y1="2" x2="9" y2="7" />
    <line x1="2" y1="14" x2="7" y2="9" />
  </svg>
)

/* ── Section Card ────────────────────────────────────────────────── */

interface SectionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  icon?: React.ReactNode
  onMaximize?: () => void
  headerAction?: React.ReactNode
}

function SectionCard({ title, icon, onMaximize, headerAction, className, children, ...props }: SectionCardProps) {
  return (
    <div className={cn(cardBase, className)} {...props}>
      {(title || icon || onMaximize || headerAction) && (
        <div className={cn(cardHeader, "h-[52px]")}>
          <div className="flex items-center gap-2">
            {icon && <span className="text-ui-neutral-500 dark:text-ui-neutral-400">{icon}</span>}
            {title && <h3 className="text-sm font-bold text-ui-neutral-800 dark:text-ui-neutral-100 leading-6">{title}</h3>}
          </div>
          <div className="flex items-center gap-2">
            {headerAction}
            {onMaximize && (
              <button type="button" onClick={onMaximize} className={iconBtn} aria-label="Expandir">
                <MaximizeIcon />
              </button>
            )}
          </div>
        </div>
      )}
      {children}
    </div>
  )
}

/* ── Form Card ───────────────────────────────────────────────────── */

interface FormCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  badge?: React.ReactNode
  footer?: React.ReactNode
  onMaximize?: () => void
}

function FormCard({ title, badge, footer, onMaximize, className, children, ...props }: FormCardProps) {
  return (
    <div className={cn(cardBase, "flex flex-col", className)} {...props}>
      {(title || badge || onMaximize) && (
        <div className={cn(cardHeader, "h-[52px]")}>
          <div className="flex items-center gap-2">
            {title && <h3 className="text-sm font-bold text-ui-neutral-800 dark:text-ui-neutral-100">{title}</h3>}
            {badge}
          </div>
          {onMaximize && (
            <button type="button" onClick={onMaximize} className={iconBtn} aria-label="Expandir">
              <MaximizeIcon />
            </button>
          )}
        </div>
      )}
      <div className="flex-1 p-4 overflow-y-auto">{children}</div>
      {footer && (
        <>
          <div className="h-px bg-ui-neutral-200 dark:bg-[#374E7A]" />
          <div className="flex h-[73px] items-center justify-end gap-2 px-4">{footer}</div>
        </>
      )}
    </div>
  )
}

/* ── Summary Card ────────────────────────────────────────────────── */

interface SummaryCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  collapsible?: boolean
  defaultOpen?: boolean
}

function SummaryCard({ title, collapsible, defaultOpen = true, className, children, ...props }: SummaryCardProps) {
  const [open, setOpen] = React.useState(defaultOpen)
  return (
    <div className={cn(cardBase, className)} {...props}>
      {title && (
        <div className={cn(cardHeader, "h-[52px]")}>
          <h4 className="text-xs font-bold text-ui-neutral-600 dark:text-ui-neutral-400 uppercase tracking-wide">{title}</h4>
          {collapsible && (
            <button type="button" onClick={() => setOpen(!open)} className={iconBtn} aria-label={open ? "Recolher" : "Expandir"}>
              <svg className={cn("size-[14px] transition-transform", open ? "rotate-180" : "")} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 5l4 4 4-4" />
              </svg>
            </button>
          )}
        </div>
      )}
      {open && <div className="p-4">{children}</div>}
    </div>
  )
}

/* ── KPI Card ────────────────────────────────────────────────────── */

interface KpiCardProps {
  label: string
  value: React.ReactNode
  trend?: React.ReactNode
  className?: string
}

function KpiCard({ label, value, trend, className }: KpiCardProps) {
  return (
    <div className={cn(cardBase, "p-4", className)}>
      <p className="text-[11px] font-bold text-ui-neutral-500 uppercase tracking-wider mb-1">{label}</p>
      <p className="text-2xl font-bold text-ui-neutral-900 dark:text-ui-neutral-100 leading-none mb-1">{value}</p>
      {trend && <div className="text-xs text-ui-neutral-500">{trend}</div>}
    </div>
  )
}

/* ── Divider ─────────────────────────────────────────────────────── */

function Divider({ className }: { className?: string }) {
  return <div className={cn("h-px bg-ui-neutral-200 dark:bg-[#374E7A] mx-4", className)} />
}

export { SectionCard, FormCard, SummaryCard, KpiCard, Divider }
