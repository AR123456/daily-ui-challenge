<<<<<<< HEAD
let carousel = document.querySelector(".carousel");
let left = document.querySelector(".left");
let right = document.querySelector(".right");
let item = document.querySelector(".item");

(function () {
  right.addEventListener("click", function (e) {
    carousel.scrollLeft += item.clientWidth;
  });
  left.addEventListener("click", function () {
    carousel.scrollLeft -= item.clientWidth;
  });
})();
=======
document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector(".carousel");
  const leftButton = document.querySelector(".left");
  const rightButton = document.querySelector(".right");
  const items = document.querySelectorAll(".item");

  if (!carousel || !leftButton || !rightButton || items.length === 0) {
    console.error("Carousel elements are missing.");
    return;
  }

  // Set the item width based on the number of items visible at once
  const visibleItems = 3;
  const itemWidth = carousel.clientWidth / visibleItems;
  items.forEach((item) => (item.style.width = `${itemWidth}px`));

  // Function to scroll carousel
  const scrollCarousel = (direction) => {
    if (direction === "right") {
      carousel.scrollLeft += itemWidth;
    } else if (direction === "left") {
      carousel.scrollLeft -= itemWidth;
    }
  };

  // Add event listeners
  rightButton.addEventListener("click", () => scrollCarousel("right"));
  leftButton.addEventListener("click", () => scrollCarousel("left"));

  // Optional: Update button states based on scroll position
  const updateButtonStates = () => {
    leftButton.disabled = carousel.scrollLeft === 0;
    rightButton.disabled =
      carousel.scrollLeft >= carousel.scrollWidth - carousel.clientWidth;
  };
  updateButtonStates();
  carousel.addEventListener("scroll", updateButtonStates);

  // Intersection Observer to detect centered items
  const observerOptions = {
    root: carousel,
    rootMargin: `0px -${carousel.clientWidth / 3}px`, // Offset for centering
    threshold: 0.5, // Adjust to control how much needs to be visible to trigger
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      } else {
        entry.target.classList.remove("active");
      }
    });
  }, observerOptions);

  // Observe each item
  items.forEach((item) => observer.observe(item));
});
>>>>>>> 6f38805c5b6dda089d1ade3d39d063224d5d315e
