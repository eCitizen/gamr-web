
var React = require('react'),
  Router = require('react-router'),
  Navigation = Router.Navigation,
  Form = require('./Form.jsx'),
  FormSubmit = require('./FormSubmit.jsx'),
  Title = require('./Title.jsx'),
  classnames = require('classnames'),
  Checkbox = require('./FormCheckbox.jsx'),
  InputStore = require('../input/store'),
  FORM_ID = 'consent',
  Grid = require('./Grid.jsx'),
  Consent;

var errorSvc = require('../services/error');

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
      this.transitionTo('identity');
    } else {
      errorSvc.create({
        title: 'Sorry',
        message: 'The survey is only open to participants who consent to the conditions stated above.'
      });
    }
  },

  render: function () {
    return (
      <Grid>
        <div className='consent-form'>
          <div className='preamble intro'>
            <p className='speaking'>
              <em>We're serious about the quality of our research, so here is a serious consent form.</em>
            </p>
            <p>
              We want this research to be as good as it can be, and a good research project starts with treating you and your data professionally. This Informed Consent puts all the facts on the table. Give it a good read and let's continue on to the fun stuff!
            </p>
          </div>
          <div className='terms'>
            <h6>
              Informed Consent
            </h6>
            <p>
              For the purpose of our research we will ask you for your age, gender, nationality, level of English comprehension (demographic data) and to complete some psychometric tests. We will also ask for your player name in one or more of the participating games: League of Legends, Battlefield: Hardline, Battlefield 4, and World of Warcraft. Your player name will be used by the game company (Riot Games, Electronic Arts Inc.) producing the relevant game to extract data on your game behavior for the relevant game and to share such game behavior data with MIT Media Lab (MIT) and Tilburg University (UvT) for research purposes only.
            </p>
            <p>
              The game behavior data consists of information on when you play and for how long, your levels and game modes played, what actions you perform in the game, your score/rank, and details of any items you have unlocked in game. We will not be given access to any other data from the games or ask you for any sensitive data (such as, without limitation, financial data, chat logs and transcriptions, etc.).
            </p>
            <p>
              By agreeing to participate in this research study, you understand and agree that the relevant game company (Riot Games, Electronic Arts Inc.) will share your game behavior data listed above with MIT and UvT. Data for World of Warcraft will be drawn from the publicly accessible Armory website (i.e. will not be shared by Blizzard). If you are a minor (below 18 years of age), then you are not eligible to participate in the research. You can fill out the tests to see your results but your data will not become part of the research and will be deleted.  The relevant games company will not share any data about minors with UvT and MIT.
            </p>
            <p>
              All your data will be kept confidential according to all applicable privacy and security laws and regulations.
            </p>
            <p>
              By submitting your data on this website, you give permission to MIT and UvT to analyze your data for academic research purposes. You also give us permission to share the results of our research and (aggregated) anonymous data back to the relevant game company that we received the data from (i.e. Riot Games, Electronic Arts Inc., as applicable) for their further research and game design purposes. No one outside these organizations will gain access to your personal data. Any and all publications that result from this research will report on the data in terms of anonymous groups (aggregate). We will not publish or report on individuals in any manner. We will use the data to advance science and make video games more fun.
            </p>
            <p>
              As commented above – your privacy is important to us. MIT and UvT will delete participants’ player names at the end of the study. Only anonymized and aggregated data will be kept after the end of the study for further research and game design purposes as explained above.
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
                I declare that I understand the conditions of the research explained above, and I agree to my game behavior data being shared by the relevant games company with MIT and UvT, and my demographics and psychometric data being shared and processed by the relevant games company, MIT, and UvT as described above.
              </Checkbox>
            </div>
            <FormSubmit 
              action={this._submitConsent}
              className={classnames({inactive: !this.state.consent})}>
              Continue
            </FormSubmit>
          </Form>
        </div>
      </Grid>
    );
  }
});