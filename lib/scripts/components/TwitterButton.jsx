
// http://www.webpop.com/blog/2011/02/16/add-a-custom-twitter-button-to-your-website
// if we want a callback
// this may be helpful
// http://stackoverflow.com/questions/15413159/twitter-button-with-events-and-custom-design

var React = require('react');
var Button = require('./Button.jsx');
var social = require('../services/social');

module.exports = React.createClass({
  displayName: 'TwitterButton',

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
    social.twitter({
      text: this.props.text,
      hashtags: this.props.hashtags
    });
    return false;
  },

  render: function () {
    return <Button action={this.openShare}><span className='fa fa-twitter'/> Tweet</Button>;
  }
});
