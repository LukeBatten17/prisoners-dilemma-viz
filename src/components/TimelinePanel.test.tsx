import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import TimelinePanel from "./TimelinePanel";

// Mock framer-motion to avoid animation issues in tests
vi.mock("motion/react", () => ({
  motion: {
    span: ({ children, className, ...props }: any) => (
      <span className={className} {...props}>
        {children}
      </span>
    ),
  },
}));

// Mock the scroll container
vi.mock("react-indiana-drag-scroll", () => ({
  default: ({ children, className }: any) => (
    <div className={className}>{children}</div>
  ),
}));

describe("TimelinePanel", () => {
  it("renders round counter", () => {
    render(
      <TimelinePanel
        currentRound={5}
        maxRounds={10}
        stratOneHistory={[]}
        stratTwoHistory={[]}
      />
    );
    expect(screen.getByText(/Round: 5 \/ 10/)).toBeTruthy();
  });

  it("displays correct number of chips", () => {
    const history = [
      { move: "C", payoff: 3 },
      { move: "D", payoff: 5 },
    ];
    render(
      <TimelinePanel
        currentRound={2}
        maxRounds={10}
        stratOneHistory={history}
        stratTwoHistory={history}
      />
    );
    expect(screen.getAllByText("C")).toHaveLength(2);
    expect(screen.getAllByText("D")).toHaveLength(2);
  });
});
