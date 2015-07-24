
var DEFAULT = 3;

var images = [
  'url(\'/assets/images/backgrounds-0.jpg\')',
  'url(\'/assets/images/backgrounds-1.jpg\')',
  'url(\'/assets/images/backgrounds-2.jpg\')',
  'url(\'/assets/images/backgrounds-3.jpg\')',
  'url(\'/assets/images/backgrounds-5.jpg\')'
];

module.exports.default = function() {
  return images[DEFAULT];
};

module.exports.random = function() {
  return images[Math.floor(Math.random() * (images.length-1))];
};

module.exports.byTime = function(time) {
  return images[Math.ceil(time/2) % images.length % images.length];
};