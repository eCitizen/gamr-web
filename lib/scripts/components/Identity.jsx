/** @jsx React.DOM */

var React = require('react/addons'),
  Router = require('react-router'),
  Link = Router.Link,
  Identity;

module.exports = Identity = React.createClass({
  render: function () {
    return (
      <div id='home'>
        <h1>Identity</h1>
        <p>
          What are your profiles?
        </p>
        <Link to="survey" params={{sectionName:'brain-type'}}>Continue</Link>
      </div>
    );
  }
});