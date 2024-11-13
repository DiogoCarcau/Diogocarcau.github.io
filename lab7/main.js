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


// Elementos principais do jogo
const gameArea = getElement("#gameArea");
const scoreDisplay = getElement("#score");
const timeDisplay = getElement("#time");
const startButton = getElement("#startButton");

let score = 0;
let time = 30;
let gameInterval;
let fruitInterval;
let bombaInterval;


function spawnFruit() {
    const fruit = document.createElement("div");
    fruit.classList.add("fruit");
    fruit.textContent = "🍎";
    fruit.style.left = Math.random() * (gameArea.offsetWidth - 50) + "px";
    fruit.style.top = Math.random() * (gameArea.offsetHeight - 50) + "px";
    fruit.style.fontSize = Math.floor(Math.random() * 20 + 30) + "px";


    
    fruit.addEventListener("click", () => {
        score += 1; 
        scoreDisplay.textContent = score;
        fruit.remove(); 
    });

   
    gameArea.appendChild(fruit);
    
}

function spawnBomba() {
    const bomba = document.createElement("div");
    bomba.classList.add("bomba");
    bomba.textContent = "💣";
    bomba.style.left = Math.random() * (gameArea.offsetWidth) + "px";
    bomba.style.top = Math.random() * (gameArea.offsetHeight ) + "px";
    bomba.style.fontSize = Math.floor(Math.random() * 15 + 25) + "px";

    bomba.addEventListener("click", () => {
        score -= 2; 
        scoreDisplay.textContent = score;
        bomba.remove(); 
    });

    gameArea.appendChild(bomba);

}


function startGame() {
    score = 0;  
    time = 30;  
    scoreDisplay.textContent = score;
    timeDisplay.textContent = time;
    
    
const items = gameArea.querySelectorAll('.fruit, .bomba');
items.forEach(item => item.remove());


    startButton.disabled = true; 

    //  cronômetro
    gameInterval = setInterval(() => {
        time--;
        timeDisplay.textContent = time;

        if (time <= 0) {
            clearInterval(gameInterval);
            clearInterval(fruitInterval);
            clearInterval(bombaInterval);
            alert("Fim de Jogo! Pontuação Final: " + score);
            startButton.disabled = false; 
        }
    }, 1000);

    
    fruitInterval = setInterval(spawnFruit, 1000); 
    fruitInterval = setInterval(spawnBomba, 1000);
}

// Evento para iniciar o jogo
startButton.addEventListener("click", startGame);
