import { useState } from "react";
import Square from "./square";
import "../GameStyle.css";

const Board = () => {
  const [game, setGame] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState(true);
  const [history, setHistory] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(0);
  const [undo, setUndo] = useState({
    X: true,
    O: true,
  });
  const handlePlay = (position) => {
    // console.log(position);
    // game[position] = "X"
    // const checkHL = (position) => {
    //   listWin.map((item) => {
    //     if (item == position) {
    //       return true;
    //     }
    //   });
    // };
    // checkHL();
    const newGame = game.map((g, index) => {
      if (position === index) {
        return player ? "X" : "O";
      }
      return g;
    });
    const newHistory = [...game];
    setGame(newGame);
    setTurn(turn + 1);
    // console.log(turn);
    setPlayer(!player);
    setHistory(newHistory);
  };

  const listWin = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWinner = () => {
    for (let i = 0; i < listWin.length; i++) {
      const [p1, p2, p3] = listWin[i];
      if (game[p1] && game[p1] === game[p2] && game[p2] === game[p3]) {
        return {
          winner: game[p1],
          indexWin: [p1, p2, p3],
        };
      }
    }
    return null;
  };
  const win = checkWinner();
  const handleResetGame = () => {
    setGame(Array(9).fill(null));
    setPlayer(!player);
    setUndo({
      X: true,
      O: true,
    });
    setTurn(0);
  };
  const checkUndo = () => {
    if (turn % 2 === 0) {
      if (undo.X == true) {
        setUndo({
          ...undo,
          X: false,
        });
        handleUndoGame();
      }
    }
    if (turn % 2 === 1) {
      if (undo.O == true) {
        setUndo({
          ...undo,
          O: false,
        });
        handleUndoGame();
      }
    }
  };
  const handleUndoGame = () => {
    setTurn(turn - 1);
    setGame(history);
    setPlayer(!player);
  };

  return (
    <>
      <div>
        {win && <div className="game-winner">Winner is {win.winner}</div>}
        {!win && (
          <div className="game-winner">Next player : {player ? "X" : "O"}</div>
        )}
        <div className="game-board">
          {game.map((item, index) => (
            <Square
              value={item}
              handlePlay={() => {
                if (!win) handlePlay(index);
              }}
              className={item === "X" ? "is-x" : item === "O" ? "is-o" : ""}
            />
          ))}
        </div>
        {undo.X == false && (
          <div className="game-winner"> O đã hết lượt undo</div>
        )}
        {undo.O == false && (
          <div className="game-winner"> X đã hết lượt undo</div>
        )}

        {!win && (
          <button className="game-reset" onClick={checkUndo}>
            Undo
          </button>
        )}
        <button className="game-reset" onClick={handleResetGame}>
          Reset game
        </button>
      </div>
    </>
  );
};

export default Board;
