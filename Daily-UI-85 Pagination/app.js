const paginationNumbers = document.getElementById("nav-numbers");
const paginatedList = document.getElementById("paginated-list");

const nextButton = document.getElementById("next-button");
const prevButton = document.getElementById("prev-button");
// Generate list items dynamically
const totalItems = 50;
for (let i = 1; i <= totalItems; i++) {
  const listItem = document.createElement("li");
  listItem.textContent = `Item ${i}`;
  listItem.style.background = `url(https://picsum.photos/200)`;
  paginatedList.appendChild(listItem);
}
// listItems stores all the <li> elements inside paginatedList
const listItems = paginatedList.querySelectorAll("li");
//  sets the number of items displayed per page.
const paginationLimit = 10;
//  calculates how many pages are needed (totalItems / paginationLimit).
const pageCount = Math.ceil(listItems.length / paginationLimit);
// initializes the pagination at page 1.
let currentPage = 1;

const updateButtonState = () => {
  // Disables the previous button when on the first page.
  //= is used for assigning a value  of the result of currentPage === 1.
  // disabled (true or false) gets set based on the condition.
  // If currentPage === 1 is true, prevButton.disabled = true.
  //If currentPage === 1 is false, prevButton.disabled = false.
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
