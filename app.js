// On click, flip a card over
// That card stays flipped until another card is flipped
// If that second card matches, display those two cards (don't hide them). Add 1 to score
// If you don't get the match, add 1 to failed attempts
// To match cards, give two cards the same img src and the same class
// If you click on two cards with the same class, display those cards
// To potentially add complexity: allow user to select how many cards they want to play with! up to a certain amount (or let them select difficulty)
// Maybe add animations to card flips?

// Makes a node list of cards
const cards = document.querySelectorAll('.card');

let firstCard, secondCard;
let hasFlippedCard = false;
let lockBoard = false;


// Adds an event listener to each card. Will flip on click
cards.forEach(card => card.addEventListener('click', flipCard))

function flipCard() {

    //Don't flip more cards if two already match
    if (lockBoard) return;

    // Stop from clicking the same card twice
    if (this === firstCard) return;

    // Toggles flip class on click (check to see if just 'add' works too)
    this.classList.toggle('flip');

    if (!hasFlippedCard) {
        // First click
        hasFlippedCard = true;
        firstCard = this;

        return;
    } 

    // Second click
    hasFlippedCard = false;
    secondCard = this;

    checkForMatch();
}

function checkForMatch() {
    
    let isMatch = firstCard.dataset.breed === secondCard.dataset.breed

    isMatch ? disableCards() : unFlipCards();
        // It's a match!
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
}

function unFlipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        lockBoard = false;
    }, 1000);
}

(function shuffleCards() {
    cards.forEach(card => {
        let randomNum = Math.floor(Math.random() * 7);
        console.log(randomNum);
        card.style.order = randomNum;
    })
})();