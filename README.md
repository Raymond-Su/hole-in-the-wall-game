# Hole in the Wall game

A browser game reminiscent of [Hole in the Wall](<https://en.wikipedia.org/wiki/Hole_in_the_Wall_(American_game_show)>) gameshow powered by [Tensorflow Pose Estimation library (aka Posenet)](https://www.tensorflow.org/lite/models/pose_estimation/overview).

[Try it out!](https://hole-in-the-wall-game.web.app/)

## Getting Started

### Installing

`npm install`

### Serving the repository on localhost

You can use any tool that does this.

- Since node js is presumably installed, you may run `npm run start` to start the local server.

Once it is running, you can just go to http://localhost:3000/ and try it out. It should request for access to the camera/webcam to which you can just accept it. Note that starting up will most likely take a few seconds to load the video, depending on your GPU.

The pose estimation is all running locally, so there is no further communication to any server after loading of the necessary scripts. You can check out the network tab in your browser devtools, so your video feed is not being uploaded at all.

Make sure only 1 person is in the camera view when it is running, as I am using single pose detection for the sake of the game (I only support single player).

## How it works

Most of the code are adapted from [posenet's demo camera.js](https://github.com/tensorflow/tfjs-models/blob/master/posenet/demos/camera.js), [demo_utils.js](https://github.com/tensorflow/tfjs-models/blob/master/posenet/demos/demo_util.js) and analysing [the actual demo](https://storage.googleapis.com/tfjs-models/demos/posenet/camera.html).

Here I will briefly explain what the code does.

1. Selectively include functions dependencies from demo_utils.js which are specified [here](https://github.com/tensorflow/tfjs-models/blob/72787aa4d4af9e5cea4c31d11db412355b878b70/posenet/demos/camera.js#L21).
2. An array of predefined poses (samplePoses) are manually captured by logging the poses and stopping the requestAnimationFrame loop.
3. Load camera/webcam feed into the video source to display what it sees.
4. Initialize posenet and run the poseDetectionFrame in a requestAnimationFrame loop. The game logic is all in the poseDetectionFrame function.
5. poseDetectionFrame will draw 2 overlays on a canvas: the wall with the expected pose zooming in, and the detected a single pose from the camera feed.
6. When the wall is zoomed in 100%, the expected pose is compared with the detected pose using a [pose similarity algo library](https://github.com/freshsomebody/posenet-similarity) to decide whether to score or fail.
7. When the player fails 3 times, the game stops. Reload the browser to replay.

## Challenges I faced

Tensorflow js pose estimation does not have a API documentation. So I had to manually analyse and experiment with the demo source code.

I was stucked for some time on combining HTML5 canvas context [scaling](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/scale) and [translations](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/translate) to create the zoom in effect originating from the middle. The canvas context's origin is at the top left corner, so scaling is relative to the top left corner and will shift the wall away/towards the corner.

## Built With

- [Tensorflow Pose Estimation](https://www.tensorflow.org/lite/models/pose_estimation/overview) - Generates coordinates of a pose skeleton
- [PosenetSimilarity](https://github.com/freshsomebody/posenet-similarity) - Calculates similarity between 2 poses
- [HTML5 canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) - Drawing skeletons and bounding boxes overlay

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
# GraphVisualiser
