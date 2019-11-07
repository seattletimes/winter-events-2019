require("./lib/ads");
var paywall = require("./lib/paywall");
setTimeout(() => paywall(11595997), 3000);

var track = require("./lib/tracking");

var $ = require("./lib/qsa");
var debounce = require("./lib/debounce");
var scrollTo = require("./lib/animateScroll");

var catList = document.querySelectorAll(".filter-buttons");
var grid = document.querySelector(".grid-container");
var searchBox = document.querySelector(".filters .search");
var events = document.querySelectorAll(".event");


var show = [];

//debug so that the list is 100% correct. Right now it updates well but there is a bug when you filter items out after including them
function filterByCategory(){
  if (show.includes(this.dataset.category)){
    show.pop(this.dataset.category);
  }
  else {
    show.push(this.dataset.category);
  }

  events.forEach(function(element){
    if(show.includes(element.dataset.category)){
      //console.log('in list');
      element.style.display="inline";
    }
    else {
      //console.log('not in list');
      element.style.display="none";
    }
    //console.log(element.dataset.category);
  })
  console.log(show);
  //console.log(this.dataset.category);
}

function filterBySearch(){
  var searchValue = searchBox.value.toLowerCase();
  events.forEach(function(element){

    var eventText = element.innerText.toLowerCase();


    if (eventText.search(searchValue) == -1){
      element.style.display="none";
    }
    else{
      element.style.display="inline";
    }
  })
}

catList.forEach(function(element){
   element.addEventListener("click", filterByCategory);

})

searchBox.addEventListener("keyup", filterBySearch);


