// Função para selecionar elementos
function getElement(selector) {
    return document.querySelector(selector);
}

// Função para alterar a cor do texto
function changeColor(color) {
    getElement('#paintText').style.color = color;
}

// Função para incrementar o contador
let counter = 0;
function count() {
    counter++;
    getElement("#counter").textContent = counter;
}

// Função para adicionar eventos de mouse sobre um texto
function cimaDaFrase() {
    const mouse = getElement("#mouse");

    mouse.addEventListener("mouseover", () => {
        mouse.textContent = "Obrigado por passares!";
    });
    mouse.addEventListener("mouseout", () => {
        mouse.textContent = "Passa o mouse aqui!";
    });
}

// Função para mudar o fundo da página
function mudaFundo() {
    const color = getElement('#colorInput').value;
    document.body.style.backgroundColor = color;
}

// Função para mudar o fundo de uma caixa de texto com cor aleatória
function mudaFundoCaixa() {
    const colors = ['#FF5733', '#33FF57', '#2257FF', '#F5A623', '#8E44AD', '#1ABC9C'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    getElement('#inputText').style.backgroundColor = randomColor;
}

// Elementos principais do jogo
const gameArea = getElement("#gameArea");
const scoreDisplay = getElement("#score");
const timeDisplay = getElement("#time");
const startButton = getElement("#startButton");

let score = 0;
let time = 30;
let gameInterval;
let fruitInterval;

// Função para criar e exibir uma fruta na área de jogo
function spawnFruit() {
    const fruit = document.createElement("div");
    const bomba = document.createElement("div");
    fruit.classList.add("fruit");
    fruit.textContent = "🍎";
    bomba.classList.add("bomba");
    bomba.textContent = "💣";
    fruit.style.left = Math.random() * (gameArea.offsetWidth - 50) + "px";
    fruit.style.top = Math.random() * (gameArea.offsetHeight - 50) + "px";
    fruit.style.fontSize = Math.floor(Math.random() * 20 + 30) + "px";
     bomba.style.left = Math.random() * (gameArea.offsetWidth - 50) + "px";
    bomba.style.top = Math.random() * (gameArea.offsetHeight - 50) + "px";
    bomba.style.fontSize = Math.floor(Math.random() * 20 + 30) + "px";


    // Evento para coletar a fruta ao clicar
    fruit.addEventListener("click", () => {
        score += 1; 
        scoreDisplay.textContent = score;
        fruit.remove(); 
    });

    
    bomba.addEventListener("click", () => {
        score -= 5; 
        scoreDisplay.textContent = score;
        bomba.remove(); 
    });

    // Adiciona a fruta na área de jogo
    gameArea.appendChild(fruit);
    gameArea.appendChild(bomba);
}

// Função para iniciar o jogo
function startGame() {
    score = 0;  // Zera a pontuação no início do jogo
    time = 30;  // Reseta o tempo
    scoreDisplay.textContent = score;
    timeDisplay.textContent = time;
    
    // Limpa apenas a área de frutas e bombas
const items = gameArea.querySelectorAll('.fruit, .bomba');
items.forEach(item => item.remove());


    startButton.disabled = true; // Desativa o botão iniciar

    // Intervalo para o cronômetro do jogo
    gameInterval = setInterval(() => {
        time--;
        timeDisplay.textContent = time;

        if (time <= 0) {
            clearInterval(gameInterval);
            clearInterval(fruitInterval);
            alert("Fim de Jogo! Pontuação Final: " + score);
            startButton.disabled = false; // Reativa o botão iniciar
        }
    }, 1000);

    // Intervalo para spawn de frutas
    fruitInterval = setInterval(spawnFruit, 1000); // Frutas aparecem a cada 1 segundo
}

// Evento para iniciar o jogo
startButton.addEventListener("click", startGame);
