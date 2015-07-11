
var React = require('react');
var classnames = require('classnames');

module.exports = React.createClass({
  displayName: 'Background',

  render: function () {
    return (
      <div className={classnames(this.props.className)}>
        <div className='background'/>
        <div className='foreground'>
          {this.props.children}
        </div>
      </div>
    );
  }
});