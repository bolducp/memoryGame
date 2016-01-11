"use strict";

(function(){

var gameApp = {};
gameApp.numTiles;
gameApp.firstTileSelected = false;
gameApp.firstSelectedTileNum;
gameApp.$firstSelectedTile;
gameApp.secondTileNum;
gameApp.$secondTile;
gameApp.doneTiles = [];


$(document).ready(init);

function init(){
  clickHandler();
}

function clickHandler(){
  $('.tile').click(tileClicked);
  $('#reset').click(reset);
  $('#start').click(startGame);
}

function startGame(event){
  event.preventDefault();
  gameApp.numTiles = $('#quantity').val();
  makeBoard(gameApp.numTiles);
  var cardDeck = makeDeckCards(gameApp.numTiles);
  var shuffledDeck = shuffleDeck(cardDeck);
  appendCardstoDOM(shuffledDeck);
}

// Initialize game
function makeBoard(numTiles){
  for (var i = 1; i < +numTiles + 1; i++){
  $("#board").append("<div class='col-xs-3 tile' data-tile=" + i +"></div>")
  }
  $('.tile').click(tileClicked);
  $('#start').off('click');
}

function makeDeckCards(numTiles){
  var puppyTiles = [];
  for (var i = 1; i < numTiles / 2 + 1; i++){
    var $card = $('<img>').attr( { height:"100px", width:"110px" } ).data("pupNum", i);
    var $cardClone = $('<img>').attr( { height:"100px", width:"110px" } ).data("pupNum", i);

    $card.attr('src', 'static/pup' + i + '.jpg');
    $cardClone.attr('src', 'static/pup' + i + '.jpg');
    puppyTiles.push($card);
    puppyTiles.push($cardClone);
  }
  return puppyTiles;
}

// Fisher-Yates (aka Knuth) Shuffle algorithm
function shuffleDeck(array){
  var currentIndex = array.length;
  var temporaryValue, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function appendCardstoDOM(deck){
  var numCardsToMake = deck.length + 1;
  for (var i = 1; i < numCardsToMake; i++){
    var $card = deck.pop();
    $('[data-tile=' + i +']').prepend($card);
  }
}

function tileClicked(event){

  if (!gameApp.firstTileSelected){
    gameApp.firstSelectedTileNum = $(this).data("tile");
    gameApp.$firstSelectedTile = $(this);
    selectTile();

  } else {
    gameApp.secondTileNum = $(this).data("tile");
    gameApp.$secondTile = $(this);
    $('.tile').off('click');
    setTimeout(function(){
      $('.tile').click(tileClicked);
    }, 800);
    secondTileClick();
  }
}

function selectTile(){
  gameApp.firstTileSelected = true;
  gameApp.$firstSelectedTile.children().first().addClass("reveal");
}

function secondTileClick(){
  if(gameApp.firstSelectedTileNum === gameApp.secondTileNum ||
      gameApp.doneTiles.indexOf(gameApp.secondTileNum) > -1){
    return;
  }
  gameApp.$secondTile.children().first().addClass("reveal");
  checkForMatch();
}

function checkForMatch(){
  var $firstPup = gameApp.$firstSelectedTile.children().first()
  var $secondPup = gameApp.$secondTile.children().first()

  if ($firstPup.data("pupNum") === $secondPup.data("pupNum")){
    //add some animation here
    $secondPup.addClass("reveal");
    gameApp.$firstSelectedTile.css("background-color", "PeachPuff");
    gameApp.$secondTile.css("background-color", "PeachPuff");
    gameApp.doneTiles.push(gameApp.firstSelectedTileNum, gameApp.secondTileNum);
    gameApp.firstTileSelected = false;
    setTimeout(checkForWin, 200);

  } else {
    setTimeout(hidePuppies, 900);
    gameApp.firstTileSelected = false;
  }

  function hidePuppies(){
    $firstPup.removeClass('reveal');
    $secondPup.removeClass('reveal');
  }
}

function checkForWin(){
  if (gameApp.doneTiles.length === +gameApp.numTiles)
  {
    $('h1').text("You win!").addClass("animated swing");
    $('.tile').addClass("animated bounce");
    $('body').css("background-color", "LemonChiffon ");
  }
}

function reset(){
  location.reload();
}

});
