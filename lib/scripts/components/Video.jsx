
var React = require('react');

module.exports = React.createClass({
  displayName: 'Video',

  render: function () {
    return (
      <div className='video-wrap'>
        <div className='video'>
          <iframe 
            id="ytplayer"
            type="text/html"
            width="100%" height="100%"
            src="http://www.youtube.com/embed/i2q9qhlUcTU?autoplay=0&color=white&modestbranding=1&rel=0&showinfo=0&origin=http://example.com"
            frameBorder="0"/>
        </div>
      </div>
    );
  }
});
