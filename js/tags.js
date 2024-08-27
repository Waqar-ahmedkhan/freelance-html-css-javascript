//The entered keywords
var allKeywords = []
//Delete a keyword
function deleteWord(element){
  var index = allKeywords.indexOf($(element).parent('.keyword').text());
  if(index !== -1){                                  
    allKeywords.splice(index, 1);
  }
  $(element).parent('.keyword').remove();
}

//Add a keyword
function addWord(word){
  if(word === undefined || word === ''){
    return;
  }
    allKeywords.push(word);
    $('.keywords ').before($('<p class="keyword">' + word + '<a class="delete" onclick="deleteWord(this)"><img src="images/icons/crossmark.png"></a></p>'));
    $('#keyword_field').val('');
    $('#keyword_field').focus();

}

//On focus out, add word
function addWordFromTextBox(){
  var val = $('#keyword_field').val();
  if(val !== undefined && val !== ''){
    addWord(val);
  }
}

//On key press, check for , or ;
function checkLetter(){
  var val = $('#keyword_field').val()
  if(val.length > 0){
    var letter = val.slice(-1);
    if(letter === ',' || letter === ';'){
      var word = val.slice(0,-1);
      if(word.length > 0){
        addWord(word);
      }
    }
  }
}

$('#keyword_field').blur(addWordFromTextBox);
$('#keyword_field').keyup(checkLetter);
$("#keyword_field").on("keydown",function search(e) {
    if(e.keyCode == 13) {
    }
});
$('#divKeywords').click(function(){ $('#keyword_field').focus(); });

