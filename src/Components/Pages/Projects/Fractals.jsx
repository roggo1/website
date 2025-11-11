import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sketch from 'react-p5';
import "./Fractals.css";


/*
This is a simple fractal tree generator using p5.js in React.
it is drawn recursively and has parameters for initial branch length, angle, and length reduction factor.
You can pause/play the drawing and reset the canvas using the buttons provided.


TO DO:
1.Make better selection for parameters (sliders?) 
2. 
*/








const Fractals = () => {
  const location = useLocation(); // remount sketch when route changes
  const [sketchKey, setSketchKey] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const canvasWidth = 800;
  const canvasHeight = 600;
  const [initialLen, setInitialLen] = useState(100);
  const [branchAngle, setBranchAngle] = useState(30);
  const [lenFactor, setLenFactor] = useState(0.82);

  useEffect(() => {
    // force remount of Sketch when route changes (ensures setup runs)
    setSketchKey(k => k + 1);
  }, [location]);

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef);
    p5.frameRate(30);
  };

  const draw = (p5) => {
    p5.background(20); 
    if (!isRunning) return;
    p5.fill(255);
    p5.stroke('white');
    branch(p5, initialLen, 0, canvasWidth / 2, canvasHeight);
  };

  const branch = (p5, len, angle, x, y) =>{
    if (len < 10) return; 
    p5.stroke('white');
    let new_x = x + len * p5.cos(p5.radians(angle - 90));
    let new_y = y + len * p5.sin(p5.radians(angle - 90));
    if (new_y < 0 || new_x < 0 || new_x > canvasWidth || new_y > canvasHeight) return;
    p5.line(x, y, new_x, new_y);
    branch(p5, len * lenFactor, angle - branchAngle, new_x, new_y);
    branch(p5, len * lenFactor, angle + branchAngle, new_x, new_y);
  };

  return (
    <div className="fractals-page">
      <header className="fractals-header">
        <div className="fractals-controls">
          <button onClick={() => setIsRunning(r => !r)}>{isRunning ? 'Pause' : 'Play'}</button>
          <button onClick={() => setSketchKey(k => k + 1)}>Reset</button>
        </div>
      </header>

      <main className="fractals-main">
        <div className="fractals-canvas-wrapper">
          <Sketch key={sketchKey} setup={setup} draw={draw} />
        </div>
      </main>
    <div className="fractals-parameters">
        <label>
            Initial Length:
            <input
            type="number"
            value={initialLen}
            onChange={e => setInitialLen(Number(e.target.value))}
            />
        </label>

        <label>
            Branch Angle:
            <input
            type="number"
            value={branchAngle}
            onChange={e => setBranchAngle(Number(e.target.value))}
            />
        </label>

        <label>
            Length Factor:
            <input
            type="number"
            step="0.01"
            value={lenFactor}
            onChange={e => setLenFactor(Number(e.target.value))}
            />
        </label>
        </div>
    </div>
  );
};

export default Fractals;
