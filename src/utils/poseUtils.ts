import { PoseNet } from "@tensorflow-models/posenet";
import { samplePoses } from "../data/samplePoses";
import { poseSimilarity } from "posenet-similarity";
import {
  drawBoundingBox,
  drawKeypoints,
  drawOverlay,
  drawSkeleton
} from "./guiUtils";
import { lineWidth, skeletonWidth } from "../constants/gui";
import {
  guiConfiguration,
  posenetConfiguration,
  videoHeight,
  videoWidth
} from "../constants";

export const detectPoseInRealTime = async (
  canvas: HTMLCanvasElement | null,
  video: HTMLVideoElement,
  net: PoseNet,
  increasePoints: () => void,
  increaseFail: () => void,
  failsLimit: number
): Promise<void> => {
  const ctx = canvas?.getContext("2d");
  if (!canvas || !ctx) return;

  canvas.width = videoWidth;
  canvas.height = videoHeight;

  let counter = 0;
  let fail = 0;
  let currPose = samplePoses[Math.floor(Math.random() * samplePoses.length)];
  const poseDetectionFrame = async () => {
    const minPoseConfidence = +posenetConfiguration.singlePoseDetection
      .minPoseConfidence;
    const minPartConfidence = +posenetConfiguration.singlePoseDetection
      .minPartConfidence;

    const pose = await net.estimateSinglePose(video, {
      flipHorizontal: true
    });
    ctx.clearRect(0, 0, videoWidth, videoHeight);
    if (guiConfiguration.showVideo) {
      ctx.save();
      ctx.scale(-1, 1);
      ctx.translate(-videoWidth, 0);
      ctx.drawImage(video, 0, 0, videoWidth, videoHeight);
      ctx.restore();
    }

    const scale = counter / 40;

    drawOverlay(currPose.keypoints, 0, ctx, scale, "rgba(255,255,255,0.3)", 20);
    if (pose.score >= minPoseConfidence) {
      if (guiConfiguration.showPoints) {
        drawKeypoints(pose.keypoints, minPartConfidence, ctx);
      }
      if (guiConfiguration.showSkeleton) {
        drawSkeleton(
          pose.keypoints,
          minPartConfidence,
          ctx,
          lineWidth,
          skeletonWidth
        );

        if (guiConfiguration.showBoundingBox) {
          drawBoundingBox(pose.keypoints, ctx);
        }
      }
    }
    // draw static keypoints
    if (counter > 40) {
      counter = 0;
      const weightedDist = poseSimilarity(currPose, pose, {
        strategy: "cosineSimilarity"
      });
      if (weightedDist > 0.98) {
        increasePoints();
      } else {
        increaseFail();
        fail++;
      }
      const currPoseIndex = Math.floor(Math.random() * samplePoses.length);
      currPose = samplePoses[currPoseIndex];
    }

    if (fail < failsLimit) {
      requestAnimationFrame(poseDetectionFrame);
    }
    counter++;
  };
  poseDetectionFrame();
};
