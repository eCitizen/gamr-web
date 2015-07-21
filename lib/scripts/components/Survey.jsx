
var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Grid = require('./Grid.jsx');

module.exports = React.createClass({
  displayName: 'Survey',

  render: function () {
    return (
      <Grid>
        <RouteHandler {... this.props} key={name}/>
      </Grid>
    );
  }
});