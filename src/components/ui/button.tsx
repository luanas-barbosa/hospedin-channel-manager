import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  [
    "group/button inline-flex shrink-0 items-center justify-center gap-2",
    "rounded-[5px] border border-transparent font-bold text-sm whitespace-nowrap",
    "transition-all duration-150 outline-none select-none cursor-pointer",
    "focus-visible:ring-2 focus-visible:ring-brand-teal/50 focus-visible:ring-offset-1",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-[14px]",
  ].join(" "),
  {
    variants: {
      variant: {
        primary: "bg-brand-teal text-white hover:bg-[#2aab9a] active:bg-[#22998a]",
        secondary: "bg-ui-secondary-default text-white hover:bg-ui-secondary-light active:bg-ui-secondary-dark",
        destructive: "bg-ui-semantic-danger text-white hover:bg-[#d44b40] active:bg-[#c0423a]",
        cancel: "bg-brand-purple text-white hover:bg-[#6a4f95] active:bg-[#5e4585]",
        split: "bg-brand-aqua text-white hover:bg-[#3ab2c4] active:bg-[#33a0b1]",
        outline: "border-brand-teal text-brand-teal bg-transparent hover:bg-brand-teal/10 active:bg-brand-teal/20",
        "outline-neutral": "border-ui-neutral-300 text-ui-neutral-700 bg-transparent hover:bg-ui-neutral-100 active:bg-ui-neutral-200 dark:border-[#374E7A] dark:text-ui-neutral-300",
        "outline-destructive": "border-ui-semantic-danger text-ui-semantic-danger bg-transparent hover:bg-ui-semantic-danger/10 active:bg-ui-semantic-danger/20",
        ghost: "text-ui-neutral-700 bg-transparent hover:bg-ui-neutral-100 hover:text-ui-neutral-900 active:bg-ui-neutral-200 dark:text-ui-neutral-300 dark:hover:bg-[#374E7A]/40 dark:hover:text-white",
        neutral: "border-ui-neutral-300 text-ui-neutral-700 bg-white hover:bg-ui-neutral-100 hover:border-ui-neutral-400 active:bg-ui-neutral-200 dark:bg-[#374E7A]/30 dark:border-[#374E7A] dark:text-ui-neutral-200",
      },
      size: {
        sm:        "h-[30px] px-3 text-xs",
        default:   "h-10 px-4",
        lg:        "h-11 px-5 text-base",
        icon:      "size-10 p-0",
        "icon-sm": "size-[30px] p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

function SplitButton({
  className,
  children,
  onDropdownClick,
  ...props
}: React.ComponentProps<typeof ButtonPrimitive> & { onDropdownClick?: () => void }) {
  return (
    <div className={cn("inline-flex rounded-[5px] overflow-hidden", className)}>
      <ButtonPrimitive
        data-slot="button"
        className={cn(buttonVariants({ variant: "split" }), "rounded-none rounded-l-[5px] border-r border-[#3ab2c4]")}
        {...props}
      >
        {children}
      </ButtonPrimitive>
      <button
        type="button"
        onClick={onDropdownClick}
        className={cn(buttonVariants({ variant: "split", size: "icon" }), "rounded-none rounded-r-[5px] w-8 border-l border-[#3ab2c4]")}
        aria-label="Abrir opções"
      >
        <ChevronDown className="size-3" />
      </button>
    </div>
  )
}

function Button({
  className,
  variant = "primary",
  size = "default",
  ...props
}: React.ComponentProps<typeof ButtonPrimitive> & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, SplitButton, buttonVariants }
