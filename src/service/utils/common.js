'use strict';

/**
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


/**
 * @param {any[]} array
 * @return {any[]}
 */
const shuffleArray = (array) => {
  const newArray = array.slice();
  for (let i = newArray.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [newArray[i], newArray[randomPosition]] = [newArray[randomPosition], newArray[i]];
  }

  return newArray;
};


module.exports = {
  getRandomInt,
  shuffleArray,
};
