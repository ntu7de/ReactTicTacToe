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
  // State to keep track of squares[] arrays
  const [history, setHistory] = useState([Array(9).fill(null)]);
  // Add a state keeping track of the current move
  const [currentMove, setCurrentMove] = useState(0);
  // Add a state to keep track of whether the list of moves is ascending
  const [isAscending, setIsAscending] = useState(true);
  const currentSquares = history[currentMove];
  // State to keep track of which player is next
  const xIsNext = currentMove % 2 === 0;

  function handlePlay(nextSquares) {
    // Create a slice of the history array with all elements from 0 to currentMove + 1 and then append the next squares
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  // Function created to help jump to a previous move
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  // Function to toggle ascending vs descending
  function toggleOrder() {
    setIsAscending(!isAscending);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
      </div>
      <div className="game-info">
        <button onClick={toggleOrder}>Toggle Order</button>
        <ol>{isAscending ? moves : moves.reverse()}</ol>
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
    // Checks if squares[a] is filled, and if squares[a], squares[b], and squares[c] are ALL filled by either 'X' or 'O'
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}