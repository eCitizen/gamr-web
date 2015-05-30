
/** @jsx React.DOM */

var React = require('react/addons'),
  Router = require('react-router'),
  Link = Router.Link,
  Profile;

module.exports = Profile = React.createClass({
  render: function () {
    return (
      <div id='home'>
        <h1>Profile</h1>
        <p>
          Here are your results...
        </p>
      </div>
    );
  }
});