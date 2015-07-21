
var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var State = Router.State;
var Nav = require('./Nav.jsx');
var classnames = require('classnames');

module.exports = React.createClass({
  displayName: 'Home',

  mixins: [State],

  render: function () {
    var className = classnames('app', {
      root: this.getPath() === '/'
    });

    return (
      <div className={className}>
        <Nav/>
        <RouteHandler {... this.props}/>
      </div>
    );
  }
});