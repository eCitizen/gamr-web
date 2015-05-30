/** @jsx React.DOM */

var React = require('react/addons'),
  Router = require('react-router'),
  Link = Router.Link,
  Intro;

module.exports = Intro = React.createClass({
  render: function () {
    return (
      <div id='home'>
        <h1>GAMR</h1>
        <p>
          What does your play style say about you?
        </p>
        <Link to="survey">Take The Survey</Link>
      </div>
    );
  }
});