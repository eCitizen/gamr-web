
/** @jsx React.DOM */

var React = require('react'),
  Router = require('react-router'),
  Link = Router.Link,
  BadUser;

module.exports = BadUser = React.createClass({
  render: function () {
    return (
      <div>
        <h1>Bad User</h1>
        <p>
          We just don’t know you!
        </p>
      </div>
    );
  }
});