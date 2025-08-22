/**
 * Crea una baraja de cartas combinando cartas numéricas (2-10), especiales (J, Q, K, A)
 * y tipos (como Corazones, Diamantes, Tréboles, Picas).
 * 
 * @param {string[]} specialCards - arreglo de cartas especiales, por ejemplo: ['J', 'Q', 'K', 'A'].
 * @param {string[]} typesCard - arreglo de tipos de carta, por ejemplo: ['C', 'D', 'H', 'S'].
 * @returns {string[]} - Devuelve un nuevo arr que representa toda la baraja.
 */

const createDeck = (specialCards, typesCards) => {
  return [...Array(9).keys()].map(i => i + 2)
    .concat(specialCards)
    .flatMap(card => typesCards.map(tipo => `${card}${tipo}`))
};

/**
 * Devuelve una nueva copia del arreglo con sus elementos reordenados aleatoriamente
 * usando el algoritmo de Fisher-Yates (también conocido como algoritmo de barajado). *
 * La función no modifica el arreglo original.
 *
 * @template T
 * @param {T[]} arr - El arreglo original a barajar.
 * @returns {T[]} Una nueva copia del arreglo con los elementos en orden aleatorio.
 */

const shuffle = (arr) => {
  const arrCopy = [...arr];
  for (let i = arrCopy.length - 1; i > 0 ; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrCopy[i], arrCopy[j]] = [arrCopy[j], arrCopy[i]];
  }
  return arrCopy;
};


/**
 * lanza una modal por unos segundo con un mensaje que anuncia el resultado de la partida.
 * 
 * @param {string} message - mensaje mostrado cuando hay un ganador
 */

const showWinner = (message) => {
  const overlay = document.getElementById('contentMessage');
  overlay.classList = 'overlay';
  const resultDiv = document.getElementById('resultDiv');

  resultDiv.textContent = message;
  overlay.classList.remove('hidden');

  if (message === "You Won") {
    resultDiv.style.background = "linear-gradient(45deg, #FFD700, #FFA500, #FFEC8B)";
    resultDiv.style.boxShadow = "0px 4px 12px rgba(255, 166, 0, 0.3)";
  } else if (message === "You Lost") {
    resultDiv.style.background = "linear-gradient(45deg, #FF0000, #8B0000, #FF6347)";
    resultDiv.style.boxShadow = "0px 4px 12px rgba(255, 0, 0, 0.3)";
  } else {
    resultDiv.style.background = "linear-gradient(45deg, #00BFFF, #1E90FF, #87CEFA)";
    resultDiv.style.boxShadow = "0px 4px 12px rgba(30, 143, 255, 0.3)";
  }
  
  resultDiv.style.color = "transparent";
  resultDiv.style.backgroundClip = "text";
  resultDiv.style.webkitTextFillColor = "transparent"
  
  // Ocultar después de 3 segundos
  setTimeout(() => {
    overlay.classList.add('hidden');
  }, 2000);
}


export {
  createDeck,
  shuffle,
  showWinner,
};