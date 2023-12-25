const easy = [
    "6------7------5-2------1---362----81--96-----71--9-4-5-2---651---78----345-------",
    "685329174971485326234761859362574981549618732718293465823946517197852643456137298"
];
const medium = [
    "--9-------4----6-758-31----15--4-36-------4-8----9-------75----3-------1--2--3--",
    "619472583243985617587316924158247369926531478734698152891754236365829741472163895"
];
const hard = [
    "-1-5-------97-42----5----7-5---3---7-6--2-41---8--5---1-4------2-3-----9-7----8--",
    "712583694639714258845269173521436987367928415498175326184697532253841769976352841"
];



var timer;
let timeRemaining;
var lives;
var selectedNum;
var selectedTile;
var disableSelect;


window.onload = function () {

    id("start-btn").addEventListener("click", startGame);
    id("theme").addEventListener("change", function(){
        if (id("theme-1").checked){
            qs("body").classList.remove("dark");
        } else {
            qs("body").classList.add("dark");
        }
    });

    for(let i=0;i<id("number-container").children.length;i++){
        
        id("number-container").children[i].addEventListener("click",function(){
            disableSelect=false;

            if(selectedNum==i){
                selectedNum=null;
                this.classList.remove("selected");
            }else{
                for(const v of id("number-container").children){
                    v.classList.remove('selected');
                }
                selectedNum=i;
                this.classList.add("selected");
            }
        })
    }

    
}

function startGame(){
    let board;
    if (id("diff-1").checked) {
        board = easy;
        lives=3;
    }
    else if (id("diff-2").checked) {
        board = medium;
        lives=4;
    }
    else {
        board = hard;
        lives=5;
    }

    id("remainingLives").textContent=lives;
    generateBoard(board);

    disableSelect=false;
    
    startTimer();
}

    

function startTimer(){
    if (id("time-1").checked){
        timeRemaining=3*60;
    } else if (id('time-2').checked){
        timeRemaining=5*60;
    } else {
        timeRemaining=10*60;
    }

    function timeReduce() {
        id("remainingTime").textContent = timeRemaining;
        if (timeRemaining >= 1) {
            timeRemaining--;
        }else{
            endGame();
        }
    }
    timer =setInterval(timeReduce,1000);
}



function generateBoard(board) {
    clearPrevious();
    let idCount = 0;
    for (let i = 0; i < 81; i++) {
        let tile = document.createElement("p");
        if (board[0].charAt(i) != "-") {
            tile.textContent = board[0].charAt(i);
        }
        else {
            tile.textContent = "";
        }
        tile.id = idCount;
        idCount++;
        //console.log(tile.textContent);
        tile.classList.add("tile");
        id("board").appendChild(tile);
        if ((tile.id >= 18 && tile.id < 27) || (tile.id >= 45 && tile.id < 54)) {
            tile.classList.add("bottomBorder");
        }
        if (tile.id % 3 == 2 && tile.id % 9 != 8) {
            tile.classList.add("rightBorder");
        }
        // console.log(tile.id);
        tile.addEventListener("click", function () {
            if (selectedNum == null) {
            } else if (tile.textContent === "") {
                tile.textContent = selectedNum + 1;
                if (!(board[1][i] == selectedNum + 1)) {
                    tile.classList.add("red");
                    setTimeout(function () {
                        tile.textContent = '';
                        tile.classList.remove("red");
                    }, 1000);
                    lives--;
                    id("remainingLives").textContent = lives;
                    if (lives === 0) {
                        endGame();
                        lives++;
                    }
                }
            }
            let tiles =qsa(".tile");
            let count=0;
            for (let i = 0; i < tiles.length; i++) {
                if (tiles[i].textContent !== '' && (tiles[i].textContent == board[1][i])) {
                    count++;
                }
            }
            console.log(count);
            if (count == 81) {
                    // id("won").textContent="You Won!";
                endGame();
            }
            
        });
    }
}

function endGame(){
    clearTimeout(timer);

    if(lives === 0|| timeRemaining === 0){

        id("lost").textContent="You Lost!";
    }else{
        id("won").textContent="You Won!";
    }
}


function clearPrevious(){
    if (timer) clearTimeout(timer);
    id("lost").textContent="";
    id("won").textContent="";
    let tiles =qsa(".tile");
    console.log(qsa(".tile"));
    console.log(tiles);
    let l=tiles.length;
    for(let i=0;i<l;i++){
        tiles[i].remove();
    }
}

function id(id){
    return document.getElementById(id);
}

function qs(id){
    return document.querySelector(id);
}

function qsa(selector){
    return document.querySelectorAll(selector);
}