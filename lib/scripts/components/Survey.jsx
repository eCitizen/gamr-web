
/** @jsx React.DOM */

var React = require('react/addons'),
  Router = require('react-router'),
  RouteHandler = Router.RouteHandler,
  Survey;

module.exports = Survey = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  render: function () {
    var name = this.context.router.getCurrentPath();

    return (
      <div>
        <RouteHandler {... this.props} key={name}/>
      </div>
    );
  }
});