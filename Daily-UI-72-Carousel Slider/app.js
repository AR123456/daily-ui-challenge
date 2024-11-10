// //https://www.w3schools.com/howto/howto_js_slideshow.asp
// let slideIndex = 1;
// showSlides(slideIndex);
// function plusSlides(n) {
//   showSlides((slideIndex += n));
// }

// function currentSlide(n) {
//   showSlides((slideIndex = n));
// }
// function showSlides(n) {
//   let i;

//   let slides = document.getElementsByClassName("slides");
//   let dots = document.getElementsByClassName("dot");

//   if (n > slides.length) {
//     slideIndex = 1;
//   }
//   if (n < 1) {
//     slideIndex = slides.length;
//   }
//   for (let i = 0; i < slides.length; i++) {
//     slides[i].computedStyleMap.display = "none";
//   }
//   for (let i = 0; i < dots.length; i++) {
//     dots[i].className = dots[i].className.replace(" active", "");
//   }
//   slides[slideIndex - 1].computedStyleMap.display = "block";
//   dots[slideIndex - 1].className += " active";
// }
let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}
