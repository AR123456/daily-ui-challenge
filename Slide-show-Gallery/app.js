let slideIndex = 1;
showSlides(slideIndex);

document.querySelector(".prev").addEventListener("click", () => {
  plusSlides(-1);
});
document.querySelector(".next").addEventListener("click", () => {
  plusSlides(1);
});
const thumbs = document.querySelectorAll(".thumb");
thumbs.forEach((thumb, index) => {
  thumb.addEventListener("click", () => {
    currentSlide(index + 1);
  });
});
function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let thumbs = document.getElementsByClassName("thumb");
  let captionText = document.getElementById("caption");
  const totalSlides = slides.length;

  if (n > totalSlides) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = totalSlides;
  }

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  for (i = 0; i < thumbs.length; i++) {
    thumbs[i].className = thumbs[i].className.replace(" active", "");
  }

  slides[slideIndex - 1].style.display = "block";
  thumbs[slideIndex - 1].className += " active";

  // Set dynamic slide number
  const numberText = slides[slideIndex - 1].querySelector(".numbertext");
  numberText.textContent = `${slideIndex} / ${totalSlides}`;

  // Set caption
  captionText.innerHTML = thumbs[slideIndex - 1].alt;
}
