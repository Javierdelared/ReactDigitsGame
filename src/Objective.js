import { useState } from 'react';
import classNames from 'classnames';

export function Objective({ value }) {
  return <div className='objective-div'><div className='objective'>{value}</div></div>;
}