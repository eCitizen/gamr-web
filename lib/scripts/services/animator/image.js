
var guide = require('../guide');
var DEFAULT = 3;

var images = [
  '/images/backgrounds-0.jpg',
  '/images/backgrounds-1.jpg',
  '/images/backgrounds-2.jpg',
  '/images/backgrounds-3.jpg',
  '/images/backgrounds-5.jpg'
];

var imgCache = {};

function getImage(idx) {
  if (!imgCache[idx]) imgCache[idx] = 'url(\'' + guide.assets + images[idx] + '\')';
  return imgCache[idx];
}

module.exports.default = function() {
  return getImage(DEFAULT);
};

module.exports.random = function() {
  return getImage(Math.floor(Math.random() * (images.length-1)));
};

module.exports.byTime = function(time) {
  return getImage(Math.ceil(time/2) % images.length % images.length);
};