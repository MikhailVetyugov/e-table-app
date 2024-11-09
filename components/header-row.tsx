import { ALPHABET, COLUMN_COUNT } from "@/constants";

export const HeaderRow: React.FC = () => {
  const cells = [];

  const className = "shadow-[0px_1px_0_transparent,-1px_0_0_transparent] shadow-slate-500 mb-px relative z-0 text-center"

  cells.push(<div key="empty-cell" className={className}></div>)

  for (let i = 0; i < COLUMN_COUNT; i++) {
    cells.push(
      <div key={i} className={className}>
        {ALPHABET[i]}
      </div>
    );
  }

  return (
    <>{cells}</>
  );
};
