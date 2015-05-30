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
        name: component.state.user
      }, function (user) {
        if (user.valid) {
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
      failed: false,
      user: 'greg'
    };
  },

  toggleUser: function () {
    this.setState({
      user: this.state.user === 'greg' ? 'kevin' : 'greg'
    });
  },

  render: function () {
    return (
      <div id='home'>
        <h1>Identity</h1>
        <p>
          What are your profiles?
        </p>
        <p>
          <span onClick={this.toggleUser} style={{textDecoration:'underline', cursor: 'pointer'}}>Toggle User:</span> {this.state.user}
        </p>
        <Link to="brain">Continue</Link>
        {this.state.failed ? <div>Sorry... Bad User!</div> : null}
      </div>
    );
  }
});