/** @jsx React.DOM */

var React = require('react/addons'),
  Router = require('react-router'),
  Link = Router.Link,
  Footer;

module.exports = Footer = React.createClass({
  render: function () {
    return (
      <div id='footer'>
        <Link to='home'>home</Link> MIT Media Lab
      </div>
    );
  }
});