require("./lib/ads");
var paywall = require("./lib/paywall");
setTimeout(() => paywall(11595997), 3000);

var track = require("./lib/tracking");

var $ = require("./lib/qsa");
var debounce = require("./lib/debounce");
var scrollTo = require("./lib/animateScroll");

var catList = document.querySelector(".filters .categories");
var grid = document.querySelector(".grid-container");
var searchBox = document.querySelector(".filters .search");

function search(){
  var re = document.getElementById('search');
  console.log(re);
}


searchBox.addEventListener("keyup", search);

require("component-responsive-frame/child");