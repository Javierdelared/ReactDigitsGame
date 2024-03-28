import Steps from './Steps';
import operations from './operations';

const INIT_SELECTED_NUMBERS = Array(6).fill(false);
const INIT_SELECTED_OPERATORS = Array(4).fill(false);

export const actionTypes = {
  RESET_SELECTIONS: 'RESET_SELECTIONS',
  CALCULATE_OPERATION: 'CALCULATE_OPERATION',
  SELECT_FIRST_NUMBER: 'SELECT_FIRST_NUMBER',
  RESET_OPERATION: 'RESET_OPERATION',
  SELECT_OPERATION: 'SELECT_OPERATION',
  SET_STATE: 'SET_STATE'
};

// Reducer function to handle state transitions
export function reducer(state, action) {
  switch (action.type) {
    case actionTypes.RESET_SELECTIONS:
      return {
        ...state,
        selectedNumbers: INIT_SELECTED_NUMBERS,
        selectedOperators: INIT_SELECTED_OPERATORS,
        step: Steps.start
      };
    case actionTypes.CALCULATE_OPERATION:
      return calculateOperation(state, action.payload);
    case actionTypes.SELECT_FIRST_NUMBER:
      return {
        ...state,
        selectedNumbers: INIT_SELECTED_NUMBERS.map((_, index) => index === action.payload),
        step: Steps.firstNumber
      };
    case actionTypes.RESET_OPERATION:
      return {
        ...state,
        selectedOperators: INIT_SELECTED_OPERATORS,
        step: Steps.firstNumber
      };
    case actionTypes.SELECT_OPERATION:
      return {
        ...state,
        selectedOperators: INIT_SELECTED_OPERATORS.map((_, index) => index === action.payload),
        step: Steps.operator
      };
    case actionTypes.SET_STATE:
      return {
        ...action.payload
      };
    default:
      return state;
  }
}

function calculateOperation(state, secondNumberIndex) {
  const { selectedNumbers, numbers, selectedOperators, visibleNumbers } = state;
  const firstNumberIndex = selectedNumbers.findIndex((e) => e);
  const firstNumber = numbers[firstNumberIndex];
  const operation = operations[state.selectedOperators.findIndex((e) => e)];
  const secondNumber = numbers[secondNumberIndex];
  const result = operation.func(firstNumber, secondNumber);
  if (result == null) {
    // No state change if result is null
    return state;
  } else {
    return {
      numbers: numbers.map((number, index) => index === secondNumberIndex ? result : number),
      selectedNumbers: INIT_SELECTED_NUMBERS.map((_, index) => index === secondNumberIndex),
      selectedOperators: INIT_SELECTED_OPERATORS,
      visibleNumbers: visibleNumbers.map((visible, index) => index === firstNumberIndex ? false : visible),
      step: Steps.firstNumber,
      operation: printOperation(firstNumber, operation, secondNumber, result)
    };
  }
}

function printOperation(firstNumber, operation, secondNumber, result) {
   return `${firstNumber} ${operation.symbol} ${secondNumber} = ${result}`;
}