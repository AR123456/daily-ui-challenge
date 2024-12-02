const social = document.querySelectorAll(".soc-link");

for (let i = 0; i < social.length; i++) {
  social[i].addEventListener("mouseover", () => {
    const svg = social[i].querySelector("img");
    svg.style.fill = "red";
  });
}
