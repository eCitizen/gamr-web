
var React = require('react');

var ReadMore = React.createClass({
  displayName: 'ReadMore',

  getInitialState: function () {
    return {
      open: false
    };
  },

  toggle: function () {
    this.setState({
      open: !this.state.open
    });
  },

  render: function () {
    if (this.state.open) {
      return (
        <div className='read-more closed'>
          <a className='expand-result collapse' onClick={this.toggle}>read less</a>
          {this.props.children}
          <a className='expand-result collapse' onClick={this.toggle}>read less</a>
        </div>
      );
    } else {
      return (
        <div className='read-more open'>
          <a className='expand-result' onClick={this.toggle}>read more</a>
        </div>
      );
    }
  }
});

module.exports.ReadPersonality = React.createClass({
  displayName: 'ReadPersonality',

  render: function () {
    return (
      <ReadMore>
        <p>
          Your personality is described in terms of the Big Five personality test. The Big Five is one of the most strongly supported personality models at moment, and is frequently used for psychological screening at a variety of jobs. Higher scores are not better or worse than lower scores. Different scores simply describe different personality profiles.
        </p>
        <p>
          <em>Openness</em> to experience describes appreciation for art, emotion, adventure, unusual ideas, curiosity, and variety of experience. Openness reflects the degree of intellectual curiosity, creativity and a preference for novelty and variety. It also describes the extent to which a person is imaginative or independent, and depicts a personal preference for a variety of activities over a strict routine. If you score low on this dimension you are likely consistent and cautious. If you score high on this dimension you are likely inventive and curious.
        </p>
        <p>
          <em>Conscientiousness</em> describes a tendency to be organized and dependable, show self-discipline, act dutifully, aim for achievement, and prefer planned rather than spontaneous behavior. If you score low on this dimension you are likely easy-going and careless. If you score high on this dimension you are likely efficient and organized.
        </p>
        <p>
          <em>Extraversion</em> describes a person who is characterized by energy, positive emotions, surgency, assertiveness, sociability, and the tendency to seek stimulation in the company of others, and talkativeness. If you score low on this dimension you are likely to be solitary and reserved. If you score high on this dimension you are likely outgoing and energetic.
        </p>
        <p>
          <em>Agreeableness</em> describes the tendency to be compassionate and cooperative rather than suspicious and antagonistic towards others. It is also a measure of one's trusting and helpful nature, and whether a person is generally well tempered or not. If you score low on this dimension you are likely analytical and detached. If you score high on this dimension you are likely friendly and compassionate.
        </p>
        <p>
          <em>Emotional</em> stability describes the tendency to not experience unpleasant emotions easily, such as anger, anxiety, depression, and vulnerability. Emotional Stability also refers to the degree of neuroticism and impulse control and is often referred by its high pole, "Neuroticism". If you score low on this dimension you are likely sensitive and nervous. If you score high on this dimension you are likely secure and confident.
        </p>
      </ReadMore>
    );
  }
});

module.exports.ReadGamer = React.createClass({
  displayName: 'ReadGamer',

  render: function () {
    return (
      <ReadMore>
        <p>
          Your gamer type describes your motivations to play video games. There are three main categories of motivation: Social, Achievement, and Immersion. Each category consists of 4 or 5 factors, to make a total of 12 motivations. There is a 13th motivation that lies outside of these categories. Researchers call it "arousal", but in regular English we would call it "excitement". Below you will find your average score on each category of motivation, as well as your exact score on each individual motivation.
        </p>
        <p>
          Todo...
        </p>
      </ReadMore>
    );
  }
});

module.exports.ReadBrain = React.createClass({
  displayName: 'ReadBrain',

  render: function () {
    return (
      <ReadMore>
        <p>
          Brain type is based on Empathizing-Systematizing theory.
        </p>
        <p>
          <em>Empathizing</em> measures your interest in identifying and understanding the thoughts and feelings of others and responding to these with appropriate emotions.
        </p>
        <p>
          <em>Systematizing</em> measures your interest in analyzing and constructing systems. 
        </p>
        <p>
          It has been found that men more often show a higher systemating score than empathizing score, while women more often show the reverse. Many people show a balanced profile, while a small minority shows an extreme unbalance one way or the other. 'female' and 'extreme female' brain types occur more often among women, while 'male' and 'extreme male' brain type occur more often among men. The balanced brain type occurs frequently among both men and women.
        </p>
        <p>
          {'Brain type relates to, but is seperate from, physical gender. All five brain types (E>>S, E>S, E=S, E<S, E<<S) occur among both men and women, but in different proportions. Brain type has been found to be a better predictor then physical gender of who chooses a career in Science, Technology, Engineering, and Mathematics.'}
        </p>
      </ReadMore>
    );
  }
});
