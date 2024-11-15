const gameArea = document.getElementById("gameArea");
const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");
const startButton = document.getElementById("startButton");

let score = 0;
let time = 30;
let gameInterval;

// Função para gerar frutas
function spawnFruit() {
    const fruit = document.createElement("div");
    fruit.classList.add("fruit");
    fruit.textContent = "🍎";
    const largurafruta=gameArea.offsetWidth - 50; //para nao ficar de fora da caixa por causa do tamanho de fruta!
    const alturaFruta=gameArea.offsetHeight - 50;
    fruit.style.left = Math.random() * largurafruta + "px";
    fruit.style.top = Math.random() * alturaFruta + "px";
    fruit.style.fontSize = Math.floor(Math.random() * 20 + 30) + "px"; //math.floor para nao ter tamanhos decimais nas frutas

    fruit.addEventListener("click", () => {
        score += 1;
        scoreDisplay.textContent = score;
        fruit.remove();
    });

    gameArea.appendChild(fruit);
}

// Função para gerar bombas
function spawnBomba() {
    const bomba = document.createElement("div");
    bomba.classList.add("bomba");
    bomba.textContent = "💣";
    const larguraBomba=gameArea.offsetWidth - 50; //para nao ficar de fora da caixa por causa do tamanho da bomba!
    const alturaBomba=gameArea.offsetHeight - 50;
    bomba.style.left = Math.random() * larguraBomba + "px";
    bomba.style.top = Math.random() * alturaBomba + "px";
    bomba.style.fontSize = Math.floor(Math.random() * 20 + 30) + "px"; //math.floor para nao ter tamanhos decimais nas bombas

    bomba.addEventListener("click", () => {
        score -= 2;
        scoreDisplay.textContent = score;
        bomba.remove();
    });

    gameArea.appendChild(bomba);
}

// Função para iniciar o jogo
function startGame() {
    score = 0;
    time = 30;
    scoreDisplay.textContent = score;
    timeDisplay.textContent = time;

    const items = gameArea.querySelectorAll('.fruit, .bomba');
    items.forEach(item => item.remove());

    startButton.disabled = true;

    // Configura o cronômetro do jogo
    gameInterval = setInterval(() => {
        time--;
        timeDisplay.textContent = time;
        spawnFruit();
        spawnBomba();

        if (time <= 0) {
            if (time <= 0) {
                clearInterval(gameInterval);
                endGame(); // Chama a função de fim de jogo
            }
            
        }
    }, 1000);
}

// Função para finalizar o jogo e exibir a pontuação
function endGame() {
    startButton.disabled = false;
    alert("Fim de Jogo! Pontuação Final: " + score);

    // Remove todas as frutas e bombas restantes
    const items = gameArea.querySelectorAll('.fruit, .bomba');
    items.forEach(item => item.remove()); //remover frutas e bombas no fim do jogo(nao da para usar)

    // Reinicia o jogo
    score = 0;
    time = 30;
    scoreDisplay.textContent = score;
    timeDisplay.textContent = time;
}




startButton.addEventListener("click", startGame);
