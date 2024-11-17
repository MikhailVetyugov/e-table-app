'use client'
import { useMemo } from "react";
import { HeaderRow } from "@/components/header-row";
import { Row } from "@/components/row";
import { ROW_COUNT } from "@/constants";
import { useScrollbarElement } from "@/hooks/use-scrollbar-element";
import { useCellRange } from "@/hooks/use-cell-range";
import { ITableContext, TableContext } from "./tableContext";

export function Table() {
  const { containerRef, scrollbarRef } = useScrollbarElement();
  const { startRange, endRange, range } = useCellRange();

  const rows = [<HeaderRow key="header-row" />];

  for (let i = 0; i < ROW_COUNT; i++) {
    rows.push(<Row key={i} index={i} />)
  }

  const value = useMemo<ITableContext>(() => ({
    startRange,
    endRange,
    range,
  }), [startRange, endRange, range]);

  return (
    <TableContext.Provider value={value}>
      <div ref={scrollbarRef}></div>
      <div ref={containerRef} className="grid grid-cols-[60px_repeat(17,minmax(96px,_1fr))] select-none">
        {rows}
      </div>
    </TableContext.Provider>
  );
}
