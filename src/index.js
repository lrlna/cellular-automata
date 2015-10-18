var cells; 

document.addEventListener("DOMContentLoaded", function() {
  cells = document.querySelectorAll(".cell");
  setRandom();
  window.setTimeout(changeStates, 5000);
})

var setRandom = function() {
  [].forEach.call(cells, function(cell) {
    var number = getRandomInteger(0, 1);
    setActiveCells(number, cell);
  })
}

var changeStates = function() {
  
}

function setActiveCells(number, cell) {
  if (number === 1) {
    cell.classList.add("active");
  } else {
    cell.classList.add("inactive");
  }
}

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
