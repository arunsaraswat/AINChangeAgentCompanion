import { useRef, useLayoutEffect } from 'react';

export function useCursorPosition(value: string) {
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const cursorPositionRef = useRef<number | null>(null);

  // Save cursor position before render
  useLayoutEffect(() => {
    const input = inputRef.current;
    if (input && document.activeElement === input) {
      cursorPositionRef.current = input.selectionStart;
    }
  });

  // Restore cursor position after render
  useLayoutEffect(() => {
    const input = inputRef.current;
    if (input && cursorPositionRef.current !== null && document.activeElement === input) {
      input.setSelectionRange(cursorPositionRef.current, cursorPositionRef.current);
    }
  }, [value]);

  return inputRef;
}