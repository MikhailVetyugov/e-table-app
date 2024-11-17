import { COLUMN_COUNT } from "@/constants";
import { Cell } from "./cell";

interface IRowProps {
  index: number;
}

export const Row: React.FC<IRowProps> = ({ index }) => {
  const cells = [];

  const numberCellClassName = "shadow-[0_-1px_0_transparent,1px_0_0_transparent] shadow-slate-500 mr-px relative z-0 text-center"

  cells.push(<div key="number-cell" className={numberCellClassName}>{index}</div>)

  for (let colIndex = 0; colIndex < COLUMN_COUNT; colIndex++) {
    cells.push(<Cell key={colIndex} row={index} col={colIndex} />);
  }

  return (
    <>{cells}</>
  );
};
