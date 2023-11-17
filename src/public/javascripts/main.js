// main.js
//wed - in-class activity on ajax and events 

function main() {
    let playerHand = [];
    let computerHand = [];
    let deck = [];
    //let gameHistory = [];

    function handleFormSubmit(event) {
        
        event.preventDefault();
        document.querySelector('.start').classList.add('hidden');

        createCardDisplayArea();
        createHitAndStandButtons();
        dealCards();


    }

    function createCardDisplayArea() {
        const cardDisplayArea = document.createElement('div');
        cardDisplayArea.classList.add('card-display');
        document.querySelector('.game').appendChild(cardDisplayArea);
        
        const result = document.createElement('div');
        result.classList.add('result');
        document.querySelector('.game').appendChild(result);
    }

    function createHitAndStandButtons() {
        const buttonDisplayArea = document.createElement('div');
        buttonDisplayArea.classList.add('button-display');
        document.querySelector('.game').appendChild(buttonDisplayArea);

        const hitButton = document.createElement('button');
        hitButton.textContent = 'Hit';
        hitButton.id = 'hitButton';

        const standButton = document.createElement('button');
        standButton.textContent = 'Stand';
        standButton.id = 'standButton';

        hitButton.addEventListener('click', handleHit);
        standButton.addEventListener('click', handleStand);

        //move them below card display area
        document.querySelector('.button-display').appendChild(hitButton);
        document.querySelector('.button-display').appendChild(standButton);
        //document.querySelector('.card-display').appendChild(standButton);


    }

    function generateDeck(topCards) {
        const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
        const faces = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

        for (const face of faces) {
            for (const suit of suits) {
                deck.push({ face, suit });
            }
        }

        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }

        if (topCards.length > 0) {
            for (let i = 0; i < topCards.length; i++) {
                deck.pop(); 
            }
            topCards = topCards.map( (face) => ({ face, suit: 'diamonds' }));
            topCards.reverse();
            deck.push(...topCards);
        }

        return deck;
    }

    function dealCards() {
        const userInput = document.getElementById('startValues').value;
        const topCards = userInput ? userInput.split(',') : [];

        console.log("Top Cards: ", topCards);

        deck = generateDeck(topCards);
       
        console.log("Final Deck: ", deck); 

        playerHand = [];
        computerHand = [];

        for (let i = 0; i < 4; i++) {
            const card = deck.pop();
            console.log(card); 
            i % 2 === 0 ? computerHand.push(card) : playerHand.push(card);
        }

        console.log("Computer Hand: ", computerHand);
        console.log("Player Hand: ", playerHand);

        displayCards(playerHand, computerHand);
        updateTotalDisplay(playerHand, computerHand);
    }

    function createCardElement(card) {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.textContent = card.face;
        cardElement.style.rotate = `${Math.random() * 20 - 10}deg`;
        return cardElement;
    }

    function displayCards(playerHand, computerHand) {
        const cardDisplayArea = document.querySelector('.card-display');

        const [computerTotalElement, computerHandElement ] = createHandElement(computerHand, true);
        cardDisplayArea.appendChild(computerTotalElement);
        cardDisplayArea.appendChild(computerHandElement);

        const [playerTotalElement, userHandElement] = createHandElement(playerHand, false);
        cardDisplayArea.appendChild(playerTotalElement);
        cardDisplayArea.appendChild(userHandElement);
    }

    function createHandElement(hand, isComputer) {
        let playerTotal; 
        
        const handTotalElement = document.createElement('div');
        if (isComputer) {
            handTotalElement.classList.add('computer-total');
            handTotalElement.textContent = 'Computer Hand - Total: ?';
        } else 
        {
            playerTotal = calculateHandTotal(hand);
            handTotalElement.classList.add('player-total');
            handTotalElement.textContent = `Player Hand - Total: ${playerTotal}`
        }

        const handElement = document.createElement('div');
        if (isComputer) {
            handElement.classList.add('computer-hand'); 
        } else {
            
            handElement.classList.add('player-hand');
           
        }

        hand.forEach((card, index) => {
            const cardElement = createCardElement(card);

            if (index === 0 && isComputer) {
                cardElement.classList.add('hidden');
                cardElement.textContent = '?';
            }

            handElement.appendChild(cardElement);
        });

        return [handTotalElement, handElement];
    }

    function calculateHandTotal(hand) {
        let total = 0;
        let numberOfAces = 0;

        for (const card of hand) {
            if (card.face === 'A') {
                numberOfAces++;
                total += 11;
            } else if (card.face === 'K' || card.face === 'Q' || card.face === 'J') {
                total += 10;
            } else {
                total += parseInt(card.face);
            }
        }

        while (total > 21 && numberOfAces > 0) {
            total -= 10;
            numberOfAces--;
        }

        return total;
    }

    function updateTotalDisplay(playerHand, computerHand) {
        const playerTotal = calculateHandTotal(playerHand);
        const computerTotal = calculateHandTotal(computerHand);

        console.log("Player Total:", playerTotal);
        console.log("Computer Total:", computerTotal);

        document.querySelector('.player-total').textContent = `Player Hand - Total: ${playerTotal}`; 
        document.querySelector('.computer-total').textContent = `Computer Hand - Total: ?`;

    }

    
    function handleHit() {
        const nextCard = dealCard();
        playerHand.push(nextCard);

        console.log("Player hand after hit: ", playerHand); 

        const cardElement = createCardElement(nextCard);
        document.querySelector('.player-hand').appendChild(cardElement);

        updateTotalDisplay(playerHand, computerHand);
         
     
        if (calculateHandTotal(playerHand) > 21) {
                endUserTurn();
                determineWinner();
            }
        
        }

    function handleStand() {
        endUserTurn();
        handleComputerTurn();
    }

    function endUserTurn() {
        document.getElementById('hitButton').disabled = true;
        document.getElementById('standButton').disabled = true;
    }

    function handleComputerTurn() {
        while (calculateHandTotal(computerHand) < 17) {
            const nextCard = dealCard();
            computerHand.push(nextCard);

            const cardElement = createCardElement(nextCard);
            document.querySelector('.computer-hand').appendChild(cardElement);
        }
        determineWinner();
    }

    function determineWinner() {
        const resultArea = document.querySelector('.result');
        const playerTotal = calculateHandTotal(playerHand);
        const computerTotal = calculateHandTotal(computerHand);

        const computerTotalDisplay = document.querySelector('.computer-total');
        computerTotalDisplay.textContent = `Computer Hand - Total: ${computerTotal}`;

        // Display the hidden card in the computer's hand
        const hiddenCard = document.querySelector('.computer-hand .card.hidden');
        hiddenCard.classList.remove('hidden');
        hiddenCard.textContent = computerHand[0].face; 

        if (playerTotal > 21 || (computerTotal <= 21 && computerTotal > playerTotal)) {
            resultArea.textContent = 'Player Lost! (Bust)';
        } else if (playerTotal === computerTotal) {
            resultArea.textContent = 'It\'s a tie!';
        } else {
            resultArea.textContent = 'Player wins!';
        }
    }

    function dealCard() {
        return deck.pop();
    }

    
    /////extra credit part starts here

// function showGameHistory() {
//     // Use fetch to get the game history from your Express API
//     fetch('/api/game-history')
//       .then((response) => response.json())
//       .then((history) => {
//         // Process and display the game history
        
//         gameHistory = history;
//         console.log("here", gameHistory);
//         displayGameHistory(history);
//       })
//       .catch((error) => console.error('Error fetching game history:', error));
//   }
  
//   function displayGameHistory(history) {
//     // Clear the current content of the page
//     console.log('displaying:', history);
//     document.body.innerHTML = '';
  
//     // Display the game history
//     const historyContainer = document.createElement('div');
//     historyContainer.textContent = 'Game History';
//     historyContainer.style.backgroundColor = 'white'; 
//     historyContainer.classList.add('game-history');
  
//     // Iterate through the history and display each entry
//     history.forEach((entry) => {
//       const entryElement = document.createElement('div');
//       entryElement.textContent = `Computer: ${entry.computerScore}, User: ${entry.userScore}, Initials: ${entry.initials}`;
//       historyContainer.appendChild(entryElement);
//     });
  
//     document.body.appendChild(historyContainer);
  
//     // Add a form to allow the user to enter their initials
//     const initialsForm = document.createElement('form');
//     initialsForm.innerHTML = `
//       <label for="initials">Enter your initials:</label>
//       <input type="text" id="initials" name="initials" required>
//       <button type="submit">Submit</button>
//     `;
  
//     initialsForm.addEventListener('submit', function (event) {
//       event.preventDefault();
//       const userInitials = document.getElementById('initials').value;
  
//       // Save the results of the current hand to the database
//       saveHandToDatabase(userInitials);
  
//       // Refresh the game history display
//       showGameHistory();
//     });
  
//     document.body.appendChild(initialsForm);
//   }
  
//   function saveHandToDatabase(userInitials) {
//     // Save the results of the current hand to the game history array
//     const currentHand = {
//       computerScore: calculateHandTotal(computerHand),
//       userScore: calculateHandTotal(playerHand),
//       initials: userInitials,
//     };
  
//     fetch('http://localhost:3000/api/game-history', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify([...gameHistory, currentHand]),
//   })
//     .then(response => response.json())
//     .then(data => console.log(data))
//     .catch(error => console.error('Error updating game history:', error));

//     //gameHistory.push(currentHand);
//   }


//   function createHistoryButton() {
//     const historyButton = document.createElement('button');
//     historyButton.textContent = 'History';
//     historyButton.id = 'historyButton';

//     historyButton.addEventListener('click', showGameHistory);
        
//     //move them below card display area
//     document.querySelector('.button-display').appendChild(historyButton);
//   }
  ////ends here
    


  
    document.querySelector('.playBtn').addEventListener('click', handleFormSubmit);
    
    
}



document.addEventListener('DOMContentLoaded', main);
