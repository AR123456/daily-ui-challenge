/* document.addEventListener("click", (e) => {
  const isDropdownButton = e.target.matches("[data-dropdown-button]");
  //   setting up the toggle if we are clicking the button button toggle dropdown open, if clicking inside the dropdown keep it open but if outside button close it
  // are we in a dropdown, if so ignore
  // in a drop down that is has a parent of data dropdown  ignore
  if (!isDropdownButton && e.target.closest("[data-dropdown]") != null) return;
  // otherwise if clicking dropdown the dropdown we are clicking , find its class list and toggle it.
  let currentDropdown;
  if (isDropdownButton) {
    currentDropdown = e.target.closest("[data-dropdown]");
    currentDropdown.classList.toggle("active");
  }
  // get rid of all the dropdowns that are not already open
  document.querySelectorAll("[data-dropdown].active").forEach((dropdown) => {
    if (dropdown === currentDropdown) return;
    dropdown.classList.remove("active");
  });
}); */

document.querySelectorAll("[data-dropdown]").forEach((dropdown) => {
  let timeoutId;

  dropdown.addEventListener("mouseenter", () => {
    clearTimeout(timeoutId); // Cancel any pending close
    closeAllDropdowns(dropdown);
    dropdown.classList.add("active");
  });

  dropdown.addEventListener("mouseleave", () => {
    timeoutId = setTimeout(() => {
      dropdown.classList.remove("active");
    }, 200); // slight delay to prevent flicker
  });
});

function closeAllDropdowns(except = null) {
  document.querySelectorAll("[data-dropdown].active").forEach((dropdown) => {
    if (dropdown !== except) {
      dropdown.classList.remove("active");
    }
  });
}
