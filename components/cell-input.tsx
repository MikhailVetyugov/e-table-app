import { ChangeEvent, FocusEvent, memo, useCallback, useRef, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { hasActiveFormula } from "@/utils/hasActiveFormula";
import { FormulaHint } from "./formula-hint";
import { useFormulaRange } from "@/hooks/use-formula-range";

interface ICellInputProps {
  className: string;
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
}

export const CellInput: React.FC<ICellInputProps> = memo(({ className, value, onChange, onBlur }) => {
  const [open, setPopoverOpen] = useState(false);
  const popoverRef = useRef(null);

  const isActiveFormula = hasActiveFormula(value);
  useFormulaRange({ isActiveFormula, value, onChange, onBlur });

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setPopoverOpen(/^=\s*S/.test(value));

    onChange(value);
  }, [onChange]);

  const handleBlur = useCallback((event: FocusEvent) => {
    if (event.relatedTarget !== popoverRef.current) {
      if (!isActiveFormula) {
        onBlur();
      }
    } else {
      setPopoverOpen(false);
    }
  }, [onBlur, isActiveFormula]);

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

CellInput.displayName = 'CellInput';
