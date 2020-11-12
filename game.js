
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

Board = (el) => {
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

    return { placeMove, renderBoard, showBoard } 
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
        board.placeMove(currentPlayer.getSymbol(), e.detail.position); 
        swapTurns(); 
    }); 

    function swapTurns() {
        if (player1.getSymbol() === currentPlayer.getSymbol()) {
            console.log('Changing players.'); 
            currentPlayer = player2; 
        } else {
            currentPlayer = player1; 
            console.log('Not changing players.'); 
        } 
    }
    
})(document.querySelector('#root')); 

