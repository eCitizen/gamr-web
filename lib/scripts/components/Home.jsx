/** @jsx React.DOM */

var React = require('react/addons'),
  Router = require('react-router'),
  RouteHandler = Router.RouteHandler,
  Nav = require('./Nav2.jsx'),
  About = require('./About.jsx'),
  AboutStore = require('../AboutStore/AboutStore.jsx').Store,
  classnames = require('classnames'),
  Home;

module.exports = Home = React.createClass({
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

  render: function () {
    return (
      <div className={classnames('screen', {'about-open': this.state.about})}>
        <Nav/>
        <div className='content'>
          <RouteHandler {... this.props}/>
        </div>
        <About/>
      </div>
    );
  }
});