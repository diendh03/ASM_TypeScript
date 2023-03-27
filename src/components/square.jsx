import { useState } from "react";

const Square = ({ value, handlePlay, className }) => {
  const squareHandlePlay = () => {
    if (!value) {
      handlePlay();
    }
  };
  // console.log(checkHL);
  // console.log(index);
  return (
    <button onClick={squareHandlePlay} className={`game-cell ${className}`}>
      {value}
    </button>
  );
};

export default Square;
