interface IFormulaHintProps {
  onSelect: (value: string) => void;
}

export const FormulaHint: React.FC<IFormulaHintProps> = ({ onSelect }) => {
  return (
    <>
      <ul>
        <li className="py-2 px-2 bg-slate-100 cursor-pointer" role="button" onClick={() => onSelect('=SUM(')}>
          <div>SUM</div>
          <div className="text-xs">Сумма ряда чисел или содержимого ряда ячеек</div>
        </li>
      </ul>
      <div className="px-2 py-2 text-xs">Чтобы принять подсказки, нажмите клавишу Tab</div>
    </>
  );
};
