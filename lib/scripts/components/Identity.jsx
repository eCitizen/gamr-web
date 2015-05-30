/** @jsx React.DOM */

var React = require('react/addons'),
  Router = require('react-router'),
  Link = Router.Link,
  api = require('../services/api'),
  Identity;

module.exports = Identity = React.createClass({
  statics: {
    willTransitionFrom: function (transition, component, callback) {
      api.getUser({
        name: 'greg'
      }, function (user) {
        if (user.valid) {
          console.log(user);
          callback();
        } else {
          transition.abort('Bad User');
          component.setState({
            failed: true
          });
          callback();
        }
      });
    }
  },

  getInitialState: function () {
    return {
      failed: false
    };
  },

  render: function () {
    console.log(this);
    return (
      <div id='home'>
        <h1>Identity</h1>
        <p>
          What are your profiles?
        </p>
        <Link to="brain">Continue</Link>
        {this.state.failed ? <div>Sorry... Bad User!</div> : null}
      </div>
    );
  }
});