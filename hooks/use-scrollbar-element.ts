import { useEffect, useRef } from "react";

export function useScrollbarElement() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && scrollbarRef.current) {
      scrollbarRef.current.style.width = `${containerRef.current.scrollWidth}px`;
    }
  }, []);

  return {
    containerRef,
    scrollbarRef,
  };
};
