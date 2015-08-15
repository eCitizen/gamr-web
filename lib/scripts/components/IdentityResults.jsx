
var React = require('react');
var Link = require('react-router').Link;
var Button = require('./Button.jsx');
var Title = require('./Title.jsx');

module.exports = React.createClass({
  displayName: 'IdentityResults',

  getDefaultProps: function () {
    return {
      results: {}
    };
  },

  render: function () {

    var results = [];

    if (this.props.results.LOL) {
      results.push(
        <li key='d'>
          <Title className='result-title'>League of Legends</Title>
          <h6>{this.props.results.LOL.id}</h6>
        </li>
      );
    }

    if (this.props.results.BFHD) {
      results.push(
        <li key='b'>
          <Title className='result-title'>Battlefield: Hardline</Title>
          <h6>{this.props.results.BFHD.id}</h6>
        </li>
      );
    }

    if (this.props.results.BF4) {
      results.push(
        <li key='c'>
          <Title className='result-title'>Battlefield 4</Title>
          <h6>{this.props.results.BF4.id}</h6>
        </li>
      );
    }

    if (this.props.results.WOW) {
      results.push(
        <li key='a'>
          <Title className='result-title'>World of Warcraft</Title>
          <h6>{this.props.results.WOW.id}</h6>
        </li>
      );
    }

    return (
      <div className='inner'>
        <div className='preamble'>
          <p className='speaking'>
            <em>Here is what we found...</em><br/>
          </p>
          Please confirm that these are your accounts
        </div>
        <div>
          <ul className='profile-results'>
            {results}
          </ul>
          <Button className='right' action={this.props.confirm}>Looks Good</Button>
          <p className='small-text'>
            Something missing? <a className='results-change' href='#' onClick={this.props.reset}>Change your information</a>
          </p>
        </div>
      </div>
    );
  }
});