
var React = require('react/addons');
var assign = require('object-assign');
var Answer = require('./Answer.jsx');
var guide = require('../services/guide');
var InputActions = require('../input/actions');
var InputStore = require('../input/store');
var Navigation = require('react-router').Navigation;
var Button = require('./Button.jsx');
var TRACKING_FIELD = 'currentIdx';
var Box = require('./Box.jsx');
var classnames = require('classnames');
var QuestionSet;

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

    var body = this.state.started ? (
      <div className={classnames(
        'question-set-body',
        'inner',
        {answered: oldAnswer})}>
        <div className='question-wrap'>
          <div className='question-nav'>
            {this.state.hasPrev ? (
              <span className='prev' onClick={this.prev}>{'<'}</span>
            ) : null}
            {this.state.hasNext && oldAnswer ? (
              <span className='next' onClick={this.next}>{'>'}</span>
            ) : null}
          </div>
          <p className='question-text' key={this.state.current}>
            {this.state.questions[this.state.current]}
          </p>
        </div>
        <Answer 
          idx={this.state.current}
          selected={oldAnswer}
          action={this.submitQuestion}
          answers={[1,2,3,4,5]}>
        </Answer>
      </div>
    ) : (
      <div>
        <div className='instructions-body'>
          {this.props.children}
        </div>
        <div className='inner'>
          <Button action={this.begin}>GOT IT</Button>
        </div>
      </div>
    );

    return (
      <div>
        {body}
      </div>
    );
  }
});