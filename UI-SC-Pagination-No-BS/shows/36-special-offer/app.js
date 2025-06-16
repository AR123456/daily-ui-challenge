const saleDate = document.querySelector(".divDate");
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
var tomorrow = new Date();
tomorrow.setTime(tomorrow.getTime() + 1000 * 3600 * 24);
saleDate.innerHTML = `One day only ! 
Sale ends ${
  months[tomorrow.getMonth()]
}${tomorrow.getDate()} ${tomorrow.getFullYear()}`;
