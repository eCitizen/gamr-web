
var $ = 't',
  lK = 'EGMFXYRS'.split(''),
  nK = 'nfjlicrvbu'.split(''),
  cO = 'aabb'.split(''),
  pO = 'gamerType,personality,brainType'.split(','),
  pI = parseInt;

function gR(a) {
  return a.slice().reverse();
}

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
  return function i(v) {
    var m = cO[cIx % l] === 'a' ? 'push' : 'unshift';
    strArray[m](v);
    cIx += 1;
  }
}

function mU(a) {
  var l = cO.length, cIx = l - (a.length % l), 
    rO = gR(cO);
  return function e() {
    var m = rO[cIx % l] === 'a' ? 'pop' : 'shift';
    cIx += 1;
    return a[m]();
  }
}

function packProfile(p, k) {
  var f = [],
    _ = mP(f);

  pO.forEach(function (n) {
    if (k[n].length !== p[n].length) {
      throw new Error('key/profile mismatch: ' + n);
    };

    k[n].forEach(function (a, idx) {
      var v = p[n][idx], c = a.total ? (a.total - v) : (a.options.indexOf(v) === 0 ? a.options[1] : a.options[0]);
      _(hV(v));
      _(hV(c));
    });
  });

  return f.join($);
}

function unpackProfile(p, k) {
  try {
    var s = p.split($),
      _ = mU(s),
      f = {},
      g = true;

    gR(pO).forEach(function (n) {
      f[n] = [];
      gR(k[n]).forEach(function (a) {
        var c = eV(_()), v = eV(_());

        if (a.total) {
          g = v + c === 100 ? g : false;
        } else {
          g = [
            a.options.indexOf(v),
            a.options.indexOf(c)
          ].sort().join('') === '01' ? g : false;
        }

        f[n].unshift(v);
      });
    });

    return g ? f : null;
  } catch (e) {
    return null;
  }
}

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

function randomV() {
  return Math.floor(Math.random() * 100);
}

function randomA(a , b) {
  return Math.random() < 0.5 ? a : b;
}

var profile = {
  personality: [randomV(), randomV(), randomV(), randomV(), randomV()],
  gamerType: [randomA('G', 'X'), randomA('M', 'S'), randomA('F', 'Y'), randomA('E', 'R')],
  brainType: [randomV(), randomV()]
};

var packed = packProfile(profile, surveyKey);
var unpacked = unpackProfile(packed, surveyKey);
var confirm = packProfile(unpacked, surveyKey);
var unPackedAgain = unpackProfile(confirm, surveyKey);

console.log('No side effects:', packed === confirm)
console.log('Hash:', packed);
console.log('Profile:', profile);







