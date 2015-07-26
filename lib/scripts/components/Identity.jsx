var React = require('react');
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
var Grid = require('./Grid.jsx');

module.exports = React.createClass({
  displayName: 'Identity',

  statics: {
    // willTransitionTo: function (transition, params, query, callback) {
    //   var i = 0, k;
    //   for (k in InputStore.getForm('games')) { 
    //     i += 1; 
    //   }
    //   if (i === 0) transition.redirect('games');
    //   callback();
    // }
  },

  getInitialState: function () {
    return  {
      profileResults: null
    }
  },

  submitProfiles: function (form) {
    setTimeout(function () {
      console.log('submit profiles', form);

      // TODO this is a real call
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

    var games = InputStore.getForm('games');
    var WOW = guide.identity.WOW;
    var LOL = guide.identity.LOL;
    var BFHD = guide.identity.BFHD;
    var BIO = guide.identity.BIO;
    var LANG = guide.identity.LANG;
    var formBlocks = [];

    var range = BIO.fields.year.range,
      years = [], 
      y;

    for (y = range[0]; y >= range[1]; y -= 1) {
      years.push({
        label: y,
        value: y
      });
    }

    var background = (
      <div>
          <div className='form-block'>
            <h2>{BIO.title}</h2>
            <FormSelect required={false} {... BIO.fields.gender}/>
            <FormSelect required={false} {... BIO.fields.year} options={years}/>
            <FormSelect required={false} {... BIO.fields.month}/>
          </div>
          <div className='form-block'>
            <h2>{LANG.title}</h2>
            <FormSelect required={false} {... LANG.fields.country}/>
            <FormSelect required={false} {... LANG.fields.level}/>
          </div>
      </div>
    );

    if (games.LOL || true) {
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

    if (games.WOW || true) {
      formBlocks.push(
        <div className='form-block' key='b'>
          <h2>{WOW.title}</h2>
          <FormInput {... WOW.fields.characterName}/>
          <FormSelect {... WOW.fields.region}/>
          <FormSelect {... WOW.fields.realm}/>
        </div>
      );
    }

    if (games.BFHD || true) {
      formBlocks.push(
        <div className='form-block' key='c'>
          <h2>{BFHD.title}</h2>
          <FormInput {... BFHD.fields.playerName}/>
        </div>
      );
    }
    
    var profileText = formBlocks.length > 1 ? 'profiles' : 'profile';

    return (
      <Grid>
        <div className='preamble intro'>
          <p className='speaking'>
            <em>Before getting started...</em>
          </p>
          <p>
            We need some basic information about you
          </p>
        </div>

        <Form id={FORM_ID} className='inner'>

          <h4 className='directions-title'>Personal Profile</h4>

          {background}

          <h4 className='directions-title'>Gamer Profile</h4>
          
          <div>
            {formBlocks}
          </div>

         

          <div className='inner'>
            <FormSubmit className='right' action={this.submitProfiles}>
              Submit
            </FormSubmit>
          </div>
        </Form>
      </Grid>
    );
  }
});
