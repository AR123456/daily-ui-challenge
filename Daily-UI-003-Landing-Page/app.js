const video = document.getElementById("theVideo");
const button = document.getElementById("theBtn");
const videoSources = [
  "./newFLY.mp4",
  "./TreesFlyover.mp4",
  "./Boardwalk_Slowerish_3.mp4",
];
let currentVideoIndex = 0;

video.addEventListener("ended", () => {
  // Fade out
  video.style.opacity = 0;
  // Wait for the fade to finish before changing video
  setTimeout(() => {
    currentVideoIndex = (currentVideoIndex + 1) % videoSources.length;
    video.src = videoSources[currentVideoIndex];
    video.load();
    video.play();

    // Fade back in
    setTimeout(() => {
      video.style.opacity = 1;
    }, 100); // short delay to allow browser to repaint
  }, 1000); // match the CSS transition time
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
