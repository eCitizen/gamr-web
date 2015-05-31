/** @jsx React.DOM */

var React = require('react/addons'),
  Router = require('react-router'),
  Link = Router.Link,
  Consent;

module.exports = Consent = React.createClass({
  render: function () {
    return (
      <div id='home'>
        <h1>Consent</h1>
        <p>
          Do you consent?
        </p>
        <Link to="identity">Yes</Link>
      </div>
    );
  }
});