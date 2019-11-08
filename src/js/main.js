require("./lib/ads");
var paywall = require("./lib/paywall");
setTimeout(() => paywall(11595997), 3000);

var track = require("./lib/tracking");

var $ = require("./lib/qsa");
var debounce = require("./lib/debounce");
var scrollTo = require("./lib/animateScroll");

var catList = document.querySelectorAll(".filter-buttons");
//var grid = document.querySelector(".grid-container");
var searchBox = document.querySelector(".filters .search");
var events = document.querySelectorAll(".event");
var resultBox = document.querySelector(".noResults");


var hide = [];

function filterByCategory(){
  if (hide.includes(this.dataset.category)){
    indexCat = hide.indexOf(this.dataset.category);
    hide.splice(indexCat, 1);
  }
  else {
    hide.push(this.dataset.category);
  }

  if(hide.length >= 6){
    noResults();
  }

  events.forEach(function(element){
    if(hide.includes(element.dataset.category)){
      //console.log('in list');
      element.style.display="none";
    }
    else {
      //console.log('not in list');
      element.style.display="inline";
    }
  })
}

function filterBySearch(){
  var searchValue = searchBox.value.toLowerCase();
  var results = 0;

  events.forEach(function(element){
    var eventText = element.innerText.toLowerCase();
    if (eventText.search(searchValue) == -1){
      element.style.display="none";
    }
    else{
      element.style.display="inline";
      results =+ 1;
    }
  })

  if(results == 0){
    noResults();
  }
}

// function filterCombo(){
//   var results = 0;
//   var searchValue = searchBox.value.toLowerCase();

//   events.forEach(function(element){
//     var eventText = element.innerText.toLowerCase();

//     if(hide.includes(element.dataset.category) || (eventText.search(searchValue) == -1)){
//       //console.log('in list');
//       element.style.display="none";
//     }
//     else {
//       //console.log('not in list');
//       element.style.display="inline";
//     }
//   })

//   if((hide.length >= 6) || (results==0)){
//     noResults();
//   }

// }

function noResults(){
  resultBox.style.visibility="visible";
}

catList.forEach(function(element){
   element.addEventListener("click", filterByCategory);
})

searchBox.addEventListener("keyup", filterBySearch);


