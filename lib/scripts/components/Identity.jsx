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
  Question = require('./Question.jsx'),
  Checkbox = require('./FormCheckbox.jsx'),
  Identity;

module.exports = Identity = React.createClass({
  mixins: [Navigation],

  getInitialState: function () {
    return {
      view: 'DO_U_LOL'
    };
  },

  submit: function (form) {
    console.log('submit', form);
    setTimeout(function () {
      this.transitionTo('brain');
    }.bind(this), 500);
  },

  goToView: function (view) {
    this.setState({
      view: view
    });
  },

  forkView: function (yesView, noView) {
    return function (answer) {
      if (answer === 'yes') {
        this.goToView(yesView);
      } else {
        this.goToView(noView);
      }
    }.bind(this);
  },

  toggleGame: function (gameKey, checked) {
    var state = {};
    state[gameKey] = checked;
    this.setState(state);
  },

  render: function () {
    var WOW = guide.identity.WOW,
      LOL = guide.identity.LOL,
      BFHD = guide.identity.BFHD,
      BIO = guide.identity.BIO,
      LANG = guide.identity.LANG;

    var gameKeys = ['LOL','WOW','BFHD'];

    var range = BIO.fields.year.range,
      years = [], 
      y;

    for (y = range[0]; y >= range[1]; y -= 1) {
      years.push({
        label: y,
        value: y
      });
    }

    var view;
    switch (this.state.view) {
      case 'DO_U_LOL':
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
            <Button action={this.goToView.bind(this,'LOL')}>Continue</Button>
          </div>
        );
        break;

      case 'LOL':
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
            <Button action={this.goToView.bind(this,'BIO')}>Submit</Button>
          </div>
        );
        break;

      case 'DO_U_WOW':
        view = (
          <Question
            className='yes-no'
            answers={['no','yes']}
            action={this.forkView('WOW','DO_U_BFHD')}>
            Do you play {WOW.title}?
          </Question>
        );
        break;

      case 'WOW':
        view = (
          <div className='form-block'>
            <h2>{WOW.title}</h2>
            <FormInput {... WOW.fields.characterName}/>
            <FormSelect {... WOW.fields.region}/>
            <FormSelect {... WOW.fields.realm}/>
            <Button action={this.goToView.bind(this,'DO_U_BFHD')}>Continue</Button>
          </div>
        );
        break;

      case 'DO_U_BFHD':
        view = (
          <Question
            className='yes-no'
            answers={['no','yes']}
            action={this.forkView('BFHD','BIO')}>
            Do you play {BFHD.title}?
          </Question>
        );
        break;

      case 'BFHD':
        view = (
          <div className='form-block'>
            <h2>{BFHD.title}</h2>
            <FormInput {... BFHD.fields.playerName}/>
            <Button action={this.goToView.bind(this,'BIO')}>Continue</Button>
          </div>
        );
        break;

      case 'BIO':
        view = (
          <div>
            <div className='form-block'>
              <h2>{BIO.title}</h2>
              <FormSelect required={false} {... BIO.fields.gender}/>
              <FormSelect required={false} {... BIO.fields.month}/>
              <FormSelect required={false} {... BIO.fields.year} options={years}/>
            </div>
            <div className='form-block'>
              <h2>{LANG.title}</h2>
              <FormSelect required={false} {... LANG.fields.country}/>
              <FormSelect required={false} {... LANG.fields.level}/>
            </div>
            <Button action={this.goToView.bind(this,'END')}>Continue</Button>
          </div>
        );
        break;

      default:
        view = <FormSubmit action={this.submit}/>;
    }

    return (
      <div className='screen-scroll'>
        <Title className='section'>Identity</Title>
        <Form id='identity'>{view}</Form>
      </div>
    );
  }
});

