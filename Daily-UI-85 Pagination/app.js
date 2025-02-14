const paginationNumbers = document.getElementById("nav-numbers");
const paginatedList = document.getElementById("paginated-list");

const nextButton = document.getElementById("next-button");
const prevButton = document.getElementById("prev-button");
// Generate list items dynamically
const totalItems = 50;
for (let i = 1; i <= totalItems; i++) {
  const listItem = document.createElement("li");

  listItem.textContent = `${i}`;
  listItem.classList.add("dynamic-text"); // Add class for text color adjustment

  // really only would set in js if image was to be dynamically generated like looping through a list
  // listItem.style.background = `url(https://picsum.photos/150)`;
  const imageUrl = `https://picsum.photos/150?random=${i}`;
  listItem.style.backgroundImage = `url(${imageUrl})`;
  paginatedList.appendChild(listItem);
  // Adjust text color dynamically
  updateTextColor(imageUrl, listItem);
}
// listItems stores all the <li> elements inside paginatedList
const listItems = paginatedList.querySelectorAll("li");
//  sets the number of items displayed per page.
const paginationLimit = 12;
//  calculates how many pages are needed (totalItems / paginationLimit).
const pageCount = Math.ceil(listItems.length / paginationLimit);
// initializes the pagination at page 1.
let currentPage = 1;

const updateButtonState = () => {
  // Disables the previous button when on the first page.
  prevButton.disabled = currentPage === 1;
  // Disables the next button when on the last page.
  nextButton.disabled = currentPage === pageCount;
};
// currently selected page button is visually highlighted
const updateActivePage = () => {
  document.querySelectorAll(".nav-number").forEach((btn) => {
    btn.classList.toggle("active", Number(btn.dataset.index) === currentPage);
  });
};
// Updates currentPage when a user clicks a pagination button.
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
// oops through the total page count and creates a button for each page.
const createPagination = () => {
  for (let i = 1; i <= pageCount; i++) {
    const pageNumber = document.createElement("button");
    pageNumber.className = "nav-number";
    pageNumber.textContent = i;
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset
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
function updateTextColor(imageUrl, element) {
  const img = new Image();
  img.crossOrigin = "Anonymous";
  img.src = imageUrl;

  img.onload = function () {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, img.width, img.height);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    let brightnessSum = 0,
      pixelCount = 0;

    for (let i = 0; i < data.length; i += 4 * 100) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
      brightnessSum += brightness;
      pixelCount++;
    }

    const averageBrightness = brightnessSum / pixelCount;

    if (averageBrightness < 105) {
      // Dark background → White text
      element.style.color = "white";
    } else {
      // Light background → Black text
      element.style.color = "black";
    }
  };
}
