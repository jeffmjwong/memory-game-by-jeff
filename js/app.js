
var cards = [
  "diamond", "diamond", "paper-plane-o", "paper-plane-o",
  "anchor", "anchor", "bolt", "bolt",
  "cube", "cube", "leaf", "leaf",
  "bicycle", "bicycle", "bomb", "bomb"
]

function shuffle(array) {
  /*
  Behavior: This function shuffles the order of elements in an array.
  Input: Any array with 2 or more elements.
  Output: Array with the order of elements inside the array shuffled.
  */
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
}

function createHtml(array) {
  /*
  Behavior: This function creates HTML for every element in an array and insert
            them into the targeted DOM.
  Input: Any array with elements in it.
  Output: DOM with additional HTML that was created using every elements inside
          the input array.
  */
  for (var index = 0; index < array.length; index++) {
    var cardsHtml = "<li class=\"front\"><i class=\"fa fa-" +
      array[index] + "\"><p class=\"symbol\">" + array[index] + "</p></i></li>";
    $('.deck').append(cardsHtml);
  }
}

shuffle(cards); createHtml(cards);

$(function() {

  var gameStart = true, listOpen = [], listMatch = [], moves = 0, stars = 3;
  var startTime = "", endTime = "";
  /*
  These are starting variables before the game starts. The game starts when
  user first click on any card. As the game progresses, these variables will
  change corresponding to user performance.
  */

  function displayTimeString(num) {
      return ( num < 10 ? "0" : "" ) + num;
  }

  function startTimer() {
    /*
    Behavior: This function records the starting time and starts the timer on
              game screen when user starts the game by clicking the first card.
    Input: None.
    Output: None.
    */
    if (gameStart === true) {
      startTime = (new Date()).getTime();
      var start = new Date;
      setInterval(function() {
        var total_seconds = (new Date - start) / 1000;

        var hours = Math.floor(total_seconds / 3600);
        total_seconds = total_seconds % 3600;

        var minutes = Math.floor(total_seconds / 60);
        total_seconds = total_seconds % 60;

        var seconds = Math.floor(total_seconds);

        hours = displayTimeString(hours);
        minutes = displayTimeString(minutes);
        seconds = displayTimeString(seconds);

        var currentTimeString = hours + ":" + minutes + ":" + seconds;

        $('.timer').text(currentTimeString);
      }, 100);
    }
  }

  function openCard(currentCard) {
    /*
    Behavior: This function opens and shows a card when user clicks on it. It
              then adds the opened card to the listOpen array which stores
              cards that are already opened by user.
    Input: The current card being clicked by user.
    Output: None.
    */
    currentCard.addClass('back').removeClass('front');
    listOpen.push(currentCard.text());
  }

  function addingMoves() {
    /*
    Behavior: This function adds one and updates the moves counter whenever user
              had a right or wrong guess. When user reaches 16 moves, the
              3 stars display will move down to 2 stars; when user reaches 21
              moves, 2 stars display will move down to 1 star. The moves and
              star rating will then display on the screen when user wins the game.
    Input: None.
    Output: Updates the moves counter and stars display.
    */
    moves += 1;
    if (moves === 16) {
      $('.2stars').removeClass('fa-star').addClass('fa-star-o');
      stars -= 1;
    } if (moves === 21) {
        $('.1star').removeClass('fa-star').addClass('fa-star-o');
        stars -= 1;
      }
    $('.moves').text(moves);
  }

  function rightGuess() {
    /*
    Behavior: When user matches 2 identical cards, the cards will then lock
              in the opened position. The matching cards will be added to the
              listMatch array which stores cards that are already matched by
              user. The listOpen array that stores opened cards will then
              return back to an empty array.
    Input: None.
    Output: Lock matching cards and empty the listOpen array.
    */
    $('.back').addClass('match').removeClass('back');
    listMatch.splice(0, 0, listOpen[0], listOpen[1]);
    listOpen = [];
  }

  function wrongGuess() {
    /*
    Behavior: When user does not match 2 identical cards, the cards will then
              be hidden again. The listOpen array will return back to an empty
              array.
    Input: None.
    Output: Hide unmatched cards and empty the listOpen array.
    */
    $('.back').addClass('front').removeClass('back notmatch');
    listOpen = [];
  }

  function matchingCards() {
    /*
    Behavior: This function compares 2 cards that was opened by user, and see
              if they match each other or not. If they match, an effect will
              run followed by addingMoves and rightGuess functions. If they
              do not match, another effect will run followed by addingMoves
              and wrongGuess functions.
    Input: Cards inside listOpen array.
    Output: Animation effects and subsequent functions.
    */
    if (listOpen[0] === listOpen[1]) {
      $('.back').effect('bounce', 'swing', 'slow');
      addingMoves();
      setTimeout(rightGuess, 10);
    } else {
        $('.back').addClass('notmatch');
        $('.back').effect('shake', 'swing', 'slow');
        addingMoves();
        setTimeout(wrongGuess, 800);
      }
  }

  function timeCounter() {
    /*
    Behavior: This function calculates the total time to complete the game by
              user, and then displays it to the winning page in terms of minutes
              and seconds.
    Input: Total time to complete the game.
    Output: A string containing minutes and seconds used to complete the game.
    */
    var seconds, minutes, totalSeconds = (endTime - startTime)/1000;
    if (totalSeconds >= 60) {
      seconds = Math.trunc(totalSeconds % 60);
      minutes = Math.trunc(totalSeconds / 60);
      return minutes + " minute(s) and " + seconds + " second(s) ";
    } else {
        return Math.trunc(totalSeconds) + " second(s) ";
    }
  }

  function win() {
    /*
    Behavior: This function will only triggers when user wins the game. It
              creates a new page displaying various messages including
              congratulation message and game stats. It will also creates a
              button for user to play the game again.
    Input: None.
    Output: A new page showing winning stats and messages.
    */
    $('body').remove();
    var checkMark = "<div class=\"box-1\"><img class=\"image1\" src=\"https://openclipart.org/download/177571/dwcheckyes.svg\"></div>";
    var congrats = "<div class=\"box-2\"><span class=\"message1\">Congratulations! You won!</span></div>";
    var statsOne = "<span class=\"message2\">With " + moves + " Moves and " + stars + " Stars.</span>";
    var statsTwo = "<span class=\"message3\">You used " + timeCounter() + "to compelete the game!</span>";
    var stats = "<div class=\"box-3\">" + statsOne + statsTwo + "</div>";
    var playAgain = "<div class=\"box-4\"><button class=\"button1\">Play again!</button></div>";
    var winningMessage = "<body><div class=\"container\"><div class=\"box\">" + checkMark + congrats + stats + playAgain + "</div></div></body>";
    $(winningMessage).insertAfter('head');
  }

  $(document).on('click', '.button1', function() {
    // This is the 'Play Again' button on the winning page that restarts the game.
    location.reload();
  });

  $(document).on('click', '.front', function() {
    /*
    First click on any card on the game page will start the game and timer.
    When a card is clicked, it will show the hidden symbol; clicking another
    card will trigger the function to match the card. Clicking the last
    remaining card will end the game and timer, and a new winning page will
    be shown displaying game stats and winning messages.
    */
    startTimer();
    gameStart = false;
    if (listOpen.length === 1) {
      if (listMatch.length === 14) {
        openCard($(this));
        matchingCards();
        endTime = (new Date()).getTime();
        setTimeout(win, 1000);
      } else {
          openCard($(this));
          matchingCards();
        }
    } if (listOpen.length === 0) {
        openCard($(this));
      }
  });

  $(document).on('click', '.fa-repeat', function() {
    // This is the 'refresh' symbol on the game page that lets user to restart the game.
    var r = confirm("Restart game?");
    if (r == true) {
        location.reload();
    }
  });

})
