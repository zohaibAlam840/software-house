"use client";

import { useEffect, useRef } from "react";

interface DotMatrixProps {
  className?: string;
  /** RGB values as a string, e.g. "124, 58, 237" */
  dotColor?: string;
  spacing?: number;
  baseRadius?: number;
  maxRadius?: number;
  baseOpacity?: number;
  influenceRadius?: number;
}

export const DotMatrix = ({
  className = "",
  dotColor = "124, 58, 237",
  spacing = 28,
  baseRadius = 1,
  maxRadius = 3.5,
  baseOpacity = 0.14,
  influenceRadius = 160,
}: DotMatrixProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let mouseX = -9999;
    let mouseY = -9999;
    let animId: number;
    let w = 0;
    let h = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const onResize = () => resize();
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      const cols = Math.ceil(w / spacing) + 1;
      const rows = Math.ceil(h / spacing) + 1;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * spacing;
          const y = j * spacing;

          const dx = x - mouseX;
          const dy = y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let r = baseRadius;
          let a = baseOpacity;

          if (dist < influenceRadius) {
            const t = Math.pow(1 - dist / influenceRadius, 2);
            r = baseRadius + t * (maxRadius - baseRadius);
            a = baseOpacity + t * (0.8 - baseOpacity);
          }

          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${dotColor}, ${a})`;
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [dotColor, spacing, baseRadius, maxRadius, baseOpacity, influenceRadius]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 w-full h-full pointer-events-none select-none ${className}`}
    />
  );
};
