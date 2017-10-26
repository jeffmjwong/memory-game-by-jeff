
Memory game!

8 pairs of cards are created for this game.

When the page is loaded, the 'shuffle' and 'creatHtml' functions will shuffle
the cards and display them in a grid structure on the page. The game page also
includes star rating display and moves counter to keep track of user performance.
There is also a refresh button on the page that let user to restart the game at
any time.

A timer will start when user click on the first card. When a card is clicked,
it will display its hidden symbol and when another card is clicked, the
'matchingCards' function will be triggered to see if the 2 cards match. If they
match, they will stay in a lock position; if they do not match, they will return
to their original position and their symbols stay hidden. The function will also
increment the moves counter by 1 each time it is triggered.

User will win the game when all the cards on the game page are matched. The
timer will stop and a new page will be created to show the winning messages and
game stats. The winning page will also have a 'Play Again' button that will
restart a new game when user clicks on it.

User performance indicators:
 - 3 stars are achieved by using less than 16 moves to complete the game.
 - 2 stars are achieved by using 16 to 20 moves to complete the game.
 - 1 star will be awarded by using more than 20 moves to complete the game.
 - Total time taken to complete the game will also be display on the winning page.
