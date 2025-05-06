document.querySelectorAll("[data-dropdown]").forEach((dropdown) => {
  let timeoutId;

  dropdown.addEventListener("mouseenter", () => {
    // Cancel any pending close
    clearTimeout(timeoutId);
    closeAllDropdowns(dropdown);
    dropdown.classList.add("active");
  });

  dropdown.addEventListener("mouseleave", () => {
    timeoutId = setTimeout(() => {
      dropdown.classList.remove("active");
      // slight delay to prevent flicker
    }, 200);
  });
});

function closeAllDropdowns(except = null) {
  document.querySelectorAll("[data-dropdown].active").forEach((dropdown) => {
    if (dropdown !== except) {
      dropdown.classList.remove("active");
    }
  });
}
