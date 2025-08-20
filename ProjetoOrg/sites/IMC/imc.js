const preencherResultado = function(IMC, classificacao, pesoIdeal, intervaloPeso) {
    document.getElementById("resuIMC").innerHTML = `<p>IMC</p> <h1>${IMC.toFixed(2)}kg/m²</h1>`;
    document.getElementById("resuClass").innerHTML = `<p>Classificação</p> <h1>${classificacao}</h1>`;
    document.getElementById("resuPeso").innerHTML = `<p>Peso ideal</p> <h1>${pesoIdeal.toFixed(1)}kg</h1>`;
    document.getElementById("resuIntervalo").innerHTML = `<p>Intervalo ideal</p> <h1>${intervaloPeso.min.toFixed(1)} - ${intervaloPeso.max.toFixed(1)}</h1>`;
}

let alturainp = document.getElementById("altura");
let alturaDigits = [];

alturainp.addEventListener("beforeinput", function (e) {
    // Se for backspace, remove o último dígito
    if (e.inputType === "deleteContentBackward") {
        alturaDigits.pop();
        atualizarCampo();
        e.preventDefault(); // impedir comportamento padrão
    }

    // Se não for dígito, ignorar
    if (!/^\d$/.test(e.data)) return;

    // Adiciona o novo dígito
    alturaDigits.push(e.data);

    // Remove o mais antigo se passar de 5 dígitos (limita pra não virar 10 metros)
    if (alturaDigits.length > 5) alturaDigits.shift();

    atualizarCampo();
    e.preventDefault(); // impedir que o navegador escreva sozinho
});

function atualizarCampo() {
    let raw = alturaDigits.join("");

    // Garante no mínimo 3 dígitos (ex: "1" vira "001")
    raw = raw.padStart(3, "0");

    let inteiro = raw.slice(0, -2);
    let decimal = raw.slice(-2);
    let valorFinal = `${inteiro}.${decimal}`;

    // Limite de 2.50
    if (parseFloat(valorFinal) > 2.5) return;

    alturainp.value = valorFinal;
}
const calculoIMC = function(event){

    event.preventDefault()
    altura = alturainp.value
    let peso = document.getElementById("peso").value;
    let resuimc = document.getElementById("resuIMC");
    let resuclass = document.getElementById("resuClass");
    let resupeso = document.getElementById("resuPeso");
    let resuintervalo = document.getElementById("resuIntervalo");
    let falha = document.getElementById("falha")
    let pesomin = 18.5 * (altura**2);
    let pesomax = 24.9 * (altura**2);
    let pesoideal = 21.75 * (altura**2);
    let IMC =  peso / (altura**2);
    resultado = document.getElementById("imcResultado");
    resultado.style.display = "block";
    if(isNaN(IMC) || IMC <= 0 || isNaN(peso) || peso <= 0 || isNaN(altura) || altura <= 0){

       
    }
    
    if(IMC < 18.5){
        preencherResultado(IMC, "Magreza", pesoideal, {min: pesomin, max: pesomax});
    }
    else if(IMC >= 18.5 && IMC < 25){
        resuimc.innerHTML = `<p>IMC</p> <h1>${IMC.toFixed(2)}kg/m²</h1>`;
        resuclass.innerHTML = `<p>Classificação</p> <h1>Normal</h1>`;
        resupeso.innerHTML = `<p>Peso ideal</p> <h1>${pesoideal.toFixed(1)}kg</h1>`;
        resuintervalo.innerHTML = `<p>Intervalo ideal</p> <h1>${pesomin.toFixed(1)} - ${pesomax.toFixed(1)}</h1>`;
    }
    else if(IMC >= 25 && IMC < 30){
       preencherResultado(IMC, "Sobrepeso", pesoideal, {min: pesomin, max: pesomax} );
    }
    else if(IMC >= 30 && IMC < 40){
        preencherResultado(IMC, "Obesidade", pesoideal, {min: pesomin, max: pesomax} );
    }
    else if(IMC >= 40){
        preencherResultado(IMC, "Obesidade grave", pesoideal, {min: pesomin, max: pesomax} );
    }
    else{
        resuimc.innerHTML = `<p>IMC</p> <h1>${IMC.toFixed(2)}kg/m²</h1>`;
        resuclass.innerHTML = `<p>Classificação</p> <h1>Indefinido</h1>`;
        resupeso.innerHTML = `<p>Peso ideal</p> <h1>${pesoideal.toFixed(1)}kg</h1>`;
        resuintervalo.innerHTML = `<p>Intervalo ideal</p> <h1>${pesomin.toFixed(1)} - ${pesomax.toFixed(1)}</h1>`;
    }
}

document.getElementById("btnIMC").addEventListener("click", calculoIMC)