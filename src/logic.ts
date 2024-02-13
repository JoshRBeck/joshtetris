import { ShapeID, Shapes } from "./types/types";

export const BoardWidth = 12;
export const BoardHeight = 24;

export function cloneMatrix(matrix: number[][]) {
  // Using the map function to create a new array with the same structure as the original matrix
  // This ensures that the original matrix is not mutated when modifications are made to the clone
  return matrix.map((row) => row.map((cell) => cell))
}

export function spawnNewTetromino(
  setOffset: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>,
  setBoard: React.Dispatch<React.SetStateAction<ShapeID[][]>>,
  spawnPosition: { x: number; y: number }
) {
  const randomShapeID = getRandomShapeID();
  const newTetromino = cloneMatrix(Shapes[randomShapeID]);

  // Reset the offset to the spawn position for the new tetromino
  setOffset(spawnPosition);


  // Update the board with the new tetromino
  updateBoardWithFrozenTetromino(
    Array.from({ length: BoardHeight }, () => Array(BoardWidth).fill(ShapeID.None)),
    newTetromino,
    spawnPosition,
    setBoard,
    setOffset
  );

}


export function isValidMove(
  board: ShapeID[][],
  tetromino: ShapeID[][],
  offset: { x: number; y: number }
): boolean {
  // Check if the proposed position of the tetromino is within the boundaries of the game board
  if (
    offset.x >= 0 && //Check Left edge of board
    offset.x + tetromino[0].length <= BoardWidth && //Checks Right edge of board
    offset.y >= 0 && //Checks Top edge of board
    offset.y + tetromino.length <= BoardHeight //Checks Bottom edge of board
  ) {
    // Iterate over each cell of the tetromino
    for (let i = 0; i < tetromino.length; i++) {
      for (let j = 0; j < tetromino[0].length; j++) {
        // Retrieve the shape of the tetromino cell and the corresponding cell on the board
        const tetrominoCell = tetromino[i][j];
        const boardCell = board[offset.y + i][offset.x + j];

        // Check if both the tetromino cell and the corresponding board cell are occupied
        if (tetrominoCell !== ShapeID.None && boardCell !== ShapeID.None) {
          // If both cells are occupied, the move is invalid
          return false;
        }
      }
    }
    // If no conflicts were found, the move is valid
    return true;
  }
  // If the proposed position is outside the boundaries of the board, the move is invalid
  return false;
}


export function updateBoardWithFrozenTetromino(
  board: ShapeID[][],
  currentTetromino: ShapeID[][],
  offset: { x: number; y: number },
  setBoard: React.Dispatch<React.SetStateAction<ShapeID[][]>>,
  setOffset: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>
) {
  const newMatrix = cloneMatrix(board);

  // Place the current tetromino on the board
  for (let i = 0; i < currentTetromino.length; i++) {
    for (let j = 0; j < currentTetromino[0].length; j++) {
      const tetrominoCell = currentTetromino[i][j];
      if (tetrominoCell !== ShapeID.None) {
        newMatrix[offset.y + i][offset.x + j] = tetrominoCell;
      }
    }
  }

  // Update the board state with the frozen tetromino
  setBoard(newMatrix);

  // Reset the offset to the starting position for the next tetromino
  setOffset({ x: 5, y: 0 }); // Adjust this position as needed
}




export function getRandomShapeID(): ShapeID {
  const shapeIDs: ShapeID[] = [
    ShapeID.None,
    ShapeID.I,
    ShapeID.J,
    ShapeID.L,
    ShapeID.T,
    ShapeID.O,
    ShapeID.Z,
    ShapeID.S,
  ];

  const randomIndex = Math.floor(Math.random() * shapeIDs.length);
  return shapeIDs[randomIndex];
}


