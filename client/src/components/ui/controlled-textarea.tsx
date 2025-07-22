import * as React from "react";
import { cn } from "@/lib/utils";
import { useCursorPosition } from "@/hooks/useCursorPosition";

export interface ControlledTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string;
}

const ControlledTextarea = React.forwardRef<HTMLTextAreaElement, ControlledTextareaProps>(
  ({ className, value, ...props }, ref) => {
    const cursorRef = useCursorPosition(value);
    
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={(node) => {
          // Handle both refs
          (cursorRef as React.MutableRefObject<HTMLTextAreaElement | null>).current = node;
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = node;
          }
        }}
        value={value}
        {...props}
      />
    );
  }
);
ControlledTextarea.displayName = "ControlledTextarea";

export { ControlledTextarea };