var React = require('react/addons'),
  Router = require('react-router'),
  Navigation = Router.Navigation,
  guide = require('../services/guide'),
  Form = require('./Form.jsx'),
  FormSubmit = require('./FormSubmit.jsx'),
  Title = require('./Title.jsx'),
  Checkbox = require('./FormCheckbox.jsx'),
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
      <div>
        <Form id={FORM_ID}>
          <p className='preamble'>
            Which of the following do you play?
          </p>
          <div className='check-group push-in'>
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
          <FormSubmit className='push-in' action={this.submitGames}>
            Continue
          </FormSubmit>
        </Form>
      </div>
    );
  }
});

