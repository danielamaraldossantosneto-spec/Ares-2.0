const treinos = {
1: {
nome: "🔥 PUSH",
lista: [
"Supino Inclinado",
"Supino Máquina",
"Crucifixo",
"Desenvolvimento",
"Tríceps"
]
},

2: {
nome: "🦍 PULL",
lista: [
"Puxada",
"Remada",
"Pulldown",
"Rosca Direta",
"Rosca Martelo"
]
},

3: {
nome: "🍑 GLÚTEO + POSTERIOR",
lista: [
"Hip Thrust 130kg",
"Mesa Flexora",
"Stiff 120kg",
"Abdutora",
"Panturrilha"
]
},

4: {
nome: "🦵 LOWER",
lista: [
"Agachamento 120kg",
"Leg Press 240kg",
"Extensora",
"Flexora",
"Panturrilha"
]
},

5: {
nome: "💪 OMBRO + BRAÇO",
lista: [
"Desenvolvimento",
"Elevação Lateral",
"Rosca",
"Tríceps"
]
},

6: {
nome: "⚔️ PEITO + TRÍCEPS",
lista: [
"Supino Inclinado",
"Crucifixo",
"Peck Deck",
"Tríceps Francês",
"Tríceps Corda"
]
},

0: {
nome: "🏃 RECUPERAÇÃO",
lista: [
"Cardio",
"Alongamento",
"Mobilidade",
"Caminhada"
]
}
};

let xp =
Number(localStorage.getItem("ares_xp")) || 1540;

let bossHp =
Number(localStorage.getItem("ares_boss_hp")) || 10000;

const xpElemento =
document.getElementById("xp");

const bossHpElemento =
document.getElementById("bossHp");

const bossBarra =
document.getElementById("bossBarra");

const mensagem =
document.getElementById("mensagem");

const treinoHoje =
document.getElementById("treinoHoje");

const checkboxes =
document.querySelectorAll(".m");

function renderTreino(){

const hoje =
new Date().getDay();

const treino =
treinos[hoje];

let html =
`<h3>${treino.nome}</h3><br>`;

treino.lista.forEach(ex => {

html += `• ${ex}<br>`;

});

treinoHoje.innerHTML =
html;
}

function atualizarClasse(){

let classe = "🥈 Prata";

if(xp >= 1000)
classe = "🥇 Ouro";

if(xp >= 2000)
classe = "💎 Diamante";

if(xp >= 5000)
classe = "🏛️ Titã";

if(xp >= 10000)
classe = "👑 Deus da Guerra";

document.getElementById("classe")
.textContent = classe;
}

function atualizarBoss(){

let bossNome =
"🐺 Lobo Sombrio";

if(xp >= 1000)
bossNome = "👹 Minotauro";

if(xp >= 3000)
bossNome = "🐉 Dragão Ancião";

if(xp >= 5000)
bossNome = "⚔️ Ares";

document.getElementById("bossNome")
.textContent = bossNome;
}

function atualizarTela(){

xpElemento.textContent =
`XP Total: ${xp}`;

const nivel =
Math.floor(xp / 100) + 1;

document.getElementById("nivel")
.textContent =
`⚔️ Nível ${nivel}`;

bossHpElemento.textContent =
`${bossHp.toLocaleString()} HP`;

const porcentagem =
Math.max(
(bossHp / 10000) * 100,
0
);

bossBarra.style.width =
porcentagem + "%";

atualizarClasse();

atualizarBoss();

if(xp < 2000){

mensagem.textContent =
"⚔️ Continue avançando guerreiro.";

}

else if(xp < 5000){

mensagem.textContent =
"🔥 Você está evoluindo rapidamente.";

}

else{

mensagem.textContent =
"🏛️ Seu poder está acima da média.";
}
}

checkboxes.forEach(box => {

box.addEventListener(
"change",
() => {

if(box.checked){

xp += 50;

bossHp -= 250;

if(bossHp <= 0){

xp += 500;

bossHp = 10000;

alert(
"🏆 Boss derrotado! +500 XP"
);
}

}else{

xp -= 50;

bossHp += 250;
}

localStorage.setItem(
"ares_xp",
xp
);

localStorage.setItem(
"ares_boss_hp",
bossHp
);

atualizarTela();

}
);

});

renderTreino();

atualizarTela();
