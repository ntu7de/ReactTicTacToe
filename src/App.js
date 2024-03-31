import { useState } from 'react';

// value is a PROP
function Square() {
  // Add a STATE so a component can "remember" it got clicked
  const[value, setValue] = useState(null);

  function handleClick() {
    setValue('X');
  }

  return (
    // When a square gets clicked 
    <button 
      className="square"
      onClick={handleClick}
    >
      {value}
    </button>
  );
}

export default function Board() {
  return (
    <>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
    </>
  );
  
}