
var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var State = Router.State;
var Nav = require('./Nav.jsx');
var classnames = require('classnames');
var ErrorComponent = require('./Error.jsx');

module.exports = React.createClass({
  displayName: 'Home',

  mixins: [State],

  render: function () {
    var className = classnames('app', {
      root: this.getPath() === '/',
      'touch-enabled': !!("ontouchstart" in window) || window.navigator.msMaxTouchPoints > 0
    });

    return (
      <div className={className}>
        <Nav/>
        <RouteHandler {... this.props}/>
        <ErrorComponent/>
      </div>
    );
  }
});