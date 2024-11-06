
let counter = 0;

function changeColor(color) {
    // Seleciona o elemento com o id "colorText"
    const colorText = document.getElementById("colorText");

    // Altera a cor de fundo para a cor recebida no parâmetro
    colorText.style.backgroundColor = color;
}



// Função para incrementar o contador
function incrementCounter() {
    counter++;
    document.getElementById('counter').textContent = counter;
}

// Função para submeter a cor inserida pelo usuário
function submitColor() {
    const color = document.getElementById('colorInput').value.toLowerCase();
    changeColor(color);
}
