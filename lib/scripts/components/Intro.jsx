
var React = require('react');
var Link = require('react-router').Link;
var Title = require('./Title.jsx');
var Button = require('./Button.jsx');
var Background = require('./Background.jsx');
var Explainer = require('./Explainer.jsx');

module.exports = React.createClass({
  displayName: 'Intro',

  render: function () {
    return (
      <div className='intro'>
        <Background/>
        <div className='intro-block'>
          <div className='title-wrap'>
            <Title className='main-sub'>PROJECT</Title>
            <Title className='main' split>GAMR</Title>
            <span className='more-content fa fa-angle-down'></span>
          </div>
        </div>
        <Explainer/>
      </div>
    );
  }
});