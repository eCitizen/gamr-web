
var React = require('react/addons');
var Link = require('react-router').Link;
var Button = require('./Button.jsx');

module.exports = React.createClass({
  displayName: 'IdentityResults',

  render: function () {
    return (
      <div>
        <p className='preamble'>
          Thanks! Here is what we found<br/>
          Please confirm that these are your profiles
        </p>
        <div className='inner'>
          <ul className='profile-results'>
            <li>
              <h4>World of Warcraft</h4>
              <h6>Player Name</h6>
            </li>
          </ul>
          <Link to="bio">
            <Button>Looks Good</Button>
          </Link>
          <p>
            Something missing? <Link to='games'>Change your information</Link>
          </p>
        </div>
      </div>
    );
  }
});