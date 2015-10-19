var cells; 

document.addEventListener("DOMContentLoaded", function() {
  cells = document.querySelectorAll(".cell");
  setRandom();
  changeStates();
})

var setRandom = function() {
  [].forEach.call(cells, function(cell) {
    var number = getRandomInteger(0, 1);
    setActiveCells(number, cell);
  })
}

var changeStates = function() {
  for (var i = 1; i < 15; i++) {
    handleTimeout(i);
  }
}

function handleTimeout(i) {
  setTimeout(nextTurn, i*1000);
}

var nextTurn = function() {
  [].forEach.call(cells, function(cell) {
    var right = cell.nextElementSibling;
    var left = cell.previousElementSibling;
    rule110(cell, right, left);
  })  
}

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
