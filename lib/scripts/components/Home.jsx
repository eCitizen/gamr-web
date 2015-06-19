/** @jsx React.DOM */

var React = require('react/addons'),
  Router = require('react-router'),
  RouteHandler = Router.RouteHandler,
  Nav = require('./Nav.jsx'),
  About = require('./About.jsx'),
  Home;

module.exports = Home = React.createClass({
  render: function () {
    return (
      <div>
        <Nav/>
        <div className='screen'>
          <RouteHandler {... this.props}/>
        </div>
        <About/>
      </div>
    );
  }
});