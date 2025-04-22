document.querySelectorAll("tr").forEach((row) => {
  const stockEl = row.querySelector(".num-stock");
  const gaugeEl = row.querySelector(".gauge .percentage");

  if (stockEl && gaugeEl) {
    const stock = stockEl.textContent.trim();
    gaugeEl.style.transform = `rotate(${stock}deg)`;
  }
});
