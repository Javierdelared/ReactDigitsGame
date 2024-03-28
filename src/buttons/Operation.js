import { useState } from 'react';
import classNames from 'classnames';

export function Operation({ state, onClick }) {
  const { image, isSelected } = state;
  var operationClasses = classNames(
    'square',
    { 'selected': isSelected }
  );
  return <div className='square-div'>
          <input type='image' src={`/img/${image}.png`} className={operationClasses} onClick={onClick} />
         </div>;
}