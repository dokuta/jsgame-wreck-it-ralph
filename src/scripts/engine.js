// gerenciamento de estados globais, para facilitar a manipulação
const state = {
    // view: valores de elementos visuais
    view: {
        squares: document.querySelectorAll(".square"), // blocos do jogo
        // singular pois só precisa de um
        enemy: document.querySelector(".enemy"), // classe do inimigo
        timeLeft: document.querySelector("#time-left"), // contador do tempo
        score: document.querySelector("#score"), // pontuação
    },
    // values: valores internos, background
    values: {
        gameSpeed: 1000, // velocidade do inimigo
        hitPosition: 0, // posição do bloco com inimigo
        result: 0, // pontuação interna
        currentTime: 60 // tempo restante
    },
    // actions: elementos que executam ações
    actions: {
        timerId: setInterval(randomSquare, 1000), // identifica o timer
        countDownTimerId: setInterval(countDown, 1000), // guarda o intervalo de chamada do countDown
    }
};

// diminui e verifica o tempo restante
function countDown() {
    // diminui o tempo internamente (value)
    state.values.currentTime--;
    // liga o tempo interno ao visual (view)
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0) {
        // limpa os intervalos da memória, resetando as chamadas
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);

        alert("Game Over! O seu resultado foi: " + state.values.result);
    }
}

// cria o som do hit
function playSound(audioName) {
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();
}

// sorteia o quadrado com o inimigo
function randomSquare() {
    // limpa a classe "enemy" dos quadrados
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    // sorteia um nº aleatório entre um e nove (id dos quadrados!)
    let randomNumber = Math.floor(Math.random() * 9);
    // pega um quadrado aleatório dentre o nº sorteado
    let randomSquare = state.view.squares[randomNumber];
    // adiciona a classe "enemy" no quadrado sorteado
    randomSquare.classList.add("enemy");

    // armazena o id do quadrado sorteado na posição
    state.values.hitPosition = randomSquare.id;
};

/* // move o inimigo em um intervalo x
function moveEnemy() {
    // valor em milisegundos
    state.values.timerId = setInterval(randomSquare, state.values.gameSpeed);
}; 
(aposentada após usar as actions!)
*/

// adiciona o clique do mouse nos quadrados
function addListenerHitBox() {
    // pega a view dos quadrados
    state.view.squares.forEach((square) => {
        // adiciona o clique com o "mousedown"
        square.addEventListener("mousedown", () => {
            // três = para comparar valor e formato
            if (square.id === state.values.hitPosition) {
                // soma a pontuação se for o quadrado certo
                state.values.result++;
                // atualiza a pontuação na tela
                state.view.score.textContent = state.values.result;
                // impede o usuário de clicar várias vezes
                state.values.hitPosition = null;
                // toca o áudio de acordo com o parâmetro
                playSound("hit");
            }
        });
    });
};

// inicia o programa
function main() {
    // moveEnemy(); (aposentada após usar as actions!)
    addListenerHitBox();
};

// iniciando o programa
main();