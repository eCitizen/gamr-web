
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

var IdentityResults = require('./IdentityResults.jsx');
var validateIdentity = require('../validators/identity');
var FORM_ID = 'identity';

var errors = {
  'notFound': {
    title: 'Sorry',
    message: 'We could not find any of your profiles'
  },
  'reserved': {
    title: 'Sorry',
    message: 'It looks like this profile has been used before'
  },
  'default': {
    title: 'Sorry',
    message: 'Something went wrong'
  },
  'invalid': {
    title: 'Sorry',
    message: 'You must complete all required fields'
  }
}

module.exports = React.createClass({
  displayName: 'Identity',

  getInitialState: function () {
    return  {
      profileResults: null,
      invalidFields: []
    }
  },

  submitProfiles: function (form) {
    this.setState({submitted: true});

    var formError = validateIdentity(form);

    if (formError && formError.invalidFields) {
      this.setState({
        invalidFields: formError.invalidFields,
        invalid: true
      });
      return this.displayUserError('invalid');
    } else if (formError) {
      this.setState({
        invalid: [],
        submitted: true
      });
      return this.displayUserError(formError);
    } else {
      this.setState({
        loading: true,
        invalid: false
      });
    }

    

    api.getUser(form, function (err, results) {
      if (err) return this.displayUserError(err);

      this.setState({
        profileResults: results,
        loading: false
      });
    }.bind(this));
  },

  displayUserError: function (err) {
    this.setState({
      loading: false
    });

    var errConfig = errors[err] || errors.default;

    errorSvc.create(errConfig);
  },

  reset: function(e) {
    e.preventDefault();
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
              <h5>Brain Type</h5>
            </div>
            <Link to="brain">
              <Button>Begin</Button>
            </Link>
          </div>
        </Background>
      );
    } else if (this.state.profileResults) {
      console.log(this.state.profileResults);
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

    var invalidFields = this.state.invalidFields;
    var invalid = this.state.invalid;
    console.log(invalid);
    function validateField(value, key) {
      console.log('validate', key, value, invalidFields);
      if (!invalid) return true;
      // console.log('vvalidate', invalidFields, key);
      return false;
    }

    var background = (
      <div>
          <div className='form-block'>
            <h2>{BIO.title}</h2>
            <FormSelect {... BIO.fields.gender} validate={validateField}/>
            <FormSelect {... BIO.fields.year} options={years} validate={validateField}/>
            <FormSelect {... BIO.fields.month} validate={validateField}/>
          </div>
          <div className='form-block'>
            <h2>{LANG.title}</h2>
            <FormSelect {... LANG.fields.country} validate={validateField}/>
            <FormSelect {... LANG.fields.level} validate={validateField}/>
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

        <Form id={FORM_ID} className={classnames('inner', {'submitted': this.state.submitted})}>

          <h4 className='directions-title'>Personal Profile</h4>

          {background}

          <h4 className='directions-title'>Gamer Profile(s)</h4>
          <h6 className='directions-note'>You must fill out at least one game profile</h6>
          
          <div>
            {formBlocks}
          </div>

          <div className='inner'>
            <Loading className='left' active={this.state.loading}/>
            <FormSubmit className='right' action={this.submitProfiles}>
              Submit
            </FormSubmit>
          </div>
        </Form>
      </Grid>
    );
  }
});
