
var api = require('../services/api');
var Grid = require('./Grid.jsx');
var Form = require('./Form.jsx');
var guide = require('../services/guide');
var React = require('react');
var FormInput = require('./FormInput.jsx');
var FormSelect = require('./FormSelect.jsx');
var FormSubmit = require('./FormSubmit.jsx');
var InputStore = require('../input/store');
var IdentityResults = require('./IdentityResults.jsx');

var FORM_ID = 'identity';

module.exports = React.createClass({
  displayName: 'Identity',

  getInitialState: function () {
    return  {
      profileResults: null
    }
  },

  submitProfiles: function (form) {
    api.getUser(form, function (err, results) {
      console.log(results);
    }.bind(this));

    // setTimeout(function () {
    //   console.log('submit profiles', form);



    //   // TODO this is a real call
    //   this.setState({
    //     profileResults: {
    //       WOW: {
    //         name: 'Player' 
    //       }
    //     }
    //   });

    // }.bind(this),200);
  },

  reset: function(e) {
    e.preventDefault();
    this.setState({
      profileResults: null
    });
  },

  render: function () {
    if (this.state.profileResults) {
      return (
        <Grid>
          <IdentityResults results={this.state.profileResults} reset={this.reset}/>
        </Grid>
      );
    }

    var games = InputStore.getForm('games');
    var WOW = guide.identity.WOW;
    var LOL = guide.identity.LOL;
    var BFHD = guide.identity.BFHD;
    var BF4 = guide.identity.BF4;
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

    if (games.BF4 || true) {
      formBlocks.push(
        <div className='form-block' key='d'>
          <h2>{BF4.title}</h2>
          <FormInput {... BF4.fields.playerName}/>
        </div>
      );
    }
    
    var profileText = formBlocks.length > 1 ? 'profiles' : 'profile';

    return (
      <Grid>
        <div className='preamble inner'>
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

          <h4 className='directions-title'>Gamer Profile(s)</h4>
          
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
