function changeColor(color) {
    document.querySelector('#paintText').style.color = color;
}

let counter = 0;

function count(){
    counter++;
    document.querySelector("#counter").textContent = counter;
}

function cimaDaFrase(){
    const mouse=document.querySelector("#mouse");

    mouse.addEventListener("mouseover", function(){
        mouse.textContent="Obrigado por passares!";
    });
    mouse.addEventListener("mouseout", function(){
        mouse.textContent="Passa o mouse aqui!";
    });
}


function mudaFundo() {
    const color = document.querySelector('#colorInput').value; 
    document.body.style.backgroundColor = color; 7
}


function mudaFundoCaixa() {
    const colors = ['#FF5733', '#33FF57', '#2257FF', '#F5A623', '#8E44AD', '#1ABC9C'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)]; 
    document.querySelector('#inputText').style.backgroundColor = randomColor;
}
