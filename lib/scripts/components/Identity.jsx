/** @jsx React.DOM */

var React = require('react/addons'),
  Router = require('react-router'),
  Navigation = Router.Navigation,
  Link = Router.Link,
  api = require('../services/api'),
  guide = require('../services/guide'),
  Identity;

module.exports = Identity = React.createClass({
  mixins: [Navigation],

  getInitialState: function () {
    return {
      failed: false,
      user: 'greg',
      fruit: 'A'
    };
  },

  toggleUser: function () {
    this.setState({
      user: this.state.user === 'greg' ? 'kevin' : 'greg'
    });
  },

  // componentDidMount: function () {
  //   setTimeout(function () {
  //     this.transitionTo('home');
  //   }.bind(this), 1200);
  // },

  handleInput: function (event) {
    // console.log('hi there', arguments);
    this.setState({user: event.target.value});
  },

  updateFruit: function (event) {
    this.setState({fruit: event.target.value});
  },

  render: function () {

    console.log(guide.identity.WOW.fields[2].options);

    var realms = guide.identity.WOW.fields[2].options;
    var options = Object.keys(realms).map(function (key) {
      return <option value={key}>{realms[key]}</option>;
    });

    return (
      <div id='home'>
        <h1>Identity</h1>
        <p>
          What are your profiles?
        </p>
        
        <input onChange={this.handleInput} value={this.state.user}/>

        <select value={this.state.fruit} onChange={this.updateFruit}>
          <option value="A">Apple</option>
          <option value="B">Banana</option>
          <option value="C">Cranberry</option>
          {options}
        </select>

        <p>
          <span onClick={this.toggleUser} style={{textDecoration:'underline', cursor: 'pointer'}}>Toggle User:</span> {this.state.user}
        </p>
        <Link to="brain">Continue</Link>
        {this.state.failed ? <div>Sorry... Bad User!</div> : null}
      </div>
    );
  }
});