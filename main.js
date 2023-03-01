const SQUARES = [
  "G'Kar bellows a name",
  'Bullshit-shaped door',
  'Ivanova is a pessimist',
  'Star Fury Battle',
  'The attache gets the shaft',
  'Incredibly obvious foreshadowing',
  'Londo fucks up',
  'Dr Franklin is smug',
  'Londo reminisces about the old days',
  'Londo day drinking',
  'PPG fight',
  'Narn pouch mentioned',
  'Brown sector',
  "Someone doesn't like telepaths",
  'Star Trek actor/actress shows up',
  'Misplaced Christopher Franke comedy music',
  'Unexpected jump gate/point',
  'Telepath strains to read someone',
  'Psy cops show up',
  'Telepath level discussion',
  'Another Minbari ritual',
  "We're in Kosh's quarters",
  'The non-aligned worlds are aligned',
  'Silent alien extra',
];
const TENOR_FETCH_URI =
  'https://api.tenor.com/v1/random?q=Babylon+5&limit=5&contentfilter=off&locale=en_US&key=FR57D8JH3LYH';
const BG_GIF_VAR = '--bg-gif';

function setBgGif(cell) {
  fetch(TENOR_FETCH_URI)
    .then((data) => data.json())
    .then((data) => {
      const idx = Math.floor(Math.random() * data.results.length);
      const bgImg = `url(${data.results[idx].media[0].tinygif.url})`;
      cell.style.setProperty(BG_GIF_VAR, bgImg);
    });
}

function toggleDone(cell) {
  if (cell.classList.contains('done')) {
    cell.classList.remove('done');
    cell.style.setProperty(BG_GIF_VAR, '');
  } else {
    cell.classList.add('done');
    setBgGif(cell);
  }
}

function setGifs(checkbox) {
  if (checkbox.checked) {
    document.body.classList.add('yes-gifs');
  } else {
    document.body.classList.remove('yes-gifs');
  }
}

document.addEventListener('DOMContentLoaded', function () {
  var stuff = Array.from(SQUARES);

  // populate items
  var cells = document.querySelectorAll('#board .cell');
  cells.forEach(function (cell) {
    if (cell.classList.contains('free')) {
      setBgGif(cell);
      return;
    }
    pick = Math.floor(Math.random() * stuff.length);
    cell.innerHTML = stuff[pick];
    stuff.splice(pick, 1);
  });

  // click action, delegate to board
  const board = document.getElementById('board');
  board.addEventListener('click', function (e) {
    const cell = e.target;
    // make sure we actually are working on a cell
    if (!cell.classList.contains('cell')) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    toggleDone(cell);
  });

  const spoilerToggle = document.getElementById('spoiler-checkbox');
  setGifs(spoilerToggle);
  spoilerToggle.addEventListener('input', function (e) {
    setGifs(e.target);
  });
});
