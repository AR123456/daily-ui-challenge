const checkBox = document.getElementById("checkbox");
const card = document.querySelector(".card");

function agree() {
  if (checkBox.checked == true) {
    card.style.display = "none";
  } else {
    card.style.display = "block";
  }
}
checkBox.addEventListener("click", agree);
