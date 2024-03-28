const operations = [
  { name: 'add', func: add },
  { name: 'subtract', func: subtract },
  { name: 'multiply', func: multiply },
  { name: 'divide', func: divide }
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