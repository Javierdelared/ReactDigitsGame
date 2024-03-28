const operations = [
  { name: 'add', symbol: '+', func: add },
  { name: 'subtract', symbol: '-', func: subtract },
  { name: 'multiply', symbol: 'x', func: multiply },
  { name: 'divide', symbol: '/', func: divide }
];

function add(val1, val2) {
  return val1 + val2;
}
function subtract(val1, val2) {
  if(val1 < val2) {
    return null;
  }
  return val1 - val2;
}
function multiply(val1, val2) {
  return val1 * val2;
}
function divide(val1, val2) {
  if(val1 % val2 !== 0) {
    return null;
  }
  return val1 / val2;
}

export default operations;