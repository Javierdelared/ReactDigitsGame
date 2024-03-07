import { useState } from 'react';
import classNames from 'classnames';

export function Operation({ image, mathOperation }) {
  const [selected, toggle] = useState(false);
  function handleClick() {
    toggle(!selected);
    console.log(mathOperation(1,2));
  }
  var operationClasses = classNames(
    'square',
    { 'selected': selected }
  );
  return <div className='square-div'>
          <input type='image' src={'/img/' + image + '.png'} className={operationClasses} onClick={handleClick} />
         </div>;
}