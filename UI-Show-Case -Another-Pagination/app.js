import thumbArr from "./thumb-arr";

document.getElementById("scroll-to-bottom").addEventListener("click", () => {
  document.body.scrollIntoView(false);
});

const items = [
  {
    image: "./thumbs/D001-vol.jpg",
    alt: "volunteer",
    text: "Day 1 Sign Up Page",
    href: "./shows/01-sign-up/index.html",
  },
  {
    image: "./thumbs/D002-work.jpg",
    alt: "workshop",
    text: "Day 2 Workshop Info",
    href: "./shows/02-workshop/index.html",
  },
  // Add more items as needed
];

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
