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

  render: function () {
    var wow = guide.identity.WOW,
      lol = guide.identity.LOL,
      bhfd = guide.identity.BFHD,
      bio = guide.identity.BIO,
      lang = guide.identity.LANG;

    var range = bio.fields.year.range,
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

        // view = (
        //   <Question
        //     answers={['no','yes']}
        //     action={this.forkView('LOL','DO_U_WOW')}>
        //     Do you play {lol.title}?
        //   </Question>
        // );
        // break;

        view = (
          <div>
            <p className='question-body'>
              Do you play {lol.title}?
            </p>
            <Button
              className='yes-no'
              action={this.goToView.bind(this,'DO_U_WOW')}>
              No
            </Button>
            <Button 
              className='yes-no'
              action={this.goToView.bind(this,'LOL')}>
              Yes
            </Button>
          </div>
        );
        break;

      case 'LOL':
        view = (
          <div className='form-block'>
            <h2>{lol.title}</h2>
            <FormInput {... lol.fields.sommonerName}/>
            <FormSelect {... lol.fields.region}/>
            <FormSelect {... lol.fields.preferredLane}/>
            <FormSelect {... lol.fields.preferredRole}/>
          </div>
        );
        break;

      default:
        view = <div/>;
    }

    return (
      <div className='screen-scroll'>
        <Title className='section'>Identity</Title>
        <Form id='identity'>{view}</Form>
      </div>
    );
  }
});


// <div className='form-block'>
//   <h2>{wow.title}</h2>
//   <FormInput {... wow.fields.characterName}/>
//   <FormSelect {... wow.fields.region}/>
//   <FormSelect {... wow.fields.realm}/>
// </div>
// <div className='form-block'>
//   <h2>{bhfd.title}</h2>
//   <FormInput {... bhfd.fields.playerName}/>
// </div>
// <div className='form-block'>
//   <h2>{bio.title}</h2>
//   <FormSelect required={false} {... bio.fields.gender}/>
//   <FormSelect required={false} {... bio.fields.month}/>
//   <FormSelect required={false} {... bio.fields.year} options={years}/>
// </div>
// <div className='form-block'>
//   <h2>{lang.title}</h2>
//   <FormSelect required={false} {... lang.fields.country}/>
//   <FormSelect required={false} {... lang.fields.level}/>
// </div>
// <FormSubmit action={this.submit}/>