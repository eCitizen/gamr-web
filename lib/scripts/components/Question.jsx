
/** @jsx React.DOM */

var React = require('react/addons'),
  Question;

module.exports = Question = React.createClass({
	submitQuestion: function (answer) {
		this.props.onSubmit(this.props.idx, answer);
	},

	render: function () {
		return (
			<div className='question'>
				<p className='question-text'>{this.props.text}</p>
				<div className='screen-fixed'>
					<ul className='choices'>
						<li onClick={this.submitQuestion.bind(this,'A')}>A</li>
						<li onClick={this.submitQuestion.bind(this,'B')}>B</li>
						<li onClick={this.submitQuestion.bind(this,'C')}>C</li>
					</ul>
				</div>
			</div>
		);
	}
});