
var React = require('react/addons');
var Link = require('react-router').Link;
var Title = require('./Title.jsx');
var Button = require('./Button.jsx');

module.exports = React.createClass({
  displayName: 'Intro',

  render: function () {
    return (
      <div className='title-wrap'>
        <div className='main-title-wrap'>
          <Title className='main-sub'>PROJECT</Title>
          <Title className='main' split>GAMR</Title>
        </div>
        <h4 className='marquee'>What does your play style say about you?</h4>
        <h4 className='marquee b'>Join us, and find out in just 15 minutes.</h4>

        <div className='center-group intro-actions'>
          <Link className='middle' to="consent">
            <Button>Start</Button>
          </Link>
          <div className='left intro-about'>
            <span>About Us</span>
          </div>
          <div className='right intro-social'>
            <i className='fa fa-twitter'/>
            <i className='fa fa-facebook-official'/>
          </div>
        </div>

        <p className='schools'>MIT Media Lab <span className='plus'>+</span> Tilburg University</p>
        <p className='footnote'>
          To participate, you must have an account with one or more of the folllowing:<br/> League of Legends, Battlefield: Hardline, or World of Warcraft.
        </p>
      </div>
    );
  }
});