
var React = require('react'),
  classnames = require('classnames');

module.exports = React.createClass({
  displayName: 'Progress',

  render: function () {
    return (
      <div className={classnames('glow-wrap')}>
        <div className='glow-shadow'/>
        <div className={classnames('glow-box', this.props.className)}>
          {this.props.children}
        </div>
      </div>
    );
  }
});
