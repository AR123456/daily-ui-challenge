const toggleBtn = document.querySelector(".toggle");
const brief = document.querySelector(".brief");
const more = document.querySelector(".more");

toggleBtn.addEventListener("click", () => {
  more.classList.toggle("hide");
  // change button to "see steps "
  brief.classList.toggle("hide");
  // Update the text of the button to toggle beween "More" and "Less" when clicked

  if (toggleBtn.innerText.toLowerCase() === "less") {
    toggleBtn.innerText = "Look deeper";
  } else {
    toggleBtn.innerText = "Step by Step";
  }
});
toggleBtn.addEventListener("click", () => {});
