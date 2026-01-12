import * as React from "react"
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react"
import { DayButton, DayPicker, getDefaultClassNames } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"]
}) {
  const defaultClassNames = getDefaultClassNames()

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "bg-[var(--color-surface-elevated)] group/calendar p-[var(--spacing-md)] [--cell-size:2.2rem] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString("default", { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: cn("w-fit", defaultClassNames.root),
        months: cn(
          "relative flex flex-col gap-[var(--spacing-md)] md:flex-row",
          defaultClassNames.months
        ),
        month: cn("flex w-full flex-col gap-[var(--spacing-md)]", defaultClassNames.month),
        nav: cn(
          "absolute inset-x-0 top-0 flex w-full items-center justify-between gap-[var(--spacing-xs)]",
          defaultClassNames.nav
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "h-[--cell-size] w-[--cell-size] select-none p-0 aria-disabled:opacity-50 hover:bg-[var(--color-primary-light)] transition-colors duration-[var(--transition-fast)]",
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "h-[--cell-size] w-[--cell-size] select-none p-0 aria-disabled:opacity-50 hover:bg-[var(--color-primary-light)] transition-colors duration-[var(--transition-fast)]",
          defaultClassNames.button_next
        ),
        month_caption: cn(
          "flex h-[--cell-size] w-full items-center justify-center px-[--cell-size]",
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          "flex h-[--cell-size] w-full items-center justify-center gap-[var(--spacing-sm)] text-[var(--font-size-base)] font-[var(--font-weight-semibold)]",
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          "has-focus:border-[var(--color-primary)] border-[var(--color-border)] shadow-[var(--shadow-sm)] has-focus:ring-[var(--color-primary)]/20 has-focus:ring-[3px] relative rounded-[var(--radius-md)] border",
          defaultClassNames.dropdown_root
        ),
        dropdown: cn(
          "bg-[var(--color-surface)] absolute inset-0 opacity-0",
          defaultClassNames.dropdown
        ),
        caption_label: cn(
          "select-none font-[var(--font-weight-semibold)] text-[var(--color-text-primary)]",
          captionLayout === "label"
            ? "text-[var(--font-size-base)]"
            : "flex h-8 items-center gap-[var(--spacing-xs)] rounded-[var(--radius-md)] pl-[var(--spacing-sm)] pr-[var(--spacing-xs)] text-[var(--font-size-base)] [&>svg]:size-3.5 [&>svg]:text-[var(--color-text-secondary)]",
          defaultClassNames.caption_label
        ),
        table: "w-full border-collapse",
        weekdays: cn("flex mb-[var(--spacing-xs)]", defaultClassNames.weekdays),
        weekday: cn(
          "text-[var(--color-text-secondary)] flex-1 select-none rounded-[var(--radius-sm)] text-[var(--font-size-xs)] font-[var(--font-weight-semibold)] uppercase tracking-wide pb-[var(--spacing-xs)]",
          defaultClassNames.weekday
        ),
        week: cn("mt-[var(--spacing-xs)] flex w-full gap-[var(--spacing-xs)]", defaultClassNames.week),
        week_number_header: cn(
          "w-[--cell-size] select-none",
          defaultClassNames.week_number_header
        ),
        week_number: cn(
          "text-[var(--color-text-secondary)] select-none text-[var(--font-size-xs)]",
          defaultClassNames.week_number
        ),
        day: cn(
          "group/day relative aspect-square h-full w-full select-none p-0 text-center",
          defaultClassNames.day
        ),
        range_start: cn(
          "bg-[var(--color-primary-light)] rounded-l-[var(--radius-md)]",
          defaultClassNames.range_start
        ),
        range_middle: cn("rounded-none", defaultClassNames.range_middle),
        range_end: cn("bg-[var(--color-primary-light)] rounded-r-[var(--radius-md)]", defaultClassNames.range_end),
        today: cn(
          "bg-[var(--color-primary-light)] text-[var(--color-primary)] rounded-[var(--radius-md)] font-[var(--font-weight-semibold)] data-[selected=true]:rounded-[var(--radius-md)]",
          defaultClassNames.today
        ),
        outside: cn(
          "text-[var(--color-text-muted)] opacity-50 aria-selected:text-[var(--color-text-muted)]",
          defaultClassNames.outside
        ),
        disabled: cn(
          "text-[var(--color-text-muted)] opacity-40",
          defaultClassNames.disabled
        ),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={cn(className)}
              {...props}
            />
          )
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") {
            return (
              <ChevronLeftIcon className={cn("size-4", className)} {...props} />
            )
          }

          if (orientation === "right") {
            return (
              <ChevronRightIcon
                className={cn("size-4", className)}
                {...props}
              />
            )
          }

          return (
            <ChevronDownIcon className={cn("size-4", className)} {...props} />
          )
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-[--cell-size] items-center justify-center text-center">
                {children}
              </div>
            </td>
          )
        },
        ...components,
      }}
      {...props}
    />
  )
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames()

  const ref = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        "flex aspect-square h-auto w-full min-w-[--cell-size] flex-col gap-[var(--spacing-xs)] font-[var(--font-weight-medium)] leading-none text-[var(--color-text-primary)]",
        "hover:bg-[var(--color-primary-light)] hover:text-[var(--color-primary)] transition-all duration-[var(--transition-fast)]",
        "rounded-[var(--radius-md)]",
        "data-[selected-single=true]:bg-[var(--color-primary)] data-[selected-single=true]:text-white data-[selected-single=true]:font-[var(--font-weight-semibold)] data-[selected-single=true]:shadow-[var(--shadow-sm)]",
        "data-[range-middle=true]:bg-[var(--color-primary-light)] data-[range-middle=true]:text-[var(--color-primary)]",
        "data-[range-start=true]:bg-[var(--color-primary)] data-[range-start=true]:text-white",
        "data-[range-end=true]:bg-[var(--color-primary)] data-[range-end=true]:text-white",
        "data-[range-end=true]:rounded-[var(--radius-md)] data-[range-middle=true]:rounded-[var(--radius-sm)] data-[range-start=true]:rounded-[var(--radius-md)]",
        "group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] group-data-[focused=true]/day:ring-[var(--color-primary)]/30 group-data-[focused=true]/day:border-[var(--color-primary)]",
        "[&>span]:text-[var(--font-size-xs)] [&>span]:opacity-70",
        defaultClassNames.day,
        className
      )}
      {...props}
    />
  )
}

export { Calendar, CalendarDayButton }
