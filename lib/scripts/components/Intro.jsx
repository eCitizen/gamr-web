
var React = require('react');
var Link = require('react-router').Link;
var Title = require('./Title.jsx');
var Button = require('./Button.jsx');
var Background = require('./Background.jsx');
var Explainer = require('./Explainer.jsx');
var scrollTo = require('../services/scrollTo');

module.exports = React.createClass({
  displayName: 'Intro',

  componentDidMount: function () {
    var detailsNode = React.findDOMNode(this.refs.details);
    var rect = detailsNode.getBoundingClientRect();
    var top = rect.top + document.body.scrollTop;

    setTimeout(function () {
      scrollTo(top, 400);
    }, 2000); 
  },

  goToDetails: function () {
    var detailsNode = React.findDOMNode(this.refs.details);
    var rect = detailsNode.getBoundingClientRect();
    var top = rect.top + document.body.scrollTop;
    scrollTo(top, 400);
  },

  render: function () {
    return (
      <div className='intro'>
        <Background/>
        <div className='intro-block'>
          <div className='title-wrap' onClick={this.goToDetails}>
            <Title className='main-sub'>PROJECT</Title>
            <Title className='main' split>GAMR</Title>
            <span className='more-content fa fa-angle-down'></span>
          </div>
        </div>
        <Explainer ref='details'/>
      </div>
    );
  }
});