
var React = require('react');
var assign = require('object-assign');
var Answer = require('./Answer.jsx');
var guide = require('../services/guide');
var InputActions = require('../input/actions');
var InputStore = require('../input/store');
var Navigation = require('react-router').Navigation;
var Button = require('./Button.jsx');
var TRACKING_FIELD = 'currentIdx';
var classnames = require('classnames');
var Background = require('./Background.jsx');

module.exports = React.createClass({
  displayName: 'QuestionSet',

  mixins: [Navigation],

  getInitialState: function () {
    InputActions.createForm(this.props.survey);
    var survey = guide.survey[this.props.survey];
    var currentIdx = 0;

    return assign({
      current: currentIdx,
      started: currentIdx > 0,
      hasPrev: currentIdx > 0,
      finished: currentIdx >= survey.questions.length - 1, // TODO: 
      hasNext: currentIdx < survey.questions.length - 1
    }, survey);
  },

  _makeId: function (idx, id) {
    id = id || this.state.id;
    return id + idx;
  },

  submitQuestion: function (answer) {
    InputActions.updateField(this.props.survey,  this._makeId(this.state.current), answer);
    var nextIdx = this.state.current + 1;
    InputActions.updateField(this.props.survey, TRACKING_FIELD, nextIdx);
    if (this.state.current < this.state.questions.length - 1) {
      this.next();
    } else if (this.props.finalStep) {
      this.goToResults();
    } else {
      this.setState({
        finished: true
      });
    }
  },

  goToResults: function () {
    this.transitionTo('profile');
  },

  nextSection: function () {
    this.transitionTo(this.props.nextRoute);
  },

  begin: function () {
    this.setState({
      started: true
    });
  },

  next: function () {
    var nextIdx = this.state.current + 1;
    this.setState({
      current: nextIdx,
      hasNext: nextIdx < this.state.questions.length - 1,
      hasPrev: nextIdx > 0
    });
  },

  prev: function () {
    var nextIdx = this.state.current - 1;
    this.setState({
      current: nextIdx,
      hasNext: nextIdx < this.state.questions.length - 1,
      hasPrev: nextIdx > 0
    });
  },

  render: function () {
    var oldAnswer = InputStore.getField(this.props.survey, this._makeId(this.state.current));
    var answers = this.state.scale.map(function (answer, idx) {
      return idx + 1;
    });

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
          {answered: oldAnswer})}>
          <div className='question-wrap'>
            <p className='question-text' key={this.state.current}>
              {this.state.questions[this.state.current]}
            </p>
          </div>
          <Answer 
            idx={this.state.current}
            selected={oldAnswer}
            action={this.submitQuestion}
            answers={answers}>
          </Answer>
          <div className='question-nav'>
            {this.state.hasPrev ? (
              <span className='prev' onClick={this.prev}>{'<'}</span>
            ) : null}
            {this.state.hasPrev || this.state.hasNext ? (
              <span className='index'>{this.state.current + 1} of {this.state.questions.length}</span>
            ) : null}
            {this.state.hasNext && oldAnswer ? (
              <span className='next' onClick={this.next}>{'>'}</span>
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
                {this.state.scale.map(function (answer, idx) {
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
