import { useCallback, useContext, useEffect, useRef } from "react";
import { TableContext } from "@/components/tableContext";
import { ALPHABET } from "@/constants";

interface IParams {
  isActiveFormula: boolean;
  value: string;
  onChange(value: string): void;
  onBlur: () => void;
}

export function useFormulaRange({ isActiveFormula, value, onChange, onBlur }: IParams) {
  const tableContext = useContext(TableContext);
  const range = tableContext?.range;

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (isActiveFormula && event.key === 'Enter' || event.key === 'Tab') {
      onChange(`${value})`);
      onBlur();
      event.stopPropagation();
    }
  }, [isActiveFormula, value, onChange, onBlur]);

  useEffect(() => {
    if (isActiveFormula) {
      document.addEventListener('keydown', handleKeyDown, true);
    }

    return () => document.removeEventListener('keydown', handleKeyDown, true);
  } , [isActiveFormula, handleKeyDown]);

  const formulaRef = useRef<string>();

  useEffect(() => {
    if (!range || !isActiveFormula) {
      return;
    }

    if (!formulaRef.current) {
      formulaRef.current = value;
    }
    
    const { startCol, startRow, endCol, endRow } = range;
    
    // 4-й квадрант.
    if (startRow < endRow && startCol < endCol) {
      const newValue = `${formulaRef.current}${ALPHABET[startCol]}${startRow + 1}:${ALPHABET[endCol]}${endRow + 1}`;

      onChange(newValue);

      return;
    }

    // 1-й квадрант.
    if (endRow < startRow && endCol < startCol) {
      const newValue = `${formulaRef.current}${ALPHABET[endCol]}${endRow + 1}:${ALPHABET[startCol]}${startRow + 1}`;

      onChange(newValue);

      return;
    }

    // 2-й квадрант.
    if (endRow < startRow && startCol < endRow) {
      const rowCount = endRow - startRow;

      const newValue = `${formulaRef.current}${ALPHABET[startCol]}${startRow + 1 - rowCount}:${ALPHABET[endCol]}${endRow + 1 + rowCount}`;

      onChange(newValue);

      return;
    }

    // 3-й квадрант.
    if (startRow < endRow && endCol < startCol) {
      const colCount = startCol - endCol;

      const newValue = `${formulaRef.current}${ALPHABET[startCol - colCount]}${startRow + 1}:${ALPHABET[endCol + colCount]}${endRow + 1}`;

      onChange(newValue);

      return;
    }
  }, [range, isActiveFormula, value, onChange]);
}
