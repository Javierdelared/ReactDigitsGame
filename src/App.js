import { Number, Operation, Objective, Refresh, Submit, Undo } from './buttons/Buttons';
import operations from './operations';
import Steps from './Steps'
import { useState } from 'react';

export default function Board() {
  const [numbers, setNumbers] = useState([1,22,333,43,52,61]);
  const [selectedNumbers, setSelectedNumbers] = useState(Array(6).fill(false));
  const [visibleNumbers, setVisibleNumbers] = useState(Array(6).fill(true));
  const [selectedOperations, setSelectedOperations] = useState(Array(4).fill(false));
  const [step, setStep] = useState(Steps.start);
  var objective = 713;

  const numberProps = (index) => ({
    state: { value: numbers[index], isSelected: selectedNumbers[index], isVisible: visibleNumbers[index] },
    onClick: () => handleNumberClick(index)
  });

  const operationProps = (index) => ({
    state: { image: operations[index].name, isSelected: selectedOperations[index] },
    onClick: () => handleOperationClick(index)
  });

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
          {[0, 1, 2].map(index => (<Number key={index} {...numberProps(index)} />))}
        </div>
        <div className='row'>
          {[3, 4, 5].map(index => (<Number key={index} {...numberProps(index)} />))}
        </div>
        <div className='row'>
          <Undo />
          {[0, 1, 2, 3].map(index => (<Operation key={index} {...operationProps(index)} />))}
        </div>
      </div>
      <div id='submit-panel'>
        <div className='row'>
          <Submit />
        </div>
      </div>
    </div>
  );

  // OnClick functions
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

  function calculateOperation(secondNumberIndex) {
    const firstNumberIndex = selectedNumbers.findIndex((e) => e);
    const operationIndex = selectedOperations.findIndex((e) => e);
    const result = operations[operationIndex].func(numbers[firstNumberIndex], numbers[secondNumberIndex]);
    if (result == null) {
      deselectOperations();
    } else {
      updateOperatedNumbers(firstNumberIndex, secondNumberIndex, result);
    }
  }

  function selectFirstNumber(numberIndex) {
    const nextSelectedNumbers = Array(6).fill(false);
    nextSelectedNumbers[numberIndex] = true;
    setSelectedNumbers(nextSelectedNumbers);
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
}