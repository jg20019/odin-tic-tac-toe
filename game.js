
function Player(name, symbol) {
    const wins = 0;  

    const getName = () => name ; 
    const getSymbol = () => symbol; 
    const getWins = () => wins; 
    const increaseWins = () => {
        wins++; 
    }; 

    return { getName, getSymbol, getWins, increaseWins }; 
};  

Board = el => {
    let board = Array(9).fill(''); 

    el.innerHTML = `
        <div class="board">
            <div></div> 
            <div></div> 
            <div></div> 
            <div></div> 
            <div></div> 
            <div></div>
            <div></div> 
            <div></div> 
            <div></div> 
        </div> 
    `; 

    const handleClick = (i) => {
        return () => {
            el.dispatchEvent(new CustomEvent('Move', {
                bubbles: true, 
                detail: { position: i }, 
            })); 
        }; 
    }; 

    const squares = el.querySelectorAll('.board div'); 
    for(let i = 0; i < squares.length; i++) {
        squares[i].addEventListener('click', handleClick(i)); 
    } 

    function didPlayerWin(symbol) {
        let positions = [
            // rows
            [0, 1, 2], 
            [3, 4, 5], 
            [6, 7, 8], 

            // cols
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],


            // diagonals
            [0, 4, 8], 
            [2, 4, 6]
        ];  
       

        return positions.some(([x, y, z]) => {
            return (
                symbol !== '' &&
                board[x] === symbol && 
                board[x] === board[y] && 
                board[y] === board[z]
            ); 
        }); 

    } 

    function clearBoard() {
        board = Array(9).fill(''); 
    } 

    function validMove(position) {
        return board[position] === ''; 
    } 

    function placeMove(symbol, position) {
        board[position] = symbol; 
        renderBoard(); 
    } 

    function renderBoard() {
        let squares = el.querySelectorAll('.board div'); 
        for(let i = 0; i < squares.length; i++) {
            squares[i].innerText = board[i]; 
        } 
    }; 

    function showBoard() {
        return console.log(board); 
    };  

    return { clearBoard, didPlayerWin, validMove, placeMove, renderBoard, showBoard } 
}; 

Game = ((el) => {
    el.innerHTML = `
        <div class="game">
            <div class="player1"></div> 
            <div class="player2"></div> 
            <div class="board-root"></div> 
        </div> 
    `; 

    const player1 = Player('John', 'X'); 
    const player2 = Player('Sarah', 'O'); 
    let currentPlayer = player1; 

    const board = Board(el.querySelector('.board-root')); 

    el.addEventListener('Move', function (e) {
        const position = e.detail.position; 
        if (board.validMove(position)) {
            board.placeMove(currentPlayer.getSymbol(), position); 
            
            if (board.didPlayerWin(currentPlayer.getSymbol())) {
                alert(`${currentPlayer.getSymbol()} wins!`); 
                currentPlayer.increaseWins(); 
                board.clearBoard(); 
                swapTurns(); 
            } else {
                swapTurns(); 
            }
        } 
    }); 

    function swapTurns() {
        if (player1.getSymbol() === currentPlayer.getSymbol()) {
            currentPlayer = player2; 
        } else {
            currentPlayer = player1; 
        } 
    }
    
})(document.querySelector('#root')); 

