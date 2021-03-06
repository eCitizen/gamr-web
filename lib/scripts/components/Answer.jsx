
var React = require('react'),
  Button = require('./Button.jsx'),
  classnames = require('classnames'),
  Question;

module.exports = Question = React.createClass({
  render: function () {
    var style = {
      width: (1/this.props.answers.length * 100) + '%'
    };

    var className = classnames(
      'answer', 'center-group', this.props.className, 'answers-'+this.props.answers.length);

    return (
      <div className={className}>
        <ul className='choices middle'>
          {this.props.answers.map(function (answer, idx) {
            return (
              <li key={idx} style={style}>
                <Button 
                  className={classnames({
                    'not-selected': this.props.selected !== undefined && answer !== this.props.selected,
                    'selected': answer === this.props.selected
                  })}
                  action={this.props.action.bind(null,answer)}>
                  {idx + 1}
                </Button>
              </li>
            );
          }.bind(this))}
        </ul>
        <span className='left'>
          <span className='reminder low'>Very<br/>Inaccurate</span>
        </span>
        <span className='right'>
          <span className='reminder high'>Very<br/>Accurate</span>
        </span>
      </div>
    );
  }
});