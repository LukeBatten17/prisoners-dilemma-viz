import React, { useRef, useState, useEffect } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import "react-indiana-drag-scroll/dist/style.css";

type TimelinePanelProps = {
  currentRound: number;
  maxRounds: number;
  stratOneHistory: [];
  stratTwoHistory: [];
};

const TimelinePanel: React.FC<TimelinePanelProps> = ({
  currentRound,
  maxRounds,
  stratOneHistory,
  stratTwoHistory,
}) => {
  const scrollContainerRef = useRef<any>(null);

  // Auto-scroll to the end when history updates
  useEffect(() => {
    if (scrollContainerRef.current?.getElement) {
      const element = scrollContainerRef.current.getElement();
      element.scrollTo({
        left: element.scrollWidth,
        behavior: "smooth",
      });
    }
  }, [stratOneHistory.length, stratTwoHistory.length]);

  return (
    <div className="border p-2 flex flex-col gap-4">
      <div className="flex justify-start align-center gap-2 py-2">
        <div className="flex flex-col gap-1.5  text-nowrap">
          <p>Strategy 1: </p>
          <p>Strategy 2: </p>
        </div>

        <ScrollContainer
          ref={scrollContainerRef}
          vertical={false}
          className="flex flex-col gap-1 overflow-x-auto "
        >
          <div className="flex gap-1 flex-nowrap ">
            {stratOneHistory.map((history, index) => (
              <span
                key={index}
                className="text-center bg-green-500 dark:bg-green-800 h-6 w-6 flex-shrink-0 rounded-full border dark:border-[#f3e2d8] shadow-sm dark:shadow-[#f3e2d8]"
              >
                {history?.move}
              </span>
            ))}
            {/* To add spacing at the end */}
            <span className="w-2 flex-shrink-0"></span>
          </div>
          <div className="flex gap-1 flex-nowrap ">
            {stratTwoHistory.map((history, index) => (
              <span
                key={index}
                className="text-center bg-blue-500 dark:bg-blue-900 h-6 w-6 flex-shrink-0 rounded-full border dark:border-[#f3e2d8] shadow-sm dark:shadow-[#f3e2d8]"
              >
                {history?.move}
              </span>
            ))}
            {/* To add spacing at the end */}
            <span className="w-2 flex-shrink-0"></span>
          </div>
        </ScrollContainer>
      </div>

      <p>{`Round: ${currentRound} / ${maxRounds} `}</p>
    </div>
  );
};

export default TimelinePanel;

// const Draggable = ({ innerRef, rootClass = "", children }) => {
//   const ourRef = useRef(null);
//   const [isMouseDown, setIsMouseDown] = useState(false);
//   const mouseCoords = useRef({
//     startX: 0,
//     startY: 0,
//     scrollLeft: 0,
//     scrollTop: 0,
//   });
//   const [isScrolling, setIsScrolling] = useState(false);
//   const handleDragStart = (e) => {
//     if (!ourRef.current) return;
//     const slider = ourRef.current.children[0];
//     const startX = e.pageX - slider.offsetLeft;
//     const startY = e.pageY - slider.offsetTop;
//     const scrollLeft = slider.scrollLeft;
//     const scrollTop = slider.scrollTop;
//     mouseCoords.current = { startX, startY, scrollLeft, scrollTop };
//     setIsMouseDown(true);
//     document.body.style.cursor = "grabbing";
//   };
//   const handleDragEnd = () => {
//     setIsMouseDown(false);
//     if (!ourRef.current) return;
//     document.body.style.cursor = "default";
//   };
//   const handleDrag = (e) => {
//     if (!isMouseDown || !ourRef.current) return;
//     e.preventDefault();
//     const slider = ourRef.current.children[0];
//     const x = e.pageX - slider.offsetLeft;
//     const y = e.pageY - slider.offsetTop;
//     const walkX = (x - mouseCoords.current.startX) * 1.5;
//     const walkY = (y - mouseCoords.current.startY) * 1.5;
//     slider.scrollLeft = mouseCoords.current.scrollLeft - walkX;
//     slider.scrollTop = mouseCoords.current.scrollTop - walkY;
//     console.log(walkX, walkY);
//   };

//   return (
//     <div
//       ref={ourRef}
//       onMouseDown={handleDragStart}
//       onMouseUp={handleDragEnd}
//       onMouseMove={handleDrag}
//       className={rootClass + "flex overflow-x-scroll"}
//     >
//       {children}
//     </div>
//   );
// };
