
var React = require('react');
var touchdown = require('../services/touchdown');
var classnames = require('classnames');
var brainTypeHelper = require('../services/brainTypeHelper');

var ReadMore = React.createClass({
  displayName: 'ReadMore',

  getInitialState: function () {
    return {
      open: false
    };
  },

  toggle: function (e) {
    e.preventDefault();
    this.setState({
      open: !this.state.open
    });
  },

  render: function () {
    if (this.state.open) {
      return (
        <div className='read-more closed'>
          <a href='#' className='read-more-toggle collapse' {... touchdown(this.toggle)}>read less</a>
          {this.props.children}
          <a href='#' className='read-more-toggle collapse' {... touchdown(this.toggle)}>read less</a>
        </div>
      );
    } else {
      return (
        <div className='read-more open'>
          <a href='#' className='read-more-toggle' {... touchdown(this.toggle)}>read more</a>
        </div>
      );
    }
  }
});

module.exports.ReadPersonality = React.createClass({
  displayName: 'ReadPersonality',

  render: function () {
    var data = this.props.data;

    return (
      <ReadMore>
        <p>
          <em>Openness ({data.Openness})</em> to experience describes appreciation for art, emotion, adventure, unusual ideas, curiosity, and variety of experience. Openness reflects the degree of intellectual curiosity, creativity and a preference for novelty and variety. It also describes the extent to which a person is imaginative or independent, and depicts a personal preference for a variety of activities over a strict routine. If you score low on this dimension you are likely consistent and cautious. If you score high on this dimension you are likely inventive and curious.
        </p>
        <p>
          <em>Conscientiousness ({data.Conscientiousness})</em> describes a tendency to be organized and dependable, show self-discipline, act dutifully, aim for achievement, and prefer planned rather than spontaneous behavior. If you score low on this dimension you are likely easy-going and careless. If you score high on this dimension you are likely efficient and organized.
        </p>
        <p>
          <em>Extraversion ({data.Extraversion})</em> describes a person who is characterized by energy, positive emotions, surgency, assertiveness, sociability, and the tendency to seek stimulation in the company of others, and talkativeness. If you score low on this dimension you are likely to be solitary and reserved. If you score high on this dimension you are likely outgoing and energetic.
        </p>
        <p>
          <em>Agreeableness ({data.Agreeableness})</em> describes the tendency to be compassionate and cooperative rather than suspicious and antagonistic towards others. It is also a measure of one's trusting and helpful nature, and whether a person is generally well tempered or not. If you score low on this dimension you are likely analytical and detached. If you score high on this dimension you are likely friendly and compassionate.
        </p>
        <p>
          <em>Emotional Stability ({data['Emotional Stability']})</em> describes the tendency to not experience unpleasant emotions easily, such as anger, anxiety, depression, and vulnerability. Emotional Stability also refers to the degree of neuroticism and impulse control and is often referred by its high pole, "Neuroticism". If you score low on this dimension you are likely sensitive and nervous. If you score high on this dimension you are likely secure and confident.
        </p>
      </ReadMore>
    );
  }
});

module.exports.ReadGamer = React.createClass({
  displayName: 'ReadGamer',

  render: function () {
    var data = this.props.data;

    return (
      <ReadMore>
        <p>
          Your gamer type describes why you play video games. It is made up of your score on four distinct categories of gaming motivation: Achievement, Social, Immersion, and Arousal. The four letters of your gamer type show if you scored high or low on each of the four categories, while the name of your gamer type is a quirky caricature of your gaming motivations. Each of the four categories is created by adding your scores on one or more of 13 motivational factors. Below is an overview of what the different category letters mean.
        </p>
        <p>
          <em>Achievement</em> <span>
            {data.Achievement === 'G' ? (
              "You are Goal Driven (G)"
            ) : (
              "You are Experience Driven (X)"
            )}
          </span>
        </p>
        <p>
          Achievement motivation describes how much you are driven to achieve the goals set out in the game. Goals can range from winning matches, to overcoming challenges, to collecting and completing everything the game has to offer. If you score low on this motivation, you are likely more experience driven, with little regard for the explicit goals of the game. If you score high on this dimension, you are likely goal driven, with an appreciation for competition and challenge.
        </p>
        <p>
          <em>Social</em> <span>
            {data.Social === 'M' ? (
              "You are a Multiplayer (M)"
            ) : (
              "You are a Single Player (S)"
            )}
          </span>
        </p>
        <p>
          Social motivation describes how much you are driven to engage in social interactions in video games. It only addresses social interactions with other players. An interest in the fictional characters in the game is part of the Immersion motivation. Social motivation can be expressed in a supportive and interactive play behavior (e.g. healing or trading), building up emotional bonds with other players through chat and other communications, and enjoying the synergy of team work. If you score low on this motivation, you likely prefer single-player games, and find the presence of other players uninteresting or annoying. If you score high on this motivation, you likely prefer multi-player games, and find the presence of other players enriching.
        </p>
        <p>
          <em>Immersion</em> <span>
            {data.Immersion === 'F' ? (
              "You prefer Fantasy (F)"
            ) : (
              "You prefer Reality (Y)"
            )}
          </span>
        </p>
        <p>
          Immersion motivation describes how much you are driven to immerse yourself in the fantasy of the game. It ranges from enjoyment of customization options, to appreciation for deep story lines and rich fantasy worlds. If you score low on this motivation, you likely prefer realistic games with little emphasis on story or customization. If you score high on this motivation, you likely prefer rich fantasy worlds with deep story lines and a lot of customization.
        </p>
        <p>
          <em>Arousal</em> <span>
            {data.Arousal === 'E' ? (
              "You prefer Excitement (E)"
            ) : (
              "You prefer Relaxation (R)"
            )}
          </span>
        </p>
        <p>
          Arousal motivation describes how much you are driven to seek out excitement in video games. Fast-paced, action-heavy and/or scary games can get our blood pumping faster. Some people enjoy this experience of excitement and look for it in video games. If you score low on this motivation, you likely either prefer relaxing games or do not find video games get you excited. If you score high on this motivation, you likely prefer fast-paced action games or scary games.
        </p>
      </ReadMore>
    );
  }
});

module.exports.ReadBrain = React.createClass({
  displayName: 'ReadBrain',

  render: function () {
    var data = this.props.data;
    var empScore = brainTypeHelper.getScaledValue(data.Empathizing, 'Empathizing');
    var sysScore = brainTypeHelper.getScaledValue(data.Systemizing, 'Systemizing');

    return (
      <ReadMore>
        <p>
          Brain type is based on Empathizing-Systemizing theory.
        </p>
        <p>
          <em>Empathizing ({Math.floor(empScore)})</em> measures your interest in identifying and understanding the thoughts and feelings of others and responding to these with appropriate emotions.
        </p>
        <p>
          <em>Systemizing ({Math.floor(sysScore)})</em> measures your interest in analyzing and constructing systems. 
        </p>
        <p>
          It has been found that men more often show a higher systemizing score than empathizing score, while women more often show the reverse. Many people show a balanced profile, while a small minority shows an extreme unbalance one way or the other. ‘female’ and ‘extreme female’ brain types occur more often among women, while ‘male’ and ‘extreme male’ brain types occur more often among men. The balanced brain type occurs frequently among both men and women.
        </p>
      </ReadMore>
    );
  }
});
