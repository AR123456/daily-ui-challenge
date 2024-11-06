document.addEventListener("DOMContentLoaded", function () {
  function generateCalendar(startDay, daysInMonth) {
    const calendar = document.getElementById("calendar");
    calendar.innerHTML = ""; // Clear any previous content

    // Add empty cells for the days before the start of the month
    for (let i = 0; i < startDay; i++) {
      const emptyCell = document.createElement("div");
      emptyCell.classList.add("day");
      calendar.appendChild(emptyCell);
    }

    // Add days for the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayCell = document.createElement("div");
      dayCell.classList.add("day");
      dayCell.textContent = day;
      calendar.appendChild(dayCell);
    }
  }

  // Example: Generate a calendar starting on Wednesday with 30 days
  generateCalendar(3, 30);
});
