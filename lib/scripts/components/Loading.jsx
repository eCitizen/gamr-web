
var React = require('react');
var classnames = require('classnames');

module.exports = React.createClass({
  displayName: 'Loading',

  render: function () {
    return (
      <div className={classnames('loading-icon', this.props.className, {active: this.props.active})}>
        <span className='load-dot l-a'/>
        <span className='load-dot l-b'/>
        <span className='load-dot l-c'/>
      </div>
    ); 
  }
});