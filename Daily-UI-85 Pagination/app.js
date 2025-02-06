document.addEventListener("DOMContentLoaded", function () {
  var dots = document.querySelectorAll(".dot");
  var select = document.querySelector(".select");

  dots.forEach(function (dot) {
    dot.addEventListener("mouseover", function () {
      var dest = dot.offsetLeft;
      select.style.transition = "transform 0.6s ease-out";
      select.style.transform = `translateX(${dest}px)`;
    });
  });

  var lastPos = select.offsetLeft;

  function updateScale() {
    var pos = select.offsetLeft;
    var speed = Math.abs(pos - lastPos);
    var d = 44;
    var offset = -20;
    var hd = d / 2;
    var scale = (offset + pos) % d;
    if (scale > hd) {
      scale = hd - (scale - hd);
    }
    scale = 1 - (scale / hd) * 0.35;
    select.style.transition = "transform 0.1s";
    select.style.transform += ` scaleY(${scale}) scaleX(${1 + speed * 0.06})`;

    lastPos = pos;
    requestAnimationFrame(updateScale);
  }

  requestAnimationFrame(updateScale);
  dots[0].dispatchEvent(new Event("mouseover"));
});
