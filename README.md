
# Memory Game
Memory game is a fairly popular game that can be developed just by using _HTML_,
_CSS_ and _Javascript_.

In this version of memory game, players will open 2 cards
at a time and see if they match or not. If they match, the cards will stay
faced up; and if they do not match, the cards will be hidden again. The game
will be won when all the cards are matched.

## Game Setup
The basic layout of the game page is written in _HTML_ and _CSS_. The main page
contains 3 main sections - _header_, _score-panel_ and _deck_:
- #### _Header_
The _header_ is just the name of the game.
- #### _Score-panel_
The _score-panel_ stores players' performance indicators such as _star rating_,
number of _moves_ made, a _timer_, and also a _restart_ button.
- #### _Deck_
The _deck_ stores all the _cards_ that are generated using _Javascript_ code.
The game consists a total of 16 _cards_, in which 8 pairs of them are identical.

## Game Play
Game playing interactions are written in _Javascript_. The following is the
list of steps to setup the game in _Javascript_:
1. After creating an _array_ of _cards_, the _cards_ then go into the `shuffle`
_function_ which randomize the position of the _cards_ in every game.

2. The `createHtml` _function_ then creates the `<html>` for every _cards_ and
insert them into the _DOM_, which sit inside the _deck_ section of the basic
layout of the game page. The _deck_ will have 16 'hidden' cards after this.

3. An _event listener_ is setup in order for the game to start. When players
click on the first card, the `startTimer` _function_ will be called and the game
will start. More information about the _timer_ will be explained in the
**Special Features** in this documentation.

4. Upon clicking a _card_, the `openCard` _function_ will 'open' the _card_ and
show the symbol of the _card_. Clicking a second _card_ will then 'open' the
second _card_ and the `matchingCards` _function_ will be called to match the
_cards_. If the 2 _cards_ match, the `rightGuess` _function_ will be triggered
and they will stay in a 'lock' position; if they do not match, the `wrongGuess`
_function_ will then be triggered and they will be 'hidden' again until player
match them with their identical pair.

5. When players matched all the _cards_, the `win` _function_ will run
indicating that the game has been completed. This _function_ creates a modal
page which shows a winning message and players' stats. A _button_ for players
to play again will also be created.   

## Dependencies
The game is designed with beautiful background and attractive interactions. To
make sure these components work as they should, the following code should be
included in the `<head>` section of the _HTML_:
```
<link rel="stylesheet" href="css/app.css">
<link rel="stylesheet prefetch" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css">
<link rel="stylesheet prefetch" href="https://fonts.googleapis.com/css?family=Coda">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
```
and this line of code at the last line in the `<body>` section:
```
<script src="js/app.js"></script>
```

## Special Features

Special features are what that make the game stands out!

- #### _Star Rating_
The _star rating_ depends on the total number of _moves_ a player makes to
complete the game. It will then display on the modal page when players win the
game.

  - 3 _stars_ are achieved by using less than 16 _moves_ to complete the game.
  - 2 _stars_ are achieved by using 16 to 20 _moves_ to comeplete the game.
  - 1 _star_ will be awarded by using more than 20 _moves_ to complete the game.

- #### _Number of Moves_
When players opened 2 _cards_ at anytime, the `addingMoves` _function_ will be
triggered and the _moves_ counter on the game page increment by 1. When players
finished the game, the total number of _moves_ they have made will be displayed.

- #### _Timer_
As mentioned in the **Game Play** section, the _timer_ will start when players
clicked the first _card_. When players clicked the last 'hidden' _card_ of the
game, the _timer_ will stop and the `timeCounter` _function_ will calculate
the total time used to complete the game in terms of _minutes_ and _seconds_,
then display them on the modal page.

- #### _Restart Game_
There is a _button_ positioned at the right above the _deck_ section of the game
page that once clicked, will _restart_ the game and reset all stats of the
current game. This is done by setting a _event listener_ on the _refresh-like_
symbol on the game page.
