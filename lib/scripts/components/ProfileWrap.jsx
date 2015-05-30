
/** @jsx React.DOM */

var React = require('react/addons'),
  Router = require('react-router'),
  RouteHandler = Router.RouteHandler,
  ProfileWrap;

module.exports = ProfileWrap = React.createClass({
  render: function () {
    return <RouteHandler {... this.props}/>;
  }
});