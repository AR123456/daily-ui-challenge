const els = (sel, par = document) => par.querySelectorAll(sel);
const el = (sel, par = document) => par.querySelector(sel);
const mod = (n, m) => ((n % m) + m) % m;

els(".slider-wrapper").forEach((elPar) => {
  const elSlider = el(".slider", elPar);
  const elsItems = els(".item", elPar);
  const sub = +elPar.dataset.items ?? 1;
  const tot = Math.ceil(elsItems.length / sub);
  let c = 0;

  const anim = () => (elSlider.style.transform = `translateX(-${c * 100}%)`);
  const prev = () => ((c = mod(c - 1, tot)), anim());
  const next = () => ((c = mod(c + 1, tot)), anim());

  el(".prev", elPar).addEventListener("click", prev);
  el(".next", elPar).addEventListener("click", next);
});
