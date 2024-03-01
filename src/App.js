import { Number } from './Number';
import { Operation } from './Operation';

export default function Board() {
  return (
    <div className='board'>
      <div className='board-row'>
        <Number value='1' />
        <Number value='2' />
        <Number value='3' />
      </div>
      <div className='board-row'>
        <Number value='4' />
        <Number value='5' />
        <Number value='6' />
      </div>
      <div className='board-row'>
        <Operation image='add' mathOperation={add} />
        <Operation image='subtract' mathOperation={subtract} />
        <Operation image='multiply' mathOperation={multiply} />
        <Operation image='divide' mathOperation={divide} />
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