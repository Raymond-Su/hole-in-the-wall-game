import { lineWidth } from "../constants/gui";

export const toTuple = ({ y, x }: { y: number; x: number }): number[] => {
  return [y, x];
};

// Draws a point on a canvas
export const drawPoint = (
  ctx: CanvasRenderingContext2D,
  y: number,
  x: number,
  r: number,
  color: string
): void => {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
};
// Draws a line on a canvas, i.e. a joint
export const drawSegment = (
  [ay, ax]: number[],
  [by, bx]: number[],
  color: string,
  scale: number,
  ctx: CanvasRenderingContext2D,
  thickness: number = lineWidth
): void => {
  ctx.beginPath();
  ctx.moveTo(ax * scale, ay * scale);
  ctx.lineTo(bx * scale, by * scale);
  ctx.lineWidth = thickness;
  ctx.strokeStyle = color;
  ctx.stroke();
};
