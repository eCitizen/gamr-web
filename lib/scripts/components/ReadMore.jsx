
var React = require('react');

var ReadMore = React.createClass({
  displayName: 'ReadMore',

  getInitialState: function () {
    return {
      open: false
    };
  },

  toggle: function () {
    this.setState({
      open: !this.state.open
    });
  },

  render: function () {
    if (this.state.open) {
      return (
        <div>
          <a className='expand-result collapse' onClick={this.toggle}>read less</a>
          {this.props.children}
        </div>
      );
    } else {
      return (
        <div>
          <a className='expand-result' onClick={this.toggle}>read more</a>
        </div>
      );
    }
  }
});

module.exports.ReadPersonality = React.createClass({
  displayName: 'ReadPersonality',

  render: function () {
    return (
      <ReadMore>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla faucibus, ipsum vitae sodales tristique, augue quam bibendum risus, at molestie lorem est eget tortor. Pellentesque non ipsum in nibh laoreet scelerisque. Sed tempus quam enim, a viverra orci vehicula in. Curabitur vel bibendum mauris. Suspendisse ultrices turpis neque, ac iaculis est lacinia a. Proin feugiat dui metus, sed ultrices nulla semper ac. Morbi imperdiet ipsum in egestas lobortis.
        </p>
      </ReadMore>
    );
  }
});

module.exports.ReadGamer = React.createClass({
  displayName: 'ReadGamer',

  render: function () {
    return (
      <ReadMore>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla faucibus, ipsum vitae sodales tristique, augue quam bibendum risus, at molestie lorem est eget tortor. Pellentesque non ipsum in nibh laoreet scelerisque. Sed tempus quam enim, a viverra orci vehicula in. Curabitur vel bibendum mauris. Suspendisse ultrices turpis neque, ac iaculis est lacinia a. Proin feugiat dui metus, sed ultrices nulla semper ac. Morbi imperdiet ipsum in egestas lobortis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla faucibus, ipsum vitae sodales tristique, augue quam bibendum risus, at molestie lorem est eget tortor. Pellentesque non ipsum in nibh laoreet scelerisque. Sed tempus quam enim, a viverra orci vehicula in. Curabitur vel bibendum mauris. Suspendisse ultrices turpis neque, ac iaculis est lacinia a. Proin feugiat dui metus, sed ultrices nulla semper ac. Morbi imperdiet ipsum in egestas lobortis.
        </p>
      </ReadMore>
    );
  }
});

module.exports.ReadBrain = React.createClass({
  displayName: 'ReadBrain',

  render: function () {
    return (
      <ReadMore>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla faucibus, ipsum vitae sodales tristique, augue quam bibendum risus, at molestie lorem est eget tortor. Pellentesque non ipsum in nibh laoreet scelerisque. Sed tempus quam enim, a viverra orci vehicula in. Curabitur vel bibendum mauris. Suspendisse ultrices turpis neque, ac iaculis est lacinia a. Proin feugiat dui metus, sed ultrices nulla semper ac. Morbi imperdiet ipsum in egestas lobortis.
        </p>
      </ReadMore>
    );
  }
});
