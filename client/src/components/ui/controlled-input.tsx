import * as React from "react";
import { cn } from "@/lib/utils";
import { useCursorPosition } from "@/hooks/useCursorPosition";

export interface ControlledInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
}

const ControlledInput = React.forwardRef<HTMLInputElement, ControlledInputProps>(
  ({ className, type, value, ...props }, ref) => {
    const cursorRef = useCursorPosition(value);
    
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={(node) => {
          // Handle both refs
          (cursorRef as React.MutableRefObject<HTMLInputElement | null>).current = node;
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
          }
        }}
        value={value}
        {...props}
      />
    );
  }
);
ControlledInput.displayName = "ControlledInput";

export { ControlledInput };