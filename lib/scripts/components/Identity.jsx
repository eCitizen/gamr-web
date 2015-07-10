var React = require('react/addons');
var Router = require('react-router');
var guide = require('../services/guide');
var Form = require('./Form.jsx');
var FormSelect = require('./FormSelect.jsx');
var FormInput = require('./FormInput.jsx');
var FormSubmit = require('./FormSubmit.jsx');
var Title = require('./Title.jsx');
var InputStore = require('../input/store');
var FORM_ID = 'identity';
var IdentityResults = require('./IdentityResults.jsx');

module.exports = React.createClass({
  displayName: 'Identity',

  statics: {
    willTransitionTo: function (transition, params, query, callback) {
      var i = 0, k;
      for (k in InputStore.getForm('games')) { 
        i += 1; 
      }
      if (i === 0) transition.redirect('games');
      callback();
    }
  },

  getInitialState: function () {
    return  {
      profileResults: null
    }
  },

  submitProfiles: function (form) {
    setTimeout(function () {
      console.log('submit profiles', form);
      // this.transitionTo('bio');

      this.setState({
        profileResults: {
          WOW: {
            name: 'Player' 
          }
        }
      })

    }.bind(this),200);
  },

  render: function () {
    if (this.state.profileResults) return <IdentityResults results={this.state.profileResults}/>;

    var games = InputStore.getForm('games'),
      WOW = guide.identity.WOW,
      LOL = guide.identity.LOL,
      BFHD = guide.identity.BFHD,
      formBlocks = [];

    if (games.LOL) {
      formBlocks.push(
        <div className='form-block' key='a'>
          <h2>{LOL.title}</h2>
          <FormInput {... LOL.fields.sommonerName}/>
          <FormSelect {... LOL.fields.region}/>
          <FormSelect {... LOL.fields.preferredLane}/>
          <FormSelect {... LOL.fields.preferredRole}/>
        </div>
      );
    }

    if (games.WOW) {
      formBlocks.push(
        <div className='form-block' key='b'>
          <h2>{WOW.title}</h2>
          <FormInput {... WOW.fields.characterName}/>
          <FormSelect {... WOW.fields.region}/>
          <FormSelect {... WOW.fields.realm}/>
        </div>
      );
    }

    if (games.BFHD) {
      formBlocks.push(
        <div className='form-block' key='c'>
          <h2>{BFHD.title}</h2>
          <FormInput {... BFHD.fields.playerName}/>
        </div>
      );
    }
    
    var profileText = formBlocks.length > 1 ? 'profiles' : 'profile';

    return (
      <div>
        <div className='preamble'>
          <p className='speaking'>Who are you when you play?</p>
        </div>
        <Form id={FORM_ID} className='inner'>
          {formBlocks}
          <FormSubmit className='right' action={this.submitProfiles}>
            Submit
          </FormSubmit>
        </Form>
      </div>
    );
  }
});
