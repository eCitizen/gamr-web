

var React = require('react/addons'),
  QuestionSet = require('./QuestionSet.jsx');

module.exports.BrainType = React.createClass({
  displayName: 'BrainType',
  render: function () {
    return (
      <QuestionSet survey='brainType' nextRoute='personality'>
        <div className='push-in'>
          <p>
            Describe yourself as you generally are now, not as you wish to be in the future.
          </p>
          <p>
            Describe yourself as you honestly see yourself, in relation to other people you know of the same sex as you are, and roughly your same age.
          </p>
        </div>
        <div className='answerKey'>
          <p className='flashy'>
            Indicate for each of the following statements whether it is:
          </p>
          <ul className='push-in'>
            <li><span className='value'>1</span> Very Inaccurate</li>
            <li><span className='value'>2</span> Moderately Inaccurate</li>
            <li><span className='value'>3</span> Neither Accurate Nor Inaccurate</li>
            <li><span className='value'>4</span> Moderately Accurate</li>
            <li><span className='value'>5</span> Very Accurate</li>
          </ul>
        </div>
      </QuestionSet>
    );
  }
});

module.exports.Personality = React.createClass({
  displayName: 'Personality',
  render: function () {
    return (
      <QuestionSet survey='personality' nextRoute='gamer-type'/>
    );
  }
});

module.exports.GamerType = React.createClass({
  displayName: 'GamerType',
  render: function () {
    return (
      <QuestionSet survey='gamerType' nextRoute='reward'/>
    );
  }
});