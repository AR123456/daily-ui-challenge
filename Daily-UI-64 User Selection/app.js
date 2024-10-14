// Ensure the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Select DOM elements
  const carousel = document.querySelector(".carousel");
  const leftButton = document.querySelector(".left");
  const rightButton = document.querySelector(".right");
  const items = document.querySelectorAll(".item"); // Use all items if needed

  if (!carousel || !leftButton || !rightButton || items.length === 0) {
    console.error("Carousel elements are missing.");
    return;
  }

  const itemWidth = items[0].clientWidth; // Assuming all items have the same width

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

  // Initial button state
  updateButtonStates();

  // Update button states on scroll
  carousel.addEventListener("scroll", updateButtonStates);
});
