
var React = require('react/addons'),
  Button = require('./Button.jsx'),
  classnames = require('classnames'),
  Question;

module.exports = Question = React.createClass({
  render: function () {
    var style = {
      width: (1/this.props.answers.length * 100) + '%'
    };

    return (
      <div className={classnames('answer', 'center-group', this.props.className)}>
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
                  {answer}
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