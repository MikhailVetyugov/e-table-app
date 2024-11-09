import { useCallback, useState } from "react";

export const Cell: React.FC = () => {
  const [isFocused, setFocused] = useState(false);

  const selectedClassName = isFocused
    ? 'relative shadow-[inset_0_0_0_2px_transparent,0px_0px_0_1px_transparent] shadow-blue-600 outline-[0px]'
    : '';

  const handleFocus = useCallback(() => setFocused(true), []);
  const handleBlur = useCallback(() => setFocused(false), []);

  return (
    <input
      className={`outline outline-slate-300 outline-1 ps-1 ${selectedClassName} `}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
};
