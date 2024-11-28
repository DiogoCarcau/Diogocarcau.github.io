document.addEventListener('DOMContentLoaded', () => {
    carregarProdutos(produtos);
    carregarCesto();
});

document.addEventListener('DOMContentLoaded', () => {
    const cestoExistente = localStorage.getItem('cesto');
    if (!cestoExistente) {
        localStorage.setItem('cesto', JSON.stringify([]));
    }
    carregarProdutos(produtos);
    carregarCesto();
});


function carregarProdutos(produtos) {
    const listaProdutos = document.getElementById('lista-produtos');
    listaProdutos.innerHTML = ''; // Limpar produtos

    produtos.forEach(produto => {
        const elemento = criarProduto(produto);
        listaProdutos.appendChild(elemento);
    });
}

function criarProduto(produto) {
    const article = document.createElement('article');
    article.classList.add('produto');

    const figure = document.createElement('figure');
    const img = document.createElement('img');
    img.src = produto.image;
    img.alt = produto.title;
    figure.appendChild(img);

    const info = document.createElement('section');
    info.classList.add('produto-info');

    const h2 = document.createElement('h2');
    h2.textContent = produto.title;

    const categoria = document.createElement('span');
    categoria.classList.add('categoria');
    categoria.textContent = produto.category;

    const descricao = document.createElement('p');
    descricao.classList.add('descricao');
    descricao.textContent = produto.description;

    const detalhes = document.createElement('section');
    detalhes.classList.add('produto-detalhes');

    const preco = document.createElement('strong');
    preco.classList.add('preco');
    preco.textContent = `${produto.price.toFixed(2)}€`;

    const rating = document.createElement('span');
    rating.classList.add('rating');
    rating.textContent = `★ ${produto.rating.rate} (${produto.rating.count})`;

    const btn = document.createElement('button');
    btn.textContent = '+ Adicionar ao cesto';
    btn.addEventListener('click', () => {
        btn.textContent = 'Adicionado';
        setTimeout(() => {
            btn.textContent = '+ Adicionar ao cesto';
        }, 500);

        adicionarAoCesto(produto);
    });

    info.appendChild(h2);
    info.appendChild(categoria);
    info.appendChild(descricao);
    detalhes.appendChild(preco);
    detalhes.appendChild(rating);

    article.appendChild(figure);
    article.appendChild(info);
    article.appendChild(detalhes);
    article.appendChild(btn);

    return article;
}

function adicionarAoCesto(produto) {
    let cesto = JSON.parse(localStorage.getItem('cesto')) || [];
    cesto.push(produto);
    localStorage.setItem('cesto', JSON.stringify(cesto));
    carregarCesto();
}

function carregarCesto() {
    const produtosCesto = document.getElementById('produtos-cesto');
    const precoTotal = document.getElementById('preco-total');
    produtosCesto.innerHTML = ''; // limpar cesto

    const cesto = JSON.parse(localStorage.getItem('cesto')) || [];

    if (cesto.length > 0) {
        let total = 0;

        cesto.forEach(produto => {
            const elementoCesto = criarProdutoCesto(produto);
            produtosCesto.appendChild(elementoCesto);
            total += produto.price;
        });

        precoTotal.textContent = `Total: ${total.toFixed(2)}€`;
    } else {
        precoTotal.textContent = 'Total: €0.00';
    }
}

function criarProdutoCesto(produto) {
    const article = document.createElement('article');
    article.classList.add('produto', 'cesto');

    const figure = document.createElement('figure');
    const img = document.createElement('img');
    img.src = produto.image;
    img.alt = produto.title;
    figure.appendChild(img);

    const info = document.createElement('section');
    info.classList.add('produto-info');

    const h2 = document.createElement('h2');
    h2.textContent = produto.title;

    const categoria = document.createElement('span');
    categoria.classList.add('categoria');
    categoria.textContent = produto.category;

    const detalhes = document.createElement('section');
    detalhes.classList.add('produto-detalhes');

    const preco = document.createElement('strong');
    preco.classList.add('preco');
    preco.textContent = `${produto.price.toFixed(2)}€`;

    const btn = document.createElement('button');
    btn.textContent = '- Remover do cesto';
    btn.addEventListener('click', () => {
        let cesto = JSON.parse(localStorage.getItem('cesto'));
        const index = cesto.findIndex(p => p.title === produto.title);
        
        if (index !== -1) {
            cesto.splice(index, 1);
            localStorage.setItem('cesto', JSON.stringify(cesto));
        }

        carregarCesto();
    });

    info.appendChild(h2);
    info.appendChild(categoria);
    detalhes.appendChild(preco);

    article.appendChild(figure);
    article.appendChild(info);
    article.appendChild(detalhes);
    article.appendChild(btn);

    return article;
}