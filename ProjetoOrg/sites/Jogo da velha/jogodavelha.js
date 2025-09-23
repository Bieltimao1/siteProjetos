window.addEventListener("load", () => {
        celulas.forEach((celula) => {celula.classList.add("celulas-empate")})
    })

    
const mostrarElemento = function(elem) {
  // Limpa qualquer classe antiga de saída
  elem.classList.remove('fade-exit', 'fade-exit-active');
  
  // Torna visível imediatamente
  elem.style.display = 'block';
  
  // Força reflow para ativar a transição
  void elem.offsetWidth;
  
  elem.classList.add('fade-enter');
  elem.classList.add('fade-enter-active');
  
  elem.addEventListener('transitionend', () => {
    elem.classList.remove('fade-enter', 'fade-enter-active');
  }, { once: true });
}


const esconderElemento = function(elem){
  // Limpa qualquer classe antiga de entrada
  elem.classList.remove('fade-enter', 'fade-enter-active');

  elem.classList.add('fade-exit');
  elem.classList.add('fade-exit-active');

  elem.addEventListener('transitionend', () => {
    elem.style.display = 'none';
    elem.classList.remove('fade-exit', 'fade-exit-active');
  }, { once: true });
}
    

    const celulas = document.querySelectorAll(".celulas");
    let playerAtual = "X";
    let fim = true;
    let jogadasplayerO = [];
    let jogadasplayerX = [];
    let nivel1 = false
    let nivel2 = false;
    let nivel3 = false;
    let empates = 0;
    let vitoriaX = 0
    let vitoriaO = 0
    let partidas = 0

    const opostos = {
        0:8,
        8:0,
        2:6,
        6:2
    }
    const defesalado = {
        1:[0,2,4,7],
        3: [0,4,5,6],
        5: [2,4,3,8],
        7: [6,8,4,1]
    }

    const trocarJogador = function(){
        playerAtual = (playerAtual === "X") ? "O" : "X";
    }
    const reset = document.getElementById("reset");
    reset.addEventListener("click", ()=>{
        celulas.forEach((celula) => {
            celula.textContent = "";
            celula.classList.remove("celulas-vencedora");
            celula.classList.remove("celulas-empate")
            
        })
        playerAtual = "X"
    jogadasplayerO = [];
    jogadasplayerX = [];
    fim = false;
    })

   const atualizarPlacar = function() {
  document.getElementById("partidas").textContent = `Partidas jogadas: ${partidas}`;
  document.getElementById("empates").textContent   = `Empates: ${empates}`;
  document.getElementById("vitoriasX").textContent = `Vitórias: ${vitoriaX}`;
  document.getElementById("perdasX").textContent   = `Perdas: ${vitoriaO}`; // perda de X = vitória de O
  document.getElementById("vitoriasO").textContent = `Vitórias: ${vitoriaO}`;
  document.getElementById("perdasO").textContent   = `Perdas: ${vitoriaX}`; // perda de O = vitória de X
}


    celulas.forEach((celula) =>{
        celula.addEventListener("click", () => {
           if(fim === false && celula.textContent === ""){
                celula.textContent = playerAtual
                console.log(`nivel1: ${nivel1}, nivel 2: ${nivel2}, nivel 3: ${nivel3}`);
                if(playerAtual === "X"){
                    let index = [...celulas].indexOf(celula);
                    jogadasplayerX.push(index);
                }

                if(playerAtual === "O"){
                    let index = [...celulas].indexOf(celula);
                    jogadasplayerO.push(index);
                }

                console.log(`o player x tem ${jogadasplayerX}     o player o tem ${jogadasplayerO} celulas lenght = ${[...celulas].filter((celula) => { return celula.textContent !== ""}).length}`)
                
                let vencedor = verificarVencedor();
                
                let cheio = [...celulas].every(celula => celula.textContent !== "");;

                if(cheio){
                    fim = true;
                    alert("fim do jogo, empate!");
                    celulas.forEach((celula) => {celula.classList.add("celulas-empate")})
                    partidas += 1;
                    empates += 1;
                    atualizarPlacar();
                };
                
                if(vencedor){
                    alert(`O vencedor foi o jogador ${vencedor}! `);
                    fim = true;
                    partidas += 1;
                    if(playerAtual === "X"){
                        vitoriaX += 1;
                        atualizarPlacar()
                    }
                    else {
                        vitoriaO += 1;
                        atualizarPlacar()
                    }
                };
                
                trocarJogador();

                
                if (playerAtual === "O"){
                    setTimeout(() => {
                        fim = false
                        bot();}, 300);
                };
                
            };
        });
    })






    const clickaleatorio = function(){
        let celulasvazias = [...celulas].filter((celula) => celula.textContent === "")
        let celulaaleatoriavazia = celulasvazias[Math.floor(Math.random() * celulasvazias.length)]
        celulaaleatoriavazia.click();
    }

    const bot = function(){
        if (nivel1){
            clickaleatorio();
        }
        else if(nivel2){
            if(verificarfaltaum("O") !== undefined){
                ataquefaltaum();
                console.log("entrou no ataque");
            }
            else if(verificarfaltaum("X") !== undefined){
                defesafaltaum();
                console.log("entrou na defesa");
            }
            else{
                clickaleatorio();
                console.log("entrou no click aleatorio");
            }
            console.log("saiu de tudo")
        }
        else if(nivel3){

            if ([0,2,6,8].includes(jogadasplayerX[0]) && [...celulas].filter((celula) => { return celula.textContent !== ""}).length === 1){
                celulas[4].click();
                console.log("Atacou canto");
            }
            else if(opostos[jogadasplayerX[0]] === jogadasplayerX[1] && jogadasplayerX.length === 2){
                let ladosvazios = [1,3,5,7].filter(indice => celulas[indice].textContent === "");
                celulas[ladosvazios[Math.floor(Math.random() * ladosvazios.length)]].click();

                console.log("2° jogada, jogar no lado")
            }

            else if(jogadasplayerX.length === 1 && jogadasplayerX[0] in defesalado){
                let indiceVazio = defesalado[jogadasplayerX[0]].filter((ind) => { return celulas[ind].textContent === ""});
                celulas[indiceVazio[Math.floor(Math.random() * indiceVazio.length)]].click();
                console.log("O bot defendeu estrategia iniciada pelos lado");
            }
            else if(jogadasplayerX.length === 1 && jogadasplayerX[0] === 4){
                const cantos = [0, 2, 6, 8];
                celulas[cantos[Math.floor(Math.random()*cantos.length)]].click();
            }
            else if(verificarfaltaum("O") !== undefined){
                ataquefaltaum();
                console.log("entrou no ataque");
            }
            else if(verificarfaltaum("X") !== undefined){
                defesafaltaum();
                console.log("entrou na defesa");
            }
            else{
                clickaleatorio();
                console.log("entrou no click aleatorio");
            }                                                                           
            console.log("saiu de tudo")
        }
    }

    const combinacoesVitoria = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ]

    const verificarVencedor = function(){
        for( let combinacao of combinacoesVitoria){
            let [a,b,c] = combinacao;
            if( 
                celulas[a].textContent !== "" &&
                celulas[b].textContent === celulas[a].textContent && 
                celulas[c].textContent === celulas[b].textContent){

                    // let cor = getComputedStyle(document.documentElement).getPropertyValue("--CorPrincipal").trim();
                   
                    [a,b,c].forEach((indiceselecionado) => {
                        celulas[indiceselecionado].classList.add("celulas-vencedora");
                    })
                    return celulas[a].textContent;
                }
        }
        return undefined;
    }

    const verificarfaltaum = function(XouO){
        for( let combinacao of combinacoesVitoria){
            let [a,b,c] = combinacao;
            const [celA, celB, celC] = combinacao.map(indice => celulas[indice].textContent);
            const valores = [celA, celB, celC];
            const indices = [a,b,c];
            
            if (valores.filter(valor => valor === XouO).length === 2 && valores.includes("")){
                const indiceVazio = valores.indexOf("");
                return indices[indiceVazio];
            }
        }
        return undefined
    }

    const defesafaltaum = function(){
       celulas[verificarfaltaum("X")].click()
    }
    const ataquefaltaum = function(){
       celulas[verificarfaltaum("O")].click()
    }
    const inputs = document.querySelectorAll('input[name="nivel"]')
    const comecar = document.getElementById("comecar");
    const zerar = document.getElementById("fim")
    const placar = document.getElementById("placar")
    
    comecar.addEventListener("click", () => {
        const selecionado = document.querySelector('input[name="nivel"]:checked');
        if(!selecionado){
            alert("Escolha o nivel do bot, ou desligue-o!")
        }

        else{
            inputs.forEach((inp) => {
                inp.disabled = true;
            })
            celulas.forEach((celula) => { celula.classList.remove("celulas-empate")});
            mostrarElemento(placar);
            esconderElemento(comecar);
            mostrarElemento(reset);
            mostrarElemento(zerar);
            fim = false;

            
            switch(selecionado.value){
                case "0":
                    nivel1 =false;
                    nivel2 = false;
                    nivel3 = false;
                    break

                case "1":
                    nivel1 = true;
                    nivel2 = false;
                    nivel3 = false;
                    break
                
                case "2":
                    nivel1 =false;
                    nivel2 = true;
                    nivel3 = false;
                    break
                
                case "3":
                    nivel1 =false;
                    nivel2 = false;
                    nivel3 = true;
                    break
        
            }
        }
 })
        

zerar.addEventListener("click", ()=>{
    celulas.forEach((celula) => {

        celula.textContent = "";
        celula.classList.remove("celulas-vencedora");
        celula.classList.add("celulas-empate")
        
    })

    inputs.forEach((inp) => {

        inp.disabled = false;

    })
    
    esconderElemento(zerar);
    esconderElemento(reset);
    esconderElemento(placar);
    mostrarElemento(comecar);
    fim = true;
    vitoriaO = 0;
    vitoriaX = 0;
    partidas = 0;
    empates = 0;
    playerAtual = "X"
    jogadasplayerO = [];
    jogadasplayerX = [];
    atualizarPlacar();

})

