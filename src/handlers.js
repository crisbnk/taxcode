/*
  This is a file of data and helper functions
*/

exports.regex = /[0-9[.,\\/#!$%^&*;:{}=\-_`~()\]]/g;

exports.splitChar = function(stringCheck) {
  var result = {};

  var vocals = ['A', 'E', 'I', 'O', 'U'];
  var str = stringCheck.replace(/\s/g, '');

  var vocalsInStr = [];
  var consonantsInStr = [];

  function isVocal(value) {
    if (vocals.includes(value)) {
      vocalsInStr[vocalsInStr.length] = value;
    } else {
      consonantsInStr[consonantsInStr.length] = value;
    }
  }

  var strInArray = str.split('');
  for (var i = 0; i < strInArray.length; i++) {
    isVocal(strInArray[i]);
  }

  result.vocals = vocalsInStr;
  result.consonants = consonantsInStr;

  return result;
};

exports.generateSurnameCode = function(surnameSplit) {
  var result = '';

  if (surnameSplit.consonants.length > 2) {
    for (var i = 0; i < 3; i++) {
      result += surnameSplit.consonants[i];
    }
  } else {
    for (var w = 0; w < surnameSplit.consonants.length; w++) {
      result += surnameSplit.consonants[w];
    }
  }

  if (surnameSplit.vocals.length < 3 && result.length < 3) {
    for (var k = surnameSplit.vocals.length; k < 3; k++) {
      surnameSplit.vocals[surnameSplit.vocals.length] = 'X';
    }
  }

  if (result.length < 3) {
    var goal = (3 - result.length);
    for (var j = 0; j < goal; j++) {
      result += surnameSplit.vocals[j];
    }
  }

  return result;
};

exports.generateNameCode = function(nameSplit) {
  var result = '';
  if (nameSplit.consonants.length > 2) {
    if (nameSplit.consonants.length === 3) {
      for (var i = 0; i < 3; i++) {
        result += nameSplit.consonants[i];
      }
    } else if (nameSplit.consonants.length > 3) {
      result += nameSplit.consonants[0];
      result += nameSplit.consonants[2];
      result += nameSplit.consonants[3];
    }
  } else {
    for (var w = 0; w < nameSplit.consonants.length; w++) {
      result += nameSplit.consonants[w];
    }
  }

  if (nameSplit.vocals.length < 3 && result.length < 3) {
    for (var k = nameSplit.vocals.length; k < 3; k++) {
      nameSplit.vocals[nameSplit.vocals.length] = 'X';
    }
  }

  if (result.length < 3) {
    var goal = (3 - result.length);
    for (var j = 0; j < goal; j++) {
      result += nameSplit.vocals[j];
    }
  }

  return result;
};

exports.birthDateResult = function(birthDate, sex) {
  var result = '';
  const date = new Date(birthDate);
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  var y = year.toString().substr(2);
  result += y;

  var genericMonth = ['A', 'B', 'C', 'D', 'E', 'H', 'L', 'M', 'P', 'R', 'S', 'T'];
  result += genericMonth[month];

  var d = '';
  if (sex === 'M') {
    day < 10 ? d = ('0' + day.toString()) : d = day.toString();
  } else if (sex === 'F') {
    d = (day + 40).toString();
  }
  result += d;
  return result;
};
