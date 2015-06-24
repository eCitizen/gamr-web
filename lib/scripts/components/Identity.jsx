var React = require('react/addons'),
  Router = require('react-router'),
  Navigation = Router.Navigation,
  guide = require('../services/guide'),
  Form = require('./Form.jsx'),
  FormSelect = require('./FormSelect.jsx'),
  FormInput = require('./FormInput.jsx'),
  FormSubmit = require('./FormSubmit.jsx'),
  Title = require('./Title.jsx'),
  InputStore = require('../input/store'),
  FORM_ID = 'identity',
  Identity;
  

module.exports = Identity = React.createClass({
  mixins: [Navigation],

  submitProfiles: function (form) {
    setTimeout(function () {
      console.log('submit profiles', form);
      this.transitionTo('bio');
    }.bind(this),200);
  },

  toggleGame: function (gameKey, checked) {
    var state = {};
    state[gameKey] = checked;
    this.setState(state);
  },

  render: function () {
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
    
    // var title = formBlocks.length > 1 ? 'PROFILES' : 'PROFILE';

    return (
      <div>
        <Form id={FORM_ID}>
          {formBlocks}
          <FormSubmit className='right' action={this.submitProfiles}>
            Submit
          </FormSubmit>
        </Form>
      </div>
    );
  }
});

