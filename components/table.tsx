'use client'
import { HeaderRow } from "@/components/header-row";
import { Row } from "@/components/row";
import { ROW_COUNT } from "@/constants";
import { useScrollbarElement } from "@/hooks/use-scrollbar-element";

export function Table() {
  const { containerRef, scrollbarRef } = useScrollbarElement();

  const rows = [<HeaderRow key="header-row" />];

  for (let i = 0; i < ROW_COUNT; i++) {
    rows.push(<Row key={i} index={i} />)
  }

  return (
    <>
      <div ref={scrollbarRef}></div>
      <div ref={containerRef} className="grid grid-cols-[60px_repeat(17,minmax(96px,_1fr))]">
        {rows}
      </div>
    </>
  );
}
