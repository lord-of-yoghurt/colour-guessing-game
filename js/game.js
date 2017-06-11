var numOfSquares   = 6;                                       // how many squares will be used depending on mode
var colors         = []                                       // array of randomly generated rgb values
var pickedColor    = null;                                    // color we're guessing

var squares        = document.querySelectorAll(".square");    // select all squares
var colorDisplay   = document.getElementById("colorDisplay"); // span that shows what color we're shooting for
var messageDisplay = document.getElementById("message");      // "Try again" / "Correct!" message span
var h1             = document.querySelector("h1");            // The h1, obviously
var resetButton    = document.querySelector("#reset");        //
var modeButtons    = document.querySelectorAll(".mode");      // the buttons

init();

function init() {
  setUpModeButtons();
  setUpSquares();
  reset();
}

function setUpModeButtons() {
  for (let i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener("click", function() {
      modeButtons[0].classList.remove("selected");
      modeButtons[1].classList.remove("selected");
      this.classList.add("selected");

      this.textContent === "Easy" ? numOfSquares = 3 : numOfSquares = 6;

      reset();
    });
  }
}

function setUpSquares() {
  for (let i = 0; i < squares.length; i++) {
    // click listeners
    squares[i].addEventListener("click", function() {
      // compare colour to pickedColor
      let clickedColor = this.style.backgroundColor;
      if (clickedColor === pickedColor) {
        messageDisplay.textContent = "Correct!";
        resetButton.textContent = "Play again?";
        h1.style.backgroundColor = clickedColor;
        changeColors(clickedColor);
      } else {
        this.style.backgroundColor = "#232323";
        messageDisplay.textContent = "Try again";
      }
    });
  }
}

resetButton.addEventListener("click", function() {
  reset();
});

function reset() {
  colors = generateColors(numOfSquares);
  // pick new random colour
  pickedColor = pickColor();
  // change colorDisplay
  colorDisplay.textContent = pickedColor;
  // change squares
  for (let i = 0; i < squares.length; i++) {
    if (colors[i]) {
      squares[i].style.display = "block";
      squares[i].style.backgroundColor = colors[i];
    } else {
      squares[i].style.display = "none";
    }
  }
  h1.style.backgroundColor = "steelblue";
  messageDisplay.textContent = null;
  resetButton.textContent = "New Colours";
}

function changeColors(color) {
  // loop through all the squares
  // and change each color to match given color
  for (let i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = color;
  }
}

function pickColor() {
  // pick a random number
  let random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

function generateColors(n) {
  // make an array
  let arr = [];
  // add n random colours to array
  for (let i = 0; i < n; i++) {
    arr.push(randomColor());
  }
  return arr;
}

function randomColor() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);

  return `rgb(${r}, ${g}, ${b})`;
}
