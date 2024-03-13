import { Number, Operation, Objective, Refresh, Submit, Undo } from './buttons/Buttons';
import { useState } from 'react';

export default function Board() {
  const [numbers, setNumbers] = useState([1,22,333,43,52,61]);
  const [selectedNumbers, setSelectedNumbers] = useState(Array(6).fill(false));
  const [visibleNumbers, setVisibleNumbers] = useState(Array(6).fill(true));
  const [selectedOperations, setSelectedOperations] = useState(Array(4).fill(false));
  const operations = [add, subtract, multiply, divide];
  const Steps = {
    start: 0,
    firstNumber: 1,
    operator: 2
  }
  var objective = 713;
  const [step, setStep] = useState(Steps.start);

  return (
    <div id="game">
      <div id='objective-panel'>
        <div className='row'>
          <Objective value={objective} />
          <Refresh image='refresh' />
        </div>
      </div>
      <div id='board'>
        <div className='row'>
          <Number value={numbers[0]} isSelected={selectedNumbers[0]} isVisible={visibleNumbers[0]} onClick={() => handleNumberClick(0)} />
          <Number value={numbers[1]} isSelected={selectedNumbers[1]} isVisible={visibleNumbers[1]} onClick={() => handleNumberClick(1)} />
          <Number value={numbers[2]} isSelected={selectedNumbers[2]} isVisible={visibleNumbers[2]} onClick={() => handleNumberClick(2)} />
        </div>
        <div className='row'>
          <Number value={numbers[3]} isSelected={selectedNumbers[3]} isVisible={visibleNumbers[3]} onClick={() => handleNumberClick(3)} />
          <Number value={numbers[4]} isSelected={selectedNumbers[4]} isVisible={visibleNumbers[4]} onClick={() => handleNumberClick(4)} />
          <Number value={numbers[5]} isSelected={selectedNumbers[5]} isVisible={visibleNumbers[5]} onClick={() => handleNumberClick(5)} />
        </div>
        <div className='row'>
          <Undo />
          <Operation image='add' isSelected={selectedOperations[0]} onClick={() => handleOperationClick(0)}/>
          <Operation image='subtract' isSelected={selectedOperations[1]} onClick={() => handleOperationClick(1)}/>
          <Operation image='multiply' isSelected={selectedOperations[2]} onClick={() => handleOperationClick(2)}/>
          <Operation image='divide' isSelected={selectedOperations[3]} onClick={() => handleOperationClick(3)}/>
        </div>
      </div>
      <div id='submit-panel'>
        <div className='row'>
          <Submit />
        </div>
      </div>
    </div>
  );

  function handleNumberClick(numberIndex) {
    if (selectedNumbers[numberIndex]) {
      deselectNumberAndOperation();
      setStep(Steps.start);
      return ;
    }
    if (step === Steps.operator) {
      calculateOperation(numberIndex);
    } else {
      selectFirstNumber(numberIndex);
    }
    setStep(Steps.firstNumber);
  }

  function deselectNumberAndOperation() {
    setSelectedNumbers(Array(6).fill(false));
    setSelectedOperations(Array(4).fill(false));
  }

  function selectFirstNumber(numberIndex) {
    const nextSelectedNumbers = Array(6).fill(false);
    nextSelectedNumbers[numberIndex] = true;
    setSelectedNumbers(nextSelectedNumbers);
  }

  function calculateOperation(secondNumberIndex) {
    const firstNumberIndex = selectedNumbers.findIndex((e) => e);
    const operationIndex = selectedOperations.findIndex((e) => e);
    const result = operations[operationIndex](numbers[firstNumberIndex], numbers[secondNumberIndex]);
    if (result == null) {
      deselectOperations();
    } else {
      updateOperatedNumbers(firstNumberIndex, secondNumberIndex, result);
    }
  }

  function updateOperatedNumbers(firstNumberIndex, secondNumberIndex, result) {
    hideNumber(firstNumberIndex);
    deselectOperations();
    updateNumberValue(secondNumberIndex, result);
    selectFirstNumber(secondNumberIndex);
  }

  function updateNumberValue(numberIndex, value) {
    const nextNumbers = numbers.slice();
    nextNumbers[numberIndex] = value;
    setNumbers(nextNumbers);
  }

  function hideNumber(numberIndex) {
    const nextVisibleNumbers = visibleNumbers.slice();
    nextVisibleNumbers[numberIndex] = false;
    setVisibleNumbers(nextVisibleNumbers);
  }

  function handleOperationClick(operationIndex) {
    if (isLastNumber()) {
      return ;
    }
    if (selectedOperations[operationIndex]) {
      deselectOperations();
      setStep(Steps.firstNumber);
      return ;
    }
    if (step !== Steps.start) {
      selectOperation(operationIndex);
      setStep(Steps.operator);
    }
  }

  function isLastNumber() {
    return visibleNumbers.filter((e) => e).length < 2;
  }

  function deselectOperations() {
    setSelectedOperations(Array(4).fill(false));
  }

  function selectOperation(operationIndex) {
    const nextSelectedOperations = Array(4).fill(false);
    nextSelectedOperations[operationIndex] = true;
    setSelectedOperations(nextSelectedOperations);
  }

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
}