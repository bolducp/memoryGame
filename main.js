"use strict";

var gameApp = {};
gameApp.firstTileSelected = false;
//gameApp.firstSelectedTileNum;
gameApp.$firstSelectedTile;
//gameApp.secondTileNum;
gameApp.$secondTile;


$(document).ready(init);

function init(){
  var cardDeck = makeDeckCards();
  var shuffledDeck = shuffleDeck(cardDeck);
  appendCardstoDOM(shuffledDeck);
  $('.tile').click(tileClicked);

}


// Initialize game

function makeDeckCards(){
  var puppyTiles = [];
  for (var i = 1; i < 9; i++){
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
  var currentIndex = array.length, temporaryValue, randomIndex;

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
    //gameApp.firstSelectedTileNum = $(this).data("tile");
    gameApp.$firstSelectedTile = $(this);
    console.log(gameApp.$firstSelectedTile, "!");

    selectTile();
  } else {
    //gameApp.secondTileNum = $(this).data("tile");
    gameApp.$secondTile = $(this);
    secondTileClick();
  }
}

function selectTile(){
  gameApp.firstTileSelected = true;
  console.log(gameApp.$firstSelectedTile, "!!");
  gameApp.$firstSelectedTile.children().first().addClass("reveal");

  console.log("this", gameApp.$firstSelectedTile)
  console.log("selected tile num", gameApp.firstSelectedTileNum)
}


function secondTileClick(){
  gameApp.$secondTile.children().first().addClass("reveal");
  checkForMatch();
}


function checkForMatch(){
  var firstPupNum = gameApp.$firstSelectedTile.children().first().data("pupNum")
  var secondPupNum = gameApp.$secondTile.children().first().data("pupNum")
  console.log("first pup", firstPupNum);
  console.log("second pup", secondPupNum);
  //if (firstPupNum === secondPupNum){
    //add some animation here

  // } else {
  //
  //   gameApp.firstTileSelected = false;
  // }

}


function checkWin(){

}
