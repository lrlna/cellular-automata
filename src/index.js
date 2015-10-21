var cells; 

// let the games begin!
document.addEventListener("DOMContentLoaded", function() {
  cells = document.querySelectorAll(".cell");
  setRandom();
  changeStates();
})

// random initial state;
var setRandom = function() {
  [].forEach.call(cells, function(cell) {
    var number = getRandomInteger(0, 1);
    setActiveCells(number, cell);
  })
}

// change the states periodically;
var changeStates = function() {
  var row = cells[0].parentNode;
  var newCells = row.cloneNode(true); 
  var body = document.getElementById("automaton");
  cells = row.children;
  console.log(cells);
  body.appendChild(newCells);
  for (var i = 1; i < 15; i++) {
    handleTimeout(i);
  }
}

// next state;
var nextTurn = function() {
  [].forEach.call(cells, function(cell) {
    var right = cell.nextElementSibling;
    var left = cell.previousElementSibling;
    rule110(cell, right, left);
  })  
}

// follow rule 110 for finding out what to do with the cell;
function rule110(cell, right, left) {
  var cellActive = checkIfActive(cell);
  if (right) {
    var rightActive = checkIfActive(right);
  };
  if (left) {
    var leftActive = checkIfActive(left);
  }

  if (leftActive && cellActive && rightActive) {
    toggleClass(cell, "active", "inactive");
  } else if (leftActive && !cellActive && rightActive) {
    toggleClass(cell, "inactive", "active");
  } else if (!leftActive && !cellActive && rightActive) {
    toggleClass(cell, "inactive", "active");
  }
}

// GENERAL FUNCTIONS;
function handleTimeout(i) {
  setTimeout(nextTurn, i*1000);
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
  return cell.classList.contains("active");
}

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
