
/** @jsx React.DOM */

var React = require('react/addons'),
  QuestionSet;

module.exports = QuestionSet = React.createClass({
	getInitialState: function () {
		return {
			idx: 0
		};
	},

	submitQuestion: function (answer) {
		console.log('Question', this.state.idx, 'is', answer);
		this.setState({
			idx: this.state.idx + 1
		});
	},

	render: function () {
		return (
			<div>
				<p>Question {this.state.idx}</p>
				<ul className='choices'>
					<li onClick={this.submitQuestion.bind(this,'A')}>A</li>
					<li onClick={this.submitQuestion.bind(this,'B')}>B</li>
					<li onClick={this.submitQuestion.bind(this,'C')}>C</li>
				</ul>
			</div>
		);
	}
});