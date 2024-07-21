let isGameOver = false;
var origBoard;
const Player= "X";
const AI = "O";
let Reset = document.querySelector("#Reset_btn");
let Result =document.querySelector("#result");
const winConditions =[
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

let boxes = document.querySelectorAll(".box");
boxes.forEach(e => {
    e.innerHTML = "";
    origBoard = Array.from(Array(9).keys());
    e.addEventListener("click", (event) => {
      turnClick(event);
    });
});

function turnClick(square) {
	if (typeof origBoard[square.target.id] == 'number') {
		turn(square.target.id, Player)
		if (!checkWin(Player) && !checkDraw()) turn(bestSpot(), AI);
	}
}

function turn(id, player){
    origBoard[id] = player;
    document.getElementById(id).innerHTML = player;
    checkWin(player);
    checkDraw();
}

function checkWin(player) {
    for(let i=0; i<winConditions.length ;i++){
        let v0 = boxes[winConditions[i][0]].innerHTML;
        let v1 = boxes[winConditions[i][1]].innerHTML;
        let v2 = boxes[winConditions[i][2]].innerHTML;

        if(v0 !="" && v0===v1 && v0==v2){
            isGameOver = true;
            Result.innerHTML = player + " WINS!!";
            Reset.style.display = "block";
            for(j=0; j<3; j++){
                boxes[winConditions[i][j]].style.backgroundColor = "#DDB892";
            }
            boxes.forEach(e => {
                e.removeEventListener('click', turnClick, false);
            });
            return true;
        }
    }
    return false;
};

function emptySqaures(){
    return origBoard.filter(s => typeof s == 'number');
}

function bestSpot(){
    return minimax(origBoard, AI).index;
  }

function checkDraw(){
    if(!isGameOver){
        let isDraw = true;
        boxes.forEach(e =>{
            if(e.innerHTML===""){
                isDraw=false;
            }
        })

        if(isDraw){
            isGameOver=true;
            Result.innerHTML = "Draw Try Again!";
            Reset.style.display="block";
            boxes.forEach(e => {
                e.removeEventListener('click', turnClick, false);
            });
            return true;
        }
    }
    return false;
};

function minimax(newBoard, player) {
    var availSpots = newBoard.filter(s => typeof s == 'number');

    function checkWin(board, player) {
        for (let i = 0; i < winConditions.length; i++) {
            let [a, b, c] = winConditions[i];
            if (board[a] === player && board[b] === player && board[c] === player) {
                return true;
            }
        }
        return false;
    }

    if (checkWin(newBoard, Player)) {
        return { score: -10 };
    } else if (checkWin(newBoard, AI)) {
        return { score: 10 };
    } else if (availSpots.length === 0) {
        return { score: 0 };
    }

    var moves = [];
    for (var i = 0; i < availSpots.length; i++) {
        var move = {};
        move.index = newBoard[availSpots[i]];
        newBoard[availSpots[i]] = player;

        if (player == AI) {
            var result = minimax(newBoard, Player);
            move.score = result.score;
        } else {
            var result = minimax(newBoard, AI);
            move.score = result.score;
        }

        newBoard[availSpots[i]] = move.index;
        moves.push(move);
    }

    var bestMove;
    if (player === AI) {
        var bestScore = -10000;
        for (var i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else {
        var bestScore = 10000;
        for (var i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }

    return moves[bestMove];
}


Reset.addEventListener("click", ()=>{
    isGameOver =false;
    origBoard = Array.from(Array(9).keys());
    document.querySelector(".bg").style.left="0";
    Result.innerHTML="";
    Reset.style.display="none";
    boxes.forEach(e =>{
       e.innerHTML="";
       e.style.removeProperty("background-color");
    })

})