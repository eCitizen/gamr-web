var React = require('react'),
  Router = require('react-router'),
  Navigation = Router.Navigation,
  guide = require('../services/guide'),
  Form = require('./Form.jsx'),
  FormSubmit = require('./FormSubmit.jsx'),
  Title = require('./Title.jsx'),
  Checkbox = require('./FormCheckbox.jsx'),
  Grid = require('./Grid.jsx'),
  Identity;

var gameKeys = ['LOL','WOW','BFHD'],
  FORM_ID = 'games';

module.exports = Identity = React.createClass({
  mixins: [Navigation],

  submitGames: function (form) {
    console.log('submit games', form);
    this.transitionTo('profile');
  },

  render: function () {
    return (
      <Grid>
        <div className='inner'>
          <div className='preamble'>
            <p className='speaking'>Which of the following do you play?</p>
          </div>
          <Form id={FORM_ID}>
            <div className='check-group'>
              {gameKeys.map(function (gameKey) {
                return (
                  <Checkbox
                    key={gameKey}
                    id={gameKey}>
                    {guide.identity[gameKey].title}
                  </Checkbox>
                );
              })}
            </div>
            <FormSubmit action={this.submitGames}>
              Continue
            </FormSubmit>
          </Form>
        </div>
      </Grid>
    );
  }
});

