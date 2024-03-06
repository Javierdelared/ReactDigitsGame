export function Refresh() {
  function handleClick() {
    console.log("refresh!");
  }
  return <div id='refresh-div'>
          <input type='image' src='/img/refresh.png' className='refresh' onClick={handleClick} />
         </div>;
}