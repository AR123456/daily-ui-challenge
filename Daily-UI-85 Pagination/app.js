const paginationNumbers = document.getElementById("nav-numbers");
const paginatedList = document.getElementById("paginated-list");
const listItems = paginatedList.querySelectorAll("li");
const nextButton = document.getElementById("next-button");
const prevButton = document.getElementById("prev-button");

const paginationLimit = 10;
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
      "hidden",
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
