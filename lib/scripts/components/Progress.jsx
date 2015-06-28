
var React = require('react'),
  classnames = require('classnames');

module.exports = React.createClass({
  displayName: 'Progress',

  render: function () {
    return (
      <ul className={classnames('progress-bar', this.props.className)}>
        <li className='progress-dot done'/>
        <li className='progress-dot done'/>
        <li className='progress-dot done'/>
        <li className='progress-dot active'/>
        <li className='progress-dot pending'/>
        <li className='progress-dot pending'/>
      </ul>
    );
  }
});
