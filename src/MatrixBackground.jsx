import React, { useEffect, useRef } from "react";
import "./HomeRedesign.css";

function MatrixBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Binary characters
    const chars = ["0", "1"];
    const fontSize = 22;
    const columns = Math.floor(width / fontSize);
    const drops = Array(columns).fill(0).map(() => Math.random() * -height);

    function draw() {
      ctx.clearRect(0, 0, width, height);
      ctx.font = `${fontSize}px monospace`;
      ctx.fillStyle = "#2CFF05";
      ctx.globalAlpha = 0.38;
      for (let i = 0; i < columns; i++) {
        if (Math.random() > 0.93) continue; // sparse effect
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        ctx.save();
        ctx.globalAlpha = Math.max(0, 1 - drops[i] / (height / fontSize)); // fade out
        ctx.fillText(text, x, y);
        ctx.restore();
        drops[i] += 0.18 + Math.random() * 0.08; // slow fall
        if (y > height && Math.random() > 0.98) {
          drops[i] = Math.random() * -20;
        }
      }
      animationFrameId = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="matrix-bg">
      <canvas ref={canvasRef} className="matrix-canvas" />
    </div>
  );
}

export default MatrixBackground;
