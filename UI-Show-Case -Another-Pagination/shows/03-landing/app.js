const videoA = document.getElementById("videoA");
const videoB = document.getElementById("videoB");
const button = document.getElementById("theBtn");

const sources = [
  "./newFLY.mp4",
  "./TreesFlyover.mp4",
  "./Boardwalk_Slowerish_3.mp4",
];

let current = 0;
let activeVideo = videoA;
let hiddenVideo = videoB;

function playNextVideo() {
  current = (current + 1) % sources.length;
  hiddenVideo.src = sources[current];
  hiddenVideo.load();
  hiddenVideo.oncanplay = () => {
    hiddenVideo.play();
    hiddenVideo.classList.add("active");
    activeVideo.classList.remove("active");

    // Swap video refs
    [activeVideo, hiddenVideo] = [hiddenVideo, activeVideo];

    // Re-attach ended listener to the new active video
    activeVideo.onended = playNextVideo;
  };
}

// Initialize
activeVideo.src = sources[current];
activeVideo.classList.add("active");
activeVideo.onended = playNextVideo;

// Pause/play toggle
button.addEventListener("click", () => {
  if (activeVideo.paused) {
    activeVideo.play();
    button.textContent = "Pause";
  } else {
    activeVideo.pause();
    button.textContent = "Play";
  }
});
