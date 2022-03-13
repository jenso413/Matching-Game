const cards = document.querySelectorAll('.card');

cards.forEach(card => card.addEventListener('click', flipCard));

let firstCard, secondCard;
let cardFlipped = false;
let lockBoard = false;

function flipCard() {

    // Don't execute if lockboard is true
    if (lockBoard) return;

    // Don't allow to click the same card twice
    if (this === firstCard) return;

    // Toggle flip class when clicked
    this.classList.toggle('flip');

    // Setting first card and second card
    if (!cardFlipped) {
        firstCard = this;
        cardFlipped = true;
    } else {
        secondCard = this;
        cardFlipped = false;

        if (firstCard.dataset.breed === secondCard.dataset.breed) {
            // It's a match!! Disable the matching cards
            disableCards();
        } else {
            // It's not a match! Unflip the cards automatically
            unFlipCards();
        }
    }
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
    }, 1000)
}

(function shuffleCards() {
    cards.forEach(card => {
        let randomNum = Math.floor(Math.random() * (cards.length + 1))
        card.style.order = randomNum;
    })
})();