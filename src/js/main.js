require("./lib/ads");
var paywall = require("./lib/paywall");
setTimeout(() => paywall(11595997), 3000);


var catList = document.querySelectorAll(".filter-buttons");
var searchBox = document.querySelector(".filters .search");

var events = document.querySelectorAll(".event");
var resultBox = document.querySelector(".noResults");
var header = document.querySelector(".filters");
var sticky = header.offsetTop;
var hide = [];
var result; 

function filterByCategory(){
  if (hide.includes(this.dataset.category)){
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
    if (searchText.length>0){
      catList.forEach(function(element){
        hide = [];
        element.checked="checked"; 
      })
      events.forEach(function(element){
        var eventText = element.innerText.toLowerCase();
        if (eventText.search(searchText) == -1){
          element.style.display="none";
        }
        else{
          element.style.display="inline";
          result =+ 1;
        }
      })
      noResults();
    }
    else{
      events.forEach(function(element){
        element.style.display="none";
      })
      resultBox.style.display="block";
    }
  }

  else if (hide.length >= 0 && hide.length < 6){
    if (searchText.length == 0){
      events.forEach(function(element){
        if (hide.includes(element.dataset.category)){
          element.style.display="none";
        }
        else{
          element.style.display="inline";
          result =+1;
        }
      })
      noResults();
    }
    else if(searchText.length > 1){
      events.forEach(function(element){
        var eventText = element.innerText.toLowerCase();
        if (eventText.search(searchText) == -1 || hide.includes(element.dataset.category)){
          element.style.display="none";
        }
        else{
          element.style.display="inline";
          result =+ 1;
        }
      })
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

catList.forEach(function(element){
   element.addEventListener("click", filterByCategory);
})
searchBox.addEventListener("keyup", combineFilters);
window.onscroll = function() {fixNav()};

