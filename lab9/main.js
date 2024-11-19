// Inicializar produtos-selecionados no localStorage se não existir
if (!localStorage.getItem('produtos-selecionados')) {
    localStorage.setItem('produtos-selecionados', JSON.stringify([]));
}

document.addEventListener('DOMContentLoaded', () => {
    carregarProdutos(produtos);
    atualizaCesto();
});

function carregarProdutos(produtos) {
    const listaProdutos = document.getElementById('lista-produtos');
    
    produtos.forEach(produto => {
        const produtoElemento = criarProduto(produto);
        listaProdutos.appendChild(produtoElemento);
    });
}

function criarProduto(produto) {
    const artigo = document.createElement('article');
    artigo.classList.add('produto');

    const titulo = document.createElement('h3');
    titulo.textContent = produto.title;

    const imagem = document.createElement('img');
    imagem.src = produto.image;
    imagem.alt = produto.title;

    const descricao = document.createElement('p');
    descricao.textContent = produto.description;

    const preco = document.createElement('p');
    preco.textContent = `€${produto.price.toFixed(2)}`;

    const botaoAdicionar = document.createElement('button');
    botaoAdicionar.textContent = '+ Adicionar ao Cesto';
    
    botaoAdicionar.addEventListener('click', () => {
        const produtosSelecionados = JSON.parse(localStorage.getItem('produtos-selecionados'));
        produtosSelecionados.push(produto);
        localStorage.setItem('produtos-selecionados', JSON.stringify(produtosSelecionados));
        atualizaCesto();
    });

    artigo.append(titulo, imagem, descricao, preco, botaoAdicionar);
    
    return artigo;
}

function atualizaCesto() {
    const cestaElemento = document.getElementById('produtos-cesto');
    const produtosSelecionados = JSON.parse(localStorage.getItem('produtos-selecionados'));
    
    cestaElemento.innerHTML = '';
    
    let precoTotal = 0;
    produtosSelecionados.forEach(produto => {
        const produtoCesto = criaProdutoCesto(produto);
        cestaElemento.appendChild(produtoCesto);
        precoTotal += produto.price;
    });
    
    const precoTotalElemento = document.getElementById('preco-total');
    precoTotalElemento.textContent = `Total: €${precoTotal.toFixed(2)}`;
}

function criaProdutoCesto(produto) {
    const artigo = document.createElement('article');
    artigo.classList.add('produto-cesto');

    const titulo = document.createElement('h3');
    titulo.textContent = produto.title;

    const preco = document.createElement('p');
    preco.textContent = `€${produto.price.toFixed(2)}`;

    const botaoRemover = document.createElement('button');
    botaoRemover.textContent = 'Remover';
    
    botaoRemover.addEventListener('click', () => {
        const produtosSelecionados = JSON.parse(localStorage.getItem('produtos-selecionados'));
        const indiceProduto = produtosSelecionados.findIndex(p => p.id === produto.id);
        
        if (indiceProduto !== -1) {
            produtosSelecionados.splice(indiceProduto, 1);
            localStorage.setItem('produtos-selecionados', JSON.stringify(produtosSelecionados));
            atualizaCesto();
        }
    });

    artigo.append(titulo, preco, botaoRemover);
    
    return artigo;
}