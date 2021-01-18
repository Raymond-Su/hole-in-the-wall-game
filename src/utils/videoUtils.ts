import { videoHeight, videoWidth } from "../constants/video";

export const setupCamera = async (
  video: HTMLVideoElement | null
): Promise<HTMLVideoElement | null> => {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    throw new Error(
      "Browser API navigator.mediaDevices.getUserMedia not available"
    );
  }
  if (!video) return new Promise((resolve) => resolve(null));
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      facingMode: "user",
      width: videoWidth,
      height: videoHeight
    }
  });
  video.width = videoWidth;
  video.height = videoHeight;
  video.srcObject = stream;
  return new Promise<HTMLVideoElement>((resolve) => {
    video.onloadedmetadata = () => {
      resolve(video);
    };
  });
};
