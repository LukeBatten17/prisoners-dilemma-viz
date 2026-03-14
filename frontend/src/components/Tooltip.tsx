import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

type Position = "left" | "right" | "top" | "bottom";

type TooltipProps = {
  text: string;
  icon?: React.ReactNode;
  position?: Position;
  children?: React.ReactNode;
};

const GAP = 8;

function getTooltipStyle(
  anchor: DOMRect,
  tooltip: DOMRect,
  position: Position,
): React.CSSProperties {
  const scroll = { x: window.scrollX, y: window.scrollY };
  switch (position) {
    case "bottom":
      return {
        top: anchor.bottom + scroll.y + GAP,
        left: anchor.left + scroll.x + anchor.width / 2 - tooltip.width / 2,
      };
    case "top":
      return {
        top: anchor.top + scroll.y - tooltip.height - GAP,
        left: anchor.left + scroll.x + anchor.width / 2 - tooltip.width / 2,
      };
    case "right":
      return {
        top: anchor.top + scroll.y + anchor.height / 2 - tooltip.height / 2,
        left: anchor.right + scroll.x + GAP,
      };
    case "left":
    default:
      return {
        top: anchor.top + scroll.y + anchor.height / 2 - tooltip.height / 2,
        left: anchor.left + scroll.x - tooltip.width - GAP,
      };
  }
}

const Tooltip = ({ text, icon, position = "left", children }: TooltipProps) => {
  const [visible, setVisible] = useState(false);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const anchorRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (visible && anchorRef.current && tooltipRef.current) {
      const anchor = anchorRef.current.getBoundingClientRect();
      const tip = tooltipRef.current.getBoundingClientRect();
      setStyle(getTooltipStyle(anchor, tip, position));
    }
  }, [visible, position]);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (!(e.target as Element).closest(".tooltip-root")) {
        setVisible(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  return (
    <div
      ref={anchorRef}
      className="tooltip-root relative inline-block cursor-help"
      onClick={(e) => {
        e.stopPropagation();
        setVisible((v) => !v);
      }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      tabIndex={0}
    >
      {children || icon}
      {visible &&
        createPortal(
          <span
            ref={tooltipRef}
            style={{ position: "absolute", ...style }}
            className="w-[200px] bg-text text-background text-sm text-center font-normal normal-case p-[5px] z-[9999] whitespace-normal leading-tight pointer-events-none"
          >
            {text}
          </span>,
          document.body,
        )}
    </div>
  );
};

export default Tooltip;
