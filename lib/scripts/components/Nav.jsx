/** @jsx React.DOM */

var React = require('react/addons'),
  Router = require('react-router'),
  Title = require('./Title.jsx'),
  AboutStore = require('../AboutStore/AboutStore.jsx').Store,
  AboutActions = require('../AboutStore/AboutStore.jsx').Actions,
  Link = Router.Link,
  Nav;

module.exports = Nav = React.createClass({
  getInitialState: function () {
    return {
      about: AboutStore.get()
    };
  },

  componentDidMount: function () {
    AboutStore.addChangeListener(this.handleAbout);
  },

  componentWillUnount: function () {
    AboutStore.removeChangeListener(this.handleAbout);
  },

  handleAbout: function () {
    this.setState({
      about: AboutStore.get()
    });
  },

  toggleAbout: function () {
    if (this.state.about) {
      AboutActions.close();
    } else {
      AboutActions.open();
    }
  },

  render: function () {
    return (
      <div className='navigation'>
        <Link to='home' className='nav-title-wrap'>
          <Title className='nav-title-sub' separator='.'>PROJECT</Title>
          <Title className='nav-title' separator='.'>GAMR</Title>
        </Link>

        <div className='social'>
          <span className='about-link' onClick={this.toggleAbout}>
            {this.state.about ? 'close' : '/ about'}
          </span>
        </div>
      </div>
    );
  }
});