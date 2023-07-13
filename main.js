const SQUARES = [
  "G'Kar bellows a name",
  'Bullshit-shaped door',
  'Ivanova is a pessimist',
  'Star Fury Battle',
  'An attache gets a shit assignment',
  'Human stranger with ominous motives',
  'Alien stranger with ominous motives',
  'Dr. Franklin is smug',
  'Londo reminisces about the old days',
  'Londo day drinking',
  'PPG fight',
  'Narn pouch mentioned',
  "We're in brown sector/down below",
  "Someone doesn't like telepaths",
  'Star Trek actor/actress shows up',
  'Christopher Franke comedy music',
  'Psy cops show up',
  'Another Minbari ritual',
  "We're in Kosh's quarters",
  'The non-aligned worlds are upset',
  'Silent alien extra',
  "Garibaldi's alcoholism alluded to",
  'Xenophobia',
  'Crewmember in civilian clothes',
  'Newscast on a monitor',
  "Someone's family, friend, lover shows up",
  'Minbari caste politics',
  'Someone calls it "B5"',
  '"Mister Garibaldi!"',
  'Crime dealings',
  'Someone is held captive',
  'CGI alien',
  'Airport terminal announcement',
  'Ship docking or departing',
  'Ambassador has to consult their government',
  'Dealmaking with the shadows',
  'Gray council meeting',
  "G'Quan mentioned",
  '"In Valen\'s Name"',
  'Sheridan says "Ah hell" or some variation',
  'Transparent paper',
  'Sheridan eyes to commercial',
  'War memories',
  "We're on a White Star ship",
  'Shadow ship lasers',
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
