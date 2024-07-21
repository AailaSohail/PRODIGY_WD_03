let boxes = document.querySelectorAll(".box");
let turn = "X";
let isGameOver = false;
let Reset = document.querySelector("#Reset_btn");
let Result =document.querySelector("#result");
boxes.forEach(e => {
    e.innerHTML = "";
    e.addEventListener("click", () => {
        if (!isGameOver && e.innerHTML === "") {
            e.innerHTML = turn;
            checkWin();
            checkDraw();
            changeTurn();
        }
    });
});

function checkWin() {
    let winConditions =[
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ]
    for(let i=0; i<winConditions.length ;i++){
        let v0 = boxes[winConditions[i][0]].innerHTML;
        let v1 = boxes[winConditions[i][1]].innerHTML;
        let v2 = boxes[winConditions[i][2]].innerHTML;

        if(v0 !="" && v0===v1 && v0==v2){
            isGameOver = true;
            Result.innerHTML = turn + " WINS!!";
            Reset.style.display = "block";

            for(j=0; j<3; j++){
                boxes[winConditions[i][j]].style.backgroundColor = "#DDB892";
            }
        }
    }
};

function changeTurn(){
    if(turn === "X"){
        turn = "O";
        document.querySelector(".bg").style.left = "85px";   }
    else{
        turn = "X";
        document.querySelector(".bg").style.left="0";
    }
};

function checkDraw(){
    if(!isGameOver){
        let isDraw =true;
        boxes.forEach(e =>{
            if(e.innerHTML===""){
                isDraw=false;
            }
        })

        if(isDraw){
            isGameOver=true;
            Result.innerHTML = "Draw";
            Reset.style.display="block";
        }
    }
};

Reset.addEventListener("click", ()=>{
    isGameOver =false;
    turn ="X";
    document.querySelector(".bg").style.left="0";
    Result.innerHTML="";
    Reset.style.display="none";
    boxes.forEach(e =>{
       e.innerHTML="";
       e.style.removeProperty("background-color");
    })

})



