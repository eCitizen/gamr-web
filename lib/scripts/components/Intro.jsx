
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

        <div className='intro-question'>
          <h4 className='speaking align-left'>What does your play style say about you?</h4>
          <h4 className='speaking align-right'><em>Join us, and find out in just 15 minutes.</em></h4>
        </div>

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
          To participate, you must play one or more of the folllowing:<br/> League of Legends, Battlefield: Hardline, Battlefield 4, or World of Warcraft.
        </p>
      </div>
    );
  }
});