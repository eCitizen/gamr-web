
var React = require('react');
var State = require('react-router').State;
var Loading = require('./Loading.jsx');
var Button = require('./Button.jsx');
var Grid = require('./Grid.jsx');
var api = require('../services/api');

var surveyStore = require('../survey/store');

module.exports = React.createClass({
  displayName: 'Profile',

  mixins: [State],

  getInitialState: function () {

    // TODO:
    // not sure exactly what representation of what data we want for the final api

    return {
      scores: surveyStore.getScores(),
      profile: surveyStore.decodeProfile(this.getParams().profile),
      formData: surveyStore.getFormData(),
      processed: false,
    };
  },

  componentDidMount: function () {
    api.submitQuestions(this.state.formData, function (err, data) {
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
  },

  render: function () {
    var content;

    // temp override
    if (this.state.processed && this.state.waited) {
      content = (
        <div className='results-wrap'>
          <div className='loud-text'>
            <h4>Thank you for participating!</h4>
            <h5>
              Based on your answers, we created this gamer profile for you.
            </h5>
          </div>

          <div className='col-set'>
            <div className='result-section a'>
              <div className='result-media'>
                <img className='result-media-child' src="http://media.giphy.com/media/19uUmES4K72KI/giphy.gif"/>
              </div>
              <h2>Gamer Type</h2>
              <div className='result-barcode'>
                <span className='code'>
                  <span className='group'><em>G</em>X</span>
                  <span className='group'><em>M</em>S</span>
                  <span className='group'>F<em>Y</em></span>
                  <span className='group'><em>E</em>R</span>
                </span>
              </div>
              <p>
                You are <strong>The Quarterback</strong>
              </p>
              <p>
                You love everything about video games. From deep story telling, to breath-taking action, to hanging out with your friends and getting the highest scores and all the collectibles, you can't get enough of a wide range of games.
              </p>
              <a className='expand-result'>read more</a>
            </div>
            <div className='result-section b'>
              <div className='result-media'>
                <div className='result-media-child'/>
              </div>
              <h2>Personality</h2>
              <div className='result-barcode'>
                <span className='code'>
                  <span className='group'>O<em>10</em></span>
                  <span className='group'>C<em>73</em></span>
                  <span className='group'>F<em>100</em></span>
                  <span className='group'>A<em>81</em></span>
                  <span className='group'>S<em>72</em></span>
                </span>
              </div>
              <p>
                You are <strong>The Quarterback</strong>
              </p>
              <p>
                You love everything about video games. From deep story telling, to breath-taking action, to hanging out with your friends and getting the highest scores and all the collectibles, you can't get enough of a wide range of games.
              </p>
              <a className='expand-result'>read more</a>
            </div>
            <div className='result-section c'>
              <div className='result-media'>
                <div className='result-media-child'/>
              </div>
              <h2>Brain Type</h2>
              <div className='result-barcode'>
                <span className='code'>
                  <span className='group'>E<em>32</em></span>
                  <span className='group'>S<em>72</em></span>
                </span>
              </div>
              <p>
                You are <strong>The Quarterback</strong>
              </p>
              <p>
                You love everything about video games. From deep story telling, to breath-taking action, to hanging out with your friends and getting the highest scores and all the collectibles, you can't get enough of a wide range of games.
              </p>
              <a className='expand-result'>read more</a>
            </div>
          </div>
          <div className='result-social'>
            <Button><span className='fa fa-facebook'/> Share</Button>
            <Button><span className='fa fa-twitter'/> Tweet</Button>
          </div>
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