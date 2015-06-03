/** @jsx React.DOM */

var React = require('react/addons'),
  Router = require('react-router'),
  Navigation = Router.Navigation,
  Link = Router.Link,
  api = require('../services/api'),
  guide = require('../services/guide'),
  Form = require('./Form.jsx'),
  FormSelect = require('./FormSelect.jsx'),
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
    var wow = guide.identity.WOW,
      lol = guide.identity.LOL;

    return (
      <Form id='identity'>
        hi
        <div>
          <span isField={true}>Hello</span>
          <FormSelect {... wow.fields.realm}/>
        </div>
      </Form>
    );

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