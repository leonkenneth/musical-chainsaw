var xAnimations = [];
var yAnimations = [];

[].forEach.call(document.querySelectorAll("[animate-x]"), function (el) {
  animateX(el, new Function("t", "return " + el.getAttribute("animate-x") + ";"));
});

[].forEach.call(document.querySelectorAll("[animate-y]"), function (el) {
  animateY(el, new Function("t", "return " + el.getAttribute("animate-y") + ";"));
});

function animateX(el, updateFunction) {
  xAnimations.push([el, updateFunction]);
}

function animateY(el, updateFunction) {
  yAnimations.push([el, updateFunction]);
}

function update() {
  yAnimations.forEach(function (a) {
    translateFromTop(a[0], a[1](scrolled));
  });

  xAnimations.forEach(function (a) {
    translateFromLeft(a[0], a[1](scrolled));
  });
}

var scrolled = 0;
window.addEventListener('scroll', function () {
  scrolled = window.scrollY;
});

animationLoop();

function animationLoop() {
  update();
  window.requestAnimationFrame(animationLoop);
}

function translateFromTop(whatElement, howMuchPx) {
  var existingOffset = getOffset(whatElement);
  setTranslation(whatElement, {
    x: existingOffset.x,
    y: howMuchPx
  });
}

function translateFromLeft(whatElement, howMuchPx) {
  var existingOffset = getOffset(whatElement);
  setTranslation(whatElement, {
    x: howMuchPx,
    y: existingOffset.y
  });
}

function getOffset(element) {
  var els = /translate\((\d*)px, (\d*)px\)/g.exec(element.style.transform);
  if (els == null)
    return { x: 0, y: 0 };
  return { x: parseInt(els[1]), y: parseInt(els[2]) };
}

function setTranslation(element, offset) {
  element.style.transform = `translate(${offset.x}px, ${offset.y}px)`;
}
