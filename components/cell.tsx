import { ChangeEvent, ClipboardEvent, KeyboardEvent, MouseEvent, useCallback, useState } from "react";
import { isValidKeyboardEvent } from "@/utils/isValidKeyboardEvent";
import { writeClipboardText } from "@/utils/writeClipboardText";

export const Cell: React.FC = () => {
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

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value), []);

  const handleCopy = useCallback(async (event: ClipboardEvent) => {
    const text = (event.target as HTMLDivElement).innerText;
    await writeClipboardText(text);
  }, [value]);

  const handlePaste = useCallback((event: ClipboardEvent) => setValue(event.clipboardData.getData('Text')), []);

  const className = isFocused
    ? 'ps-1 shadow-[inset_-2px_-2px,inset_1px_1px,-1px_0,0_-1px,-1px_-1px] shadow-blue-600 outline-none'
    : 'ps-1 shadow-[inset_-1px_-1px] shadow-slate-300 overflow-hidden';

  if (isEntering) {
    return (
      <input
        className={className}
        autoFocus
        spellCheck={false}
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
      tabIndex={0}
      children={value}
    />
  );
};
