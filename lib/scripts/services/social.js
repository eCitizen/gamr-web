
var assign = require('object-assign');

module.exports.twitter = function (options) {
  options = assign({
    link: window.location.href,
    text: 'Does the way you play reflect who you are?',
    hashtags: ['projectgamr']
  }, options);

  var url = 'https://twitter.com/intent/tweet';
  var width  = 575;
  var height = 400;
  var left = (window.offsetWidth  - width) / 2;
  var top = (window.offsetHeight - height) / 2;
  var opts = 'status=1' +
             ',width='  + width  +
             ',height=' + height +
             ',top='    + top    +
             ',left='   + left;

  url += '?text=' + options.text;
  url += '&url=' + encodeURIComponent(options.link);
  url += '&hashtags=' + options.hashtags.join(',');
  
  window.open(url, 'twitter', opts);
}

module.exports.facebook = function (options, cb) {
  options = assign({
    method: 'feed',
    link: window.location.href,
    name: 'PROJECT GAMR',
    caption: 'Does the way you play reflect who you are?',
    picture: 'http://40.media.tumblr.com/90954c2a102ae919d0142cfdea9dbadf/tumblr_nr58a1W2ZE1tduv00o1_1280.jpg', // TODO!!!!,
    description: 'The Playful Systems group at MIT Media Lab has teamed up with Tilburg University to study how our game behavior relates to how we are in real life.'
  }, options);

  // fix link to images here!

  FB.ui(options, cb || function () {});

  // TODO: get app id from build config
  // get real text
  // figure out image
  // make all images for facebook app
  // https://developers.facebook.com/docs/sharing/reference/feed-dialog/v2.4
  // http://stackoverflow.com/questions/21310648/facebook-app-this-must-be-derived-from-canvas-url-secure-canvas-url
  // app https://developers.facebook.com/apps/167828763548248/settings/
}
