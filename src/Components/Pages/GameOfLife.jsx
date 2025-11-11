import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation
import Sketch from 'react-p5';
import "./GameOfLife.css";

/*
Right now this is just the exact same implementation of the game of life as Daniel Shiffman's p5.js tutorial
https://www.youtube.com/watch?v=FWSR_7kZuYg
It is just a place holder and I wanted to see how to conver p5.js code to react

Here is what I plan on doing with this page for the game of life:
1. Add a reset button so you don't have to keep refreshing the page
2. Make the location of the canvas a nicer location
3. Make a pause and start button
4. Make it so that it is not just random every time, but you can click to add live cells or there is a button for random

further ideas if I really want to is make more

5. List some of the cool patterns about the game of life
6. make it so that you can zoom in and out of the game of life

*/

const GameOfLife = () => {
  const make2DArray = (cols, rows) => {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
      arr[i] = new Array(rows);
    }
    return arr;
  };

  const resolution = 10;
  const [reset, setReset] = useState(false); // State to trigger a reset
  const [isRunning, setIsRunning] = useState(true); // State to manage play/pause
  const gridRef = useRef(null); // Use a ref to persist the grid state across renders
  const colsRef = useRef(0); // Store the number of columns
  const rowsRef = useRef(0); // Store the number of rows

  const location = useLocation(); // Hook to detect route changes

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(1000, 600).parent(canvasParentRef);
    p5.frameRate(20);
    colsRef.current = p5.width / resolution;
    rowsRef.current = p5.height / resolution;

    const initialGrid = make2DArray(colsRef.current, rowsRef.current);
    for (let i = 0; i < colsRef.current; i++) {
      for (let j = 0; j < rowsRef.current; j++) {
        initialGrid[i][j] = p5.floor(p5.random(2));
      }
    }
    gridRef.current = initialGrid; // Store the initial grid in the ref
  };

  const draw = (p5) => {
    p5.background(0);

    if (reset) {
      const initialGrid = make2DArray(colsRef.current, rowsRef.current);
      for (let i = 0; i < colsRef.current; i++) {
        for (let j = 0; j < rowsRef.current; j++) {
          initialGrid[i][j] = p5.floor(p5.random(2));
        }
      }
      gridRef.current = initialGrid;
      setReset(false); // Reset the flag
    }

    const grid = gridRef.current; // Access the current grid state
    const cols = colsRef.current;
    const rows = rowsRef.current;

    // Render the current grid state
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let x = i * resolution;
        let y = j * resolution;
        if (grid[i][j] === 1) {
          p5.fill(255);
          p5.stroke(0);
          p5.rect(x, y, resolution - 1, resolution - 1);
        }
      }
    }
      


    // Update the grid only if the simulation is running
    if (isRunning) {
      const next = make2DArray(cols, rows);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          let state = grid[i][j];
          let neighbors = countNeighbors(grid, i, j, cols, rows);

          if (state === 0 && neighbors === 3) {
            next[i][j] = 1;
          } else if (state === 1 && (neighbors < 2 || neighbors > 3)) {
            next[i][j] = 0;
          } else {
            next[i][j] = state;
          }
        }
      }

      gridRef.current = next; // Update the grid state in the ref
    }
  };

  const countNeighbors = (grid, x, y, cols, rows) => {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        let col = (x + i + cols) % cols;
        let row = (y + j + rows) % rows;
        sum += grid[col][row];
      }
    }
    sum -= grid[x][y];
    return sum;
  };

  // Reset the grid when the component is mounted or when the route changes
  useEffect(() => {
    const cols = colsRef.current;
    const rows = rowsRef.current;
    if (cols && rows) {
      const initialGrid = make2DArray(cols, rows);
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          initialGrid[i][j] = 0; // Initialize all cells as dead
        }
      }
      gridRef.current = initialGrid;
    }
    setReset(true); // Trigger a reset when the route changes
  }, [location]); // Run this effect whenever the route changes

  return (
    <div className="game-container">
      <div className="game-grid">
        <div className="game-border">
          <Sketch key={reset ? 'reset' : 'default'} setup={setup} draw={draw} />
        </div>
      </div>
    </div>
  );
};

export default GameOfLife;