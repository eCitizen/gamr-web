/** @jsx React.DOM */

var React = require('react/addons'),
  Router = require('react-router'),
  Title = require('./Title.jsx'),
  Link = Router.Link,
  Intro;

module.exports = Intro = React.createClass({
  render: function () {
    return (
      <div id='home'>
        <div className='title-wrap'>
          <div className='extra'></div>
          <Title>
            <span>G</span>
            <span>A</span>
            <span>M</span>
            <span>R</span>
          </Title>
          <span className='what'>What</span>
          <span className='does'>Does</span>
          <span className='your'>Your</span>
          <span className='play'>Play Style</span>
          <span className='say'>Say</span>
          <span className='about'>About</span>
          <span className='you'>You?</span>
          <Link to="survey" className='button'>Start</Link>
        </div>
        
      </div>
    );
  }
});