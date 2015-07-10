
var React = require('react/addons');
var Link = require('react-router').Link;
var Button = require('./Button.jsx');
var Title = require('./Title.jsx');

module.exports = React.createClass({
  displayName: 'IdentityResults',

  render: function () {
    return (
      <div>
        <div className='preamble'>
          <p className='speaking'>
            Thank you! <em>Here is what we found...</em><br/>
            Please confirm that these are your profiles
          </p>
        </div>

        <div className='inner'>
          <ul className='profile-results'>
            <li>
              <Title className='result-title'>World of Warcraft</Title>
              <h6>Player Name</h6>
            </li>
            <li>
              <Title className='result-title'>Battlefield: Hardline</Title>
              <h6>Player Name</h6>
            </li>
          </ul>
          <Link className='results-confirm' to="bio">
            <Button>Looks Good</Button>
          </Link>
          <p className='small-text'>
            Something missing? <Link className='results-change' to='games'>Change your information</Link>
          </p>
        </div>
      </div>
    );
  }
});