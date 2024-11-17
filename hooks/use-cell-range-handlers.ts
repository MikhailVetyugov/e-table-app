import { ITableContext } from "@/components/tableContext";
import { useCallback } from "react";

interface IParams {
  tableContext: ITableContext | null;
  row: number;
  col: number;
}

export function useCellRangeHandlers({
  tableContext,
  row,
  col,
}: IParams) {
  const mouseDownHandler = useCallback(() => {
    tableContext?.startRange(row, col);
  }, [tableContext, row, col]);

  const mouseUpHandler = useCallback(() => {
    tableContext?.endRange(row, col, false);
  }, [tableContext, row, col]);

  const mouseOverHandler = useCallback(() => {
    if (tableContext?.range?.isIntermediary) {
      tableContext?.endRange(row, col, true);
    }
  }, [tableContext, row, col]);

  return {
    mouseDownHandler,
    mouseUpHandler,
    mouseOverHandler
  };
};
