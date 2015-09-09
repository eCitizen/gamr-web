
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

  getErrorMessage: function (status) {
    if (status === 'taken') {
      return <p className="result-error">Sorry, this account has alread been used.</p>;
    } else if (status === 'missing') {
      return <p className="result-error">Sorry, we could not find data about this account.</p>;
    } else {
      return null;
    }
  },

  render: function () {

    var results = [];

    if (this.props.results.LOL) {
      results.push(
        <li key='d'>
          <Title className='result-title'>League of Legends</Title>
          <h6 className={this.props.results.LOL.status}>
            {this.props.results.LOL.name}
          </h6>
          {this.getErrorMessage(this.props.results.LOL.status)}
        </li>
      );
    }

    if (this.props.results.BFHD) {
      results.push(
        <li key='b'>
          <Title className='result-title'>Battlefield: Hardline</Title>
          <h6 className={this.props.results.BFHD.status}>
            {this.props.results.BFHD.name}
          </h6>
          {this.getErrorMessage(this.props.results.BFHD.status)}
        </li>
      );
    }

    if (this.props.results.BF4) {
      results.push(
        <li key='c'>
          <Title className='result-title'>Battlefield 4</Title>
          <h6 className={this.props.results.BF4.status}>
            {this.props.results.BF4.name}
          </h6>
          {this.getErrorMessage(this.props.results.BF4.status)}
        </li>
      );
    }

    if (this.props.results.WOW) {
      results.push(
        <li key='a'>
          <Title className='result-title'>World of Warcraft</Title>
          <h6 className={this.props.results.WOW.status}>
            {this.props.results.WOW.name}
          </h6>
          {this.getErrorMessage(this.props.results.WOW.status)}
        </li>
      );
    }

    // more hacks :(
    var isValid = (this.props.results.WOW && this.props.results.WOW.status === 'good') || 
                  (this.props.results.BF4 && this.props.results.BF4.status === 'good') || 
                  (this.props.results.BFHD && this.props.results.BFHD.status === 'good') || 
                  (this.props.results.LOL && this.props.results.LOL.status === 'good');

    return (
      <div className='inner identity-results'>
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
          {isValid ? (
            <div>
              <Button className='right' action={this.props.confirm}>Looks Good</Button>
              <p className='small-text'>
                Something missing? <a className='results-change' href='#' onClick={this.props.reset}>Change your information</a>
              </p>
            </div>
          ) : (
            <div>
              <p className="result-fatal-error">You must submit at least one valid account.</p>
              <Button action={this.props.reset}>Change your information</Button>
            </div>
          )}
        </div>
      </div>
    );
  }
});