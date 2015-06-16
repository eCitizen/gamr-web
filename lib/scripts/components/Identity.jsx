var React = require('react/addons'),
  Router = require('react-router'),
  Navigation = Router.Navigation,
  guide = require('../services/guide'),
  Form = require('./Form.jsx'),
  FormSelect = require('./FormSelect.jsx'),
  FormInput = require('./FormInput.jsx'),
  FormSubmit = require('./FormSubmit.jsx'),
  Title = require('./Title.jsx'),
  Button = require('./Button.jsx'),
  Checkbox = require('./FormCheckbox.jsx'),
  Identity;

var gameKeys = ['LOL','WOW','BFHD'],
  FORM_ID = 'identity';

module.exports = Identity = React.createClass({
  mixins: [Navigation],

  getInitialState: function () {
    return {
      view: 'GAME_CHECK'
    };
  },

  goToView: function (view) {
    this.setState({
      view: view
    });
  },

  submitProfiles: function (form) {
    setTimeout(function () {
      console.log('submit profiles',form);
      this.transitionTo('bio');
    }.bind(this),200);
  },

  toggleGame: function (gameKey, checked) {
    var state = {};
    state[gameKey] = checked;
    this.setState(state);
  },

  render: function () {
    var WOW = guide.identity.WOW,
      LOL = guide.identity.LOL,
      BFHD = guide.identity.BFHD;

    var view;
    switch (this.state.view) {
      case 'GAME_CHECK':
        view = (
          <div>
            <p className='question-text'>
              Which of the following do you play?
            </p>
            <div className='check-group'>
              {gameKeys.map(function (gameKey) {
                return (
                  <Checkbox
                    key={gameKey}
                    action={this.toggleGame.bind(this,gameKey)}>
                    {guide.identity[gameKey].title}
                  </Checkbox>
                );
              }.bind(this))}
            </div>
            <Button action={this.goToView.bind(this,'PROFILES')}>
              Continue
            </Button>
          </div>
        );
        break;

      case 'PROFILES':
        var formBlocks = [];
        if (this.state.LOL) {
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
        if (this.state.WOW) {
          formBlocks.push(
            <div className='form-block' key='b'>
              <h2>{WOW.title}</h2>
              <FormInput {... WOW.fields.characterName}/>
              <FormSelect {... WOW.fields.region}/>
              <FormSelect {... WOW.fields.realm}/>
            </div>
          );
        }
        if (this.state.BFHD) {
          formBlocks.push(
            <div className='form-block' key='c'>
              <h2>{BFHD.title}</h2>
              <FormInput {... BFHD.fields.playerName}/>
            </div>
          );
        }
        view = (
          <div>
            {formBlocks}
            <FormSubmit action={this.submitProfiles}>
              Submit
            </FormSubmit>
          </div>
        );
        break;

      default:
        throw new Error('bad view: ' + this.state.view);
    }

    return (
      <div className='screen-scroll'>
        <Title className='section'>Identity</Title>
        <Form id={FORM_ID}>{view}</Form>
      </div>
    );
  }
});

