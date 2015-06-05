
/** @jsx React.DOM */

var React = require('react/addons'),
  Router = require('react-router'),
  QuestionSet = require('./QuestionSet.jsx'),
  Link = Router.Link;

module.exports.BrainType = React.createClass({
  displayName: 'BrainType',
  render: function () {
    return (
      <QuestionSet survey='brainType' nextRoute='personality'/>
    );
  }
});

module.exports.Personality = React.createClass({
  displayName: 'Personality',
  render: function () {
    return (
      <QuestionSet survey='personality' nextRoute='gamer-type'/>
    );
  }
});

module.exports.GamerType = React.createClass({
  displayName: 'GamerType',
  render: function () {
    return (
      <QuestionSet survey='gamerType' nextRoute='reward'/>
    );
  }
});