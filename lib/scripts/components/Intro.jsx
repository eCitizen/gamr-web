/** @jsx React.DOM */

var React = require('react/addons'),
  Router = require('react-router'),
  Title = require('./Title.jsx'),
  Link = Router.Link,
  Intro;

module.exports = Intro = React.createClass({
  render: function () {
    return (
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
          <Link to="survey" className='button'>Start</Link>
          <span className='what'>What</span>
          <span className='does'>Does</span>
          <span className='your'>Your</span>
          <span className='play'>Play Style</span>
          <span className='say'>Say</span>
          <span className='about'>About</span>
          <span className='you'>You?</span>
          
        </div>
        
      </div>
    );
  }
});