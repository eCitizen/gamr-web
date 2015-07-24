
var images = [
  'url(\'/assets/images/backgrounds-0.jpg\')',
  'url(\'/assets/images/backgrounds-1.jpg\')',
  'url(\'/assets/images/backgrounds-2.jpg\')',
  'url(\'/assets/images/backgrounds-3.jpg\')',
  'url(\'/assets/images/backgrounds-5.jpg\')'
];

function randomOpacity() {
  var opacity = (Math.random() / 3) + .5;
  if (Math.random() < .15) {
    opacity = opacity * 3;
  }
  return opacity;
}

function randomImage() {
  return images[Math.floor(Math.random() * (images.length-1))];
}

module.exports = {
  default: function () {
    return {
      backgroundImage: images[3],
      opacity: randomOpacity()
    }
  },

  static: function (grid, cell, time) {
    return {
      backgroundImage: images[3]
    }
  }
};
