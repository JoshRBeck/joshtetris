import "./App.css";
import { useState } from "react";
import GameBoard from "./components/Gameboard";
import { ShapeID, Shapes } from "./types/types";
import {
  BoardWidth,
  BoardHeight,
  cloneMatrix,
  isValidMove,
  clearCompletedRows,
  updateBoardWithFrozenTetromino,
  spawnNewTetromino,
} from "./logic";

function App() {
  const [offset, setOffset] = useState({ x: 4, y: 0 });
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
    if (e.code === "ArrowDown") {
      if (
        !isValidMove(board, currentTetromino, { x: offset.x, y: offset.y + 1 })
      ) {
        updateBoardWithFrozenTetromino(
          board,
          currentTetromino,
          offset,
          setBoard,
          setOffset
        );
        clearCompletedRows(board, currentTetromino, offset);

        // Spawn a new tetromino at the starting position
        spawnNewTetromino(setOffset, setBoard, { x: 5, y: 0 });
      } else {
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
