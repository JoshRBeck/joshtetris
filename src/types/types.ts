export enum ShapeID {
  None,
  I,
  J,
  L,
  T,
  O,
  Z,
  S,
}

type TetrominoRow = number[];
type TetrominoMatrix = TetrominoRow[];

export type TetrominoShape = {
  [ShapeID.None]: TetrominoMatrix;
  [ShapeID.I]: TetrominoMatrix;
  [ShapeID.J]: TetrominoMatrix;
  [ShapeID.L]: TetrominoMatrix;
  [ShapeID.T]: TetrominoMatrix;
  [ShapeID.O]: TetrominoMatrix;
  [ShapeID.Z]: TetrominoMatrix;
  [ShapeID.S]: TetrominoMatrix;
};

export const Shapes: TetrominoShape = {
  [ShapeID.None]: [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ],
  [ShapeID.I]: [
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  [ShapeID.J]: [
    [0, 0, 0],
    [1, 0, 0],
    [1, 1, 1],
  ],
  [ShapeID.L]: [
    [0, 0, 0],
    [0, 0, 1],
    [1, 1, 1],
  ],
  [ShapeID.T]: [
    [0, 0, 0],
    [0, 1, 0],
    [1, 1, 1],
  ],
  [ShapeID.O]: [
    [0, 0, 0],
    [1, 1, 0],
    [1, 1, 0],
  ],
  [ShapeID.Z]: [
    [0, 0, 0],
    [1, 1, 0],
    [0, 1, 1],
  ],
  [ShapeID.S]: [
    [0, 0, 0],
    [0, 1, 1],
    [1, 1, 0],
  ],
};
