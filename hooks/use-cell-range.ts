import { useCallback, useMemo, useState } from "react";
import { IRange } from "@/types/range";

interface ICell {
  row: number;
  col: number;
}

export function useCellRange() {
  const [startCell, setStartCell] = useState<ICell>();
  const [endCell, setEndCell] = useState<ICell>();
  const [isIntermediary, setIsIntermediary] = useState<boolean>(false)

  const startRange = useCallback((row: number, col: number) => {
    setIsIntermediary(true);
    setStartCell({ row, col });
    setEndCell({ row, col });
  }, []);

  const endRange = useCallback((row: number, col: number, intermediary: boolean) => {
    setIsIntermediary(intermediary);
    setEndCell({ row, col });
  }, []);

  const range = useMemo<IRange | undefined>(() => {
    if (!startCell || !endCell) {
      return undefined;
    }

    const isSingleCellRange = startCell.row === endCell.row && startCell.col === endCell.col;

    return {
      startRow: startCell.row,
      startCol: startCell.col,
      endRow: endCell.row,
      endCol: endCell.col,
      isIntermediary,
      isSingleCellRange,
    };
  }, [startCell, endCell, isIntermediary]);

  return {
    startRange,
    endRange,
    range,
  };
};
