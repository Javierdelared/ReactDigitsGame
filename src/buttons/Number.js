import { useState } from 'react';
import classNames from 'classnames';

export function Number({ value, isSelected, isVisible, onClick }) {
  var numberClasses = classNames(
    'circle',
    { 'selected': isSelected },
    { 'hidden': !isVisible }
  );
  return <div className='circle-div'>
          <input type='button' className={numberClasses} onClick={onClick} value={value} />
         </div>;
}