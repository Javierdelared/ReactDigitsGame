export function Refresh({ onClick }) {
  return <div id='refresh-div'>
          <input type='image' src='/img/refresh.png' className='refresh' onClick={onClick} />
         </div>;
}