
var React = require('react'),
  classnames = require('classnames');

module.exports = React.createClass({
  displayName: 'Progress',

  getDefaultProps: function () {
    return {
      current: 0,
      length: 4 
    };
  },

  render: function () {
    var current = this.props.current;
    var dots = [], i, dotClass;

    for (i = 0; i < this.props.length; i += 1) {
      dotClass = classnames('progress-dot', {
        'active': current === i,
        'done': current > i,
        'pending': current < i
      });
      dots.push(<li className={dotClass} key={i}/>);
    }

    return (
      <ul className={classnames('progress-bar', this.props.className)}>
        {dots}
      </ul>
    );
  }
});
