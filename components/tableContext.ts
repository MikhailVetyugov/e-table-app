import { IRange } from "@/types/range";
import { createContext } from "react";

export interface ITableContext {
  startRange: (row: number, col: number)=> void;
  endRange: (row: number, col: number, intermediary: boolean) => void;
  range: IRange | undefined;
}

export const TableContext = createContext<ITableContext | null>(null);
