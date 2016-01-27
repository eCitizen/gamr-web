var api = require('../services/api');
var Grid = require('./Grid.jsx');
var Form = require('./Form.jsx');
var Link = require('react-router').Link;
var React = require('react');
var guide = require('../services/guide');
var Button = require('./Button.jsx');
var Loading = require('./Loading.jsx');
var errorSvc = require('../services/error');
var FormInput = require('./FormInput.jsx');
var classnames = require('classnames');
var FormSelect = require('./FormSelect.jsx');
var FormSubmit = require('./FormSubmit.jsx');
var InputStore = require('../input/store');
var Background = require('./Background.jsx');
var getFormErrors = require('../validators/identity');
var IdentityResults = require('./IdentityResults.jsx');
var FORM_ID = 'identity';

module.exports = React.createClass({
  displayName: 'Identity',

  getInitialState: function () {
    return  {
      profileResults: null,
      attempts: 0
    }
  },

  submitProfiles: function (form) {
    if (this.state.loading) return; // prevent double submit!

    var formErrors = getFormErrors(form);

    if (formErrors.invalidFields.length > 0 ||
      formErrors.invalidGamerProfiles.length === 4) {

      this.setState({
        submitted: true,
        formErrors: formErrors
      });

      return this.displayUserError({
        title: 'Sorry',
        message: 'You must complete all required fields'
      });
    }

    this.setState({loading: true});

    function (results) {
      this.setState({
        profileResults: results,
        loading: false
      });
    }.bind(this));

  },

  handleChange: function (form) {
    this.setState({
      formErrors: getFormErrors(form)
    });
  },

  displayUserError: function (err) {
    this.setState({
      loading: false
    });

    errorSvc.create({
      title: err.title || 'Sorry',
      message: err.message || 'Something went wrong'
    });
  },

  reset: function(e) {
    if (e && e.preventDefault) e.preventDefault();
    this.setState({
      profileResults: null
    });
  },

  confirm: function() {
    this.setState({
      confirmed: true
    });
  },

  render: function () {
    if (this.state.confirmed) {
      return (
        <Background>
          <div className='up-next'>
            <h6>Identity: <em>Complete</em></h6>
            <div className='up-next-title'>
              <strong>up next...</strong>
              <h5>Personality</h5>
            </div>
            <Button linkTo="personality">Begin</Button>
          </div>
        </Background>
      );
    } else if (this.state.profileResults) {
      return (
        <Grid>
          <IdentityResults results={this.state.profileResults} reset={this.reset} confirm={this.confirm}/>
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

    var invalidFields = this.state.formErrors && this.state.formErrors.invalidFields;
    var submitted = this.state.submitted;
    function validateField(field) {
      return submitted ? classnames({
        invalid: invalidFields.indexOf(field) !== -1
      }) : true;
    }

    var background = (
      <div>
          <div className='form-block'>
            <h2>{BIO.title}</h2>
            <FormSelect {... BIO.fields.gender} className={validateField('gender')}/>
            <FormSelect {... BIO.fields.year} options={years} className={validateField('birth_year')}/>
            <FormSelect {... BIO.fields.month} className={validateField('birth_month')}/>
          </div>
          <div className='form-block'>
            <h2>{LANG.title}</h2>
            <FormSelect {... LANG.fields.country} className={validateField('country')}/>
            <FormSelect {... LANG.fields.level} className={validateField('english_lvl')}/>
          </div>
      </div>
    );

    if (games.LOL || true) {
      formBlocks.push(
        <div className='form-block' key='a'>
          <h2>{LOL.title}</h2>
          <FormInput {... LOL.fields.summonerName}/>
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

    var noteClass = classnames(
      'directions-note',
      {
        invalid: this.state.submitted &&
          this.state.formErrors.invalidGamerProfiles.length === 4
      }
    );

    return (
      <Grid>
        <div className='preamble inner'>
          <p className='speaking'>
            <em>Your information</em>
          </p>
          <p>
            Please tell us a little about yourself
          </p>
        </div>

        <Form
          id={FORM_ID}
          className='inner'
          onChange={this.handleChange}
          onSubmit={this.submitProfiles}>

          {background}

          <h4 className='directions-title'>Game Account(s)</h4>
          <h6 className={noteClass}>
            You must fill out at least one game profile
          </h6>

          <div>
            {formBlocks}
          </div>

          <div className='inner'>
            <Loading className='left' active={this.state.loading}/>
            <FormSubmit className='right'>Submit</FormSubmit>
          </div>
        </Form>
      </Grid>
    );
  }
});
