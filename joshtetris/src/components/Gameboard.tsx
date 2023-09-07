

const GameBoard: React.FC = () => {

const BoardWidth = 12
const BoardHeight = 24

const Board = Array.from({ length: BoardHeight }, () => Array(BoardWidth).fill(0));

return (
    <div className="board">
      {Board.map((row, rowIndex) => (
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