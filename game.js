
Gameboard = ((el) => {
    let board = Array(9).fill(''); 
    el.innerHTML = `
        <div class="board">
            <div>X</div> 
            <div>X</div> 
            <div>X</div> 
            <div></div> 
            <div></div> 
            <div></div>
            <div></div> 
            <div></div> 
            <div></div> 
        </div> 
    `; 

    const renderBoard = () => {
        let squares = el.querySelectorAll('.board div'); 
        for(let i = 0; i <= squares.length; i++) {
            squares[i].innerText = board[i]; 
        } 
    }; 

    const showBoard = () => {
        return console.log(board); 
    };  

    return { renderBoard, showBoard } 
})(document.querySelector('#root')); 
