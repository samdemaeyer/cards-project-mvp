$(document).ready(function() {
  appendCards();
  $('.group-cards').click(() => {
    $('.cards-wrapper').empty();
    appendCards(true);
  });

  $('.show-cards').click(() => {
    $('.cards-wrapper').empty();
    appendCards();
  });

  $('.shuffle-cards').click(() => {
    $('.cards-wrapper').empty();
    appendCards(true, true);
  });

  $('.shuffle-show-cards').click(() => {
    $('.cards-wrapper').empty();
    appendCards(false, true);
  });

  $('.card').click(function(a,b) {
    debugger;
  });
});

function testing(a,b) {
  $('#picked-cards-wrapper').append(a);
}

let appendCards = (absolute = false, randomise = false) => {
  let cards = [];
  let suits = ['♥', '♠', '♦', '♣']
  cards = flattenArray(suits.map(suit => generateCardsSet(suit)));
  if (randomise) {
    cards = shuffle(cards);
  }
  cards.forEach((card, i) => {
    let innerHtml = '';
    if (card.index < 3) {
      let innerHtmlSymbols = nrToArray(card.index + 1).map((_, i) => `<span class="${symbolClasses(card.index + 1, i)}">${card.suit}</span>`);
      innerHtml = `<div class="suits">${innerHtmlSymbols.join('')}</div>`;
    } else if (card.index > 9) {
      innerHtml = `<div class="suits"><span class="symbol big">${card.suit}</span></div>`;
    } else {
      let hasOddRows = !isEven(card.index + 1);
      let suitsRows = 2;
      if (hasOddRows) {
        suitsRows = 3;
      }

      innerHtml = nrToArray(suitsRows).map(rowIndex => {
        let devider = 2;
        if (!isEven(rowIndex) && hasOddRows) {
          devider = 4;
        }
        let suitsPerCol = Math.floor((card.index + 1) / devider);
        let suits = [];
        for (let i = 0; i < suitsPerCol; i++) {
          suits.push(`<span class="${symbolClasses(suitsPerCol, i)}">${card.suit}</span>`);
        }
        return `<div class="suits">${suits.join('')}</div>`;
      }).join('');
    }
    let openingTag = `<div class="card ${card.suit}">`;
    if (absolute) {
      openingTag = `<div class="card ${card.suit} absolute" style="left: ${i*40}px" onclick="testing(this)">`;
    }
    let html = `
        ${openingTag}
        <div class="corner"><span class="value">${card.value}</span> ${card.suit}</div>
        ${innerHtml}
        <div class="corner flipped"><span class="value">${card.value}</span> ${card.suit}</div>
      </div>
    `;
    $('#cards-wrapper').append(html);
  });
}

let generateCardsSet = (suit) => {
  let cardsSet = [];
  let nrOfCards = nrToArray(13);
  return nrOfCards.map((card, index) => {
    let oneIndexed = index + 1;
    let value = oneIndexed;
    if (oneIndexed === 11) {
      value = 'J';
    }
    if (oneIndexed === 12) {
      value = 'Q';
    }
    if (oneIndexed === 13) {
      value = 'K';
    }
    return { suit, value, index };
  });
}

let isEven = (n) => {
  n = Number(n);
  return n === 0 || !!(n && !(n%2));
}

let nrToArray = (nr) => {
  let array = [];
  for (let i = 0; i < nr; i++) {
    array.push(i);
  }
  return array;
}

let symbolClasses = (suitsPerCol, i) => {
  let classes = 'symbol';
  if (Math.round(suitsPerCol / 2) < i + 1 && i) {
    classes = 'symbol flipped';
  }
  return classes;
}

let flattenArray = (ary) => {
  return ary.reduce((a, b) => [].concat(a, Array.isArray(b) ? flattenArray(b) : b));
}

let shuffle = (cards) => {
  let currentIndex = cards.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = cards[currentIndex];
    cards[currentIndex] = cards[randomIndex];
    cards[randomIndex] = temporaryValue;
  }

  return cards;
}
