import { COLUMN_COUNT } from "@/constants";

interface IRowProps {
  index: number;
}

export const Row: React.FC<IRowProps> = ({ index }) => {
  const cells = [];

  const className = "shadow-[0px_-1px_0_transparent,1px_0_0_transparent] shadow-slate-500 mr-px relative z-0 text-center"

  cells.push(<div key="number-cell" className={className}>{index}</div>)

  for (let i = 0; i < COLUMN_COUNT; i++) {
    cells.push(<input key={i} className="outline outline-slate-300 outline-1" />)
  }

  return (
    <>{cells}</>
  );
};
