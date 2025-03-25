const container = document.querySelector(".container");
const card = document.querySelector(".card");
container.addEventListener("click", () => {
  console.log("click");
  card.classList.toggle("hidden");
});
