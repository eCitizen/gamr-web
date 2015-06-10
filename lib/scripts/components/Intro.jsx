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
          <h4 className='marquee'>What Does Your Play Style Say About You?</h4>
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