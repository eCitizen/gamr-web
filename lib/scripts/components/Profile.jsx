
var React = require('react');
var BrainChart = require('./BrainChart.jsx');
var StarPlot = require('./StarPlot.jsx');
var State = require('react-router').State;
var Link = require('react-router').Link;
var Loading = require('./Loading.jsx');
var Button = require('./Button.jsx');
var Grid = require('./Grid.jsx');
var api = require('../services/api');
var surveyStore = require('../survey/store');
var surveyKey = require('../services/surveyKey');
var guide = require('../services/guide');
var ReadPersonality = require('./ReadMore.jsx').ReadPersonality;
var ReadGamer = require('./ReadMore.jsx').ReadGamer;
var ReadBrain = require('./ReadMore.jsx').ReadBrain;

module.exports = React.createClass({
  displayName: 'Profile',

  mixins: [State],

  getInitialState: function () {
    // HACK ATTACK:
    // if they have completed the last survey they are the owner
    var isOwner = surveyStore.isComplete('gamerType');
    return {
      isOwner: isOwner,
      processed: !isOwner,
      waited: !isOwner,
      scores: surveyStore.getScores(),
      profile: surveyStore.decodeProfile(this.getParams().profile),
      plainformData: surveyStore.getPlainFormData()
    };
  },

  componentDidMount: function () {
    if (this.state.isOwner) {
      api.submitQuestions({survey: JSON.stringify(this.state.plainformData)}, function (err, data) {
        console.info('Api Response');
        console.log(JSON.stringify(data, null, 2));

        this.setState({
          processed: true
        });
      }.bind(this));

      setTimeout(function () {
        this.setState({
          waited: true
        });
      }.bind(this), 2000);

      process.nextTick(function () {
        this.setState({
          loadingIcon: true
        })
      }.bind(this))
    }
  },

  render: function () {
    var content;
    var profile = this.state.profile;
    var gamerDescription = guide.gamerTypes[profile.gamerTypeKey];

    function getGameBarcode() {
      return (
        <span className='code'>
          {surveyKey.gamerType.map(function (axis) {
            return (
              <span className='group' key={axis.title}>
                {axis.options.map(function (option) {
                  return profile.gamerType[axis.title] === option ? 
                    <em key={option}>{option}</em> : 
                    <span key={option}>{option}</span>;
                })}
              </span>
            )
          })}
        </span>
      );
    }

    function getScaleBareCode(survey) {
      return (
        <span className='code'>
          {surveyKey[survey].map(function (axis) {
            return (
              <span className='group' key={axis.key}>
                {axis.key}<em>{profile[survey][axis.title]}</em> 
              </span>
            )
          })}
        </span>
      );
    }

    // temp override
    if (this.state.processed && this.state.waited) {
      content = (
        <div className='profile-wrap'>
          <div className='profile-section'>
            <div className="profile-media">
              <div className="profile-media-box">
                <img className="profile-media-child" src="http://localhost:8000/assets/images/giphy-01.gif"/>
              </div>
            </div>
            <h2 className="profile-title">Gamer Type</h2>
            <div className='result-barcode'>{getGameBarcode()}</div>
            <p>
              You are <strong>{gamerDescription.title}</strong>
            </p>
            <p>
              {gamerDescription.description}
            </p>
            <ReadGamer/>
          </div>

          <div className='profile-section'>
            <div className="profile-media">
              <div className="profile-media-box">
                <div className='profile-media-child'>
                  <StarPlot data={profile.personality}/>
                </div>
              </div>
            </div>
            <h2 className="profile-title">Personality</h2>
            <div className='result-barcode'>{getScaleBareCode('personality')}</div>
            <p>
              You have a personality, and we have something to say.
            </p>
            <p>
              {gamerDescription.description}
            </p>
            <ReadPersonality/>
          </div>

          <div className='profile-section'>
            <div className="profile-media">
              <div className="profile-media-box">
                <div className='profile-media-child'>
                  <BrainChart/>
                </div>
              </div>
            </div>
            <h2 className="profile-title">Brain Type</h2>
            <div className='result-barcode'>{getScaleBareCode('brainType')}</div>
            <p>
              Your brain is like squishy or something.
            </p>
            <p>
              {gamerDescription.description}
            </p>
            <ReadBrain/>
          </div>
  
          {this.state.isOwner ? (
            <div className='result-social'>
              <Button><span className='fa fa-facebook'/> Share</Button>
              <Button><span className='fa fa-twitter'/> Tweet</Button>
            </div>
          ) : (
            <div className='result-social'>
              {/* <p className='invitation'>Find out your profile</p> */}
              <Link to='home'><Button>Take the survey</Button></Link>
            </div>
          )}
        </div>
      );
    } else {
      content = (
        <Grid>
          <div className='loading-profile'>
            <h5>Creating Your Profile</h5>
            <Loading active={this.state.loadingIcon}/>
          </div>
        </Grid>
      );
    }
    return content;
  }
});