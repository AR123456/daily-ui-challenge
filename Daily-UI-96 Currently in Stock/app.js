// for each tr
document.querySelectorAll("tr").forEach((row) => {
  // find and define the stock
  const stockEl = row.querySelector(".num-stock");
  // find and define class percentage if it is inside of a gage element
  const gaugeEl = row.querySelector(".gauge .percentage");
  // if the tr has both the stock and gage elements
  if (stockEl && gaugeEl) {
    // trim the value of the stock element
    const stock = stockEl.textContent.trim();
    // then pass it into this template literal
    //  sets the CSS transform property of the .percentage element.
    // rotates the gauge using the stock value (e.g., "rotate(12deg)").
    gaugeEl.style.transform = `rotate(${stock}deg)`;
  }
});
