let counter = 0;
window.addEventListener(
  "DOMContentLoaded",
  (move = () => {
    if (counter == 0) {
      j = 1;
      let elem = document.querySelector(".progress-bar-done");
      let width = 50;
      let main = setInterval(frame, 50);
      function frame() {
        if (width >= 80) {
          clearInterval(main);
        } else {
          width++;
          elem.style.width = width + "%";
          elem.innerHTML = width + "%";
        }
      }
    }
  })
);
