
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

// -----------------------------------------------------------

var separator = 't';
var letterKey = ['G', 'X', 'M', 'S', 'F', 'Y', 'E', 'R'];
var numberKey = ['+','f','j','l','i','-','r','v','b','u'];
var packOrder = ['gamerType', 'personality', 'brainType'];
var commandOrder = [0, 0, 1, 1];

function hideValue(v) {
  return typeof v === 'string' ? letterKey.indexOf(v) + 1 : 
    v.toString().split('').map(function (n) {
      return numberKey[parseInt(n)];
    }).join('');
}

function exposeValue(v) {
  return parseInt(v) ? letterKey[parseInt(v - 1)] : 
    parseInt(v.split('').map(function (c) {
      return numberKey.indexOf(c);
    }).join(''));
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
    if (surveyKey[surveyName].length !== profile[surveyName].length) {
      throw new Error('key/profile mismatch: ' + surveyName);
    };

    surveyKey[surveyName].forEach(function (attr, idx) {
      var value = profile[surveyName][idx];
      var compliment = attr.total ? attr.total - value :
                         attr.options.indexOf(value) === 0 ? attr.options[1] : attr.options[0];

      // console.log('insert', attr.title, value, compliment);
      insert(hideValue(value));
      insert(hideValue(compliment));
    });
  });
  return finalStr.join(separator);
}

function unpackProfile(packed) {
  try {
    var segments = packed.split(separator);
    var extract = makeUnpacker(segments);
    var finalProfile = {};
    var valid = true;

    packOrder.reverse().forEach(function (surveyName) {
      finalProfile[surveyName] = [];
      surveyKey[surveyName].reverse().forEach(function (attr) {
        
        var compliment = exposeValue(extract());
        var value = exposeValue(extract());
        // console.log('extract', attr.title, value, compliment);

        if (attr.total) {
          valid = value + compliment === 100 ? valid : false;
        } else {
          valid = [attr.options.indexOf(value),attr.options.indexOf(compliment)].sort().join('') === '01' ? valid : false;
        }

        finalProfile[surveyName].unshift(value);
      });
    });

    return valid ? finalProfile : null;
  } catch (e) {
    return null;
  }
}

var profile = {
  personality: [10, 29, 38, 47, 60],
  gamerType: ['G', 'M', 'Y', 'E'],
  brainType: [56, 65]
};

var p = packProfile(profile);

console.log(p)

var u = unpackProfile(p);

console.log(profile);
console.log('')
console.log(u);





