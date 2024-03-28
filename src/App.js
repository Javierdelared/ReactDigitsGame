import { useReducer, useRef } from 'react';
import { Number, Operation, Objective, Refresh, Submit, Undo } from './buttons/Buttons';
import operations from './operations';
import Steps from './Steps';
import { actionTypes, reducer } from './BoardUtils';

export default function Board() {
  var objective = 713;
  const initialState = {
    numbers: [1,22,333,43,52,61],
    selectedNumbers: Array(6).fill(false),
    visibleNumbers: Array(6).fill(true),
    selectedOperators: Array(4).fill(false),
    step: Steps.start,
    operation: ""
  };
  const stateChangeHistory = useRef([initialState]);

  const [state, dispatch] = useReducer(reducer, initialState);

  const numberProps = (index) => ({
    state: { value: state.numbers[index], isSelected: state.selectedNumbers[index], isVisible: state.visibleNumbers[index] },
    onClick: () => handleNumberClick(index)
  });

  const operationProps = (index) => ({
    state: { image: operations[index].name, isSelected: state.selectedOperators[index] },
    onClick: () => handleOperatorClick(index)
  });

  return (
    <div id="board">
      <div id="game">
        <div id='objective-panel'>
          <div className='row'>
            <Objective value={objective} />
            <Refresh onClick={() => refresh()} />
          </div>
        </div>
        <div id='center-panel'>
          <div className='row'>
            {[0, 1, 2].map(index => (<Number key={index} {...numberProps(index)} />))}
          </div>
          <div className='row'>
            {[3, 4, 5].map(index => (<Number key={index} {...numberProps(index)} />))}
          </div>
          <div className='row'>
            <Undo onClick={() => undo()} />
            {[0, 1, 2, 3].map(index => (<Operation key={index} {...operationProps(index)} />))}
          </div>
        </div>
        <div id='submit-panel'>
          <div className='row'>
            <Submit />
          </div>
        </div>
      </div>
      <div id="history">
        <span class='history-title'>History:</span>
        {stateChangeHistory.current.slice(1).map(state => <span align='center' class='history-operation'>{state.operation}</span>)}
      </div>
    </div>
  );

  // OnClick functions
  function handleNumberClick(numberIndex) {
    if (state.selectedNumbers[numberIndex]) {
      dispatch({ type: actionTypes.RESET_SELECTIONS });
      return ;
    }
    if (state.step === Steps.operator) {
      const newState = reducer(state, { type: actionTypes.CALCULATE_OPERATION, payload: numberIndex });
      if (newState != state) {
        dispatch({ type: actionTypes.CALCULATE_OPERATION, payload: numberIndex });
        stateChangeHistory.current.push(newState);
      }
    } else {
      dispatch({ type: actionTypes.SELECT_FIRST_NUMBER, payload: numberIndex });
    }
  }

  function handleOperatorClick(operationIndex) {
    if (state.visibleNumbers.filter((e) => e).length < 2) {
      return ;
    }
    if (state.selectedOperators[operationIndex]) {
      dispatch({ type: actionTypes.RESET_OPERATION });
      return ;
    }
    if (state.step !== Steps.start) {
      dispatch({ type: actionTypes.SELECT_OPERATION, payload: operationIndex });
    }
  }

  function undo() {
    if (stateChangeHistory.current.length > 1) {
      stateChangeHistory.current.pop();
      const prevState = stateChangeHistory.current[stateChangeHistory.current.length - 1];
      dispatch({ type: actionTypes.SET_STATE, payload: prevState });
    }
    dispatch({ type: actionTypes.RESET_SELECTIONS });
  };

  function refresh() {
    stateChangeHistory.current = [initialState];
    dispatch({ type: actionTypes.SET_STATE, payload: initialState });
  };
}