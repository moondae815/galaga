const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

function init() {
    // 배경을 검정색으로 칠함
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    console.log("Canvas initialized");
}

window.onload = init;
