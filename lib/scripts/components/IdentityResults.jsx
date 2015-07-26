
var React = require('react');
var Link = require('react-router').Link;
var Button = require('./Button.jsx');
var Title = require('./Title.jsx');

module.exports = React.createClass({
  displayName: 'IdentityResults',

  render: function () {
    return (
      <div className='inner'>
        <div className='preamble'>
          <p className='speaking'>
            <em>Here is what we found...</em><br/>
          </p>
          Please confirm that these are your profiles
        </div>

        <div>
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
          <Link className='results-confirm' to="brain">
            <Button>Looks Good</Button>
          </Link>
          <p className='small-text'>
            Something missing? <a className='results-change' href='#' onClick={this.props.reset}>Change your information</a>
          </p>
        </div>
      </div>
    );
  }
});