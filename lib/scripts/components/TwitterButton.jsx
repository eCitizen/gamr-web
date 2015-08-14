
// http://www.webpop.com/blog/2011/02/16/add-a-custom-twitter-button-to-your-website
// if we want a callback
// this may be helpful
// http://stackoverflow.com/questions/15413159/twitter-button-with-events-and-custom-design

var React = require('react');
var Button = require('./Button.jsx');

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
    var width  = 575,
        height = 400,
        left   = (window.offsetWidth  - width)  / 2,
        top    = (window.offsetHeight - height) / 2,
        opts   = 'status=1' +
                 ',width='  + width  +
                 ',height=' + height +
                 ',top='    + top    +
                 ',left='   + left;

    var url = 'https://twitter.com/intent/tweet'; 
    
    url += '?text=' + this.props.text;
    url += '&url=' + encodeURIComponent(window.location.href);
    url += '&hashtags=' + this.props.hashtags.join(',');
    
    window.open(url, 'twitter', opts);
    return false;
  },

  render: function () {
    return <Button action={this.openShare}><span className='fa fa-twitter'/> Tweet</Button>;
  }
});
