
var React = require('react');
var Answer = require('./Answer.jsx');
var Button = require('./Button.jsx');
var classnames = require('classnames');
var Background = require('./Background.jsx');
var Navigation = require('react-router').Navigation;
var surveyStore = require('../survey/store');
var surveyActions = require('../survey/actions');
var touchdown = require('../services/touchdown');

module.exports = React.createClass({
  displayName: 'QuestionSet',

  mixins: [Navigation],

  getInitialState: function () {
    return {
      current: 0,
      length: surveyStore.getLength(this.props.survey)
    }
  },

  submitQuestion: function (answer) {
    surveyActions.answerQuestion(this.props.survey, this.state.current, answer);

    if (this.state.current < this.state.length - 1) {
      this.next(); 
    } else if (this.props.finalStep) {
      this.goToResults();
    } else {
      this.setState({finished: true});
    }
  },

  goToResults: function () {
    this.transitionTo('profile', {
      profile: surveyStore.getProfileHash()
    });
  },

  nextSection: function () {
    this.transitionTo(this.props.nextRoute);
  },

  begin: function () {
    this.setState({started: true});
  },

  next: function () {
    this.setState({
      current: this.state.current + 1
    });
  },

  prev: function () {
    this.setState({
      current: this.state.current - 1
    });
  },

  render: function () {
    var scale = surveyStore.getSurvey(this.props.survey).scale;
    var question = surveyStore.getQuestion(this.props.survey, this.state.current);
    var hasPrev = this.state.current > 0;
    var hasNext = this.state.current < this.state.length - 1;

    if (this.state.finished) {
      return (
        <Background>
          <div className='up-next'>
            <h6>Part {this.props.surveyIdx}: <em>Complete</em></h6>
            <div className='up-next-title'>
              <strong>up next...</strong>
              <h5>{this.props.nextTitle}</h5>
            </div>
            <Button action={this.nextSection}>Continue</Button>
          </div>
        </Background>
      );
    } else if (this.state.started) {
      return (
        <div className={classnames(
            'question-set-body',
            'inner',
            {answered: !!question.answer}
          )}>
          <div className='question-wrap'>
            <p className='question-text' key={this.state.current}>
              {question.text}
            </p>
          </div>
          <Answer 
            idx={this.state.current}
            selected={question.answer}
            action={this.submitQuestion}
            answers={question.choices}>
          </Answer>
          <div className='question-nav'>
            {hasPrev ? (
              <span className='prev' {... touchdown(this.prev)}>{'<'}</span>
            ) : null}
            {hasPrev || hasNext ? (
              <span className='index'>{this.state.current + 1} of {this.state.length}</span>
            ) : null}
            {hasNext && !!question.answer ? (
              <span className='next' {... touchdown(this.next)}>{'>'}</span>
            ) : null}
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <div className='instructions-body inner'>
            {this.props.children}
            <div className='answerKey'>
              <p className='speaking'>
                Indicate for each of the following statements whether it is:
              </p>
              <ul className='answer-scale'>
                {scale.map(function (answer, idx) {
                  return <li key={idx}><span className='value'>{idx + 1}</span> {answer}</li>
                })}
              </ul>
            </div>
          </div>
          <div className='inner'>
            <Button className='right' action={this.begin}>GOT IT</Button>
          </div>
        </div>
      );
    }
  }
});


