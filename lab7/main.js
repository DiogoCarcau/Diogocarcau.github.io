function changeColor(color) {
    document.getElementById('paintText').style.color = color;
}


// Função para incrementar o contador
function incrementCounter() {
    counter++;
    document.getElementById('counter').textContent = counter;
}


function submitColor() {
    const color = document.getElementById('colorInput').value; 
    document.body.style.backgroundColor = color; // Altera a cor de fundo da página
}

// fundo da caixa com cor aleatória
function mudaBackgroud3() {
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#F5A623', '#8E44AD', '#1ABC9C'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)]; 
    document.getElementById('inputText').style.backgroundColor = randomColor;
}
