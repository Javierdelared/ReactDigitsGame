export function Undo({ onClick }) {
  return <div className='square-div'>
          <input type='image' src='/img/undo.png' className='square undo' onClick={onClick} />
         </div>;
}