/** @jsx React.DOM */

var React = require('react/addons'),
  Router = require('react-router'),
  Title = require('./Title.jsx'),
  Button = require('./Button.jsx'),
  Link = Router.Link,
  Intro;

module.exports = Intro = React.createClass({
  render: function () {
    return (
      <div>
        <div id='home' className='screen-scroll'>
          <div className='title-wrap'>
            <div className='extra'></div>

            <div className='main-title-wrap'>
              <Title className='main-sub' separator='.' split>PRO.JECT</Title>
              <Title className='main' split>GAMR</Title>
            </div>

            <h4 className='marquee'>What does your play style say about you?</h4>
            <h4 className='marquee b'>Join us, and find out in just 15 minutes.</h4>
            <Link to="consent" className=''><Button>Start</Button></Link>
            <p className='footnote'>
              To participate, you must have an account with one or more of the folllowing:<br/> League of Legends, Battlefield: Hardline, or World of Warcraft.
            </p>
          </div>
        </div>
        <div className="curtain curtain-top base"></div>
        <div className="curtain curtain-bottom base"></div>
        <div className="curtain curtain-left"></div>
        <div className="curtain curtain-right"></div>
        <div className="curtain curtain-top"></div>
        <div className="curtain curtain-bottom"></div>
      </div>
    );
  }
});