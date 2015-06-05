
/** @jsx React.DOM */

var React = require('react/addons'),
  Router = require('react-router'),
  TransitionGroup = React.addons.CSSTransitionGroup,
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
        <h2>Survey</h2>
        <TransitionGroup component="div" transitionName="survey-change">
          <RouteHandler {... this.props} key={name}/>
        </TransitionGroup>
      </div>
    );
  }
});