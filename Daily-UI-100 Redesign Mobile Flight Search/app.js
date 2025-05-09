function toDateInputValue(dateObject) {
  const local = new Date(dateObject);

  local.setMinutes(dateObject.getMinutes() - dateObject.getTimezoneOffset());

  return local.toJSON().slice(0, 10);
}

document.getElementById("depart-date").value = toDateInputValue(new Date());

//  some js for the fancy cal
