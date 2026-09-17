// Seleção dos elementos HTML usando getElementById
const elementoBolinha = document.getElementById("bolinha");
const elementoPontuacao = document.getElementById("pontuacao");
const elementoTempo = document.getElementById("tempo");
const elementoBotao = document.getElementById("btn-iniciar");
const elementoMensagem = document.getElementById("mensagem");

// Variáveis de controle do jogo
let pontos = 0;
let tempoRestante = 10;
let temporizador = null;
let jogoAtivo = false;

// Evento de clique para iniciar o jogo
elementoBotao.addEventListener("click", iniciarJogo);

// Evento mousedown para resposta imediata ao toque na bolinha
elementoBolinha.addEventListener("mousedown", function(event) {
    event.stopPropagation();
    if (jogoAtivo) {
        pontos++;
        elementoPontuacao.innerText = pontos;
        moverBolinha();
    }
});

function iniciarJogo() {
    pontos = 0;
    tempoRestante = 10;
    jogoAtivo = true;

    elementoPontuacao.innerText = pontos;
    elementoTempo.innerText = tempoRestante;
    elementoMensagem.innerText = "";
    elementoBotao.disabled = true;

    moverBolinha();

    // Contagem regressiva do jogo
    temporizador = setInterval(function() {
        tempoRestante--;
        elementoTempo.innerText = tempoRestante;

        if (tempoRestante <= 0) {
            finalizarJogo();
        }
    }, 1000);
}

// Função responsável por mudar a posição e a cor da bola
function moverBolinha() {
    const area = document.getElementById("area-jogo");
    const larguraMax = area.clientWidth - 50;
    const alturaMax = area.clientHeight - 50;

    const novaPosicaoX = Math.floor(Math.random() * larguraMax);
    const novaPosicaoY = Math.floor(Math.random() * alturaMax);

    elementoBolinha.style.left = novaPosicaoX + "px";
    elementoBolinha.style.top = novaPosicaoY + "px";

    // Troca de cor aleatória
    const cores = ["#ff1744", "#00e676", "#29b6f6", "#ffea00", "#d500f9"];
    const corAleatoria = cores[Math.floor(Math.random() * cores.length)];
    elementoBolinha.style.backgroundColor = corAleatoria;
}

function finalizarJogo() {
    clearInterval(temporizador);
    jogoAtivo = false;
    elementoBotao.disabled = false;
    elementoMensagem.innerText = "Fim de jogo! Você fez " + pontos + " pontos.";
}