
var React = require('react');
var Link = require('react-router').Link;
var Button = require('./Button.jsx');
var Video = require('./Video.jsx');

module.exports = React.createClass({
  displayName: 'Explainer',

  render: function () {
    return (
      <div className='intro-body'>
        <div className='intro-body-inner'>
          <div className='intro-social'>
            <i className='fa fa-twitter'/>
            <i className='fa fa-facebook-official'/>
          </div>

          <p>
            What does your play style say about you?
          </p>

          <Video/>

          <p>
            The Playful Systems group at MIT Media Lab has teamed up with Tilburg University to study how personality relates to gameplay.
          </p>
          <p>
            We are asking players to participate in a three-part survey about their personality, brain type, and gamer type. If you play one or more of the following, you may be elligible!
          </p>

          <p className='schools'>MIT Media Lab <span className='plus'>+</span> Tilburg University</p>

          <Link className='start-button' to="consent">
            <Button>Start</Button>
          </Link>

          

          
          
          <p className='footnote'>
            To participate, you must play one or more of the folllowing:<br/> League of Legends, Battlefield: Hardline, Battlefield 4, or World of Warcraft.
          </p>
        </div>
      </div>
    );
  }
});
