
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

var $ = 't',
  lK = 'GXMSFYER'.split(''),
  nK = '+fjli-rvbu'.split(''),
  cO = 'aabb'.split(''),
  pO = 'gamerType,personality,brainType'.split(','),
  pI = parseInt;

function hV(v) {
  return typeof v === 'string' ? lK.indexOf(v) + 1 : 
    v.toString().split('').map(function (n) {
      return nK[pI(n)];
    }).join('');
}

function eV(v) {
  return pI(v) ? lK[pI(v - 1)] : 
    pI(v.split('').map(function (c) {
      return nK.indexOf(c);
    }).join(''));
}

function mP(strArray) {
  var cIx = 0, l = cO.length;
  return function i(value) {
    var m = cO[cIx % l] === 'a' ? 'push' : 'unshift';
    strArray[m](value);
    cIx += 1;
  }
}

function mU(a) {
  var l = cO.length, cIx = l - (a.length % l), 
    rO = cO.join('.').split('.').reverse();
  return function e() {
    var m = rO[cIx % l] === 'a' ? 'pop' : 'shift';
    cIx += 1;
    return a[m]();
  }
}

function packProfile(profile) {
  var finalStr = [];
  var insert = mP(finalStr);

  pO.forEach(function (surveyName) {
    if (surveyKey[surveyName].length !== profile[surveyName].length) {
      throw new Error('key/profile mismatch: ' + surveyName);
    };

    surveyKey[surveyName].forEach(function (attr, idx) {
      var value = profile[surveyName][idx];
      var compliment = attr.total ? attr.total - value :
                         attr.options.indexOf(value) === 0 ? attr.options[1] : attr.options[0];

      // console.log('insert', attr.title, value, compliment);
      insert(hV(value));
      insert(hV(compliment));
    });
  });
  return finalStr.join($);
}

function unpackProfile(packed) {
  try {
    var segments = packed.split($);
    var extract = mU(segments);
    var finalProfile = {};
    var valid = true;

    pO.reverse().forEach(function (surveyName) {
      finalProfile[surveyName] = [];
      surveyKey[surveyName].reverse().forEach(function (attr) {
        
        var compliment = eV(extract());
        var value = eV(extract());
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

// 

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





