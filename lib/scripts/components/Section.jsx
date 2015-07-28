

var React = require('react'),
  QuestionSet = require('./QuestionSet.jsx');

module.exports.BrainType = React.createClass({
  displayName: 'BrainType',
  render: function () {
    return (
      <QuestionSet 
        survey='brainType'
        surveyIdx='1'
        nextRoute='personality'
        nextTitle='Personality'>
        <h4 className='directions-title'>Instructions</h4>
        <div className='directions'>
          <p>
            Describe yourself as you generally are now, not as you wish to be in the future.
          </p>
          <p>
            Describe yourself as you honestly see yourself, in relation to other people you know of the same sex as you are, and roughly your same age.
          </p>
        </div>
        <div className='answerKey'>
          <p className='speaking'>
            Indicate for each of the following statements whether it is:
          </p>
          <ul className='inner'>
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
      <QuestionSet 
        survey='personality'
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
        <div className='answerKey'>
          <p className='speaking'>
            Indicate for each of the following statements whether it is:
          </p>
          <ul className='inner'>
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

module.exports.GamerType = React.createClass({
  displayName: 'GamerType',
  render: function () {
    return (
      <QuestionSet 
        survey='gamerType'
        nextRoute='results'
        finalStep={true}>
        <h4 className='directions-title'>Instructions</h4>
        <div className='directions'>
          <p>
            Describe yourself as you generally are now, not as you wish to be in the future.
          </p>
          <p>
            Describe yourself as you honestly see yourself, in relation to other people you know of the same sex as you are, and roughly your same age.
          </p>
        </div>
        <div className='answerKey'>
          <p className='speaking'>
            Indicate for each of the following statements whether it is:
          </p>
          <ul className='inner'>
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