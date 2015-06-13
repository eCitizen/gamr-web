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
        <div id='home' className='screen-fixed'>
          <div className='title-wrap'>
            <div className='extra'></div>
            <h3 className='small-title'>
              PROJECT
            </h3>
            <Title>
              <span>G</span>
              <span>A</span>
              <span>M</span>
              <span>R</span>
            </Title>
            <h4 className='marquee'>What does your play style say about you?</h4>
            <h4 className='marquee b'>Join us and find out.</h4>
            <Link to="survey" className=''>Start</Link>
            <Button>Start</Button>
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