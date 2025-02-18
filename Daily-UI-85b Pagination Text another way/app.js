const paginationNumbers = document.getElementById("nav-numbers");
const paginatedList = document.getElementById("paginated-list");
const nextButton = document.getElementById("next-button");
const prevButton = document.getElementById("prev-button");

const totalItems = 50;
const paginationLimit = 12;
const pageCount = Math.ceil(totalItems / paginationLimit);
let currentPage = 1;

// Generate list items dynamically
for (let i = 1; i <= totalItems; i++) {
  const listItem = document.createElement("li");
  listItem.dataset.index = i;
  listItem.style.backgroundImage = `url(https://picsum.photos/150?random=${i})`;

  const circle = document.createElement("span");
  circle.classList.add("text-background");
  circle.textContent = i;

  listItem.appendChild(circle);
  paginatedList.appendChild(listItem);

  updateTextColor(listItem.style.backgroundImage, listItem);
}

const listItems = paginatedList.querySelectorAll("li");

// Update pagination UI
const updateButtonState = () => {
  prevButton.disabled = currentPage === 1;
  nextButton.disabled = currentPage === pageCount;
};

const updateActivePage = () => {
  document.querySelectorAll(".nav-number").forEach((btn) => {
    btn.classList.toggle("active", Number(btn.dataset.index) === currentPage);
  });
};

const setCurrentPage = (pageNum) => {
  currentPage = pageNum;
  updateActivePage();
  updateButtonState();

  listItems.forEach((item, index) => {
    item.classList.toggle(
      "hidden",
      index < (pageNum - 1) * paginationLimit ||
        index >= pageNum * paginationLimit
    );
  });
};

// Create pagination buttons
const createPagination = () => {
  for (let i = 1; i <= pageCount; i++) {
    const pageNumber = document.createElement("button");
    pageNumber.className = "nav-number";
    pageNumber.textContent = i;
    pageNumber.dataset.index = i;
    pageNumber.addEventListener("click", () => setCurrentPage(i));
    paginationNumbers.appendChild(pageNumber);
  }
};

window.addEventListener("DOMContentLoaded", () => {
  createPagination();
  setCurrentPage(1);
  prevButton.addEventListener("click", () => setCurrentPage(currentPage - 1));
  nextButton.addEventListener("click", () => setCurrentPage(currentPage + 1));
});

// Function to analyze brightness and adjust text color
function updateTextColor(backgroundImage, element) {
  const urlMatch = backgroundImage.match(/url\(["']?(.*?)["']?\)/);
  if (!urlMatch) return;

  const imageUrl = urlMatch[1]; // Extract actual image URL

  const img = new Image();
  img.crossOrigin = "anonymous"; // Fix CORS issue
  img.src = imageUrl;

  img.onload = function () {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const width = img.width;
    const height = img.height;
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, 0, 0, width, height);

    // Define area to check brightness
    const boxSize = Math.floor(Math.min(width, height) * 0.3);
    const startX = Math.floor(width / 2 - boxSize / 2);
    const startY = Math.floor(height / 2 - boxSize / 2);
    const imageData = ctx.getImageData(startX, startY, boxSize, boxSize);
    const data = imageData.data;

    let brightnessSum = 0,
      pixelCount = 0;

    for (let i = 0; i < data.length; i += 4 * 10) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
      brightnessSum += brightness;
      pixelCount++;
    }

    const averageBrightness = brightnessSum / pixelCount;
    const brightnessThreshold = 150;

    let circle = element.querySelector(".text-background");
    if (!circle) {
      circle = document.createElement("span");
      circle.classList.add("text-background");
      element.appendChild(circle);
    }

    // Fix text alignment
    circle.style.display = "flex";
    circle.style.alignItems = "center";
    circle.style.justifyContent = "center";
    circle.style.width = "35px";
    circle.style.height = "35px";
    circle.style.borderRadius = "50%";
    circle.style.position = "absolute";
    circle.style.top = "50%";
    circle.style.left = "50%";
    circle.style.transform = "translate(-50%, -50%)";
    circle.style.fontSize = "16px";
    circle.style.fontWeight = "bold";

    // Apply correct text color based on brightness
    if (averageBrightness < brightnessThreshold) {
      circle.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
      circle.style.color = "white"; // Light text on dark background
    } else {
      circle.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
      circle.style.color = "black"; // Dark text on light background
    }

    // Update number inside the circle
    circle.textContent = element.dataset.index;
  };
}
