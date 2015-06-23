
var React = require('react/addons'),
  Nav2;

module.exports = Nav2 = React.createClass({
  render: function () {
    return (
      <div className='nav'>
        <ul className='nav-list level-1'>
          <li className='active'>Identity</li>
          <li className='locked'>Survey</li>
          <li className='locked'>Results</li>
          <li className='home-link'>PROJECT GAMR</li>
        </ul>
        <ul className='nav-list level-2'>
          <li className='finished'>Informed Consent</li>
          <li className='active'>Game Play</li>
          <li className='locked'>Profiles</li>
          <li className='locked'>Background</li>
          <li className='about-link'>[About]</li>
        </ul>
      </div>
    );
  }
});