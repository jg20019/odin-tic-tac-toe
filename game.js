
function Player(name, symbol) {
    let wins = 0;  

    const getName = () => name ; 
    const getSymbol = () => symbol; 
    const getWins = () => wins; 
    const increaseWins = () => {
        wins++; 
    }; 

    return { getName, getSymbol, getWins, increaseWins }; 
};  

function PlayerView(el) {
    el.innerHTML = `
        <span class="name"></span>
        Wins: <span class="wins"></span>  
    `; 

    let nameEl = el.querySelector('.name'); 
    let winsEl = el.querySelector('.wins'); 

    function render(player, isTurn) {
        if (isTurn) {
            el.style.color = 'red'; 
        } else {
            el.style.color = 'black'; 
        }   
        nameEl.innerText = `${player.getName()}(${player.getSymbol()})`;  
        winsEl.innerText = player.getWins(); 
    } 
    
    return { render }; 
}

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

    function didDraw(symbol) {
        let availableMoves = board.reduce((count, pos) => {
            return pos === '' ? count + 1 : count;  
        }, 0); 
        return availableMoves === 0; 
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
        renderBoard(); 
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

    return {
        clearBoard,
        didDraw, 
        didPlayerWin,
        validMove,
        placeMove,
        renderBoard,
        showBoard 
    }; 
}; 

Game = ((el) => {
    el.innerHTML = `
        <div class="game">
            <div class="player-1"></div> 
            <div class="player-2"></div> 
            <div class="board-root"></div> 
        </div> 
    `; 

    const player1 = Player('Player 1', 'X'); 
    const player2 = Player('Player 2', 'O'); 

    const player1View = PlayerView(el.querySelector('.player-1')); 
    const player2View = PlayerView(el.querySelector('.player-2')); 

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
            } else if (board.didDraw(currentPlayer.getSymbol())) {
                alert("It's a draw!");
                board.clearBoard(); 
                swapTurns(); 
            } else {
                swapTurns(); 
            }
            render(); 
        } 
    }); 


    render(); 

    function render() {
        console.log(`Player 1 Turn: ${isPlayerTurn(player1)}`);  
        console.log(`Player 2 Turn: ${isPlayerTurn(player2)}`); 
        player1View.render(player1, isPlayerTurn(player1)); 
        player2View.render(player2, isPlayerTurn(player2)); 
    } 

    function isPlayerTurn(player) {
        return (player.getSymbol() === currentPlayer.getSymbol()); 
    } 
    function swapTurns() {
        if (isPlayerTurn(player1)) {
            currentPlayer = player2; 
        } else {
            currentPlayer = player1; 
        } 
    }
    
})(document.querySelector('#root')); 

