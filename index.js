var animations = {
  x: [],
  y: []
};

[].forEach.call(document.querySelectorAll("[x]"), function (el) {
  animateX(el, new Function("t", "return " + el.getAttribute("x") + ";"));
});

[].forEach.call(document.querySelectorAll("[y]"), function (el) {
  animateY(el, new Function("t", "return " + el.getAttribute("y") + ";"));
});

function animateX(el, updateFunction) {
  animations.x.push([el, updateFunction]);
}

function animateY(el, updateFunction) {
  animations.y.push([el, updateFunction]);
}

function update() {
  animations.y.forEach(function (a) {
    translateFromTop(a[0], a[1](scrolled));
  });

  animations.x.forEach(function (a) {
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
