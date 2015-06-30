
/** @jsx React.DOM */

var React = require('react/addons'),
  Router = require('react-router'),
  RouteHandler = Router.RouteHandler,
  Nav = require('./Nav.jsx'),
  Survey;

module.exports = Survey = React.createClass({
  render: function () {
    return (
      <div>
        <Nav/>
        <RouteHandler {... this.props} key={name}/>
      </div>
    );
  }
});