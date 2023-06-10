let player = ''
let oldRow = 0;
let oldCol = 0;
let whiteActive = true
//* ------------- START -----------------
createBoard();
placeCheckers();    //! placeCheckers has eventListener - clickSquare 


function clickSquare() {

    console.log({ whiteActive })
    console.log({ oldRow })
    console.log({ oldCol })

    //! coming from addEventListener: this.id
    let thisSquare = document.getElementById(this.id)
    // console.log(this.id);
    // console.log({ thisSquare })
    if (thisSquare.innerText == 'O' && whiteActive) {
        console.log('if whiteActive TRUE')
        player = 'O'
        oldRow = this.id[3]
        oldCol = this.id[5]
    }
    else if (thisSquare.innerText == 'X' && !whiteActive) {
        console.log('if whiteActive FALSE')
        player = 'X'
        oldRow = this.id[3]
        oldCol = this.id[5]
    }
    else if (thisSquare.innerText == '') {

        let newRow = this.id[3]
        let newCol = this.id[5]
        console.log(`ELSE IF, player = ${player}`)
        if (player) {
            if (testMove()) {
                //* removes old checker
                document.getElementById(`pos${oldRow}-${oldCol}`).innerText = ''
                //* add new checker
                thisSquare.innerText = player;
                //* RESET & INVERSE variables
                player = ''
                whiteActive = !whiteActive
            }
            else if (captureMove()) {

            }

            function captureMove() {

            }
            //* adding logic if move is legal:
            function testMove() {

                let stepForward = 0
                let stepSides = 0
                if (player == 'O') { stepForward = oldRow - newRow }
                if (player == 'X') { stepForward = newRow - oldRow }
                if (stepForward == 1) {
                    stepSides = Math.abs(newCol - oldCol)
                    if (stepSides == 1) {
                        return true
                    }
                }
                else return false
            }

            //* reset and reverse activeplayer

        }
    }

}
function placeCheckers() {

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

    placeFigure(whiteInitPos, 'O');
    placeFigure(blackInitPos, 'X');
    placeFigure(emptyInitPos, '');

    //* Function called 3 times to place Whites, Blacks and Empties
    function placeFigure(checkerColor, checkerFigure) {
        for (let squareId = 0; squareId < checkerColor.length; squareId++) {
            let row = checkerColor[squareId][0]
            let col = checkerColor[squareId][1]
            let elementId = `pos${row}-${col}`
            let squareElement = document.getElementById(elementId)
            squareElement.innerText = checkerFigure
            squareElement.addEventListener('click', clickSquare)
        }
    }
}

function createBoard() {
    let board = document.getElementById('board');
    let boardArray = [];
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

