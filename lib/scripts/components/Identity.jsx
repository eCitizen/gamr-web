/** @jsx React.DOM */

var React = require('react/addons'),
  Router = require('react-router'),
  Navigation = Router.Navigation,
  Link = Router.Link,
  api = require('../services/api'),
  guide = require('../services/guide'),
  FormField = require('./FormField.jsx'),
  Identity;

module.exports = Identity = React.createClass({
  mixins: [Navigation],

  getInitialState: function () {
    return {};
  },

  toggleUser: function () {
    this.setState({
      user: this.state.user === 'greg' ? 'kevin' : 'greg'
    });
  },

  render: function () {
    console.log(this.state);

    var wow = guide.identity.WOW,
      lol = guide.identity.LOL;

    return (
      <div id='home'>
        <h1>Identity</h1>
        <p>
          What are your profiles?
        </p>

        <FormField {... wow.fields.realm} form={this}/>
        <FormField {... lol.fields.sommonerName} form={this}/>

        <Link to="brain">Continue</Link>
        {this.state.failed ? <div>Sorry... Bad User!</div> : null}
      </div>
    );
  }
});