
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

var separator = 't';
var letterKey = ['G', 'X', 'M', 'S', 'F', 'Y', 'E', 'R'];
var numberKey = ['+','f','j','l','i','-','r','v','b','u'];
var packOrder = ['gamerType', 'personality', 'brainType'];
var commandOrder = [0, 0, 1, 1];

function hideNumber(i) {
  return i.toString().split('').map(function (n) {
    return numberKey[parseInt(n)];
  }).join('');
}

function exposeNumber(i) {
  return i.split('').map(function (c) {
    return numberKey.indexOf(c);
  }).join('');
}

function hideLetter(i) {
  return letterKey.indexOf(i) + 1;
}

function exposeLetter(i) {
  return letterKey[parseInt(i - 1)];
}

function hideValue(v) {
  return typeof v === 'string' ? hideLetter(v) : hideNumber(v);
}

function exposeValue(v) {
  return parseInt(v) ? exposeLetter(v) : exposeNumber(v);
}

function makePacker(strArray) {
  var callIdx = 0;
  var l = commandOrder.length;
  return function insert(value) {
    var commandIdx = callIdx % l;
    var method = commandOrder[commandIdx] === 0 ? 'push' : 'unshift';
    strArray[method](value);
    callIdx += 1;
    return value;
  }
}

function makeUnpacker(segments) {
  var l = commandOrder.length;
  var callIdx = l - (segments.length % l);
  var reversed = commandOrder.reverse();
  
  return function extract() {
    var commandIdx = callIdx % l;
    var method = commandOrder[commandIdx] === 0 ? 'pop' : 'shift';
    callIdx += 1;
    return segments[method]();
  }
}

function packProfile(profile) {
  var finalStr = [];
  var insert = makePacker(finalStr);

  packOrder.forEach(function (surveyName) {
    var thisKey = surveyKey[surveyName];

    surveyKey[surveyName].forEach(function (attr, idx) {
      console.log('insert', attr.title, profile[surveyName][idx]);
      var value = profile[surveyName][idx];
      var compliment = attr.total ? attr.total - value :
                         attr.options.indexOf(value) === 0 ? attr.options[1] : attr.options[0];

      insert(hideValue(value));
      insert(hideValue(compliment));
    });
  });
  return finalStr.join(separator);
}

function unpackProfile(packed) {
  var segments = packed.split(separator);
  var extract = makeUnpacker(segments);
  var finalProfile = {};

  packOrder.reverse().forEach(function (surveyName) {
    finalProfile[surveyName] = [];
    surveyKey[surveyName].reverse().forEach(function (attr) {
      console.log('extract', attr.title);
      var compliment = exposeValue(extract());
      var value = exposeValue(extract());
      console.log(value, compliment);
      // check if complimentary
      // if so insert into final profile
      // finalProfile[surveyName].push());
    });
  });
}

var profile = {
  personality: [10, 29, 38, 47, 51],
  gamerType: ['G', 'M', 'Y', 'E'],
  brainType: [56, 65]
};

unpackProfile(packProfile(profile));


// var str = [];
// var insert = makePacker(str);
// for (var i = 0; i < 6; i += 1) {
//   console.log(insert(i));
// }

// // console.log(str.join());
// console.log('')


// var extract = makeUnpacker(str);

// var l = str.length;
// for (var i = 0; i < l; i += 1) {
//   console.log(extract());
//   // console.log(i, extract());
// }



