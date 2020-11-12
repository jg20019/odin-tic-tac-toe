
Gameboard = ((el) => {
    let board = Array(9).fill(''); 
    let player = 'X'; 

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
            board[i] =  'X'; // TODO: get current player  
            renderBoard(); 
        }; 
    }; 

    const squares = el.querySelectorAll('.board div'); 
    for(let i = 0; i < squares.length; i++) {
        squares[i].addEventListener('click', handleClick(i)); 
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

    return { renderBoard, showBoard } 
})(document.querySelector('#root')); 
