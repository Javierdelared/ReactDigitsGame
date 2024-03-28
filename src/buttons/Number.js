import { useState } from 'react';
import classNames from 'classnames';

export function Number({ state, onClick }) {
  const { value, isSelected, isVisible } = state;
  var numberClasses = classNames(
    'circle',
    { 'selected': isSelected },
    { 'hidden': !isVisible }
  );
  return <div className='circle-div'>
          <input type='button' className={numberClasses} onClick={onClick} value={value} />
         </div>;
}