
var React = require('react');
var Link = require('react-router').Link;
var Button = require('./Button.jsx');
var Video = require('./Video.jsx');
var social = require('../services/social');

module.exports = React.createClass({
  displayName: 'Explainer',

  tweet: function () {
    social.twitter();
  },

  post: function () {
    social.facebook();
  },

  render: function () {
    return (
      <div className='intro-body'>
        <div className='intro-body-inner'>
          <div className='loud-text'>
            <h4>Does the way you play reflect who you are?</h4>
            <h5>Maverick. Gladiator. Leeroy Jenkins. <br/>Discover your personality, your brain type, and your gamer type in 15 minutes.</h5>
          </div>

          <Video/>

          <p>
            The Playful Systems group at <a href="http://www.media.mit.edu/" target="blank">MIT Media Lab</a> has teamed up with <a href="https://www.tilburguniversity.edu/" target="blank">Tilburg University</a> to study how our game behavior relates to how we are in real life.
          </p>
          <p>
            Tell us a little about who you are and how you play, and we will show you <strong>your GAMR profile</strong>: a custom report on your personality, brain type and gamer type. 
          </p>

          <div className='valid-games'>
            <em>If you play one or more of the following on PC, you may be eligible!</em>
            <p className='game-title'>League of Legends</p>
            <p className='game-title'>Battlefield: Hardline</p>
            <p className='game-title'>Battlefield 4</p>
            <p className='game-title'>World of Warcraft</p>
          </div>

          <Link className='start-button' to="consent">
            <Button>Start</Button>
          </Link>

          <h6 className='footnote'>The survey takes approximately 15 minutes.</h6>

          <div className='intro-foot'>
            <div className='intro-social'>
              <i className='fa fa-twitter' onClick={this.tweet}/>
              <i className='fa fa-facebook-official' onClick={this.post}/>
            </div>
            <a className='intro-about' href="http://gamrnews.com" target="blank">About us</a>
          </div>
        </div>
      </div>
    );
  }
});
