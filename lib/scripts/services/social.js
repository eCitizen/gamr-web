
var assign = require('object-assign');
var guide = require('./guide');

module.exports.twitter = function (options) {
  options = assign({
    link: window.location.href,
    text: 'Does the way you play reflect who you are? Help us find out at',
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
    redirect_uri: window.location.href,
    name: 'PROJECT GAMR',
    caption: 'MIT Media Lab + Tilburg University',
    picture: guide.socialAssets + '/gamr-share.jpg',
    description: guide.socialDescription
  }, options);

  // console.log(options.name)

  FB.ui(options, cb || function () {
    // console.log('hello')
  });

  // TODO: 
  // https://developers.facebook.com/docs/sharing/reference/feed-dialog/v2.4
  // http://stackoverflow.com/questions/21310648/facebook-app-this-must-be-derived-from-canvas-url-secure-canvas-url
  // app https://developers.facebook.com/apps/167828763548248/settings/

  // another idea for how to do the images:
  // http://stackoverflow.com/questions/3361507/facebook-js-sdk-how-to-post-an-image-on-wall
}
