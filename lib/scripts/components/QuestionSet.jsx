
/** @jsx React.DOM */

var React = require('react/addons'),
	Router = require('react-router'),
	assign = require('object-assign'),
	Question = require('./Question.jsx'),
	guide = require('../services/guide'),
	InputActions = require('../input/actions'),
	TransitionGroup = React.addons.CSSTransitionGroup,
	Navigation = Router.Navigation,
  QuestionSet;

module.exports = QuestionSet = React.createClass({
	mixins: [Navigation],

	getInitialState: function () {
		var survey = guide.survey[this.props.survey];
		InputActions.createForm(survey.id);
		return assign({
			current: 0,
			finished: false,
			started: false
		}, survey);
	},

	submitQuestion: function (idx, answer) {
		// submit answer
		InputActions.updateField(this.state.id, this.state.id+idx, answer);
		if (this.state.current < this.state.questions.length - 1) {
			this.setState({
				current: this.state.current + 1
			});
		} else {
			this.transitionTo(this.props.nextRoute);
		}
	},

	begin: function () {
		this.setState({
			started: true
		});
	},

	render: function () {
		if (!this.state.started) {
			return (
				<div>
					<h1>{this.state.title}</h1>
					<p>{this.state.instructions}</p>
					<div onClick={this.begin}>Begin</div>
				</div>
			);
		} else {
			return (
				<div className='question-set'>
					<h3>{this.state.title}</h3>
					<div className='question-wrap'>
						<TransitionGroup component='div' transitionName='question-change'>
							<Question 
								text={this.state.questions[this.state.current]}
								key={this.state.current} 
								idx={this.state.current}
								onSubmit={this.submitQuestion}/>
						</TransitionGroup>
					</div>
				</div>
			);
		}
	}
});