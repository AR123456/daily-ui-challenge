import { items } from "./items-arr.js"; // ES module import

const container = document.getElementById("card-container");
const pagination = document.getElementById("pagination");
const topPrevButton = document.getElementById("prev-button");
const topNextButton = document.getElementById("next-button");
const toggleButton = document.getElementById("toggleHeader");
const navbarHeader = document.getElementById("navbarHeader");
const navbarToggler = document.querySelector(".navbar-toggler");

const itemsPerPage = 6;
let currentPage = 1;
const totalPages = Math.ceil(items.length / itemsPerPage);

// Collapse on page load
navbarHeader.classList.remove("open");

toggleButton.addEventListener("click", () => {
  if (navbarHeader.style.display === "block") {
    navbarHeader.style.display = "none";
  } else {
    navbarHeader.style.display = "block";
  }
});
navbarToggler.addEventListener("click", () => {
  navbarHeader.classList.toggle("open");
});
function renderCards(page) {
  // Clear existing cards
  container.innerHTML = "";
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, items.length);
  const pageItems = items.slice(startIndex, endIndex);

  pageItems.forEach((item) => {
    const col = document.createElement("div");
    col.className = "col";

    col.innerHTML = `
      <div class="card shadow-sm">
        <img
          class="bd-placeholder-img card-img-top"
          src="${item.image}"
          alt="${item.alt}"
        />
        <div class="card-body">
          <p class="card-text">${item.text}</p>
          <div class="d-flex justify-content-between align-items-center">
            <div class="btn-group">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="${item.href}"
              >
                <button type="button" class="btn btn-sm btn-outline-secondary">
                  View
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    `;

    container.appendChild(col);
  });
}

function renderPagination() {
  // Clear existing pagination
  pagination.innerHTML = "";

  // Previous Button
  const prevLi = document.createElement("li");
  prevLi.className = `page-item ${currentPage === 1 ? "disabled" : ""}`;
  prevLi.innerHTML = `
    <button class="page-link" aria-label="Previous">
      &laquo;
    </button>
  `;
  prevLi.querySelector("button").addEventListener("click", () => {
    if (currentPage > 1) {
      changePage(currentPage - 1);
    }
  });
  pagination.appendChild(prevLi);

  // Page Buttons
  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement("li");
    li.className = `page-item ${i === currentPage ? "active" : ""}`;
    li.innerHTML = `<button class="page-link">${i}</button>`;
    li.querySelector("button").addEventListener("click", () => {
      changePage(i);
    });
    pagination.appendChild(li);
  }

  // Next Button
  const nextLi = document.createElement("li");
  nextLi.className = `page-item ${
    currentPage === totalPages ? "disabled" : ""
  }`;
  nextLi.innerHTML = `
    <button class="page-link" aria-label="Next">
      &raquo;
    </button>
  `;
  nextLi.querySelector("button").addEventListener("click", () => {
    if (currentPage < totalPages) {
      changePage(currentPage + 1);
    }
  });
  pagination.appendChild(nextLi);
}

function updateDisplay() {
  renderCards(currentPage);
  renderPagination();
  updateTopButtons();
}

function updateTopButtons() {
  // Disable/Enable top buttons
  topPrevButton.disabled = currentPage === 1;
  topNextButton.disabled = currentPage === totalPages;
}

//  Add a fade transition when changing pages
function changePage(newPage) {
  container.classList.add("fade-out");
  setTimeout(() => {
    currentPage = newPage;
    updateDisplay();
    container.classList.remove("fade-out");
  }, 300); // match CSS transition duration
}

// Hook up top buttons
topPrevButton.addEventListener("click", () => {
  if (currentPage > 1) {
    changePage(currentPage - 1);
  }
});

topNextButton.addEventListener("click", () => {
  if (currentPage < totalPages) {
    changePage(currentPage + 1);
  }
});

// Initial load
updateDisplay();
