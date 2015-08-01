
var surveyKey = {
  personality: [
    {
      title: 'Openness to Experience',
      total: 100
    },{
      title: 'Conscientiousness',
      total: 100
    },{
      title: 'Extraversion',
      total: 100
    },{
      title: 'Agreeableness',
      total: 100
    },{
      title: 'Emotional Stability',
      total: 100
    }
  ],
  brainType: [
    {
      title: 'Empathizing',
      total: 100
    },{
      title: 'Systematizing',
      total: 100
    }
  ],
  gamerType: [
    {
      title: 'Achievement',
      options: ['G', 'X']
    },{
      title: 'Social',
      options: ['M', 'S']
    },{
      title: 'Immersion',
      options: ['F', 'Y'] 
    },{
      title: 'Arousal',
      options: ['E', 'R']
    }
  ]
}

var numberKey = ['i','r','z','n','v','j','l','t','f','c'];
var packOrder = ['gamerType', 'personality', 'brainType'];

function hideNumber(i) {
  if (typeof i === 'string') return i.toLowerCase();
  return i.toString().split('').map(function (n) {
    return numberKey[parseInt(n)];
  }).join('');
}

function makePacker(strArray) {
  var callIdx = 0;
  return function insert(value) {
    if (callIdx % 2) {
      strArray.push(value)
    } else {
      strArray.unshift(value)
    }
    callIdx += 1;
  }
}

function packProfile(profile) {
  var finalStr = [];
  var insert = makePacker(finalStr);
  packOrder.forEach(function (surveyName) {
    var thisKey = surveyKey[surveyName];
    profile[surveyName].forEach(function (answer, idx) {
      var options = thisKey[idx].options;
      var total = thisKey[idx].total;
      var compliment;
      if (options) {
        compliment = options.indexOf(answer) === 0 ? options[1] : options[0];
      } else {
        compliment = total - answer;
      }

      console.log(hideNumber(answer));

      insert([hideNumber(answer),hideNumber(compliment)].join('/'));
      // console.log(answer, compliment);
    });
  });
  return finalStr.join();
}

var profile = {
  personality: [10, 20, 30, 40],
  gamerType: ['G', 'M', 'Y', 'E'],
  brainType: [50, 60]
};

var s = packProfile(profile);

console.log(s);


var str = [];
var insert = makePacker(str);
for(var i = 0; i < 12; i +=1) {
  insert(i);
}

console.log(str.join());







