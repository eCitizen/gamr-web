
/** @jsx React.DOM */

var React = require('react/addons'),
	Router = require('react-router'),
	assign = require('object-assign'),
	Question = require('./Question.jsx'),
	guide = require('../services/guide'),
	InputActions = require('../input/actions'),
	TransitionGroup = React.addons.CSSTransitionGroup,
	Link = Router.Link,
  QuestionSet;

module.exports = QuestionSet = React.createClass({
	getInitialState: function () {
		var survey = guide.survey[this.props.survey];
		InputActions.createForm(survey.id);
		return assign({
			current: 0
		}, survey);
	},

	submitQuestion: function (idx, answer) {
		// submit answer
		InputActions.updateField(this.state.id, this.state.id+idx, answer);
		this.setState({
			current: this.state.current + 1
		});
	},

	render: function () {
		return (
			<div>
				<TransitionGroup component='div' transitionName='question-change'>
					<Question 
						text={this.state.questions[this.state.current]}
						key={this.state.current} 
						idx={this.state.current}
						onSubmit={this.submitQuestion}/>
				</TransitionGroup>
				<Link to={this.props.nextRoute}>Next</Link>
			</div>
		);
	}
});