let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto =  gerarNumeroAletorio();
let tentativas = 1;

// let titulo = document.querySelector('h1');
// titulo.innerHTML = 'Jogo do número secreto';

// let paragrafo = document.querySelector('p');
// paragrafo.innerHTML = 'Escolha um número entre 1 e 10';


// A função abaixo foi criada como boa prática para diminuir linhas de código. 
// E abaixo determinado as trocas que a função deve fazer.
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    // reponsive voice fala o que está acontecendo em tela
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2});
}

function exibirMensagemInicial(){
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}
exibirMensagemInicial ();


// function (função) é utilizada por um trecho de código que é responsável por uma determinada ação.
// no exemplo abaixo está chamando o botão verificar chute. 
function verificarChute() {
    let chute = document.querySelector('input').value;

    if(chute == numeroSecreto) {
        exibirTextoNaTela ('h1', 'Acertou');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela ('p',mensagemTentativas);
        // a linha abaixo ativa o botão de novo jogo após acerto
        document.getElementById('reiniciar').removeAttribute('disabled');
    }else{
        if (chute > numeroSecreto){
            exibirTextoNaTela('p', 'Numero é menor que o chute');
        }else{
            exibirTextoNaTela('p', 'Número é maior que o chute');
        }tentativas ++;
        limparCampo();

    }
}

function gerarNumeroAletorio() {
    let numeroEsolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if(quantidadeDeElementosNaLista == 3) {
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEsolhido)){
        return gerarNumeroAletorio();
    }else{
        listaDeNumerosSorteados.push(numeroEsolhido);
        return numeroEsolhido;
    }
}
// esta função limpa o campo de forma automática apó o chute errado
function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAletorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}