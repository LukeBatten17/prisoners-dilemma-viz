import React, { useRef, useState, useEffect } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import "react-indiana-drag-scroll/dist/style.css";
import { motion } from "motion/react";

type TimelinePanelProps = {
  currentRound: number;
  maxRounds: number;
  stratOneHistory: any[];
  stratTwoHistory: any[];
};

const TimelinePanel: React.FC<TimelinePanelProps> = ({
  currentRound,
  maxRounds,
  stratOneHistory,
  stratTwoHistory,
}) => {
  const scrollContainerRef = useRef<ScrollContainer>(null);

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
    <div className="border flex flex-col gap-2">
      <div className="flex justify-start align-center gap-2 p-2">
        <div className="flex flex-col gap-1.5  text-nowrap">
          <p>Strategy 1: </p>
          <p>Strategy 2: </p>
        </div>

        <ScrollContainer
          ref={scrollContainerRef as any}
          vertical={false}
          className="flex flex-col gap-1 overflow-x-auto "
        >
          <div className="flex gap-1 flex-nowrap ">
            {stratOneHistory.map((history, index) =>
              history?.move === "C" ? (
                <TimelineChips key={index}>C</TimelineChips>
              ) : (
                <TimelineChips key={index}>D</TimelineChips>
              )
            )}
          </div>
          <div className="flex gap-1 flex-nowrap ">
            {stratTwoHistory.map((history, index) =>
              history?.move === "C" ? (
                <TimelineChips key={index}>C</TimelineChips>
              ) : (
                <TimelineChips key={index}>D</TimelineChips>
              )
            )}
            <span className="w-3 "></span>
          </div>
        </ScrollContainer>
      </div>

      <p className="px-2">{`Round: ${currentRound} / ${maxRounds} `}</p>
    </div>
  );
};

export default TimelinePanel;

type TimelineChipsProps = {
  children: React.ReactNode;
  className?: string;
};
const TimelineChips: React.FC<TimelineChipsProps> = ({ children }) => {
  return (
    <motion.span
      initial={{ scale: 0, opacity: 0, y: 0 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 1000, damping: 30 }}
      className={`text-center h-6 w-6 flex-shrink-0 rounded-full border dark:border-[#f3e2d8]  dark:shadow-[#f3e2d8] ${
        children === "C"
          ? "bg-green-400 dark:bg-green-700  "
          : "bg-red-400 dark:bg-red-500"
      }`}
    >
      {children}
    </motion.span>
  );
};
