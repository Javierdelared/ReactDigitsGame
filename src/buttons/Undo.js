export function Undo() {
  function handleClick() {
    console.log("undo!");
  }
  return <div className='square-div'>
          <input type='image' src='/img/undo.png' className='square undo' onClick={handleClick} />
         </div>;
}