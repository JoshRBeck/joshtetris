import { ShapeID } from "../types/types";
 
type Props = {
  board: ShapeID[][]
}

const GameBoard: React.FC<Props> = ({ board }) => {

return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, columnIndex) => (
            <div key={columnIndex} className={`cell cell-${cell}`}></div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default GameBoard;