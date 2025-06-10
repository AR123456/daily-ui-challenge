import imgArr from "./img-arr.js";
const paginationNumbers = document.getElementById("nav-numbers");
const paginatedList = document.getElementById("paginated-list");
const nextButton = document.getElementById("next-button");
const prevButton = document.getElementById("prev-button");

const totalItems = imgArr.length;
for (let i = 0; i < totalItems; i++) {
  const listItem = document.createElement("li");
  listItem.classList.add("col-4", "position-relative"); // Bootstrap: 3 columns wide
  const imageUrl = `thumbs/${imgArr[i]}`;
  listItem.style.backgroundImage = `url(${imageUrl})`;
  const span = document.createElement("span");
  span.classList.add("text-background");
  span.textContent = i + 1;
  listItem.appendChild(span);
  paginatedList.appendChild(listItem);
  updateTextColor(imageUrl, span);
}
const listItems = paginatedList.querySelectorAll("li");
const paginationLimit = 9;
const pageCount = Math.ceil(listItems.length / paginationLimit);
let currentPage = 1;

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
      "d-none",
      index < (pageNum - 1) * paginationLimit ||
        index >= pageNum * paginationLimit
    );
  });
};

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

function updateTextColor(imageUrl, element) {
  const img = new Image();
  img.crossOrigin = "Anonymous";
  img.src = imageUrl;
  img.onload = function () {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    const imageData = ctx.getImageData(0, 0, img.width, img.height);
    let brightnessSum = 0,
      pixelCount = 0;
    for (let i = 0; i < imageData.data.length; i += 4 * 10) {
      const [r, g, b] = [
        imageData.data[i],
        imageData.data[i + 1],
        imageData.data[i + 2],
      ];
      brightnessSum += 0.299 * r + 0.587 * g + 0.114 * b;
      pixelCount++;
    }
    const averageBrightness = brightnessSum / pixelCount;
    element.style.color = averageBrightness > 150 ? "black" : "white";
  };
}
