document.addEventListener("DOMContentLoaded", function () {
  const select = document.querySelector(".select");
  const dots = document.querySelectorAll(".dot");
  let lastPos = 0;

  dots.forEach((dot) => {
    dot.addEventListener("mouseover", function () {
      let dest = this.offsetLeft;
      select.style.transform = `translateX(${dest}px)`;
    });
  });

  function updateScale() {
    let pos = select.getBoundingClientRect().left;
    let speed = Math.abs(pos - lastPos);
    let d = 44;
    let offset = -20;
    let hd = d / 2;
    let scale = (offset + pos) % d;

    if (scale > hd) {
      scale = hd - (scale - hd);
    }
    scale = 1 - (scale / hd) * 0.35;

    select.style.transform += ` scale(${1 + speed * 0.06}, ${scale})`;

    lastPos = pos;
    requestAnimationFrame(updateScale);
  }

  requestAnimationFrame(updateScale);
  dots[0].dispatchEvent(new Event("mouseover"));
});
