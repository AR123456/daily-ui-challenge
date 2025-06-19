window.addEventListener("scroll", function () {
  console.log(window.scrollY);
  const footer = document.querySelector(".footer");
  if (window.scrollY > 10) {
    footer.style.backgroundColor = "rgba(187, 183, 180, 0.9)";

    console.log(window.scrollY);
  } else {
    footer.style.backgroundColor = "#bcb8b5";
  }
});
