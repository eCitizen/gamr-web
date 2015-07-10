
var React = require('react/addons'),
  Router = require('react-router'),
  Navigation = Router.Navigation,
  Form = require('./Form.jsx'),
  FormSubmit = require('./FormSubmit.jsx'),
  Title = require('./Title.jsx'),
  classnames = require('classnames'),
  Checkbox = require('./FormCheckbox.jsx'),
  InputStore = require('../input/store'),
  FORM_ID = 'consent',
  Consent;

module.exports = Consent = React.createClass({
  mixins: [Navigation],

  getInitialState: function () {
    return {
      consent: InputStore.getForm(FORM_ID).hasConsented,
      valid: true
    };
  },

  _toggleConsent: function (checked) {
    var newState = {};
    newState.consent = checked;
    if (checked) {
      newState.valid = true;
    }
    this.setState(newState);
  },

  _submitConsent: function (form) {
    if (form.hasConsented) {
      this.transitionTo('games');
    } else {
      this.setState({
        valid: false
      });
    }
  },

  render: function () {
    return (
      <div className='consent-form'>
        <div className='preamble intro'>
          <p className='speaking'>
            <em>Thank you for checking out our research!</em>
          </p>
          <p>
            Below you will find an explanation of what data we want to use in this research and how we will process the data. 
          </p>
        </div>
        <div className='terms push-left'>
          <p>
            Informed Consent
          </p>
          <p>
            For the purpose of our research we will ask you for your age, gender, nationality and level of English comprehension. We will also ask for your player name in one or more of the participating games: League of Legends, Battlefield: Hardline, and World of Warcraft. Your player name will be used to extract data on your game behavior for the relevant game. The game behavior data consists of information on when you play and for how long, and what actions you perform in the game. We will not process any other data from the games or ask you for any sensitive data (such as, without limitation, financial data, chat logs and transcriptions, etc.). By accepting to participate in this research study, you understand and agree that the relevant game company (Riot Games, DICE / Electronic Arts) will share your behavioral data listed above with the research project only for the purpose of the study described above. Data for World of Warcraft will be drawn from the publicly accessible Armory website and will not be shared. If you indicate in the survey that you are a minor (below 18 years of age), then your data will also not be shared.
          </p>
          <p>
            All your data will be kept confidential according to all applicable privacy and security laws and regulations. By submitting your data on this website, you give permission to MIT and Tilburg University to analyze your data for academic research purposes. You also give us permission to share the results of our research and aggregated anonymous data back to the relevant game company that we got the data from (i.e. Riot Games, DICE / Electronic Arts, as applicable) for further research and game design purposes. No one outside these organizations will gain access to your data. Any and all publications that result from this research will report on the data in terms of anonymous groups (aggregate). We will not publish or report on individuals in any manner. We will use the data to advance science and make video games more fun.
          </p>
          <p>
            As commented above — your privacy is important to us. All personal data shall be deleted at the end of the study. Only anonymized and aggregated data may be kept after the end of the study for further research purposes. 
          </p>
          <p>
            We want to remind you that participation in this study is voluntary. You may decline to answer any or all questions. There are no negative consequences to you if you decide not to participate in this study.
          </p>
        </div>
        <Form id={FORM_ID} className='consent-footer'>
          <div className='consent-ok'>
            <Checkbox 
              id='hasConsented'
              action={this._toggleConsent}>
              I declare that I understand the conditions of the research listed above.
            </Checkbox>
          </div>
          <FormSubmit 
            action={this._submitConsent}
            className={classnames({inactive: !this.state.consent})}>
            Continue
          </FormSubmit>
          {this.state.valid ? null : (
            <p className='warning'>
              You must give consent to take the survey
            </p>
          )}
        </Form>
      </div>
    );
  }
});