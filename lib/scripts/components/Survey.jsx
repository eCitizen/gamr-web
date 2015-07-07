
/** @jsx React.DOM */

var React = require('react/addons'),
  Router = require('react-router'),
  RouteHandler = Router.RouteHandler,
  Survey;

module.exports = Survey = React.createClass({
  render: function () {
    return (
      <div>
        <RouteHandler {... this.props} key={name}/>
      </div>
    );
  }
});