
var React = require('react'),
  Title = require('./Title.jsx'),
  AboutStore = require('../AboutStore/AboutStore.jsx').Store,
  AboutActions = require('../AboutStore/AboutStore.jsx').Actions,
  About;

module.exports = About = React.createClass({
  getInitialState: function () {
    return {
      about: AboutStore.get()
    };
  },

  componentDidMount: function () {
    AboutStore.addChangeListener(this.handleAbout);
  },

  componentWillUnount: function () {
    AboutStore.removeChangeListener(this.handleAbout);
  },

  handleAbout: function () {
    this.setState({
      about: AboutStore.get()
    });
  },

  toggleAbout: function () {
    if (this.state.about) {
      AboutActions.close();
    } else {
      AboutActions.open();
    }
  },

  render: function () {
    if (!this.state.about) {
      return null;
    }
    return (
      <div className='about'>
        <span className='about-close' onClick={this.toggleAbout}>
          return <span className='arr'>↖</span>
        </span>
        <Title className='about-title' separator='.'>About Us</Title>
        <div className='about-body'>
          <p className='about-intro'>
            Project Game And Mind Research (G.A.M.R.) is a research collaboration between academia and industry. The Playfull Systems group at the MIT Media Lab, and the Games Group at the University of Tilburg are working together with Riot Games and DICE / Electronic Arts to discover the connections between our cognitive traits and our video game behavior. The results from this research will be published in peer-reviewed, academic journals. If you would like to stay up to date with Project G.A.M.R., you can follow us on Facebook and Twitter (#ProjectGAMR). 
          </p>
          <p className='flashy about-people'>
            Project G.A.M.R. was brought to you by the following people:
          </p>
          <div className='about-bio'>
            <Title className='about-name' separator='.'>Shoshannah Tekofsky</Title>
            <h4 className='about-role'>Lead Researcher</h4>
            <p className='bio-body'>
              Both as an inquisitive game researcher and avid gamer, Shoshannah Tekofsky looks at what video games can offer us in the present and the future. With a background in psychology, cognitive science, computer science, and artificial intelligence, she is now tackling a PhD program in Player Modeling in Video Games at the Tilburg University, The Netherlands. She specialises in big data projects that seek to discover the connections between our mental qualities and our behaviour in virtual worlds. Read more about her research at psyopsresearch.com.
            </p>
          </div>
          <div className='about-bio'>
            <Title className='about-name' separator='.'>George Chang</Title>
            <h4 className='about-role'>Web Programmer</h4>
            <p className='bio-body'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eleifend lorem nec velit egestas, non vestibulum nulla pharetra. Vivamus eu eleifend leo, id commodo sem. Nam id laoreet elit. In hac habitasse platea dictumst. Suspendisse ac leo quis tortor pharetra feugiat eget ut nisl. Etiam tincidunt quam urna, sed faucibus felis tincidunt quis. Ut imperdiet justo vel quam sollicitudin, a pharetra nunc congue. Pellentesque vitae imperdiet nibh. Donec consectetur erat et arcu viverra, eu ullamcorper magna interdum. Pellentesque in tellus tristique felis pharetra sagittis. Sed sollicitudin ligula sed feugiat gravida. Phasellus eget cursus neque. Proin lacinia arcu eu gravida aliquam. Aliquam sollicitudin, eros ac scelerisque consequat, tellus diam tempor purus, eu varius dolor libero eu sem. Proin id finibus ex, et luctus nibh.
            </p>
          </div>
          <div className='about-bio'>
            <Title className='about-name' separator='.'>Jota Junior</Title>
            <h4 className='about-role'>Back End Programmer</h4>
            <p className='bio-body'>
              Jota Junior is a computer scientist (Columbia University/UFMG '17) with a recently discovered passion for data science and a long-known for entrepreneurship. Ex-military, founded Project Lyla (software that uses social networks to spread information about missing people), Frop.me (social commerce startup) and now works as a QA Engineer intern for RetSKU -- just waiting to engage in some other crazy idea. http://linkedin.com/in/jotajunior
            </p>
          </div>
        </div>
      </div>
    );
  }
});