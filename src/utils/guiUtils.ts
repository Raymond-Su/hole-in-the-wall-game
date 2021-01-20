import {
  getAdjacentKeyPoints,
  getBoundingBox,
  Keypoint
} from "@tensorflow-models/posenet";
import { guiConfiguration } from "../constants/model";
import { videoHeight, videoWidth } from "../constants/video";
import { drawPoint, drawSegment, toTuple } from "./canvasUtils";
import { aquaColor, boundingBoxColor, skeletonWidth } from "../constants/gui";

export const drawOverlay = (
  keypoints: Keypoint[],
  minPartConfidence: number,
  ctx: CanvasRenderingContext2D,
  scale: number,
  background: string | undefined = undefined,
  thickness = 3
): void => {
  ctx.save();
  const boundingBox = getBoundingBox(keypoints);
  const bboxMidY = boundingBox.minY + (boundingBox.maxY - boundingBox.minY) / 2;
  const bboxMidX = boundingBox.minX + (boundingBox.maxX - boundingBox.minX) / 2;

  const videoMidY = videoHeight / 2;
  const videoMidX = videoWidth / 2;

  const deltaY = videoMidY - bboxMidY;
  const deltaX = videoMidX - bboxMidX;

  // scale down
  ctx.scale(scale, scale);

  if (background) {
    ctx.save();
    ctx.translate(videoMidX / scale, videoMidY / scale);
    ctx.translate(-videoMidX, -videoMidY);
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, videoWidth, videoHeight);
    ctx.restore();
  }

  // move skeleton back to bbox
  ctx.translate((1 / scale - 1) * bboxMidX, (1 / scale - 1) * bboxMidY);

  // move skeleton to middle of canvas
  ctx.translate(deltaX / scale, deltaY / scale);
  if (guiConfiguration.showPoints) {
    drawKeypoints(keypoints, minPartConfidence, ctx, thickness);
  }
  if (guiConfiguration.showSkeleton) {
    drawSkeleton(keypoints, minPartConfidence, ctx, thickness, skeletonWidth);
  }
  if (guiConfiguration.showBoundingBox) {
    drawBoundingBox(keypoints, ctx);
  }
  ctx.restore();
};

// Draws a pose skeleton by looking up all adjacent keypoints/joints
export const drawSkeleton = (
  keypoints: Keypoint[],
  minConfidence: number,
  ctx: CanvasRenderingContext2D,
  thickness: number,
  scale: 1
): void => {
  const adjacentKeyPoints = getAdjacentKeyPoints(keypoints, minConfidence);

  adjacentKeyPoints.map((keypoints) => {
    drawSegment(
      toTuple(keypoints[0].position),
      toTuple(keypoints[1].position),
      aquaColor,
      scale,
      ctx,
      thickness
    );
  });
};

// Draw pose keypoints onto a canvas
export const drawKeypoints = (
  keypoints: Keypoint[],
  minConfidence: number,
  ctx: CanvasRenderingContext2D,
  radius = 3,
  scale = 1
): void => {
  keypoints.map((keypoint) => {
    if (keypoint.score > minConfidence) {
      const { y, x } = keypoint.position;
      drawPoint(ctx, y * scale, x * scale, radius, aquaColor);
    }
  });
};

// Draw the bounding box of a pose. For example, for a whole person standing in an image, the bounding box will begin at the nose and extend to one of ankles
export const drawBoundingBox = (
  keypoints: Keypoint[],
  ctx: CanvasRenderingContext2D
): void => {
  const boundingBox = getBoundingBox(keypoints);
  ctx.rect(
    boundingBox.minX,
    boundingBox.minY,
    boundingBox.maxX - boundingBox.minX,
    boundingBox.maxY - boundingBox.minY
  );
  ctx.strokeStyle = boundingBoxColor;
  ctx.stroke();
};
