// psudocode
// get the image div
// set up on click
// on click run function that generates a random number whole number between 1 and 44
// put the svg with that random number as its name in the html

const imageDiv = document.querySelector(".image-div");

const swap = () => {
  const imageNum = Math.floor(Math.random() * (44 - 1) + 1);
  console.log(`<img src="./weather-icons/${imageNum}.svg" alt="icon/>`);

  imageDiv.innerHTML = `<img src="./weather-icons/${imageNum}.svg" alt="icon" />`;
};
imageDiv.addEventListener("click", swap);
