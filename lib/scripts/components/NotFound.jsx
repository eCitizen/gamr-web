/** @jsx React.DOM */

var React = require('react/addons'),
  Router = require('react-router'),
  Link = Router.Link,
  NotFound;

module.exports = NotFound = React.createClass({
  render: function () {
    return (
      <div id='home'>
        <h1>Not Found</h1>
        <Link to="home">Take The Survey</Link>
      </div>
    );
  }
});