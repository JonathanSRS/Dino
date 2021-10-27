//SELETORES
const dino = document.querySelector('.dino');
const background = document.querySelector('.background')
const pontos = document.querySelector('.pontos span');
//VARIÁVEIS
let isJumping = false;
let position = 0;
let cont = 0;
let show = 0;
let num = 1;
let time = 80;
let bonus = ''
let interCatus = [3000,3500,4000,6000]
// Captura tecla pressionada
function handleKeyUp(e){
    if(e.keyCode === 32){
        if(!isJumping){
            jump();
        }
    }
}

// PULAR
function jump(){
    //EVITAR PULO DUPLO
    isJumping = true;
    // define um intervalo de tempo que ação de aperta o botão é ativada
    // para que o elemento "dino" não ultrapasse altura desejada da tela
    let upIntervalo = setInterval(() =>{
        if(position >= 150){
            clearInterval(upIntervalo);
            let downIntervalo = setInterval(()=>{
                if(position <= 0){
                    clearInterval(downIntervalo);
                    isJumping = false
                }else{
                    position -=20;
                    // altera a posição do elemento
                    dino.style.bottom = position + 'px';
                }
            },20)
        }else{
            position += 20;
            // altera a posição do elemento
            dino.style.bottom = position + 'px';
        }
    },20)
}
//CRIAR CACTUS
function createCatus(){
    const cactus = document.createElement('div')
    let cactusPosition = 1000;
    let i = Math.floor(Math.random()*(4 - 1)+1)
    let randomTime = Math.random() + interCatus[i];

    cactus.classList.add('cactus');
    cactus.style.left = 1000 + 'px';
    background.appendChild(cactus)
    let leftInterval = setInterval(() =>{
        cactusPosition -= 10;
        cactus.style.left = cactusPosition + 'px'
        //
        if(cactusPosition < -60){
            clearInterval(leftInterval)
            background.removeChild(cactus)
            //PONTUAÇÃO
            cont++
            show = cont*10
            pontos.innerHTML = show
            // Fator de colisão
        }else if (cactusPosition > 0 && cactusPosition < 60 && position < 60){
            level()
            clearInterval(leftInterval);
            //EXIBIR EM TELA FIM DE JOGO
            document.body.innerHTML = '<h1 class="game-over">Fim de Jogo</h1>'+
            '<p class="game-over"> Total de pontos: '+ show+'</p>'+
            '<p class="game-over"> Level: '+ num+'</p>'+
            '<p class="game-over">Record: '+localStorage.getItem('pontos')+'</p>'+
            bonus;
            criarBtn()
        }
        else{
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px'
        }
    }, time)
    //Recursividade chamando a propria função dentro dela mesma 
    setTimeout(createCatus, randomTime);
}
//INICIALIZAR JOGO
createCatus();
//ACIONAR TECLADO
document.addEventListener('keyup', handleKeyUp)

//FUNÇÕES ADICIONAIS
function level(){
    record();
    if(show > num*50){
        num++;
        time -=5;
        interCatus = interCatus.map(function(item){
            return item - 1000;
        })
    }
}
    //GUARDAR VALOR DA PONTUAÇÃO MAIS ALTA ATÉ ENTÃO
    function record(){
        if(localStorage.getItem('pontos')){
            if(localStorage.getItem('pontos') < show){
                localStorage.setItem('pontos', show)
            }
    }
    else{
        localStorage.setItem('pontos', show)
    }
}

function criarBtn(){
    let btn = document.createElement('button')
    document.body.appendChild(btn)
    btn.innerHTML = "Delete Recorde"
    btn.classList.add('btn-delete')
    btn.addEventListener('click', deldb)
}

function deldb(){
    localStorage.removeItem('pontos')
}

