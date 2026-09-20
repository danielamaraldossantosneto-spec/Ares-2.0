const treinos = {

0:{
nome:"🏃 RECUPERAÇÃO",
lista:[
"30 min Cardio",
"Alongamento",
"Mobilidade",
"10.000 passos"
]
},

1:{
nome:"🔥 PUSH",
lista:[
"Supino Inclinado 4x10",
"Supino Máquina 4x12",
"Crucifixo 4x12",
"Desenvolvimento 4x10",
"Tríceps Corda 4x12"
]
},

2:{
nome:"🦍 PULL",
lista:[
"Puxada Alta 4x10",
"Remada Baixa 4x12",
"Pulldown 4x12",
"Rosca Direta 4x10",
"Rosca Martelo 4x12"
]
},

3:{
nome:"🍑 GLÚTEO + POSTERIOR",
lista:[
"Hip Thrust 130kg 4x10",
"Mesa Flexora 4x12",
"Stiff 120kg 4x10",
"Abdutora 4x15",
"Panturrilha 4x20"
]
},

4:{
nome:"🦵 LOWER",
lista:[
"Agachamento 120kg 4x10",
"Leg Press 240kg 4x12",
"Extensora 4x12",
"Flexora 4x12",
"Panturrilha 4x20"
]
},

5:{
nome:"💪 OMBRO + BRAÇO",
lista:[
"Desenvolvimento 4x10",
"Elevação Lateral 4x12",
"Rosca Direta 4x10",
"Rosca Martelo 4x12",
"Tríceps Francês 4x12"
]
},

6:{
nome:"⚔️ PEITO + TRÍCEPS",
lista:[
"Supino Inclinado 4x10",
"Peck Deck 4x12",
"Crucifixo 4x12",
"Tríceps Francês 4x12",
"Tríceps Corda 4x12"
]
}

};

let xp =
Number(localStorage.getItem("ares_xp")) || 1540;

let bossHp =
Number(localStorage.getItem("ares_boss_hp")) || 10000;

function renderTreino(){

const dia =
document.getElementById("diaTreino").value;

const treino =
treinos[dia];

let html =
`<h3>${treino.nome}</h3><br>`;

treino.lista.forEach(item=>{

html += `
<div style="
background:#1e293b;
padding:12px;
border-radius:10px;
margin-bottom:8px;">
${item}
</div>
`;

});

document
.getElementById("treinoHoje")
.innerHTML = html;

}

function atualizarClasse(){

let classe = "🥈 Prata";

if(xp >= 1000)
classe = "🥇 Ouro";

if(xp >= 3000)
classe = "💎 Diamante";

if(xp >= 5000)
classe = "🏛️ Titã";

if(xp >= 10000)
classe = "👑 Deus da Guerra";

document
.getElementById("classe")
.textContent = classe;

}

function atualizarBoss(){

let boss = "🐺 Lobo Sombrio";

if(xp >= 1000)
boss = "👹 Minotauro";

if(xp >= 3000)
boss = "🐉 Dragão Ancião";

if(xp >= 5000)
boss = "⚔️ Ares";

document
.getElementById("bossNome")
.textContent = boss;

}

function atualizarTela(){

document
.getElementById("xp")
.textContent =
`XP Total: ${xp}`;

document
.getElementById("nivel")
.textContent =
`⚔️ Nível ${Math.floor(xp/100)+1}`;

document
.getElementById("bossHp")
.textContent =
`${bossHp.toLocaleString()} HP`;

document
.getElementById("bossBarra")
.style.width =
`${Math.max((bossHp/10000)*100,0)}%`;

atualizarClasse();

atualizarBoss();

}

document
.getElementById("diaTreino")
.addEventListener(
"change",
renderTreino
);

document
.querySelectorAll(".m")
.forEach(box=>{

box.addEventListener(
"change",
()=>{

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

});

});

renderTreino();
atualizarTela();
