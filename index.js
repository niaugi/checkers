let board = document.getElementById('board');
let boardArray = [];
let whiteInitPos = [
    [7, 0], [7, 2], [7, 4], [7, 6],
    [6, 1], [6, 3], [6, 5], [6, 7],
    [5, 0], [5, 2], [5, 4], [5, 6]]
let blackInitPos = [
    [0, 1], [0, 3], [0, 5], [0, 7],
    [1, 0], [1, 2], [1, 4], [1, 6],
    [2, 1], [2, 3], [2, 5], [2, 7]]
let emptyInitPos = [
    [3, 0], [3, 2], [3, 4], [3, 6],
    [4, 1], [4, 3], [4, 5], [4, 7]]

let direction = Number;
let playerColor = ''
let currentRow = 0;
let currentCol = 0;
let firstMove = 'O'
//* ------------- START -----------------
createBoard();
placeCheckers();    //! placeCheckers has eventListener - clickSquare 

function placeCheckers() {

    placeFigure(whiteInitPos, 'O');
    placeFigure(blackInitPos, 'X');
    placeFigure(emptyInitPos, '');

    //* Function called 3 times to place Whites, Blacks and Empties
    function placeFigure(checkerColor, checkerFigure) {
        for (let idS = 0; idS < checkerColor.length; idS++) {
            let row = checkerColor[idS][0]
            let col = checkerColor[idS][1]
            let elementId = `pos${row}-${col}`
            document.getElementById(elementId).innerText = checkerFigure;
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


    //! coming from addEventListener: this.id
    console.log(this.id);
    let thisSquare = document.getElementById(this.id)

    if (thisSquare.innerText == 'O') {
        playerColor = 'O'
        currentRow = this.id[3]
        currentCol = this.id[5]
    }
    else if (thisSquare.innerText == 'X') {
        playerColor = 'X'
        currentRow = this.id[3]
        currentCol = this.id[5]
    }
    else if (thisSquare.innerText == '') {
        let newRow = this.id[3]
        let newCol = this.id[5]
        console.log(`else if, playerColor = ${playerColor}`)
        if (playerColor) {
            if (testMove()) {
                //* removes old checker
                document.getElementById(`pos${currentRow}-${currentCol}`).innerText = ''
                //* add new checker
                thisSquare.innerText = playerColor;
            }

            //* adding logic if move is legal:
            function testMove() {

                let stepForward = 0
                let stepSides = 0
                if (playerColor == 'O') { stepForward = currentRow - newRow }
                if (playerColor == 'X') { stepForward = newRow - currentRow }
                if (stepForward == 1) {
                    stepSides = Math.abs(newCol - currentCol)
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