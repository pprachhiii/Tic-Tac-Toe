let boxes = document.querySelectorAll(".box");
let resetButton = document.querySelector(".reset");
let newGameBtn = document.querySelector(".newgame");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;
let winningPattern = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // First column
    [1, 4, 7], // Second column
    [2, 5, 8], // Third column
    [0, 4, 8], // Diagonal from top-left
    [2, 4, 6]  // Diagonal from top-right
];

// Add click event for each box
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText === "") { // Check if the box is empty before proceeding
            box.innerText = turnO ? "O" : "X"; // Set text based on turn
            turnO = !turnO; // Toggle turn
            box.disabled = true; // Disable the clicked box

            checkWinner(); // Check for a winner
        }
    });
});

// Disable all boxes after a winner is found
const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

// Enable all boxes and reset their text
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

// Reset the game
const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide"); // Hide message container
};

// Check for a winner
const checkWinner = () => {
    for (let pattern of winningPattern) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos1 === pos2 && pos1 === pos3) {
            showWinner(pos1); // Show winner if found
            return; // Stop checking once a winner is found
        }
    }
};

// Show the winner
const showWinner = (winner) => {
    msg.innerText = `Congrats! Winner is ${winner}`;
    msgContainer.classList.remove("hide"); // Show message container
    disableBoxes(); // Disable all boxes
};

// Event listeners for resetting the game
newGameBtn.addEventListener("click", resetGame);
resetButton.addEventListener("click", resetGame);
