/** @jsx React.DOM */

var React = require('react/addons'),
  Router = require('react-router'),
  Title = require('./Title.jsx'),
  Button = require('./Button.jsx'),
  Box = require('./Box.jsx'),
  Link = Router.Link,
  Intro;

module.exports = Intro = React.createClass({
  render: function () {
    return (
      <div>
        <Box className='title-wrap'>
          <div className='main-title-wrap'>
            <Title className='main-sub'>PROJECT</Title>
            <Title className='main' split>GAMR</Title>
          </div>

          <h4 className='marquee'>What does your play style say about you?</h4>
          <h4 className='marquee b'>Join us, and find out in just 15 minutes.</h4>
          <Link to="consent" className=''><Button>Start</Button></Link>
        </Box>
        <p className='footnote'>
          To participate, you must have an account with one or more of the folllowing:<br/> League of Legends, Battlefield: Hardline, or World of Warcraft.
        </p>
      </div>
    );
  }
});