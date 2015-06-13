/** @jsx React.DOM */

var React = require('react/addons'),
  Router = require('react-router'),
  Title = require('./Title.jsx'),
  Link = Router.Link,
  Nav;

module.exports = Nav = React.createClass({
  render: function () {
    return (
      <div className='navigation'>
        <Link to='home' className='nav-title-wrap'>
          <Title className='nav-title-sub' separator='.'>PROJECT</Title>
          <Title className='nav-title' separator='.'>GAMR</Title>
        </Link>

        <div className='social'>
          <span className='about-link'>about</span>
          <i className="fa fa-twitter"></i>
          <i className="fa fa-facebook-official"></i>
        </div>
      </div>
    );
  }
});