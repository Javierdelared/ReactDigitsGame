import { useState } from 'react';
import classNames from 'classnames';

export function Number({ value }) {
  const [selected, toggle] = useState(false);
  function handleClick() {
    toggle(!selected);
    console.log(value);
  }
  var numberClasses = classNames(
    'circle',
    { 'selected': selected }
  );
  return <div className='circle-div'>
          <input type='button' className={numberClasses} onClick={handleClick} value={value} />
         </div>;
}