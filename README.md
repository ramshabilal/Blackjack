# One Hand of Blackjack

## Overview

One Hand of Blackjack is a simple client-side card game where a user competes against the computer in a single hand of blackjack. The game is implemented using HTML, CSS, and JavaScript and is designed to run in a web browser.

## Features

- **Two-player Blackjack:** Play a hand of blackjack against the computer.
- **Card Dealing:** Initial cards are dealt to both the user and the computer. Users can hit to get more cards or stand to keep their hand.
- **Game Logic:** The game handles card values, user input, and game outcomes (win, loss, or tie).
- **Instructions Toggle:** A button to view detailed instructions on how to play the game.

## Technologies Used

- **HTML5:**
- **CSS3:** 
- **JavaScript:** 
- **Express and NodeJS:** 

## How to Play

1. **Start Values:** Enter a comma-separated list of card faces (e.g., `2,3,4,5,10,J,Q,K,A`) into the "Start Values" field. These values determine the order of cards dealt at the beginning.
2. **Play the Game:**
   - Click the "Play" button to start the game.
   - The computer and user will be dealt two cards each. The computer's first card is hidden.
   - Decide whether to "Hit" (get another card) or "Stand" (keep your current hand).
   - If your hand exceeds 21, you lose immediately.
   - The computer will then play based on a set strategy.
   - The player with a hand closest to 21 without going over wins.
3. **View Instructions:** Click the "How to Play" button to expand and view detailed instructions on the game rules and controls.

## Installation

To get started with this project, follow these steps:

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (includes npm, the Node Package Manager)

### Steps

1. **Clone the Repository**

   Clone this repository to your local machine using Git:

   ```bash
   git clone <REPOSITORY_URL>
   ```
  Replace <REPOSITORY_URL> with the URL of this repository.

2. **Navigate to the Project Directory**

  ```bash
  cd <PROJECT_DIRECTORY>
  ```
  Replace <PROJECT_DIRECTORY> with the path to your project directory.

3. **Install Dependencies**

  Install the necessary dependencies using npm:

  ```bash
  npm install
  ```
  This will install all the packages listed in the package.json file.

4. **Run the application**

  Once the dependencies are installed, run the application with:

  ```bash
  node src/app.mjs
  ```

5. **Access the Application**

   Open your web browser and navigate to [http://localhost:3000](http://localhost:3000) to see the application in action.


## Acknowledgments
- Inspired by classic Blackjack rules.
- Utilizes client-side JavaScript for game logic and DOM manipulation.

