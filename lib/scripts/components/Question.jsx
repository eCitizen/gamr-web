
/** @jsx React.DOM */

var React = require('react/addons'),
	Button = require('./Button.jsx'),
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
						<li onClick={this.submitQuestion.bind(this,'A')}><Button>1</Button></li>
						<li onClick={this.submitQuestion.bind(this,'B')}><Button>2</Button></li>
						<li onClick={this.submitQuestion.bind(this,'C')}><Button>3</Button></li>
						<li onClick={this.submitQuestion.bind(this,'C')}><Button>4</Button></li>
						<li onClick={this.submitQuestion.bind(this,'C')}><Button>5</Button></li>
					</ul>
				</div>
			</div>
		);
	}
});