export function Submit() {
  function handleClick() {
    console.log("submit!");
  }
  return <div id='submit-div'>
          <input type='button' className='submit' onClick={handleClick} value="SUBMIT" />
         </div>;
}