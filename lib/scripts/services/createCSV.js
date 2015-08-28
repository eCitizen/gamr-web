
var surveyStore = require('../survey/store');
var inputStore = require('../input/store');

// var forms = JSON.parse('{"consent":{"hasConsented":true},"identity":{"gender":"male","birth_year":"1995","birth_month":"3","country":"Andorra","english_lvl":"intermediate","LOL_id":"Greg","LOL_region":"euw","LOL_lane":"mid","LOL_role":"mage","WOW_id":"sdf","WOW_region":"eu","WOW_realm":"azshara","BFHD_id":null,"BF4_id":"Greg"}}');
// var survey = JSON.parse('{"personality":{"title":"Personality","id":"IPIP","scaleValues":[1,2,3,4,5],"scale":["Very Inaccurate","Moderately Inaccurate","Neither Accurate Nor Inaccurate","Moderately Accurate","Very Accurate"],"dimensions":{"E":"Extraversion","A":"Agreeableness","C":"Conscientiousness","S":"Emotional Stability","O":"Openness","L":"LOTR"},"questions":[{"text": "blank","dimension":"E","answer":"Very Inaccurate","answerValue":1},{"text": "blank","dimension":"A","inverted":true,"answer":"Moderately Inaccurate","answerValue":4},{"text": "blank","dimension":"C","answer":"Neither Accurate Nor Inaccurate","answerValue":3},{"text": "blank","dimension":"S","inverted":true,"answer":"Moderately Accurate","answerValue":2},{"text": "blank","dimension":"O","answer":"Neither Accurate Nor Inaccurate","answerValue":3},{"text": "blank","dimension":"E","inverted":true,"answer":"Moderately Inaccurate","answerValue":4},{"text": "blank","dimension":"A","answer":"Neither Accurate Nor Inaccurate","answerValue":3},{"text": "blank","dimension":"C","inverted":true,"answer":"Moderately Accurate","answerValue":2},{"text": "blank","dimension":"S","answer":"Very Accurate","answerValue":5},{"text": "blank","dimension":"O","inverted":true,"answer":"Moderately Accurate","answerValue":2},{"text": "blank","dimension":"E","answer":"Neither Accurate Nor Inaccurate","answerValue":3},{"text": "blank","dimension":"A","inverted":true,"answer":"Moderately Inaccurate","answerValue":4},{"text": "blank","dimension":"C","answer":"Neither Accurate Nor Inaccurate","answerValue":3},{"text": "blank","dimension":"S","inverted":true,"answer":"Neither Accurate Nor Inaccurate","answerValue":3},{"text": "blank","dimension":"O","answer":"Neither Accurate Nor Inaccurate","answerValue":3},{"text": "blank","dimension":"E","inverted":true,"answer":"Moderately Inaccurate","answerValue":4},{"text": "blank","dimension":"A","answer":"Neither Accurate Nor Inaccurate","answerValue":3},{"text": "blank","dimension":"C","inverted":true,"answer":"Moderately Inaccurate","answerValue":4},{"text": "blank","dimension":"S","answer":"Very Inaccurate","answerValue":1},{"text": "blank","dimension":"O","inverted":true,"answer":"Moderately Inaccurate","answerValue":4},{"text": "blank","dimension":"E","answer":"Neither Accurate Nor Inaccurate","answerValue":3},{"text": "blank","dimension":"A","inverted":true,"answer":"Moderately Accurate","answerValue":2},{"text": "blank","dimension":"C","answer":"Neither Accurate Nor Inaccurate","answerValue":3},{"text": "blank","dimension":"S","inverted":true,"answer":"Moderately Accurate","answerValue":2},{"text": "blank","dimension":"O","answer":"Very Accurate","answerValue":5},{"text": "blank","dimension":"E","inverted":true,"answer":"Moderately Accurate","answerValue":2},{"text": "blank","dimension":"A","answer":"Moderately Accurate","answerValue":4},{"text": "blank","dimension":"C","inverted":true,"answer":"Moderately Accurate","answerValue":2},{"text": "blank","dimension":"S","inverted":true,"answer":"Moderately Accurate","answerValue":2},{"text": "blank","dimension":"O","inverted":true,"answer":"Neither Accurate Nor Inaccurate","answerValue":3},{"text": "blank","dimension":"E","answer":"Neither Accurate Nor Inaccurate","answerValue":3},{"text": "blank","dimension":"A","inverted":true,"answer":"Moderately Inaccurate","answerValue":4},{"text": "blank","dimension":"C","answer":"Neither Accurate Nor Inaccurate","answerValue":3},{"text": "blank","dimension":"S","inverted":true,"answer":"Moderately Inaccurate","answerValue":4},{"text": "blank","dimension":"O","answer":"Neither Accurate Nor Inaccurate","answerValue":3},{"text": "blank","dimension":"E","inverted":true,"answer":"Neither Accurate Nor Inaccurate","answerValue":3},{"text": "blank","dimension":"A","answer":"Neither Accurate Nor Inaccurate","answerValue":3},{"text": "blank","dimension":"C","inverted":true,"answer":"Moderately Accurate","answerValue":2},{"text": "blank","dimension":"S","inverted":true,"answer":"Very Accurate","answerValue":1},{"text": "blank","dimension":"O","answer":"Moderately Accurate","answerValue":4},{"text": "blank","dimension":"E","answer":"Neither Accurate Nor Inaccurate","answerValue":3},{"text": "blank","dimension":"A","answer":"Moderately Inaccurate","answerValue":2},{"text": "blank","dimension":"C","answer":"Moderately Inaccurate","answerValue":2},{"text": "blank","dimension":"S","inverted":true,"answer":"Moderately Inaccurate","answerValue":4},{"text": "blank","dimension":"O","answer":"Neither Accurate Nor Inaccurate","answerValue":3},{"text": "blank","dimension":"E","inverted":true,"answer":"Neither Accurate Nor Inaccurate","answerValue":3},{"text": "blank","dimension":"A","answer":"Moderately Inaccurate","answerValue":2},{"text": "blank","dimension":"C","answer":"Neither Accurate Nor Inaccurate","answerValue":3},{"text": "blank","dimension":"S","inverted":true,"answer":"Moderately Inaccurate","answerValue":4},{"text": "blank","dimension":"O","answer":"Neither Accurate Nor Inaccurate","answerValue":3},{"text": "blank","dimension":"L","id":"LOTR","answer":"Moderately Inaccurate","answerValue":2},{"text": "blank","dimension":null,"id":"LOTR","answer":"Moderately Inaccurate","answerValue":2},{"text": "blank","dimension":"L","id":"LOTR","answer":"Moderately Inaccurate","answerValue":2},{"text": "blank","dimension":"L","id":"LOTR","answer":"Neither Accurate Nor Inaccurate","answerValue":3},{"text": "blank","dimension":null,"id":"LOTR","answer":"Neither Accurate Nor Inaccurate","answerValue":3},{"text": "blank","dimension":null,"id":"LOTR","answer":"Neither Accurate Nor Inaccurate","answerValue":3},{"text": "blank","dimension":"L","id":"LOTR","answer":"Moderately Inaccurate","answerValue":2},{"text": "blank","dimension":null,"id":"LOTR","answer":"Neither Accurate Nor Inaccurate","answerValue":3},{"text": "blank","dimension":"L","id":"LOTR","answer":"Moderately Inaccurate","answerValue":2},{"text": "blank","dimension":"L","id":"LOTR","answer":"Neither Accurate Nor Inaccurate","answerValue":3}],"lastAnswerd":59,"complete":true},"brainType":{"title":"Brain Type","id":"QSEQ","scaleValues":[0,0,1,2],"scale":["Very Inaccurate","Moderately Inaccurate","Moderately Accurate","Very Accurate"],"dimensions":{"E":"Empathizing","S":"Systemizing"},"questions":[{"text": "blank","dimension":"E","answer":"Moderately Inaccurate","answerValue":0},{"text": "blank","dimension":"E","answer":"Moderately Inaccurate","answerValue":0},{"text": "blank","dimension":"E","inverted":true,"answer":"Moderately Inaccurate","answerValue":1},{"text": "blank","dimension":"E","inverted":true,"answer":"Moderately Inaccurate","answerValue":1},{"text": "blank","dimension":"E","inverted":true,"answer":"Moderately Inaccurate","answerValue":1},{"text": "blank","dimension":"E","answer":"Moderately Accurate","answerValue":1},{"text": "blank","dimension":"E","inverted":true,"answer":"Very Accurate","answerValue":0},{"text": "blank","dimension":"E","answer":"Moderately Accurate","answerValue":1},{"text": "blank","dimension":"E","answer":"Moderately Inaccurate","answerValue":0},{"text": "blank","dimension":"E","answer":"Very Inaccurate","answerValue":0},{"text": "blank","dimension":"E","inverted":true,"answer":"Moderately Inaccurate","answerValue":1},{"text": "blank","dimension":"E","answer":"Moderately Accurate","answerValue":1},{"text": "blank","dimension":"E","answer":"Moderately Inaccurate","answerValue":0},{"text": "blank","dimension":"E","answer":"Moderately Accurate","answerValue":1},{"text": "blank","dimension":"E","answer":"Very Accurate","answerValue":2},{"text": "blank","dimension":"E","answer":"Moderately Accurate","answerValue":1},{"text": "blank","dimension":"E","inverted":true,"answer":"Moderately Inaccurate","answerValue":1},{"text": "blank","dimension":"E","answer":"Moderately Accurate","answerValue":1},{"text": "blank","dimension":"E","answer":"Very Accurate","answerValue":2},{"text": "blank","dimension":"E","answer":"Moderately Accurate","answerValue":1},{"text": "blank","dimension":"E","answer":"Moderately Inaccurate","answerValue":0},{"text": "blank","dimension":"E","answer":"Moderately Accurate","answerValue":1},{"text": "blank","dimension":"S","answer":"Very Accurate","answerValue":2},{"text": "blank","dimension":"S","answer":"Moderately Accurate","answerValue":1},{"text": "blank","dimension":"S","inverted":true,"answer":"Moderately Inaccurate","answerValue":1},{"text": "blank","dimension":"S","inverted":true,"answer":"Moderately Accurate","answerValue":0},{"text": "blank","dimension":"S","answer":"Moderately Inaccurate","answerValue":0},{"text": "blank","dimension":"S","answer":"Very Inaccurate","answerValue":0},{"text": "blank","dimension":"S","inverted":true,"answer":"Moderately Inaccurate","answerValue":1},{"text": "blank","dimension":"S","answer":"Moderately Accurate","answerValue":1},{"text": "blank","dimension":"S","inverted":true,"answer":"Moderately Inaccurate","answerValue":1},{"text": "blank","dimension":"S","inverted":true,"answer":"Moderately Accurate","answerValue":0},{"text": "blank","dimension":"S","inverted":true,"answer":"Moderately Accurate","answerValue":0},{"text": "blank","dimension":"S","inverted":true,"answer":"Very Accurate","answerValue":0},{"text": "blank","dimension":"S","answer":"Moderately Accurate","answerValue":1},{"text": "blank","dimension":"S","answer":"Moderately Inaccurate","answerValue":0},{"text": "blank","dimension":"S","inverted":true,"answer":"Moderately Accurate","answerValue":0},{"text": "blank","dimension":"S","answer":"Moderately Inaccurate","answerValue":0},{"text": "blank","dimension":"S","inverted":true,"answer":"Moderately Accurate","answerValue":0},{"text": "blank","dimension":"S","answer":"Very Accurate","answerValue":2},{"text": "blank","dimension":"S","inverted":true,"answer":"Moderately Accurate","answerValue":0},{"text": "blank","dimension":"S","inverted":true,"answer":"Moderately Inaccurate","answerValue":1},{"text": "blank","dimension":"S","answer":"Moderately Accurate","answerValue":1},{"text": "blank","dimension":"S","answer":"Moderately Inaccurate","answerValue":0},{"text": "blank","dimension":"S","inverted":true,"answer":"Very Inaccurate","answerValue":2},{"text": "blank","dimension":"S","answer":"Moderately Inaccurate","answerValue":0},{"text": "blank","dimension":"S","inverted":true,"answer":"Moderately Accurate","answerValue":0}],"lastAnswerd":46,"complete":true},"gamerType":{"title":"Gamer Type","id":"GAM","scaleValues":[1,2,3,4,5],"scale":["Very Inaccurate","Moderately Inaccurate","Neither Accurate Nor Inaccurate","Moderately Accurate","Very Accurate"],"dimensions":{"Co":"Competition","Ch":"Challenge","Fa":"Fantasy","Ar":"Arousal","St":"Story","Es":"Escapism","Lo":"Loss-Aversion","Cu":"Customization","Gr":"Grinding/Completion","Au":"Autonomy/Exploration","So":"Socializing","Re":"Relationships","Te":"Teamwork"},"categories":{"Ac":"Achievement","Im":"Immersion","Ar":"Arousal","So":"Social"},"questions":[{"text": "blank","dimension":"Co","category":"Ac","answer":"Moderately Inaccurate","answerValue":2},{"text": "blank","dimension":"Ch","category":"Ac","answer":"Moderately Inaccurate","answerValue":2},{"text": "blank","dimension":"Fa","category":"Im","answer":"Moderately Inaccurate","answerValue":2},{"text": "blank","dimension":"Ar","category":"Ar","answer":"Neither Accurate Nor Inaccurate","answerValue":3},{"text": "blank","dimension":"St","category":"Im","inverted":true,"answer":"Moderately Inaccurate","answerValue":4},{"text": "blank","dimension":"Es","category":"Im","answer":"Neither Accurate Nor Inaccurate","answerValue":3},{"text": "blank","dimension":"Lo","category":"Ac","answer":"Moderately Accurate","answerValue":4},{"text": "blank","dimension":"Cu","category":"Im","answer":"Neither Accurate Nor Inaccurate","answerValue":3},{"text": "blank","dimension":"Gr","category":"Ac","answer":"Moderately Inaccurate","answerValue":2},{"text": "blank","dimension":"Au","category":null,"answer":"Neither Accurate Nor Inaccurate","answerValue":3},{"text": "blank","dimension":"So","category":"So","answer":"Moderately Accurate","answerValue":4},{"text": "blank","dimension":"Re","category":"So","answer":"Neither Accurate Nor Inaccurate","answerValue":3},{"text": "blank","dimension":"Te","category":"So","answer":"Moderately Inaccurate","answerValue":2},{"text": "blank","dimension":"Co","category":"Ac","answer":"Neither Accurate Nor Inaccurate","answerValue":3},{"text": "blank","dimension":"Ch","category":"Ac","answer":"Moderately Accurate","answerValue":4},{"text": "blank","dimension":"Fa","category":"Im","answer":"Neither Accurate Nor Inaccurate","answerValue":3},{"text": "blank","dimension":"Ar","category":"Ar","answer":"Moderately Inaccurate","answerValue":2},{"text": "blank","dimension":"St","category":"Im","inverted":true,"answer":"Neither Accurate Nor Inaccurate","answerValue":3},{"text": "blank","dimension":"Es","category":"Im","answer":"Moderately Accurate","answerValue":4},{"text": "blank","dimension":"Lo","category":"Ac","answer":"Neither Accurate Nor Inaccurate","answerValue":3},{"text": "blank","dimension":"Cu","category":"Im","answer":"Moderately Inaccurate","answerValue":2},{"text": "blank","dimension":"Gr","category":"Ac","answer":"Neither Accurate Nor Inaccurate","answerValue":3},{"text": "blank","dimension":"Au","category":null,"answer":"Moderately Accurate","answerValue":4},{"text": "blank","dimension":"So","category":"So","answer":"Neither Accurate Nor Inaccurate","answerValue":3},{"text": "blank","dimension":"Re","category":"So","answer":"Moderately Inaccurate","answerValue":2},{"text": "blank","dimension":"Te","category":"So","answer":"Moderately Accurate","answerValue":4},{"text": "blank","dimension":"Co","category":"Ac","answer":"Neither Accurate Nor Inaccurate","answerValue":3},{"text": "blank","dimension":"Ch","category":"Ac","answer":"Moderately Inaccurate","answerValue":2},{"text": "blank","dimension":"Fa","category":"Im","answer":"Neither Accurate Nor Inaccurate","answerValue":3},{"text": "blank","dimension":"Ar","category":"Ar","answer":"Moderately Accurate","answerValue":4},{"text": "blank","dimension":"St","category":"Im","answer":"Neither Accurate Nor Inaccurate","answerValue":3},{"text": "blank","dimension":"Es","category":"Im","answer":"Moderately Inaccurate","answerValue":2},{"text": "blank","dimension":"Lo","category":"Ac","answer":"Moderately Accurate","answerValue":4},{"text": "blank","dimension":"Cu","category":"Im","answer":"Neither Accurate Nor Inaccurate","answerValue":3},{"text": "blank","dimension":"Gr","category":"Ac","inverted":true,"answer":"Moderately Inaccurate","answerValue":4},{"text": "blank","dimension":"Au","category":null,"answer":"Neither Accurate Nor Inaccurate","answerValue":3},{"text": "blank","dimension":"So","category":"So","answer":"Moderately Accurate","answerValue":4},{"text": "blank","dimension":"Re","category":"So","answer":"Neither Accurate Nor Inaccurate","answerValue":3},{"text": "blank","dimension":"Te","category":"So","answer":"Moderately Inaccurate","answerValue":2}],"lastAnswerd":38,"complete":true}}');


module.exports = function createCSV() {
  var data = [].concat(
                makeIdentityRows(), 
                [[],[]], 
                makeSurveyRows(),
                [[],[]],
                makeResultsRows());

  var csvContent = "data:text/csv;charset=utf-8,";
  data.forEach(function(infoArray, index){
    dataString = infoArray.join(",");
    csvContent += index < data.length ? dataString+ "\n" : dataString;
  });
  var encodedUri = encodeURI(csvContent);
  window.open(encodedUri);
}

function makeResultsRows() {
  var rows = [];
  var scores = surveyStore.getScores();

  rows.push(['Survey Id', 'Dimension', 'Total Score']);
  rows.push([]);

  for (var part in scores) {
    var dimensions = scores[part].dimensions;
    for (var d in dimensions) {
      rows.push([part, d, dimensions[d]]);
    }
  }

  return rows;
}

function makeIdentityRows() {
  var forms = inputStore.getAllForms();
  var rows = [];

  rows.push(['field name', 'value']);
  rows.push([]);

  for (var field in forms.identity) {
    rows.push([field, forms.identity[field] || 'N/A']);
  }

  return rows;
}

function makeSurveyRows() {
  var survey = surveyStore.getAllSurveys();
  var rows = [];

  rows.push([
    'survey Id',
    'dimension',
    'Answer #',
    'Answer Value',
    'Is inverted?',
    'Text'
  ]);
  rows.push([]);

  for (var part in survey) {
    var s = survey[part];
    s.questions.forEach(function (question) {
      rows.push([
        question.id || s.id,
        s.dimensions[question.dimension] || 'N/A',
        question.answerIdx,
        question.answerValue,
        question.inverted ? 'inverted' : '',
        '"' + question.text + '"'
      ]);
    });
  }

  return rows;
}


