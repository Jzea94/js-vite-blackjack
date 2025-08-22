import { createDeck, shuffle, showWinner } from "./functions.js";

// Declaracion de variables
const players = ['player', 'dealer'];
let isGameStarted = false;
let hideCard;

const counter = {
  player : 0,
  dealer : 0,
}

const puntajes = {
  player: 0,
  dealer: 0,
};

const arrCards = {
  player : [],
  dealer : [],
};

// Crear baraja
const specialCards = ['J', 'Q', 'K', 'A'];
const typesCards = ['C', 'H', 'D', 'S'];

const deck = createDeck(specialCards, typesCards);
let shuffledDeck = shuffle(deck);

// let shuffledDeck = ['KD', '2S', '10H', '7C', '10C', '3S', '4D', '4H', 'QD', '3H', 'KS', 'KC', 'AH', '7S', '9H', '4S', 'AS', '2D', '10D', '6D', 'QC', 'JS', '8C', '8H', '5S', 'JD', '5D', '2H', 'JH', '6H', '9D', '4C', '2C', '10S', '3C', '6S', '5H', 'JC', '3D', '7H', 'QH', '9C', 'KH', '7D', '5C', '6C', '6S', 'AS', 'JD', '5D', 'AS','AC' ]

// repartir cartas 
const hit = (player) => {
  const card = shuffledDeck.pop();
  
  const playerContainer = document.getElementById(player);
  let cardImg = document.createElement('img');
  cardImg.classList.add('carta');
  
  const isDealerFirstCard = player === 'dealer' && playerContainer.children.length == 0;
  if (isDealerFirstCard) {
    hideCard = card;
    cardImg.src = 'assets/cartas/red_back.png';
    cardImg.id = 'hide-card';
  } else {
    cardImg.src = `assets/cartas/${card}.png`;
  }
  
  playerContainer.append(cardImg);
  
  return card;
};

// Buscar Ganador
const winner = () => {
  const { player, dealer } = puntajes;
  let message = '';
  let winner = ''

  if (player === dealer) {
    message = 'Push';
  } else if (player === 21 || (player > dealer && player < 21) || dealer > 21) {
    counter.player += 1;
    message = 'You Won';
    winner = 'player';
    confetti({
      particleCount: 100, // -> cantidad de partículas de confeti
      spread: 160, // -> Dispersión de las partículas
      ticks: 150, // -> Tiempo que duran las partículas
    });
  } else {
    counter.dealer += 1;
    message = 'You Lost'
    winner = 'dealer';
  }

  showWinner(message);

  setTimeout(() => {
    document.querySelectorAll('img').forEach(img => img.remove());
    document.getElementById('playerScore').innerText = 0;
    document.getElementById('dealerScore').innerText = 0;
    btnStar.disabled = false;  
    puntajes.dealer = 0;
    puntajes.player = 0;
    arrCards.player = [];
    arrCards.dealer = [];
    isGameStarted = !isGameStarted;
  }, 2500)

  return winner;
};

// Definir puntaje
const score = (card, player) => {
  let isPlayerTurn = player === 'player';
  let cardValue = card.substring(0, card.length - 1);
  // let cardValue = card.slice(0, - 1);

  if (['J', 'Q', 'K'].includes(cardValue)) {
    cardValue = 10;
  } else if (!isNaN(cardValue)) {
    cardValue = cardValue * 1;
  } else {
    cardValue = (puntajes[player] + 11) > 21 ? 1: 11;
  }
  
  if ((puntajes[player] + cardValue) > 21) {
    arrCards[player] = arrCards[player].map(e => e === 11 ? 1 : e);    
  }
  
  arrCards[player].push(cardValue);
  puntajes[player] = arrCards[player].reduce((acum, currentValue) => acum + currentValue, 0);
  
  const acum = document.getElementById(`${player}Score`);
  acum.innerText = isPlayerTurn ? puntajes[player] : '??';
}


// * * Manipulación del DOM
const btnStar = document.getElementById('btnStar');
btnStar.addEventListener('click', function () {
  isGameStarted = !isGameStarted;
  this.disabled = true;
  
  for (let i = 0; i < 2; i++) {
    for (const player of players) {
      const card = hit(player);
      score(card, player)
    }
  }  
  
  if (isGameStarted === true ) {
    btnHit.disabled = false 
    btnStand.disabled = false;
  }
  //-> se puede mejorar?
  if (puntajes.player === 21 || puntajes.dealer === 21) btnStand.click();
  if (shuffledDeck.length < 4) shuffledDeck = shuffle(deck); //todo -> mejorar esto

});

const btnHit = document.getElementById('btnHit');
btnHit.addEventListener('click', function () {
  const card = hit('player');
  score(card, 'player');
  if (puntajes.player >= 21) btnStand.click();
});

const btnStand = document.getElementById('btnStand');
btnStand.addEventListener('click', function () {
  while (puntajes.dealer < 17 && puntajes.player <= 21) {
    const card = hit('dealer');      
    score(card, 'dealer');    
  }   
  let currentWinner = winner();
  
  document.getElementById('dealerScore').innerText = puntajes.dealer;
  document.getElementById('hide-card').src = `assets/cartas/${hideCard}.png`;
  document.getElementById(`win-${currentWinner}`).innerText = counter[currentWinner];
  btnHit.disabled = true;
  this.disabled = true;
});

/**
 * todo: implementar logica de doblar
 * todo: implementar logica de dividir
 */