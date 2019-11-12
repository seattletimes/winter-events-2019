require("./lib/ads");
var paywall = require("./lib/paywall");
setTimeout(() => paywall(11595997), 3000);

// var processorsArray = [
//   require('autoprefixer')({ grid:true, browsers: ['>1%']  })
// ];

var catList = document.querySelectorAll(".filter-buttons");
var searchBox = document.querySelector(".filters .search");

// $(".event")
var events = document.querySelectorAll(".event");
var resultBox = document.querySelector(".noResults");
var header = document.querySelector(".filters");
var sticky = header.offsetTop;
var eventGrid = document.querySelector(".event-grid");
var hide = [];
var result; 



function filterByCategory(){
  if (hide.indexOf(this.dataset.category) > -1){
    indexCat = hide.indexOf(this.dataset.category);
    hide.splice(indexCat, 1);
  }
  else {
    hide.push(this.dataset.category);
  }
  combineFilters();
}


function combineFilters(){
  result = 0;
  var searchText = searchBox.value.toLowerCase();
  if(hide.length == 6){
    if(searchText.length>0){
      for(var i = 0; i<catList.length; i++){
        hide = []
        catList[i].checked="checked";
      }
      for(var x = 0; x<events.length; x++){
        var eventText = events[x].innerText.toLowerCase();
        if(eventText.search(searchText) == -1){
          events[x].style.display="none";
        }
        else{
          events[x].style.display="inline";
          result+=1;
        }
      }
      noResults();
    }
    else{
      for(var y=0; y<events.length; y++){
        events[y].style.display="none";
      }
      resultBox.style.display="block";
    }
  }
  else if(hide.length >= 0 && hide.length < 6){
    if(searchText.length == 0){
      for(var z = 0; z<events.length; z++){
        if(hide.indexOf(events[z].dataset.category) > -1){
          events[z].style.display="none";
        }
        else{
          events[z].style.display="inline";
          result += 1;
        }
      }
      noResults();
    }
    else if(searchText.length > 1){
      for( var a = 0; a<events.length; a++){
        var eventText = events[a].innerText.toLowerCase();
        if (eventText.search(searchText) == -1 || (hide.indexOf(events[a].dataset.category) > -1) ){
          events[a].style.display="none";
        }
        else{
          events[a].style.display="inline";
          result =+ 1;
        }
      }
      noResults();
    }
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

searchBox.addEventListener("keyup", combineFilters);
window.onscroll = function() {fixNav()};
detectIE();

