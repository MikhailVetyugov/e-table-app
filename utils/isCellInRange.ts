import { IRange } from "@/types/range";

export function isCellInRange(
  cellRow: number,
  cellCol: number,
  range: IRange | undefined,
): boolean {
  if (!range || range.isSingleCellRange) {
    return false;
  }

  const isRowInRange = (range.startRow <= cellRow && cellRow <= range.endRow) || (range.endRow <= cellRow && cellRow <= range.startRow);
  const isColInRange = (range.startCol <= cellCol && cellCol <= range.endCol) || (range.endCol <= cellCol && cellCol <= range.startCol);

  return isRowInRange && isColInRange;
}
