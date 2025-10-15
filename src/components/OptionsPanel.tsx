import React from "react";

const OptionsPanel = () => {
  return (
    <div className="h-12 border flex justify-between items-center gap-10 p-4">
      <div>
        <label htmlFor="num-of-rounds" className="text-lg mr-1">
          # of rounds
        </label>
        <select
          name="rounds"
          id="num-of-rounds"
          className="border p-1 rounded-full"
        >
          <option value={5}>5</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
          <option value={200}>200</option>
          <option value="Random">Random</option>
        </select>
      </div>
      <div className="flex gap-1">
        <input type="checkbox" name="noise" value="noise" />
        <label htmlFor="noise">noise</label>
      </div>
      <div>
        <label htmlFor="num-of-rounds" className="text-lg mr-1">
          speed
        </label>
        <select
          name="rounds"
          id="num-of-rounds"
          className="border p-1 rounded-full "
        >
          <option value={1.5}>1.5</option>
          <option value={2}>2</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
        </select>
      </div>
      <div className="flex gap-2">
        <button className="border dark:border-[#f3e2d8] px-4 rounded-full text-lg shadow-sm dark:shadow-[#f3e2d8]">
          reset
        </button>
        <button className="border dark:border-[#f3e2d8] px-6 rounded-full text-lg font-bol bg-primary shadow-sm dark:shadow-[#f3e2d8]">
          Go
        </button>
      </div>
    </div>
  );
};

export default OptionsPanel;
