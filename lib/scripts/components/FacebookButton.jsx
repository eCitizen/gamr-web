
// http://www.webpop.com/blog/2011/02/16/add-a-custom-twitter-button-to-your-website
// if we want a callback
// this may be helpful
// http://stackoverflow.com/questions/15413159/twitter-button-with-events-and-custom-design

var React = require('react');
var Button = require('./Button.jsx');

module.exports = React.createClass({
  displayName: 'FacebookButton',

  propTypes: {
    text: React.PropTypes.string,
    hashtags: React.PropTypes.array
  },

  getDefaultProps: function () {
    return {
      hashtags: ['projectgamr']
    };
  },

  openShare: function() {
    // TODO: get app id from build config
    // get real text
    // figure out image
    // make all images for facebook app
    // https://developers.facebook.com/docs/sharing/reference/feed-dialog/v2.4
    // http://stackoverflow.com/questions/21310648/facebook-app-this-must-be-derived-from-canvas-url-secure-canvas-url
    // app https://developers.facebook.com/apps/167828763548248/settings/

    console.log(FB)
    FB.ui({
      method: 'feed',
      link: window.location.href,
      name: 'PROJECT GAMR',
      caption: this.props.text,
      picture: 'http://skiano.com/img/quilting/quilt-00.jpg',
      description: 'Check out the results from...'
    }, function(response) {
      // noop
    });
  },

  render: function () {
    return <Button action={this.openShare}><span className='fa fa-facebook'/> Share</Button>;
  }
});
