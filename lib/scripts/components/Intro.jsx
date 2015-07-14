
var React = require('react');
var Link = require('react-router').Link;
var Title = require('./Title.jsx');
var Button = require('./Button.jsx');
var Background = require('./Background.jsx');

module.exports = React.createClass({
  displayName: 'Intro',

  render: function () {
    return (
      <Background className='title-wrap'>
        <div className='main-title-wrap'>
          <Title className='main-sub'>PROJECT</Title>
          <Title className='main' split>GAMR</Title>
        </div>

        <Link className='start-button' to="consent">
          <Button>Start</Button>
        </Link>

        <div className='intro-buttons'>
          <div className='intro-about'>About Us</div>
          <div className='intro-social'>
            <i className='fa fa-twitter'/>
            <i className='fa fa-facebook-official'/>
          </div>
          <div className='intro-about'>Play Video</div>
        </div>

        {/*
        <p className='schools'>MIT Media Lab <span className='plus'>+</span> Tilburg University</p>
        <p className='footnote'>
          To participate, you must play one or more of the folllowing:<br/> League of Legends, Battlefield: Hardline, Battlefield 4, or World of Warcraft.
        </p>
        */}
      </Background>
    );
  }
});