import * as React from "react"
import { cn } from "@/lib/utils"

/* ── Switch ──────────────────────────────────────────────────────── */

interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, label, id, checked, onChange, ...props }, ref) => {
    const innerId = id ?? React.useId()
    return (
      <label htmlFor={innerId} className={cn("inline-flex items-center gap-2 cursor-pointer select-none group/sw", className)}>
        <input type="checkbox" role="switch" id={innerId} ref={ref} checked={checked} onChange={onChange} className="sr-only peer" {...props} />
        <span className={cn(
          "relative inline-flex h-[22px] w-[38px] shrink-0 rounded-full border-2",
          "bg-white border-ui-neutral-300",
          "dark:bg-[#1B2B4C] dark:border-[#374E7A]",
          "peer-checked:bg-ui-semantic-success peer-checked:border-ui-semantic-success",
          "transition-colors duration-200",
          "peer-focus-visible:ring-2 peer-focus-visible:ring-brand-teal/50",
          "peer-disabled:opacity-50 peer-disabled:cursor-not-allowed",
        )}>
          <span className={cn(
            "pointer-events-none absolute top-0.5 left-0.5 inline-block size-[14px] rounded-full",
            "bg-white shadow-[0_1px_3px_rgba(0,0,0,0.25)]",
            "transition-transform duration-200 ease-in-out",
            "group-has-[:checked]/sw:translate-x-[16px]",
          )} />
        </span>
        {label && <span className="text-sm text-ui-neutral-800 dark:text-ui-neutral-200">{label}</span>}
      </label>
    )
  }
)
Switch.displayName = "Switch"

/* ── Checkbox ────────────────────────────────────────────────────── */

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string
  indeterminate?: boolean
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, id, indeterminate, checked, onChange, ...props }, ref) => {
    const innerId = id ?? React.useId()
    const inputRef = React.useRef<HTMLInputElement>(null)
    React.useImperativeHandle(ref, () => inputRef.current!)
    React.useEffect(() => {
      if (inputRef.current) inputRef.current.indeterminate = !!indeterminate
    }, [indeterminate])

    return (
      <label htmlFor={innerId} className={cn("inline-flex items-center gap-2 cursor-pointer select-none", className)}>
        <input type="checkbox" id={innerId} ref={inputRef} checked={checked} onChange={onChange} className="sr-only peer" {...props} />
        <span className={cn(
          "relative inline-flex size-[18px] shrink-0 rounded-[3px] border border-ui-neutral-300 bg-white dark:bg-[#1B2B4C] dark:border-[#4a5f84]",
          "transition-all duration-150",
          "peer-checked:bg-brand-yellow peer-checked:border-brand-yellow",
          "peer-focus-visible:ring-2 peer-focus-visible:ring-brand-teal/50",
          "peer-disabled:opacity-50 peer-disabled:cursor-not-allowed",
        )}>
          <svg className="absolute inset-0 m-auto size-[10px] text-white opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <polyline points="1.5,5 4,7.5 8.5,2.5" />
          </svg>
        </span>
        {label && <span className="text-sm text-ui-neutral-800 dark:text-ui-neutral-200">{label}</span>}
      </label>
    )
  }
)
Checkbox.displayName = "Checkbox"

export { Switch, Checkbox }
