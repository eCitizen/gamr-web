
var React = require('react'),
  Router = require('react-router'),
  RouteHandler = Router.RouteHandler,
  Nav = require('./Nav.jsx'),
  Home;

module.exports = Home = React.createClass({
  render: function () {
    return (
      <div className='app'>
        <Nav/>
        <RouteHandler {... this.props}/>
      </div>
    );
  }
});