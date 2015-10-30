var cells; 
var parentCells;

// let the games begin!
document.addEventListener("DOMContentLoaded", function() {
  parentCells = document.querySelectorAll(".cell");
  setRandom();
  changeStates();
})

// random initial state;
var setRandom = function() {
  [].forEach.call(parentCells, function(cell) {
    var number = getRandomInteger(0, 1);
    setActiveCells(number, cell);
  })
}

// change the states periodically;
var changeStates = function() {
  for (var i = 1; i < 100; i++) {
    handleTimeout(i);
  }
}

// next state;
var nextTurn = function() {
  duplicateCells();
  getSiblingCells(function() {
    // current cells become parent cells; 
    parentCells = cells; 
  })
}

var getSiblingCells = function(done) {
  [].forEach.call(parentCells, function(parentCell, index) {
    var right = parentCell.nextElementSibling;
    var left = parentCell.previousElementSibling;
    rule110(parentCell, right, left, index);
  })  
  done()
}

// follow rule 110 for finding out what to do with the cell;
var rule110 = function(parentCell, right, left, currentIndex) {
  // check if argument cells are active;
  var cellActive = checkIfActive(parentCell);
  var rightActive = checkIfActive(right);
  var leftActive = checkIfActive(left);

  // change based on (in)active;
  if (leftActive && cellActive && rightActive) {
    toggleClass(cells[currentIndex], "active", "inactive");
  } else if (leftActive && !cellActive && rightActive) {
    toggleClass(cells[currentIndex], "inactive", "active");
  } else if (!leftActive && !cellActive && rightActive) {
    toggleClass(cells[currentIndex], "inactive", "active");
  }
}

var duplicateCells = function() {
  var row = parentCells[0].parentNode;
  var newCells = row.cloneNode(true); 
  var body = document.getElementById("automaton");
  // duplicate cells are now the new cells -- BAMMMMM;
  cells = newCells.children;
  body.appendChild(newCells);
}

// GENERAL FUNCTIONS;
function handleTimeout(i) {
  setTimeout(nextTurn, i*100);
}

function toggleClass(element, removeClass, addClass) {
  element.classList.remove(removeClass);
  element.classList.add(addClass)
}

function setActiveCells(number, cell) {
  if (number === 1) {
    cell.classList.add("active");
  } else {
    cell.classList.add("inactive");
  }
}

function checkIfActive(cell) {
  var active;
  if (cell) {
    active = cell.classList.contains("active") ? true : false;
  } else {
    active = false;
  }
  return active;
}

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
