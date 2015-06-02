/** @jsx React.DOM */

var React = require('react/addons'),
  Router = require('react-router'),
  Navigation = Router.Navigation,
  Link = Router.Link,
  api = require('../services/api'),
  guide = require('../services/guide'),
  FormSelect = require('./FormSelect.jsx'),
  FormField = require('./FormField.jsx'),
  InputActions = require('../input/actions'),
  InputStore = require('../input/store'),
  Identity;

module.exports = Identity = React.createClass({
  mixins: [Navigation],

  getInitialState: function () {
    return {};
  },

  componentDidMount: function () {
    
  },

  handleSelect: function(event, id) {
    console.log(id);
  },

  render: function () {
    console.log(this.state);

    InputActions.test('testing');

    var wow = guide.identity.WOW,
      lol = guide.identity.LOL;

    return <div/>;

    // return (
    //   <div id='home'>
    //     <h1>Identity</h1>
    //     <p>
    //       What are your profiles?
    //     </p>
        
    //     <FormSelect {... wow.fields.realm} onChange={this.handleSelect}/>
    //     <FormField {... lol.fields.sommonerName}/>

    //     <Link to="brain">Continue</Link>
    //   </div>
    // );
  }
});