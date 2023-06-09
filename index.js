let x

let board = document.getElementById('board');
let boardArray = [];
let whiteCheckersInit = [
    [7, 0], [7, 2], [7, 4], [7, 6],
    [6, 1], [6, 3], [6, 5], [6, 7],
    [5, 0], [5, 2], [5, 4], [5, 6]
]

let blackCheckersInit = [
    [0, 1], [0, 3], [0, 5], [0, 7],
    [1, 0], [1, 2], [1, 4], [1, 6],
    [2, 1], [2, 3], [2, 5], [2, 7]
]

let emptySquare = [
    [3, 0], [3, 2], [3, 4], [3, 6],
    [4, 1], [4, 3], [4, 5], [4, 7]
]

let rowToRemove = 0;
let colToRemove = 0;
let direction = Number;
let playerColor = ''

createBoard();
placeCheckers();

function placeCheckers() {

    placeFigure(whiteCheckersInit, 'O');
    placeFigure(blackCheckersInit, 'X');
    placeFigure(emptySquare, '');

    function placeFigure(checkersColor, checkerFigure) {
        for (let idS = 0; idS < checkersColor.length; idS++) {
            let row = checkersColor[idS][0]
            let col = checkersColor[idS][1]
            let elementId = `pos${row}-${col}`
            document.getElementById(elementId).innerText = checkerFigure;
            document.getElementById(elementId).style.fontWeight = 'bold';
            document.getElementById(elementId).addEventListener('click', clickSquare)
        }
    }
}

function createBoard() {
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            if ((row + col) % 2 == 0) {
                boardArray.push({ row, col, color: 'white' });
            } else {
                boardArray.push({ row, col, color: 'grey' });
            }
        }
    }

    console.log(boardArray);

    for (let rows = 0; rows < 8; rows++) {
        let row = document.createElement('div');
        row.className = 'row';
        board.appendChild(row);

        for (let cols = 0; cols < 8; cols++) {
            let square = document.createElement('div');
            square.className = 'square';
            square.style.backgroundColor = boardArray[rows * 8 + cols].color;
            square.id = 'pos' + rows + '-' + cols;
            // square.innerText = rows + ' ' + cols;
            row.appendChild(square)
        }
    }
}

function clickSquare() {

    //coming from addEventListener - this.id == 
    console.log(this.id);
    let thisSquare = document.getElementById(this.id)



    if (thisSquare.innerText == 'O') {
        playerColor = 'O'
        rowToRemove = this.id[3]
        colToRemove = this.id[5]
    }
    else if (thisSquare.innerText == 'X') {
        playerColor = 'X'
        rowToRemove = this.id[3]
        colToRemove = this.id[5]
    }
    else if (thisSquare.innerText == '') {
        let newRow = this.id[3]
        let newCol = this.id[5]
        console.log(`esam else if, playerColor = ${playerColor}`)
        if (playerColor) {
            //! adding logic if move is legal:
            if (testMove()) {
                //* removes old checker
                document.getElementById(`pos${rowToRemove}-${colToRemove}`).innerText = ''
                //* add new checker
                thisSquare.innerText = playerColor;
            }

            function testMove() {

                let stepForward = 0
                let stepSides = 0
                // console.log('testMove function data: ' + newRow + newCol)
                if (playerColor == 'O') { stepForward = rowToRemove - newRow }
                if (playerColor == 'X') { stepForward = newRow - rowToRemove }
                if (stepForward == 1) {
                    stepSides = Math.abs(newCol - colToRemove)
                    console.log({ stepSides })
                    if (stepSides == 1) {
                        return true
                    }
                }
                else return false
            }


        }
        //* reset player
        playerColor = ''
    }


}