import "./App.css";
import { useState } from "react";
import GameBoard from "./components/Gameboard";
import { ShapeID, Shapes } from "./types/types";
const BoardWidth = 12;
const BoardHeight = 24;

function cloneMatrix(matrix: number[][]) {
  return matrix.map((row) => row.map((cell) => cell));
}

function isValidMove(
  board: ShapeID[][],
  tetromino: ShapeID[][],
  offset: { x: number; y: number }
): boolean {
  if (
    offset.x >= 0 &&
    offset.x + tetromino[0].length <= BoardWidth &&
    offset.y >= 0 &&
    offset.y + tetromino.length <= BoardHeight
  ) {
    for (let i = 0; i < tetromino.length; i++) {
      for (let j = 0; j < tetromino[0].length; j++) {
        const tetrominoCell = tetromino[i][j];
        const boardCell = board[offset.y + i][offset.x + j];
        if (tetrominoCell !== ShapeID.None && boardCell !== ShapeID.None) {
          return false;
        }
      }
    }
    return true;
  }
  return false;
}

function clearCompletedRows(
  board: ShapeID[][],
  tetromino: ShapeID[][],
  offset: { x: number; y: number }
) {
  // Check if each row in the tetromino is complete
  for (let i = 0; i < tetromino.length; i++) {
    const rowToCheck = offset.y + i;
    // Check if the row is within board bounds
    if (rowToCheck >= 0 && rowToCheck < BoardHeight) {
      const isRowComplete = board[rowToCheck].every(
        (cell) => cell !== ShapeID.None
      );
      // If the row is complete, clear it by filling with ShapeID.none
      if (isRowComplete) {
        board[rowToCheck] = Array(BoardWidth).fill(ShapeID.None);
      }
    }
  }
}

function App() {
  const [offset, setOffset] = useState({ x: 2, y: 5 });
  const [board, setBoard] = useState<ShapeID[][]>(
    Array.from({ length: BoardHeight }, () =>
      Array(BoardWidth).fill(ShapeID.None)
    )
  );

  function updateBoardWithFrozenTetromino(
    board: ShapeID[][],
    currentTetromino: ShapeID[][],
    offset: { x: number; y: number }
  ) {
    const newMatrix = cloneMatrix(board);

    for (let i = 0; i < currentTetromino.length; i++) {
      for (let j = 0; j < currentTetromino[0].length; j++) {
        const tetrominoCell = currentTetromino[i][j];
        if (tetrominoCell !== ShapeID.None) {
          newMatrix[offset.y + i][offset.x + j] = tetrominoCell;
        }
      }
    }
    setBoard(newMatrix);
  }
  const renderState = cloneMatrix(board);
  const currentTetromino = cloneMatrix(Shapes[ShapeID.T]);

  currentTetromino.forEach((row, r) => {
    row.forEach((cell, c) => {
      renderState[r + offset.y][c + offset.x] = cell;
    });
  });

  const handleKeyUp: React.KeyboardEventHandler = (e) => {
    if (e.code === "ArrowDown") {
      // Check for collision with bottom or existing blocks
      if (
        !isValidMove(board, currentTetromino, { x: offset.x, y: offset.y + 1 })
      ) {
        // Handle collision (e.g., freeze the tetromino)
        // Update the board with the frozen tetromino
        updateBoardWithFrozenTetromino(board, currentTetromino, offset);

        // Check and clear completed rows
        clearCompletedRows(board, currentTetromino, offset);

        // Spawn a new tetromino at the starting position
        spawnNewTetromino();

        // Log for demonstration, you can remove this in the final version
        console.log("Collision detected. Tetromino locked in place.");
      } else {
        // Move down only if the move is valid
        setOffset((current) => ({
          x: current.x,
          y: current.y + 1,
        }));
      }
    }
    if (e.code === "ArrowUp") {
      if (
        isValidMove(board, currentTetromino, { x: offset.x, y: offset.y - 1 })
      ) {
        setOffset((current) => ({
          x: current.x,
          y: current.y - 1,
        }));
      }
    }
    if (e.code === "ArrowLeft") {
      if (
        isValidMove(board, currentTetromino, { x: offset.x - 1, y: offset.y })
      ) {
        setOffset((current) => ({
          x: current.x - 1,
          y: current.y,
        }));
      }
    }
    if (e.code === "ArrowRight") {
      if (
        isValidMove(board, currentTetromino, { x: offset.x + 1, y: offset.y })
      ) {
        setOffset((current) => ({
          x: current.x + 1,
          y: current.y,
        }));
      }
    }
    if (e.code === "Space") {
      if (isValidMove(board, currentTetromino, { x: offset.x, y: offset.y })) {
        setBoard(renderState);
      }
    }
    console.log(e);
  };

  return (
    <div onKeyUp={handleKeyUp} tabIndex={1}>
      <GameBoard board={renderState} />
    </div>
  );
}

export default App;

// Next goals: bottom lock in detection, new tetromino added when in place
