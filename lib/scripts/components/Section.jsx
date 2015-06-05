
/** @jsx React.DOM */

var React = require('react/addons'),
  Router = require('react-router'),
  QuestionSet = require('./QuestionSet.jsx'),
  Link = Router.Link;

module.exports.BrainType = React.createClass({
  displayName: 'BrainType',
  render: function () {
    return (
      <div>
        <h1>Brain Type</h1>
        <QuestionSet survey='personality' nextRoute='personality'/>
      </div>
    );
  }
});

module.exports.Personality = React.createClass({
  displayName: 'Personality',
  render: function () {
    return (
      <div>
        <h1>Personality</h1>
        <QuestionSet survey='personality' nextRoute='gamer-type'/>
      </div>
    );
  }
});

module.exports.GamerType = React.createClass({
  displayName: 'GamerType',
  render: function () {
    return (
      <div>
        <h1>Gamer Type</h1>
        <QuestionSet survey='personality' nextRoute='reward'/>
      </div>
    );
  }
});