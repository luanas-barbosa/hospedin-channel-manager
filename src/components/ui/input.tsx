import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const inputVariants = cva(
  [
    "flex h-10 w-full rounded-[4px] border px-3 py-2",
    "border-ui-neutral-200 bg-white text-ui-neutral-900 placeholder:text-ui-neutral-400",
    "dark:border-[#374E7A] dark:bg-[#1B2B4C] dark:text-[#F5F6FA] dark:placeholder:text-ui-neutral-500",
    "text-sm transition-colors duration-150",
    "focus:outline-none focus:ring-2 focus:ring-brand-teal/30 focus:border-brand-teal",
    "disabled:cursor-not-allowed disabled:bg-ui-neutral-100 disabled:text-ui-neutral-500",
    "dark:disabled:bg-[#374E7A]/30 dark:disabled:text-ui-neutral-500",
    "read-only:bg-ui-neutral-100 read-only:cursor-default dark:read-only:bg-[#374E7A]/20",
    "aria-invalid:border-ui-semantic-danger aria-invalid:ring-2 aria-invalid:ring-ui-semantic-danger/20",
  ].join(" "),
  {
    variants: {
      inputSize: {
        default: "h-10",
        compact:  "h-9",
      },
    },
    defaultVariants: { inputSize: "default" },
  }
)

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & VariantProps<typeof inputVariants>
>(({ className, inputSize, type, ...props }, ref) => (
  <input type={type} className={cn(inputVariants({ inputSize }), className)} ref={ref} {...props} />
))
Input.displayName = "Input"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    className={cn(
      "flex min-h-[104px] w-full rounded-[4px] border px-3 py-2",
      "border-ui-neutral-200 bg-white text-ui-neutral-900 placeholder:text-ui-neutral-400",
      "dark:border-[#374E7A] dark:bg-[#1B2B4C] dark:text-[#F5F6FA] dark:placeholder:text-ui-neutral-500",
      "text-sm transition-colors duration-150 resize-none",
      "focus:outline-none focus:ring-2 focus:ring-brand-teal/30 focus:border-brand-teal",
      "disabled:cursor-not-allowed disabled:bg-ui-neutral-100",
      className
    )}
    ref={ref}
    {...props}
  />
))
Textarea.displayName = "Textarea"

function CurrencyInput({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={cn("flex h-10 rounded-[4px] border overflow-hidden border-ui-neutral-200 dark:border-[#374E7A] focus-within:ring-2 focus-within:ring-brand-teal/30 focus-within:border-brand-teal", className)}>
      <span className="inline-flex items-center px-3 text-sm font-bold border-r shrink-0 bg-ui-neutral-100 text-ui-neutral-600 border-ui-neutral-200 dark:bg-[#374E7A]/40 dark:text-ui-neutral-400 dark:border-[#374E7A]">
        R$
      </span>
      <input
        type="text"
        inputMode="decimal"
        placeholder="0,00"
        className="flex-1 px-3 text-sm focus:outline-none text-ui-neutral-900 bg-white placeholder:text-ui-neutral-400 dark:bg-[#1B2B4C] dark:text-[#F5F6FA]"
        {...props}
      />
    </div>
  )
}

const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, children, ...props }, ref) => (
  <div className="relative">
    <select className={cn(inputVariants(), "appearance-none pr-8 cursor-pointer", className)} ref={ref} {...props}>
      {children}
    </select>
    <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 size-[14px] text-ui-neutral-500 dark:text-ui-neutral-400" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.5 5.25L7 8.75L10.5 5.25" />
    </svg>
  </div>
))
Select.displayName = "Select"

interface FieldProps {
  label?: string
  required?: boolean
  error?: string
  hint?: string
  children: React.ReactNode
  className?: string
}

function Field({ label, required, error, hint, children, className }: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <label className="text-sm font-bold text-ui-neutral-800 dark:text-ui-neutral-200">
          {label}
          {required && <span className="text-ui-semantic-danger ml-0.5">*</span>}
        </label>
      )}
      {children}
      {error && <p className="text-xs text-brand-guava leading-tight">{error}</p>}
      {hint && !error && <p className="text-xs text-ui-neutral-500 leading-tight">{hint}</p>}
    </div>
  )
}

export { Input, Textarea, CurrencyInput, Select, Field, inputVariants }
