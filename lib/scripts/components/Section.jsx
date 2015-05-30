
/** @jsx React.DOM */

var React = require('react/addons'),
  Router = require('react-router'),
  Link = Router.Link;

module.exports.BrainType = React.createClass({
  displayName: 'BrainType',
  render: function () {
    return (
      <div>
        <h1>Brain Type</h1>
        <Link to='personality'>Next</Link>
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
        <Link to='gamer-type'>Next</Link>
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
        <Link to='reward' params={{data: "123"}}>Next</Link>
      </div>
    );
  }
});