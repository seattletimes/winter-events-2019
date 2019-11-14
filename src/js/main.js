var paywall = require("./lib/paywall");
setTimeout(() => paywall(12169135), 3000);

var catList = document.querySelectorAll(".filter-buttons");
var searchBox = document.querySelector(".filters .search");

// $(".event")
var events = document.querySelectorAll(".event");
var resultBox = document.querySelector(".noResults");
var header = document.querySelector(".filters");
var sticky = header.offsetTop;
var eventGrid = document.querySelector(".event-grid");
var clearSearch = document.querySelector(".clear-search");
var allEventsButton = document.querySelector(".all-events");
var show = [];
var result; 



function filterByCategory(){
  if (show.indexOf(this.dataset.category) > -1){
    indexCat = show.indexOf(this.dataset.category);
    show.splice(indexCat, 1);
  }
  else {
    show.push(this.dataset.category);
  }
  if(show.length > 0){
    allEventsButton.checked="";
  }
  combineFilters();
}


function combineFilters(){
  result = 0;
  var searchText = searchBox.value.toLowerCase();

  if(show.length > 0){
    if(searchText.length == 0){
      for(var z = 0; z<events.length; z++){
        if(show.indexOf(events[z].dataset.category) > -1){
          events[z].style.display="inline";
        }
        else{
          events[z].style.display="none";
          result += 1;
        }
      }
      noResults();
    }
    else if(searchText.length > 0){
      for( var a = 0; a<events.length; a++){
        var eventText = events[a].innerText.toLowerCase();
        if (eventText.search(searchText) == -1 && (show.indexOf(events[a].dataset.category) != -1) ){
          events[a].style.display="inline";
        }
        else{
          events[a].style.display="none";
          result =+ 1;
        }
      }
      noResults();
    }
  } 
  else{
    noResults();
  }   
}

function noResults(){
  if (result==0){
    resultBox.style.display="block";
  }
  else{
    resultBox.style.display="none";
  }
}

function fixNav(){
  if(window.pageYOffset > sticky) {
    header.classList.add("sticky");
    } 
  else{
    header.classList.remove("sticky");
  }
}

function allEvents(){
  show = [];
  searchBox.value = "";
  allEventsButton.checked="checked";
  for(var x = 0; x < catList.length; x++){
    catList[x].checked="";
  }
  for(var i = 0; i<events.length; i++){
    events[i].style.display="inline";
  }  
}

function clearSearchBox(){
  searchBox.value = "";
  clearSearch.style.display="none";

  combineFilters();
}

function detectIE() {
  if(navigator.userAgent.match(/Trident.*rv:11\./)) {
    console.log("ie11");
    eventGrid.classList.add("ie11");
  }
}

function catListener(){
  for(var x = 0; x < catList.length; x++){
    catList[x].addEventListener("click", filterByCategory);
  }
}
catListener();

function searchListener(){
  allEventsButton.checked="";
  clearSearch.style.display="inline";
  combineFilters();
}


clearSearch.addEventListener("click", clearSearchBox);
allEventsButton.addEventListener("click", allEvents);
searchBox.addEventListener("keyup", searchListener);
window.onscroll = function() {fixNav()};
detectIE();

window.onload = function() {
  console.log("loaded");
  for(var x = 0; x < catList.length; x++){
  catList[x].checked="";
}}

