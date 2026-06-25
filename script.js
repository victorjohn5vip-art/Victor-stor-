// ==========================
// CARRINHO VICTOR STORE
// ==========================

let carrinho =
JSON.parse(localStorage.getItem("carrinho")) || [];

function adicionarProduto() {
    alert("Painel Admin funcionando!");
}

const botoes =
document.querySelectorAll(".btn-cart");

botoes.forEach((botao,index)=>{

botao.addEventListener("click",()=>{  

    const produto =  
    botao.parentElement;  

    const nome =  
    produto.querySelector("h3").innerText;  

    const precoTexto =  
    produto.querySelector(".preco")  
    .innerText;  

    const preco =  
    parseInt(precoTexto);  

    const imagem =  
    produto.querySelector("img").src;  

    adicionarCarrinho(  
        nome,  
        preco,  
        imagem  
    );  

});

});

// ==========================
// ADICIONAR PRODUTO
// ==========================

function adicionarCarrinho(
nome,
preco,
imagem
){

const existente =
carrinho.find(
item => item.nome === nome
);

if(existente){

existente.quantidade++;

}else{

carrinho.push({
nome,
preco,
imagem,
quantidade:1
});

}

salvarCarrinho();

alert("✅ Produto adicionado!");
}

// ==========================
// SALVAR
// ==========================

function salvarCarrinho(){

localStorage.setItem(
"carrinho",
JSON.stringify(carrinho)
);

atualizarContador();

}

// ==========================
// CONTADOR
// ==========================

function atualizarContador(){

const contador =
document.getElementById("contador");

if(!contador) return;

let totalItens = 0;

carrinho.forEach(item => {

totalItens += item.quantidade;

});

contador.innerText =
totalItens;

}

atualizarContador();

// ==========================
// PESQUISA
// ==========================

const campoPesquisa =
document.getElementById("pesquisa");

if(campoPesquisa){

campoPesquisa.addEventListener(
"keyup",
function(){

let texto =
this.value.toLowerCase();

let produtos =
document.querySelectorAll(
".produto"
);

produtos.forEach(produto=>{

let nome =
produto.innerText.toLowerCase();

produto.style.display =
nome.includes(texto)
? "block"
: "none";

});

});

}

// ==========================
// CRIAR CARRINHO HTML
// ==========================

function mostrarCarrinho(){

const area =
document.getElementById(
"listaCarrinho"
);

if(!area) return;

area.innerHTML = "";

let total = 0;

carrinho.forEach((item,index)=>{

total +=
item.preco *
item.quantidade;

area.innerHTML += `

<div class="item-carrinho">  <img src="${item.imagem}">  <div>  <h4>${item.nome}</h4>  <p>  
${item.preco} MT  
</p>

<div class="quantidade">

<button onclick="diminuirQuantidade(${index})">
➖
</button>

<span>
${item.quantidade}
</span>

<button onclick="aumentarQuantidade(${index})">
➕
</button>

</div>

</div>  <button onclick="removerProduto(${index})">  ❌

</button>  </div>  `;

});

const totalArea =
document.getElementById(
"total"
);

if(totalArea){

totalArea.innerHTML =
total + " MT";

}

}

// ==========================
// REMOVER PRODUTO
// ==========================

function removerProduto(index){

carrinho.splice(index,1);

salvarCarrinho();

mostrarCarrinho();

}

// ==========================
// LIMPAR CARRINHO
// ==========================

function limparCarrinho(){

if(confirm(
"Deseja limpar o carrinho?"
)){

carrinho = [];

salvarCarrinho();

mostrarCarrinho();

}

}

// ==========================
// CHECKOUT WHATSAPP
// ==========================

function finalizarPedido(){

    let mensagem = "NOVO PEDIDO\n\n";

    let total = 0;

    carrinho.forEach(item => {

        mensagem +=
        item.nome +
        " - Qtd: " +
        item.quantidade +
        "\n";

        total += item.preco * item.quantidade;

    });

    mensagem += "\nTOTAL: " + total + " MT";

    window.open(
        "https://api.whatsapp.com/send?phone=258840595258&text=" +
        encodeURIComponent(mensagem),
        "_blank"
    );

}
// ==========================
// INICIAR
// ==========================

mostrarCarrinho();

function carregarProdutos() {

const lista = document.getElementById("listaProdutos");  

if (!lista) return;  

let produtos =  
JSON.parse(localStorage.getItem("produtos")) || [];  

let favoritos =
JSON.parse(localStorage.getItem("favoritos")) || [];

lista.innerHTML = "";  

produtos.forEach(produto => {  

    lista.innerHTML += `
<div class="produto">

    <img src="${produto.imagem}">
    
    <span class="favorito"
onclick="toggleFavorito(this)">
🤍
</span>
    
    <h3>${produto.nome}</h3>

    <div class="avaliacao">⭐⭐⭐⭐⭐</div>

    <p class="preco">${produto.preco} MT</p>

<p class="stock">
📦 Stock: ${produto.stock || 0}
</p>

   <div class="botoes-produto">

<button class="btn-cart">
Adicionar ao Carrinho
</button>

<button class="btn-ver"
onclick="abrirProduto(${produtos.indexOf(produto)})">
Ver Produto
</button>

</div>

</div>
`;

});

ativarBotoes();
}

carregarProdutos();

function ativarBotoes(){

    const botoes =
    document.querySelectorAll(".btn-cart");

    botoes.forEach(botao => {

        botao.onclick = function(){

            const produto = this.parentElement;

            const nome =
            produto.querySelector("h3").innerText;

            const preco =
            parseInt(
                produto.querySelector(".preco").innerText
            );

            const imagem =
            produto.querySelector("img").src;

            adicionarCarrinho(
                nome,
                preco,
                imagem
            );

        };

    });

}

function aumentarQuantidade(index){

    carrinho[index].quantidade++;

    salvarCarrinho();

    mostrarCarrinho();

}

function diminuirQuantidade(index){

    if(carrinho[index].quantidade > 1){

        carrinho[index].quantidade--;

    }else{

        carrinho.splice(index,1);

    }

    salvarCarrinho();
    mostrarCarrinho();
}
function atualizarContador() {

    let carrinho =
        JSON.parse(localStorage.getItem("carrinho")) || [];

    let total = 0;

    carrinho.forEach(item => {
        total += item.quantidade;
    });

    const contador = document.getElementById("contador");

    if(contador){
        contador.innerText = total;
    }
}

atualizarContador();

function adicionarProduto() {
    let total = document.getElementById("totalProdutos");

    let quantidade = parseInt(total.innerText);

    quantidade++;

    total.innerText = quantidade;
}

function abrirProduto(index){

alert("Abrindo produto " + index);

localStorage.setItem(
"produtoSelecionado",
index
);

window.location.href = "produto.html";

}

function toggleFavorito(el){

    if(el.innerText == "🤍"){

        el.innerText = "❤️";

    }else{

        el.innerText = "🤍";

    }

}