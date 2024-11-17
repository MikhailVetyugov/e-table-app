import { ChangeEvent, FocusEvent, memo, useCallback, useRef, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { FormulaHint } from "./formula-hint";

interface ICellInputProps {
  className: string;
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
}

export const CellInput: React.FC<ICellInputProps> = memo(({ className, value, onChange, onBlur }) => {
  const [open, setPopoverOpen] = useState(false);
  const popoverRef = useRef(null);

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setPopoverOpen(/^=\s*S/.test(value));

    onChange(value);
  }, [onChange]);

  const handleBlur = useCallback((event: FocusEvent) => {
    if (event.relatedTarget !== popoverRef.current) {
      onBlur();
    } else {
      setPopoverOpen(false);
    }
  }, [onBlur]);

  return (
    <Popover open={open}>
      <PopoverTrigger>
        <input
          className={className}
          autoFocus
          spellCheck={false}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </PopoverTrigger>
      <PopoverContent
        ref={popoverRef}
        align="start"
        onOpenAutoFocus={e => e.preventDefault()}
        onCloseAutoFocus={e => e.preventDefault()}
        className="px-0 py-1"
      >
        <FormulaHint onSelect={onChange} />
      </PopoverContent>
    </Popover>
  );
});
