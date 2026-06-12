import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full font-bold text-[11px] leading-none whitespace-nowrap px-2 py-1 select-none",
  {
    variants: {
      variant: {
        /* Reservation status */
        booked:       "bg-brand-purple/15 text-brand-purple",
        "pre-booked": "bg-brand-yellow/40 text-[#7a6200]",
        waiting:      "bg-brand-guava/15 text-brand-guava",
        "checked-in": "bg-ui-semantic-success/15 text-[#0f9a70]",
        "checked-out":"bg-ui-neutral-200 text-ui-neutral-700 dark:bg-[#374E7A]/50 dark:text-ui-neutral-300",
        blocked:      "bg-ui-neutral-200 text-ui-neutral-600 dark:bg-[#374E7A]/50 dark:text-ui-neutral-400",
        cancelled:    "bg-ui-semantic-danger/15 text-ui-semantic-danger",
        online:       "bg-ui-semantic-warning/20 text-[#8a6500]",
        /* Entity status */
        active:   "bg-ui-semantic-success/15 text-[#0f9a70]",
        inactive: "bg-ui-neutral-200 text-ui-neutral-600 dark:bg-[#374E7A]/50 dark:text-ui-neutral-400",
        expired:  "bg-ui-semantic-danger/15 text-ui-semantic-danger",
        /* Generic */
        default: "bg-ui-secondary-default text-white",
        outline: "border border-ui-neutral-300 text-ui-neutral-700 bg-transparent dark:border-[#374E7A] dark:text-ui-neutral-300",
        info:    "bg-ui-semantic-info/15 text-[#0080a0]",
        success: "bg-ui-semantic-success/15 text-[#0f9a70]",
        warning: "bg-ui-semantic-warning/20 text-[#8a6500]",
        danger:  "bg-ui-semantic-danger/15 text-ui-semantic-danger",
        teal:    "bg-brand-teal text-white",
        purple:  "bg-brand-purple text-white",
      },
    },
    defaultVariants: { variant: "default" },
  }
)

const dotColors: Record<string, string> = {
  booked:       "bg-brand-purple",
  "pre-booked": "bg-brand-yellow",
  waiting:      "bg-brand-guava",
  "checked-in": "bg-ui-semantic-success",
  "checked-out":"bg-ui-neutral-400",
  blocked:      "bg-ui-neutral-400",
  cancelled:    "bg-ui-semantic-danger",
  online:       "bg-ui-semantic-warning",
  active:       "bg-ui-semantic-success",
  inactive:     "bg-ui-neutral-400",
  expired:      "bg-ui-semantic-danger",
  default:      "bg-ui-neutral-500",
  info:         "bg-ui-semantic-info",
  success:      "bg-ui-semantic-success",
  warning:      "bg-ui-semantic-warning",
  danger:       "bg-ui-semantic-danger",
}

type BadgeVariant = NonNullable<VariantProps<typeof badgeVariants>["variant"]>

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  showDot?: boolean
}

function Badge({ className, variant = "default", showDot = false, children, ...props }: BadgeProps) {
  const dotClass = dotColors[variant] ?? "bg-ui-neutral-500"
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props}>
      {showDot && <span className={cn("inline-block size-[6px] rounded-full shrink-0", dotClass)} />}
      {children}
    </span>
  )
}

export { Badge, badgeVariants }
