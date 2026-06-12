import * as React from "react"
import { cn } from "@/lib/utils"

/* ── Table Container ─────────────────────────────────────────────── */

function Table({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="w-full overflow-auto">
      <table className={cn("w-full caption-bottom text-sm border-collapse", className)} {...props} />
    </div>
  )
}

function TableHeader({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className={cn("", className)} {...props} />
}

function TableBody({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className={cn("[&_tr:last-child]:shadow-none", className)} {...props} />
}

function TableFooter({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tfoot className={cn("bg-ui-secondary-default font-medium text-white", className)} {...props} />
}

function TableRow({
  className,
  odd,
  ...props
}: React.HTMLAttributes<HTMLTableRowElement> & { odd?: boolean }) {
  return (
    <tr
      className={cn(
        "transition-colors hover:bg-ui-neutral-100 dark:hover:bg-[#374E7A]/30",
        odd ? "bg-[#F3F6FD] dark:bg-[#243656]" : "bg-white dark:bg-[#1B2B4C]",
        className
      )}
      {...props}
    />
  )
}

/* ── Table Head Cell ─────────────────────────────────────────────── */

interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  sortable?: boolean
  sortDirection?: "asc" | "desc" | null
  centered?: boolean
  filled?: boolean
}

function TableHead({
  className,
  sortable,
  sortDirection,
  centered,
  filled = false,
  children,
  onClick,
  ...props
}: TableHeadProps) {
  return (
    <th
      className={cn(
        "h-[42px] px-3 text-[11px] font-bold uppercase tracking-wide whitespace-nowrap",
        filled
          ? "bg-brand-teal text-white"
          : "bg-[#f9fafb] text-[#6b7280] border-b border-ui-neutral-200 dark:bg-[#1B2B4C] dark:text-ui-neutral-500 dark:border-[#374E7A]",
        centered ? "text-center" : "text-left",
        sortable && "cursor-pointer select-none hover:brightness-95",
        className
      )}
      onClick={onClick}
      {...props}
    >
      <span className="inline-flex items-center gap-1">
        {children}
        {sortable && <SortIcon direction={sortDirection ?? null} />}
      </span>
    </th>
  )
}

function SortIcon({ direction }: { direction: "asc" | "desc" | null }) {
  return (
    <svg className={cn("size-[12px] shrink-0 opacity-60", direction && "opacity-100")} viewBox="0 0 12 12" fill="currentColor">
      <path d="M6 1.5L8.5 5H3.5L6 1.5Z" opacity={direction === "asc" ? 1 : 0.4} />
      <path d="M6 10.5L3.5 7H8.5L6 10.5Z" opacity={direction === "desc" ? 1 : 0.4} />
    </svg>
  )
}

/* ── Table Cell ──────────────────────────────────────────────────── */

function TableCell({
  className,
  centered,
  children,
  ...props
}: React.TdHTMLAttributes<HTMLTableCellElement> & { centered?: boolean }) {
  return (
    <td
      className={cn(
        "h-[42px] px-3 text-sm text-ui-neutral-800 dark:text-ui-neutral-200",
        "shadow-[inset_0_-1px_0_#D6DDEE] dark:shadow-[inset_0_-1px_0_#374E7A]",
        centered ? "text-center" : "text-left",
        className
      )}
      {...props}
    >
      {children}
    </td>
  )
}

function TableCaption({ className, ...props }: React.HTMLAttributes<HTMLTableCaptionElement>) {
  return <caption className={cn("mt-4 text-sm text-ui-neutral-500", className)} {...props} />
}

export { Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption }
