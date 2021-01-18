import {
  InputResolution,
  MobileNetMultiplier,
  PoseNetArchitecture,
  PoseNetOutputStride,
  PoseNetQuantBytes
} from "@tensorflow-models/posenet/dist/types";

export type posenetConfig = {
  algorithm: string;
  input: posenetInput;
  singlePoseDetection: posenetSinglePoseDetection;
  multiPoseDetection: posenetMultiPoseDetection;
};
type posenetInput = {
  architecture: PoseNetArchitecture;
  outputStride: PoseNetOutputStride;
  inputResolution: InputResolution;
  multiplier: MobileNetMultiplier;
  quantBytes: PoseNetQuantBytes;
};

type posenetSinglePoseDetection = {
  minPoseConfidence: number;
  minPartConfidence: number;
};

type posenetMultiPoseDetection = {
  maxPoseDetections: number;
  minPoseConfidence: number;
  minPartConfidence: number;
  nmsRadius: number;
};
