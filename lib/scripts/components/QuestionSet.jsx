
/** @jsx React.DOM */

var React = require('react/addons'),
  Router = require('react-router'),
  assign = require('object-assign'),
  Question = require('./Question.jsx'),
  guide = require('../services/guide'),
  InputActions = require('../input/actions'),
  InputStore = require('../input/store'),
  TransitionGroup = React.addons.CSSTransitionGroup,
  Navigation = Router.Navigation,
  Title = require('./Title.jsx'),
  Button = require('./Button.jsx'),
  TRACKING_FIELD = 'currentIdx',
  QuestionSet;

module.exports = QuestionSet = React.createClass({
  mixins: [Navigation],

  getInitialState: function () {
    InputActions.createForm(this.props.survey);
    var survey = guide.survey[this.props.survey];
    var currentIdx = InputStore.getField(this.props.survey, TRACKING_FIELD) || 0;

    return assign({
      current: currentIdx,
      started: currentIdx > 0,
      hasPrev: currentIdx > 0,
      finished: currentIdx < survey.questions.length - 1,
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
    } else {
      this.transitionTo(this.props.nextRoute);
    }
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
    var className = 'question-set-body';

    var body = this.state.started ? (
      <div className={className}>
        <div className='question-wrap'>
          <TransitionGroup component='div' transitionName='question-change'>
            <Question 
              key={this.state.current} 
              idx={this.state.current}
              selected={oldAnswer}
              action={this.submitQuestion}
              answers={[1,2,3,4,5]}>
              {this.state.questions[this.state.current]}
            </Question>
          </TransitionGroup>
        </div>
        <div className='question-nav'>
          { this.state.hasPrev ? <span onClick={this.prev}>prev</span> : null }
          { this.state.hasNext && oldAnswer ? <span onClick={this.next}>next</span> : null }
        </div>
      </div>
    ) : (
      <div className={className}>
        <div className='instructions-body'>{this.props.children}</div>
        <Button action={this.begin}>GOT IT</Button>
      </div>
    );

    return (
      <div>
        <Title className='small'>Part 1 of 3</Title>
        <Title className='section'>{this.state.title}</Title>
        {body}
      </div>
    );
  }
});