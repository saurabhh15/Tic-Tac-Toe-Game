let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newGameBtn = document.querySelector("#new");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; // true -> playerO , false -> playerX

let winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O"; // Player O's move
      box.style.color = "blue";
      turnO = false;
    } else {
        box.innerText = "X"; // Player X's move
        box.style.color = "red";
      turnO = true;
    }
    box.disabled = true;

    checkWinnerOrTie();
  });
});

const checkWinnerOrTie = () => {
  let winnerFound = false;

//         // console.log(pattern[0],
//         //     pattern[1],
//         //     pattern[2]);

//         // console.log(boxes[pattern[0]],
//         //     boxes[pattern[1]],
//         //     boxes[pattern[2]]);

//   // Check if there's a winner
  for (let pattern of winPatterns) {
    let [a, b, c] = pattern;
    let pos1Val = boxes[a].innerText;
    let pos2Val = boxes[b].innerText;
    let pos3Val = boxes[c].innerText;

    if (pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val) {
      showWinner(pos1Val);
      winnerFound = true;
      break;
    }
  }

    // Check for a tie only if no winner is found
    if (!winnerFound) {
        const allFilled = Array.from(boxes).every((box) => box.innerText !== "");
        if (allFilled) {
          showTie();
        }
      }
    
};

const showTie = () => {
    msg.innerText = "It's a Tie!";
    msgContainer.classList.remove("hide");
    disabledBoxes();
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");

  winPatterns.forEach((pattern) => {
    let [a, b, c] = pattern;

    if (
      boxes[a].innerText === winner &&
      boxes[b].innerText === winner &&
      boxes[c].innerText === winner
    ) {
      boxes[a].classList.add("highlight");
      boxes[b].classList.add("highlight");
      boxes[c].classList.add("highlight");
    }
  });

  disabledBoxes();
};

const disabledBoxes = () => {
  boxes.forEach((box) => (box.disabled = true));
};

const enableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
    box.classList.remove("highlight"); // Remove highlight
  });
};

const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide");
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

