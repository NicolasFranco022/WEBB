let valS = 0;
let valM = 0;
let valH = 0;
let id;
let posicao = 0;
let contando = false;
let pausando = false;
const velocidadeTiro = 10;
const intervalo = 30;
const shots = [];


function add() {

    if (valS >= 60) {
        valS = 0;
        valM++;
    }

    if (valM >= 60) {
        valM = 0;
        valH++;
    }

    valS++;

    if (valS < 10) {
        document.querySelector("#valS").textContent = "0" + valS;
    }
    else {
        document.querySelector("#valS").textContent = valS;
    }

    if (valM < 10) {
        document.querySelector("#valM").textContent = "0" + valM;
    } else {
        document.querySelector("#valM").textContent = valM;
    }

    if (valH < 10) {
        document.querySelector("#valH").textContent = "0" + valH;
    } else {
        document.querySelector("#valH").textContent = valH;
    }
}

function contar() {
    id = setInterval(add, 1000)
    contando = true;
    pausando = false;
}

let content = document.body

function pararContar() {
    clearInterval(id);
    contando = false;
    pausando = true;

}

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        if (contando) {
            pararContar();
            document.getElementById("paused").style.display = 'flex';
        } else {
            contar();
            document.getElementById("paused").style.display = 'none';
        }
    }
});

let nave = document.getElementById("naveAmiga");

document.addEventListener('keydown', function (event) {

    if (pausando == false) {
        if (event.key == 'ArrowRight' && posicao < 700) {
            posicao += 20;
            nave.style.left = posicao + 'px';
        }

        if (event.key == 'ArrowLeft' && posicao > -800) {
            posicao -= 20;
            nave.style.left = posicao + 'px';
        }
    }
});

document.addEventListener('keydown', function (event) {
    if (event.key == ' ') {
        shot();
    }
});


function shot() {
    const shot = document.createElement('div');
    shot.classList.add('shot');

    
    const contentRect = document.querySelector('#content').getBoundingClientRect();
    const naveRect = nave.getBoundingClientRect(); 

    console.log(contentRect.left);
    console.log(naveRect.left);
    console.log(naveRect.left - contentRect.left + naveRect.width / 2 - 5);
    shot.style.left = `${(naveRect.left - contentRect.left + naveRect.width / 2 - 5) + 293}px`;
    shot.style.top = `${naveRect.top - contentRect.top - 20}px`; 

    
    shot.style.position = 'absolute';
    document.querySelector('#content').appendChild(shot);
    shots.push({
        element: shot,
        direcao: 'subindo'

    });

}



function moveShots() {
    for (let i = shots.length - 1; i >= 0; i--) {
        const shot = shots[i];
        const el = shot.element;
        let top = parseInt(el.style.top);

        if (shot.direcao === 'subindo') {
            top -= velocidadeTiro;
            if (top <= 0) {
                
                shot.direcao = 'descendo';
            }
        } else {
            top += velocidadeTiro;
            if (top > window.innerHeight - 35) {
                el.remove();
                shots.splice(i, 1);
                continue;
            }
        }

        el.style.top = `${top}px`;
    }
}


setInterval(moveShots, intervalo);
