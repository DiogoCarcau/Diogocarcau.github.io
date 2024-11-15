
document.querySelectorAll("button[data-color]").forEach((button) => { //tem que ser button[dara-color] e nao #color
    button.addEventListener("click", () => {
       
        const color = button.dataset.color;
        document.getElementById("color").style.color = color;
    });
});


let counter = 0;
function count() {
    counter++;
    document.getElementById("counter").textContent = counter;
}


function cimaDaFrase() {
    const mouse = document.getElementById("mouse");

    mouse.addEventListener("mouseover", () => {
        mouse.textContent = "Obrigado por passares!";
    });
    mouse.addEventListener("mouseout", () => {
        mouse.textContent = "Passa o mouse aqui!";
    });
}
cimaDaFrase();



document.querySelector('#colorSelector').onchange = function() {
    document.body.style.backgroundColor = this.value;
};



function mudaFundoCaixa() {
    const colors = ['#FF5733', '#33FF57', '#2257FF', '#F5A623', '#8E44AD', '#1ABC9C'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.getElementById('inputText').style.backgroundColor = randomColor;
}


document.querySelector('#colorSelector').onsubmit= (e) => {
    e.preventDefault(); //furmulario
} 

function exibirMensagem() {
    const nome = document.getElementById('nameInput').value;
    const idade = document.getElementById('ageInput').value;
    document.getElementById('mensagem').textContent = `Olá, o ${nome} tem ${idade}!`;
}

// Contador automático
let autoCount = 0;
setInterval(() => {
    autoCount++;
    document.getElementById('autoCounter').innerText = autoCount;
}, 1000);

