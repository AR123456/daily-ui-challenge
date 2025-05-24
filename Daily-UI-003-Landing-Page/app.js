const video = document.getElementById("theVideo");
const button = document.getElementById("theBtn");

const pauseFunction = () => {
  if (video.paused) {
    video.play();
    button.innerHTML = "Pause";
  } else {
    video.pause();
    button.innerHTML = "Play";
  }
};
