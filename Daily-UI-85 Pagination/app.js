// $(document).ready(function () {
//   $(".dot").hover(function () {
//     var cur = $(this);
//     var dest = cur.position().left;
//     var t = 0.6;
//     TweenMax.to($(".select"), t, { x: dest, ease: Back.easeOut });
//   });
//   var lastPos = $(".select").position().left;
//   function updateScale() {
//     var pos = $(".select").position().left;

//     var speed = Math.abs(pos - lastPos);
//     var d = 44;
//     var offset = -20;
//     var hd = d / 2;
//     var scale = (offset + pos) % d;
//     if (scale > hd) {
//       scale = hd - (scale - hd);
//     }
//     scale = 1 - (scale / hd) * 0.35;
//     TweenMax.to($(".select"), 0.1, { scaleY: scale, scaleX: 1 + speed * 0.06 });

//     lastPos = pos;
//     requestAnimationFrame(updateScale);
//   }
//   requestAnimationFrame(updateScale);
//   $(".dot:eq(0)").trigger("mouseover");
// });
document.addEventListener("DOMContentLoaded", function () {
  var dots = document.querySelectorAll(".dot");
  var select = document.querySelector(".select");

  dots.forEach(function (dot) {
    dot.addEventListener("mouseover", function () {
      var dest = dot.offsetLeft;
      var t = 0.6;
      TweenMax.to(select, t, { x: dest, ease: Back.easeOut });
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
    TweenMax.to(select, 0.1, { scaleY: scale, scaleX: 1 + speed * 0.06 });

    lastPos = pos;
    requestAnimationFrame(updateScale);
  }

  requestAnimationFrame(updateScale);
  dots[0].dispatchEvent(new Event("mouseover"));
});
