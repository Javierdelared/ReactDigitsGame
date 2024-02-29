import { useState } from 'react';

export function Circle({ value }) {
  const [selected, toggle] = useState(false);
  function handleClick() {
    toggle(!selected);
  }
  return <button data-selected={selected} className="circle" onClick={handleClick}>{value}</button>;
}
export default function Board() {
  return (
    <>
      <div className="board-row">
        <Circle value="1" />
        <Circle value="2" />
        <Circle value="3" />
      </div>
      <div className="board-row">
        <Circle value="4" />
        <Circle value="5" />
        <Circle value="6" />
      </div>
    </>
  );
}