

var React = require('react'),
  QuestionSet = require('./QuestionSet.jsx');

module.exports.BrainType = React.createClass({
  displayName: 'BrainType',
  render: function () {
    return (
      <QuestionSet 
        survey='brainType'
        surveyIdx='2'
        nextRoute='gamer-type'
        nextTitle='Gamer Type'>
        <h4 className='directions-title'>Instructions</h4>
        <div className='directions'>
          <p>
            Describe yourself as you generally are now, not as you wish to be in the future.
          </p>
          <p>
            Describe yourself as you honestly see yourself, in relation to other people you know of the same sex as you are, and roughly your same age.
          </p>
        </div>
      </QuestionSet>
    );
  }
});

module.exports.Personality = React.createClass({
  displayName: 'Personality',
  
  render: function () {
    return (
      <QuestionSet 
        survey='personality'
        surveyIdx='1'
        nextRoute='brain'
        nextTitle='Brain Type'>
        <h4 className='directions-title'>Instructions</h4>
        <div className='directions'>
          <p>
            Describe yourself as you generally are now, not as you wish to be in the future.
          </p>
          <p>
            Describe yourself as you honestly see yourself, in relation to other people you know of the same sex as you are, and roughly your same age.
          </p>
        </div>
      </QuestionSet>
    );
  }
});

module.exports.GamerType = React.createClass({
  displayName: 'GamerType',
  render: function () {
    return (
      <QuestionSet 
        survey='gamerType'
        surveyIdx='3'
        nextRoute='results'
        finalStep={true}>
        <h4 className='directions-title'>Instructions</h4>
        <div className='directions'>
          <p>
            Describe what you generally enjoy about playing video games.
          </p>
        </div>
      </QuestionSet>
    );
  }
});