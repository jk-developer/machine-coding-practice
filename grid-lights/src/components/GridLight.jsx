import { useState, useEffect } from "react";

const lightConfig = [
  [1, 1, 1],
  [1, 0, 1],
  [1, 1, 1],
];
export default function GridLight() {
  const totalCells = lightConfig.flat().filter((c) => c === 1).length;

  const [order, setOrder] = useState([]); // Click order
  const [activeCells, setActiveCells] = useState(new Set()); // Active cells

  const onCellClickHandler = (i, j) => {
    const key = `${i}-${j}`;
    if (activeCells.has(key)) return; // Ignore already active

    const newActive = new Set(activeCells);
    newActive.add(key);

    setActiveCells(newActive);
    setOrder((prev) => [...prev, key]);
  };

  // Watch when all cells are green
  useEffect(() => {
    if (activeCells.size === totalCells) {
      let delay = 300;
      const reverseOrder = [...order].reverse();

      reverseOrder.forEach((key, idx) => {
        setTimeout(() => {
          setActiveCells((prev) => {
            const newSet = new Set(prev);
            newSet.delete(key);
            return newSet;
          });
        }, delay);
        delay += 300;
      });

      // Reset order after animation
      setTimeout(() => {
        setOrder([]);
      }, delay);
    }
  }, [activeCells, order, totalCells]);

  return (
    <div className="wrapper">
      {lightConfig.map((row, i) =>
        row.map((cell, j) => {
          const key = `${i}-${j}`;
          const isActive = activeCells.has(key);
          return (
            <div
              key={key}
              className={
                cell === 0 ? "empty-cell" : isActive ? "cell active" : "cell"
              }
              onClick={() =>
                cell !== 0 && !isActive && onCellClickHandler(i, j)
              }
            ></div>
          );
        })
      )}
    </div>
  );
}
