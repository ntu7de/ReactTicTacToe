import { useState } from 'react';
  
function Square({value, onSquareClick}) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  )
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    // Check if squares[i] already has a value or if someone has won after clicking
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    // Duplicate the squares[] array
    const nextSquares = squares.slice();
    // If X is next, fill array[i] with 'X'
    // Else, fill array[i] with 'O'
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
    // Assign the squares[] prop to nextSquares (the copy with the updates)
      // setSquares(nextSquares);
    // Change xIsNext to true or false
      // setXIsNext(!xIsNext);
  }

  // Checks if there is a winner
  const winner = calculateWinner(squares);
  // Establishes a status that shows whether it is a player's turn or if someone has won
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    // Using the squares[] array helps us keep track of the square's state
    // Make sure to add a div and its own className for any text or variable you'd
    // like to display
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

// Game became the new Parent component so that the the history of moves can be stored
  // and then the entire Board can be re-rendered to restore previous moves if needed
export default function Game() {
  // State to keep track of which player is next
  const [xIsNext, setXIsNext] = useState(true);
  // State to keep track of squares[] arrays
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const currentSquares = history[history.length - 1];

  function handlePlay(nextSquares) {
    // Create a new array containing all the elements in history, followed by nextSquares
    setHistory([...history, nextSquares]);
    setXIsNext(!xIsNext);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
      </div>
      <div className="game-info">
        <ol>{/*TODO*/}</ol>
      </div>
    </div>
  );
}

// Calculates whether there is a winner
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}