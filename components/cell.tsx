import {  ClipboardEvent, KeyboardEvent, memo, MouseEvent, useCallback, useContext, useState } from "react";
import { isValidKeyboardEvent } from "@/utils/isValidKeyboardEvent";
import { writeClipboardText } from "@/utils/writeClipboardText";
import { useCellRangeHandlers } from "@/hooks/use-cell-range-handlers";
import { isCellInRange } from "@/utils/isCellInRange";
import { CellInput } from "./cell-input";
import { TableContext } from "./tableContext";

interface ICellProps {
  row: number;
  col: number;
}

export const Cell: React.FC<ICellProps> = memo(({ row, col }) => {
  const tableContext = useContext(TableContext);

  const [isFocused, setFocused] = useState(false);
  const [isEntering, setEntering] = useState(false);
  const [value, setValue] = useState('');

  const handleFocus = useCallback(() => setFocused(true), []);

  const handleBlur = useCallback(() => {
    setFocused(false);
    setEntering(false);
  }, []);

  const handleClick = useCallback((event: MouseEvent) => {
    if (isFocused && event.detail >= 2) {
      setEntering(true);
    }
  }, [isFocused]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (isValidKeyboardEvent(event)) {
      setValue('');

      if (event.key !== 'Backspace' && event.key !== 'Delete') {
        setEntering(true);
      }
    }
  }, []);

  const handleChange = useCallback((value: string) => setValue(value), []);

  const handleCopy = useCallback(async (event: ClipboardEvent) => {
    const text = (event.target as HTMLDivElement).innerText;
    await writeClipboardText(text);
  }, []);

  const handlePaste = useCallback((event: ClipboardEvent) => setValue(event.clipboardData.getData('Text')), []);

  const { mouseDownHandler, mouseUpHandler, mouseOverHandler } = useCellRangeHandlers({
    tableContext,
    row,
    col,
  });

  const rangeClassName = isCellInRange(row, col, tableContext?.range) ? 'bg-blue-100' : '';

  const className = isFocused
    ? `ps-1 shadow-[inset_-2px_-2px,inset_1px_1px,-1px_0,0_-1px,-1px_-1px] shadow-blue-600 outline-none w-full ${rangeClassName}`
    : `ps-1 shadow-[inset_-1px_-1px] shadow-slate-300 overflow-hidden ${rangeClassName}`;

  if (isEntering) {
    return (
      <CellInput
        className={className}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    );
  }

  return (
    <div
      className={className}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onCopy={handleCopy}
      onPaste={handlePaste}
      onMouseDown={mouseDownHandler}
      onMouseUp={mouseUpHandler}
      onMouseOver={mouseOverHandler}
      tabIndex={0}
    >
      {value}
    </div>
  );
});

Cell.displayName = 'Cell';
