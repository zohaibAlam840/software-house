/**
 * Lightweight CSS-only dot grid background.
 * Drop inside any `relative` container as an absolute fill.
 */
export const GridDots = ({
  className = "",
  color = "rgb(161,161,170)", // zinc-400
  size = 20,
  dotSize = 1,
  fade = true,
}: {
  className?: string;
  color?: string;
  size?: number;
  dotSize?: number;
  fade?: boolean;
}) => (
  <div
    aria-hidden="true"
    className={`absolute inset-0 pointer-events-none select-none ${className}`}
    style={{
      backgroundImage: `radial-gradient(circle, ${color} ${dotSize}px, transparent ${dotSize}px)`,
      backgroundSize: `${size}px ${size}px`,
      maskImage: fade
        ? "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)"
        : undefined,
      WebkitMaskImage: fade
        ? "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)"
        : undefined,
    }}
  />
);
