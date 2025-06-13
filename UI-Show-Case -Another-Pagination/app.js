import { items } from "./items-arr.js";

document.getElementById("scroll-to-bottom").addEventListener("click", () => {
  document.body.scrollIntoView(false);
});

const container = document.querySelector(
  ".row.row-cols-1.row-cols-sm-2.row-cols-md-3.g-3"
);

items.forEach((item) => {
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
