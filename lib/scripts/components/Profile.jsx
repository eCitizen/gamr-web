
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
var TwitterButton = require('./TwitterButton.jsx');
var FacebookButton = require('./FacebookButton.jsx');
var brainTypeHelper = require('../services/brainTypeHelper');

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
    // HACK: ... get rid of warning
    window.onbeforeunload = function () {
      // noop
    }

    if (this.state.isOwner) {
      // TEMPORARY!!!!!!
      // require('../services/createCSV')();
      // TEMPORARY!!!!!!
      
      // api.submitQuestions({surveys: this.state.plainformData}, function (err, data) {
      api.submitQuestions(this.state.plainformData, function (err, data) {
        // console.info('Api Response');
        // console.log(JSON.stringify(data, null, 2));

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
            var value = (survey === 'personality') ? 
              profile[survey][axis.title] :
              brainTypeHelper.getScaledValue(profile[survey][axis.title], axis.title);
            return (
              <span className='group' key={axis.key}>
                {axis.key}<em>{Math.round(value)}</em> 
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
                <img className="profile-media-child" src={guide.assets + '/images/' + gamerDescription.image}/>
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
            <ReadGamer data={profile.gamerType}/>
          </div>

          <div className='profile-section'>
            <div className="profile-media star-plot-wrap">
              <div className="profile-media-box">
                <div className='profile-media-child'>
                  <StarPlot data={profile.personality}/>
                </div>
              </div>
            </div>
            <h2 className="profile-title">Personality</h2>
            <div className='result-barcode'>{getScaleBareCode('personality')}</div>
            <p>
              Your personality is described in terms of the Big Five personality test. The Big Five is one of the most strongly supported personality models at moment, and is frequently used for psychological screening at a variety of jobs. Higher scores are not better or worse than lower scores. Different scores simply describe different personality profiles. Below you can read more about each of the personality dimensions.
            </p>
            <ReadPersonality data={profile.personality}/>
          </div>

          <div className='profile-section'>
            <div className="profile-media brain-chart-wrap">
              <div className="profile-media-box">
                <div className='profile-media-child'>
                  <BrainChart {... profile.brainType}/>
                </div>
              </div>
            </div>
            <h2 className="profile-title">Brain Type</h2>
            <div className='result-barcode'>{getScaleBareCode('brainType')}</div>
            <p>
              Your brain type is <strong>{
                brainTypeHelper.getBrainType(profile.brainType.Systemizing, profile.brainType.Empathizing)
              }</strong>
            </p>
            <p>
              Brain type relates to, but is seperate from, physical gender. There are five types: extreme female, female, balanced, male, and extreme male. All five brain types occur among both men and women, but in different proportions. Most men and women have a balanced brain type, with fewer people having a male or female brain type, and small a minority having the extreme male and female brain type. 
            </p>
            <ReadBrain data={profile.brainType}/>
          </div>
  
          {this.state.isOwner ? (
            <div className='result-social'>
              <TwitterButton text={'I am ' + gamerDescription.title + '. Who are you?'}/>
              <FacebookButton 
                text={'I am ' + gamerDescription.title}
                image={guide.socialAssets + '/' + gamerDescription.share}/>
            </div>
          ) : (
            <div className='result-social'>
              <p className='invitation'>Want to find out your own profile?</p>
              <Button linkTo="home">Take the survey</Button>
              <p className='end-footnote'>
                Project Gamr is part of a scientific study being conducted by MIT Media Lab and Tilburg University
              </p>
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
