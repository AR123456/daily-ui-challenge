const video = document.getElementById("theVideo");
const button = document.getElementById("theBtn");
const videoSources = [
  "./newFLY.mp4",
  "./TreesFlyover.mp4",
  "./Boardwalk_Slowerish_3.mp4",
];
let currentVideoIndex = 0;

video.addEventListener("ended", () => {
  currentVideoIndex = (currentVideoIndex + 1) % videoSources.length;
  console.log(currentVideoIndex);
  video.src = videoSources[currentVideoIndex];
  video.load();
  video.play();
});

const pauseFunction = () => {
  if (video.paused) {
    video.play();
    button.innerHTML = "Pause";
  } else {
    video.pause();
    button.innerHTML = "Play";
  }
};

button.addEventListener("click", pauseFunction);
