let player = ''
let oldRow = 0;
let oldCol = 0;
let whiteActive = true
let inCaptureProcess = false
//* ------------- START -----------------
createBoard();
placeCheckers();    //! placeCheckers has eventListener - clickSquare 


function clickSquare() {

    console.log({ whiteActive })
    console.log({ oldRow })
    console.log({ oldCol })

    //! coming from addEventListener: this.id
    let thisSquare = document.getElementById(this.id)
    // thisSquare.classList.toggle('square-active')
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
            let stepSides = 0
            if (player == 'O') { stepForward = oldRow - newRow }
            if (player == 'X') { stepForward = newRow - oldRow }
            if (oneStepMove()) {
                //* removes old checker
                document.getElementById(`pos${oldRow}-${oldCol}`).innerText = ''
                //* add new checker
                thisSquare.innerText = player;
                //* RESET & INVERSE variables
            }
            else if (captureMove()) {

                console.log('captureMove is TRUE')

            }
            player = ''
            whiteActive = !whiteActive
            function captureMove() {
                inCaptureProcess = true
                if (stepForward == 2) {
                    console.log('you trying HOP over 2 ROWS!')
                    stepSides = Math.abs(newCol - oldCol)
                    if (stepSides == 2) {
                        console.log('you trying HOP over 2 COLS!')
                        //! test if opponent is in the middle
                        let middleRow = (Number(newRow) + Number(oldRow)) / 2;
                        let middleCol = (Number(newCol) + Number(oldCol)) / 2;
                        let middleSquare = document.getElementById(`pos${middleRow}-${middleCol}`)
                        console.log(middleSquare.innerText)
                        if (middleSquare.innerText !== player && middleSquare.innerText !== '') {
                            middleSquare.innerText = ''
                            document.getElementById(`pos${oldRow}-${oldCol}`).innerText = ''
                            thisSquare.innerText = player;
                        }
                        //! test for another hop over opponent
                        else return false
                    }
                }
            }
            //* adding logic if move is legal:
            function oneStepMove() {

                if (stepForward == 1) {
                    stepSides = Math.abs(newCol - oldCol)
                    if (stepSides == 1) {
                        return true
                    }
                }
                else return false
            }
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

