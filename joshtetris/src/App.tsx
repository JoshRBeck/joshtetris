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

function App() {
  const [offset, setOffset] = useState({ x: 2, y: 5 });
  const [board, setBoard] = useState<ShapeID[][]>(
    Array.from({ length: BoardHeight }, () =>
      Array(BoardWidth).fill(ShapeID.None)
    )
  );

  const renderState = cloneMatrix(board);
  const currentTetromino = cloneMatrix(Shapes[ShapeID.T]);

  currentTetromino.forEach((row, r) => {
    row.forEach((cell, c) => {
      renderState[r + offset.y][c + offset.x] = cell;
    });
  });

  const handleKeyUp: React.KeyboardEventHandler = (e) => {
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
    if (e.code === "ArrowDown") {
      if (
        isValidMove(board, currentTetromino, { x: offset.x, y: offset.y + 1 })
      ) {
        setOffset((current) => ({
          x: current.x,
          y: current.y + 1,
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

// Next goals: Collision, bottom lock in detection, new tetromino added when in place
