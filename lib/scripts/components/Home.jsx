
var React = require('react/addons'),
  Router = require('react-router'),
  RouteHandler = Router.RouteHandler,
  Home;

module.exports = Home = React.createClass({
  render: function () {
    return (
      <div className='screen'>
        <RouteHandler {... this.props}/>
      </div>
    );
  }
});