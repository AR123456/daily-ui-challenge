const partyDate = document.querySelector(".date");

const mo = new Date().getMonth() + 1;
const day = new Date().getDate();
const yr = new Date().getFullYear();

partyDate.innerHTML = `${mo}/${day}/${yr} 6pm`;
