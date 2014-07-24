/* global sharing */
var nouns = [],
    verbs = [],
    stuff = [
      'yes',
      'no',
      'never',
      'the pain',
      'you\'ll never understand',
      'my mind'
    ];

Array.prototype.pick = function() {
  return this[Math.floor(Math.random()*this.length)];
};

function generate(nounPlural, verb) {
  var generatedText = '';
  for (var i=0;i<16;i++) {
    nounPlural = nouns.pick().singularize();
    verb = verbs.pick();
    generatedText += 'i am the boy with the ' + verb + '-' + nounPlural + ' eyes<br>';
    var thing = stuff.pick();

  for (var j=0;j<6;j++) {
    if (Math.random() < 0.1) generatedText += thing + '<br>';
  }
  }
  $('#content').html(generatedText);
}

function getWords(suppressGenerate) {
  $.when(
    $.ajax({
      url: 'http://api.wordnik.com/v4/words.json/randomWords?minCorpusCount=10000&minDictionaryCount=5&excludePartOfSpeech=proper-noun,proper-noun-plural,proper-noun-posessive,suffix,family-name,idiom,affix&hasDictionaryDef=true&includePartOfSpeech=noun&limit=1000&maxLength=22&api_key='+key.API_KEY,
      async: false,
      dataType:'json'
    }),
    $.ajax({
      url: 'http://api.wordnik.com/v4/words.json/randomWords?limit=1000&excludePartOfSpeech=adjective&hasDictionaryDef=true&includePartOfSpeech=verb-transitive&minCorpusCount=1000&api_key='+key.API_KEY,
      async: false,
      dataType:'json'
    })
  ).done(function(noun_data, verb_data) {
    nouns = $.map(noun_data[0], function(el) { return el.word; });
    verbs = $.map(verb_data[0], function(el) { return el.word; });
    if (!suppressGenerate) {
      generate();
    }
  });
}

$('#generate').click(function() { generate(); });
getWords();

