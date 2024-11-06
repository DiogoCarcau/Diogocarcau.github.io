// Variáveis
let counter = 0;

// Função para alterar a cor de fundo
function changeColor(color) {
    document.body.style.backgroundColor = color;
}

// Função para exibir uma mensagem ao passar o mouse
document.getElementById('hoverZone').addEventListener('mouseover', () => {
    alert("Passou o mouse aqui!");
});

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
