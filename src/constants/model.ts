import { posenetConfig } from "../types/posenet";

export const defaultQuantBytes = 2;
export const defaultMobileNetMultiplier = 0.5;
export const defaultMobileNetStride = 16;
export const defaultMobileNetInputResolution = 400;

export const posenetConfiguration: posenetConfig = {
  algorithm: "single-pose",
  input: {
    architecture: "MobileNetV1",
    outputStride: defaultMobileNetStride,
    inputResolution: defaultMobileNetInputResolution,
    multiplier: defaultMobileNetMultiplier,
    quantBytes: defaultQuantBytes
  },
  singlePoseDetection: {
    minPoseConfidence: 0.7,
    minPartConfidence: 0.5
  },
  multiPoseDetection: {
    maxPoseDetections: 5,
    minPoseConfidence: 0.15,
    minPartConfidence: 0.1,
    nmsRadius: 30.0
  }
};

export const guiConfiguration = {
  showVideo: true,
  showSkeleton: true,
  showPoints: true,
  showBoundingBox: false
};
