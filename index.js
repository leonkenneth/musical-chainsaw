var xAnimations = {};
var yAnimations = {};

function animateX(selector, updateFunction) {
  xAnimations[selector] = updateFunction;
}

function animateY(selector, updateFunction) {
  yAnimations[selector] = updateFunction;
}

function update() {
  for (var selector in yAnimations) {
    translateFromTop(selector, yAnimations[selector](scrolled));
  }

  for (var selector in xAnimations) {
    translateFromLeft(selector, xAnimations[selector](scrolled));
  }
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

function translateFromTop(whatElementSelector, howMuchPx) {
  var whatElement = document.querySelector(whatElementSelector);
  var existingOffset = getOffset(whatElement);
  setTranslation(whatElement, {
    x: existingOffset.x,
    y: howMuchPx
  });
}

function translateFromLeft(whatElementSelector, howMuchPx) {
  var whatElement = document.querySelector(whatElementSelector);
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
