// Declaring variables
var targetNumber;
var counter = 0;
var wins = 0;
var losses = 0;
// Declaring image array
var image = [];
image[0] = new Image();
image[0].src = 'assets/images/blue.png';
image[1] = new Image();
image[1].src = 'assets/images/green.png';
image[2] = new Image();
image[2].src = 'assets/images/red.png';
image[3] = new Image();
image[3].src = 'assets/images/yellow.png';
var crystals = $("#crystals");
// We begin by expanding our array to include four options.
var numberOptions = [];
function randNumbers() {
    targetNumber = Math.floor((Math.random() * 102) + 19);
    for (j = 0; j < 4; j++) {
        numberOptions[j] = Math.floor((Math.random() * 12) + 1);
    }
    $("#number-to-guess").text(targetNumber);
    $("#current-score").text(counter);
    console.log(numberOptions);
    for (var i = 0; i < numberOptions.length; i++) {

        // For each iteration, we will create an imageCrystal
          var imageCrystal = $("<img>");
      
        // First each crystal will be given the class ".crystal-image".
        // This will allow the CSS to take effect.
          imageCrystal.addClass("crystal-image");
      
        // Each imageCrystal will be given a src link to the crystal image
          imageCrystal.attr("src", image[i].src);
      
        // Each imageCrystal will be given a data attribute called data-crystalValue.
        // This data attribute will be set equal to the array value.
          imageCrystal.attr("data-crystalvalue", numberOptions[i]);
      
        // Lastly, each crystal image (with all it classes and attributes) will get added to the page.
          crystals.append(imageCrystal);
    }
}
randNumbers();
$("#wins").text(wins);
$("#losses").text(losses);
// function to clear scores and guesses after finishing game
function clear() {
    $("#number-to-guess").empty();
    $("#current-score").empty();
    $("#crystals").empty();
    counter = 0;
}

// This time, our click event applies to every single crystal on the page. Not just one.
crystals.on("click", ".crystal-image", function() {

  // Determining the crystal's value requires us to extract the value from the data attribute.
  // Using the $(this) keyword specifies that we should be extracting the crystal value of the clicked crystal.
  // Using the .attr("data-crystalvalue") allows us to grab the value out of the "data-crystalvalue" attribute.
  // Since attributes on HTML elements are strings, we must convert it to an integer before adding to the counter
  $("#result").empty();
  var crystalValue = ($(this).attr("data-crystalvalue"));
  crystalValue = parseInt(crystalValue);
  // We then add the crystalValue to the user's "counter" which is a global variable.
  // Every click, from every crystal adds to the global counter.
  counter += crystalValue;

  // All of the same game win-lose logic applies. So the rest remains unchanged.
  // alert("New score: " + counter);
  $("#current-score").text(counter);
  if (counter === targetNumber) {
    $("#result").text("You win!");
    wins++;
    clear();
    randNumbers();
  }
  else if (counter >= targetNumber) {
    $("#result").text("You Lose!");
    losses++;
    clear();
    randNumbers();
  }
  $("#wins").text(wins);
  $("#losses").text(losses);
});