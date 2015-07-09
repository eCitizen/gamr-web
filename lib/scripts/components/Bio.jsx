var React = require('react/addons'),
  Router = require('react-router'),
  Navigation = Router.Navigation,
  Form = require('./Form.jsx'),
  FormSelect = require('./FormSelect.jsx'),
  FormSubmit = require('./FormSubmit.jsx'),
  Title = require('./Title.jsx'),
  guide = require('../services/guide'),
  BioComponent;

var FORM_ID = 'bio';

module.exports = BioComponent = React.createClass({
  mixins: [Navigation],

  submitBio: function (form) {
    console.log('submit', form);
    this.transitionTo('brain');
  },

  render: function () {
    var BIO = guide.identity.BIO,
      LANG = guide.identity.LANG;

    var range = BIO.fields.year.range,
      years = [], 
      y;

    for (y = range[0]; y >= range[1]; y -= 1) {
      years.push({
        label: y,
        value: y
      });
    }

    return (
      <div>
        <p className='preamble' style={{marginBottom: 50}}>
          And now a bit of information about yourself...
        </p>
        <Form id={FORM_ID} className='inner'>
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
          <FormSubmit className='right' action={this.submitBio}>
            Submit
          </FormSubmit>
        </Form>
      </div>
    );
  }
});

