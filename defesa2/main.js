document.addEventListener('DOMContentLoaded', () => {
  iniciarLoja();
  fetchProdutos();
  setTimeout(restaurarCarinho, 100); // Garante que o cesto será restaurado após carregar os produtos
});

let allProducts = [];
let selectedProducts = [];

// Inicializa o LocalStorage para produtos selecionados
function iniciarLoja() {
  if (!localStorage.getItem('produtos-selecionados')) {
    localStorage.setItem('produtos-selecionados', JSON.stringify([]));
  }
}

// Obtém produtos da API
function fetchProdutos() {
  fetch('https://deisishop.pythonanywhere.com/products/')
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao carregar os produtos da API');
      }
      return response.json(); // Converte para JSON
    })
    .then(produtos => {
      console.log('Produtos obtidos da API:', produtos); // Log para depuração
      allProducts = produtos; // Atualiza a lista global
      carregarProdutos(produtos); // Carrega os produtos no DOM
    })
    .catch(erro => {
      console.error('Erro ao obter os produtos:', erro);
    });
}

// Carrega os produtos no DOM
function carregarProdutos(produtos) {
  if (!produtos || produtos.length === 0) {
    console.log('Nenhum produto encontrado');
    return;
  }

  const produtosContainer = document.querySelector('.produtos');
  produtosContainer.innerHTML = ''; // Limpa o container antes de carregar
  produtos.forEach(produto => {
    produtosContainer.appendChild(criarProduto(produto));
  });
}


// Cria os elementos HTML para cada produto
function criarProduto(produto) {
  const artigo = document.createElement('article');
  artigo.className = 'produto-card';

  const titulo = document.createElement('h3');
  titulo.textContent = produto.title;

  const imagem = document.createElement('img');
  imagem.src = produto.image;
  imagem.alt = produto.title;

  const preco = document.createElement('p');
  preco.className = 'preco';
  preco.textContent = `${parseFloat(produto.price).toFixed(2)} €`; // Garante que o preço está formatado

  const descricao = document.createElement('p');
  descricao.className = 'descricao';
  descricao.textContent = produto.description;

  const botaoAdicionar = document.createElement('button');
  botaoAdicionar.textContent = '+ Adicionar ao Cesto';
  botaoAdicionar.className = 'adicionar-btn';
  botaoAdicionar.addEventListener('click', () => {
    selectedProducts = JSON.parse(localStorage.getItem('produtos-selecionados')) || [];
    selectedProducts.push(produto);
    localStorage.setItem('produtos-selecionados', JSON.stringify(selectedProducts));
    atualizarProdutoNoCesto(produto);
    updateDinheiro();
  });

  const conteinerDescricaoBotao = document.createElement('section');
  conteinerDescricaoBotao.className = 'conteiner-descricao-botao';
  conteinerDescricaoBotao.appendChild(descricao);
  conteinerDescricaoBotao.appendChild(botaoAdicionar);

  artigo.appendChild(titulo);
  artigo.appendChild(imagem);
  artigo.appendChild(preco);
  artigo.appendChild(conteinerDescricaoBotao);

  return artigo;
}

// Atualiza o produto no cesto
function atualizarProdutoNoCesto(produto) {
  const cestoContainer = document.querySelector('.produtos-cesto');
  
  // Cria o contêiner do item
  const itemCesto = document.createElement('article');
  itemCesto.className = 'produto-card';

  const imagem = document.createElement('img');
  imagem.src = produto.image;
  imagem.alt = produto.title;
  imagem.className = 'produto-imagem';

  const titulo = document.createElement('h3');
  titulo.textContent = produto.title;

  const preco = document.createElement('p');
  preco.textContent = `${produto.price.toFixed(2)} €`;

  const removerBtn = document.createElement('button');
  removerBtn.textContent = 'Remover do Cesto';
  removerBtn.className = 'remover-btn';

  removerBtn.addEventListener('click', () => removerDoCesto(produto, itemCesto));

  itemCesto.appendChild(imagem);
  itemCesto.appendChild(titulo);
  itemCesto.appendChild(preco);
  itemCesto.appendChild(removerBtn);

  cestoContainer.appendChild(itemCesto);
}

// Remove produto do cesto
function removerDoCesto(produto, elementoCesto) {
  const index = selectedProducts.findIndex(p => p.id === produto.id);
  
  if (index !== -1) {
    selectedProducts.splice(index, 1);
    localStorage.setItem('produtos-selecionados', JSON.stringify(selectedProducts));
  }

  elementoCesto.remove();
  updateDinheiro();
}

// Atualiza o custo total do cesto
function updateDinheiro() {
  selectedProducts = JSON.parse(localStorage.getItem('produtos-selecionados')) || [];
  const custoTotal = selectedProducts.reduce((total, produto) => total + parseFloat(produto.price), 0);
  document.getElementById('custo-total').textContent = `Custo total: ${custoTotal.toFixed(2)} €`;


}

// Restaura produtos no cesto ao carregar a página
function restaurarCarinho() {
  const produtosStorage = JSON.parse(localStorage.getItem('produtos-selecionados')) || [];
  selectedProducts = produtosStorage;
  produtosStorage.forEach(atualizarProdutoNoCesto);
  updateDinheiro();
}

// Filtra produtos por categoria
function filtroCategoria() {
  const categoria = document.getElementById('filtrarPor').value;
  const produtosFiltrados = categoria 
    ? allProducts.filter(p => p.category === categoria)
    : allProducts;
  console.log('Produtos filtrados:', produtosFiltrados); // Log para verificar
  carregarProdutos(produtosFiltrados);
}


function ordenarPorRating() {
  const ordem = document.getElementById('ordenarPorRating').value;
  let sortedProducts = allProducts; 

  if (ordem === 'rating-ascendente') {
    sortedProducts.sort((a, b) => a.rating.rate - b.rating.rate);   //crescente  rating
  } else if (ordem === 'rating-descendente') {
    sortedProducts.sort((a, b) => b.rating.rate - a.rating.rate);  //decrescente rating
  }

  console.log('Produtos ordenados por rating:', sortedProducts);
  carregarProdutos(sortedProducts);
}


function pesquisarProdutos() {
  const termoPesquisa = document.getElementById('pesquisar').value.toLowerCase();
  const produtosFiltrados = allProducts.filter(produto => 
    produto.title.toLowerCase().includes(termoPesquisa) || 
    (produto.description && produto.description.toLowerCase().includes(termoPesquisa))
  );  
  
  carregarProdutos(produtosFiltrados);
}

// Função para processar pagamento
function processaPagamento() {
  const produtosIds = selectedProducts.map(produto => produto.id);
  const dadosDesconto = {
    products: produtosIds,
    student: document.getElementById('estudante-checkbox').checked,
    coupon: document.getElementById('desconto-cupao').value,
  };

  fetch('https://deisishop.pythonanywhere.com/buy/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dadosDesconto),
  })
  .then(response => response.json())
  .then(dados => {
    document.getElementById('precofinal').textContent = `Valor final a pagar (com eventuais descontos): ${dados.totalCost} €`;
    document.getElementById('referencia').textContent = `Referência de pagamento: ${dados.reference}`;
  })
  .catch(error => {
    console.error('Erro:', error);
    document.getElementById('precofinal').textContent = `Erro na compra: ${error.message}`;
    document.getElementById('referencia').textContent = '';
  });
}

//defesa
function carregarProdutosSemDescricao(produtos) {
  
  const produtosContainer = document.querySelector('.produtos');
  produtosContainer.innerHTML = ''; // Limpa o container antes de carregar
  produtos.forEach(produto => {
      const artigo = document.createElement('article');
      artigo.className = 'produto-card';

      const titulo = document.createElement('h3');
      titulo.textContent = produto.title;

      const imagem = document.createElement('img');
      imagem.src = produto.image;
      imagem.alt = produto.title;

      const preco = document.createElement('p');
      preco.className = 'preco';
      preco.textContent = `${parseFloat(produto.price).toFixed(2)} €`;

      const botaoAdicionar = document.createElement('button');
      botaoAdicionar.textContent = '+ Adicionar ao Cesto';
      botaoAdicionar.className = 'adicionar-btn';
      botaoAdicionar.addEventListener('click', () => {
          selectedProducts = JSON.parse(localStorage.getItem('produtos-selecionados')) || [];
          selectedProducts.push(produto);
          localStorage.setItem('produtos-selecionados', JSON.stringify(selectedProducts));
          atualizarProdutoNoCesto(produto);
          updateDinheiro();
      });

      artigo.appendChild(titulo);
      artigo.appendChild(imagem);
      artigo.appendChild(preco);
      artigo.appendChild(botaoAdicionar);

      produtosContainer.appendChild(artigo);
  });
}



function removerTodosCarinho(elementoCesto) {
  selectedProducts = [];
  
  const cestoContainer = document.querySelector('.produtos-cesto');
  cestoContainer.innerHTML = ''; 
  
  allProducts.forEach(produto => {
    removerDoCesto(produto);
  });
  
  localStorage.setItem('produtos-selecionados', JSON.stringify(selectedProducts));
  
  elementoCesto.remove();
  updateDinheiro(selectedProducts);
}


document.getElementById('filtrarPor')?.addEventListener('change', filtroCategoria);
document.getElementById('pesquisar')?.addEventListener('input', pesquisarProdutos);
document.getElementById('btn-sem-descricao').addEventListener('click', () => {
  carregarProdutosSemDescricao(allProducts);
});

document.getElementById('ordenarPorRating').addEventListener('change', ordenarPorRating);
document.getElementById('btn-remover-todos').addEventListener('click', removerTodosCarinho);



