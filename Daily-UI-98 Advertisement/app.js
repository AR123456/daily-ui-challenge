// Just to generate more articles
const node = document.querySelector(".article");
[...Array(10)].forEach((_) =>
  node.parentNode.insertBefore(node.cloneNode(true), node)
);
