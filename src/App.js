import { Number, Operation, Objective, Refresh, Submit, Undo } from './buttons/Buttons';

export default function Board() {
  return (
    <div id="game">
      <div id='objective-panel'>
        <div className='row'>
          <Objective value='713' />
          <Refresh image='refresh' />
        </div>
      </div>
      <div id='board'>
        <div className='row'>
          <Number value='1' />
          <Number value='22' />
          <Number value='333' />
        </div>
        <div className='row'>
          <Number value='43' />
          <Number value='52' />
          <Number value='61' />
        </div>
        <div className='row'>
          <Undo />
          <Operation image='add' mathOperation={add} />
          <Operation image='subtract' mathOperation={subtract} />
          <Operation image='multiply' mathOperation={multiply} />
          <Operation image='divide' mathOperation={divide} />
        </div>
      </div>
      <div id='submit-panel'>
        <div className='row'>
          <Submit />
        </div>
      </div>
    </div>
  );

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