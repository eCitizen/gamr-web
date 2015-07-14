
var React = require('react'),
  Router = require('react-router'),
  RouteHandler = Router.RouteHandler,
  Nav = require('./Nav.jsx'),
  Home;

module.exports = Home = React.createClass({
  render: function () {
    return (
      <div>
        <Nav/>
        <div className='page'>
          <div className='outer'>
            <RouteHandler {... this.props}/>
          </div>
        </div>
      </div>
    );
  }
});