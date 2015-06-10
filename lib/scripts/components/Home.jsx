/** @jsx React.DOM */

var React = require('react/addons'),
  Router = require('react-router'),
  RouteHandler = Router.RouteHandler,
  Footer = require('./Footer.jsx'),
  Home;

module.exports = Home = React.createClass({
  render: function () {
    return (
      <div>
        <div className='screen'>
          <RouteHandler {... this.props}/>
        </div>
        <div className="curtain curtain-top base"></div>
        <div className="curtain curtain-bottom base"></div>
        <div className="curtain curtain-left"></div>
        <div className="curtain curtain-right"></div>
        <div className="curtain curtain-top"></div>
        <div className="curtain curtain-bottom"></div>
        <Footer/>
      </div>
    );
  }
});