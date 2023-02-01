import "./styles.css";
import { React, useState } from "react";

const Square = (prop) => {
  const { no, mark, onClick } = prop;
  return (
    <div className="square" value={no} onClick={onClick}>
      {mark}
    </div>
  );
};

const winnerPattern = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7]
];

const winnerCheck = (data, player) => {
  const result = data.filter((x) => x.mark === player).map((x) => x.no);
  //for (let i = 0; i < winnerPattern.length; i++) {
  let isWinner = false;
  winnerPattern.forEach((pattern) => {
    const [a, b, c] = pattern;
    if (result.findIndex((x) => x === a) < 0) return false;
    if (result.findIndex((x) => x === b) < 0) return false;
    if (result.findIndex((x) => x === c) < 0) return false;
    isWinner = true;
  });
  console.log(isWinner);
  return isWinner;
};

export default function App() {
  const [winner, setWinner] = useState("");
  const [turn, setTurn] = useState(1);
  const [data, setData] = useState([
    { no: 1, mark: "" },
    { no: 2, mark: "" },
    { no: 3, mark: "" },
    { no: 4, mark: "" },
    { no: 5, mark: "" },
    { no: 6, mark: "" },
    { no: 7, mark: "" },
    { no: 8, mark: "" },
    { no: 9, mark: "" }
  ]);

  const handleChangeMark = (no) => {
    if (winner) return;
    const idx = data.findIndex((x) => {
      return x.no === no;
    });
    if (data[idx].mark) return;
    const player = turn % 2 === 1 ? "○" : "✖️";
    data[idx].mark = player;
    const newData = [...data];
    setData(newData);

    if (winnerCheck(newData, player)) {
      setWinner(player);
      return;
    }

    setTurn((prev) => {
      return prev + 1;
    });
  };

  return (
    <>
      <div>{turn >= 10 ? "引き分け" : ""}</div>
      <div>{winner ? `${winner}の勝ち` : winner}</div>
      <div>{turn}ターン目</div>
      <div className="app">
        {data.map((x) => (
          <Square
            key={x.no}
            no={x.no}
            mark={x.mark}
            onClick={() => handleChangeMark(x.no)}
          />
        ))}
      </div>
    </>
  );
}
