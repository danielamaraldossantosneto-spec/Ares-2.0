const treinos = {

0:{
nome:"🏃 RECUPERAÇÃO",
lista:[
"30 min Cardio",
"Alongamento",
"Mobilidade",
"10.000 Passos"
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

const frases = [

"⚔️ Você não está competindo com os outros. Está competindo com o Daniel de ontem.",

"🔥 O shape é construído quando ninguém está olhando.",

"🏛️ Disciplina vence motivação.",

"💪 Um treino ruim ainda é melhor que nenhum treino.",

"👑 Continue avançando guerreiro.",

"🔥 Cada repetição te aproxima de São Paulo."

];

// =========================
// ARES TRACKER 6.0
// =========================

// =========================
// DADOS
// =========================

let xp =
Number(localStorage.getItem("ares_xp")) || 1540;

let bossHp =
Number(localStorage.getItem("ares_boss_hp")) || 10000;

let streak =
Number(localStorage.getItem("ares_streak")) || 0;

// =========================
// TREINOS
// =========================

const treinos = {

1:{
nome:"🔥 PUSH",
lista:[
"Supino Inclinado",
"Supino Máquina",
"Crucifixo",
"Desenvolvimento",
"Elevação Lateral",
"Tríceps Corda",
"Tríceps Francês"
]
},

2:{
nome:"🦍 PULL",
lista:[
"Puxada Alta",
"Remada Baixa",
"Remada Articulada",
"Pulldown",
"Rosca Direta",
"Rosca Martelo"
]
},

3:{
nome:"🍑 GLÚTEO + POSTERIOR",
lista:[
"Hip Thrust",
"Mesa Flexora",
"Stiff",
"Abdutora",
"Glúteo Máquina",
"Panturrilha"
]
},

4:{
nome:"🦵 LOWER",
lista:[
"Agachamento",
"Leg Press",
"Extensora",
"Flexora",
"Panturrilha"
]
},

5:{
nome:"💪 OMBRO + BRAÇO",
lista:[
"Desenvolvimento",
"Elevação Lateral",
"Elevação Frontal",
"Rosca Direta",
"Rosca Scott",
"Tríceps Francês"
]
},

6:{
nome:"⚔️ PEITO + TRÍCEPS",
lista:[
"Supino Inclinado",
"Supino Máquina",
"Peck Deck",
"Crucifixo",
"Tríceps Corda",
"Tríceps Francês"
]
},

0:{
nome:"🏃 RECUPERAÇÃO",
lista:[
"Cardio",
"Alongamento",
"Mobilidade",
"Caminhada"
]
}

};

// =========================
// ELEMENTOS
// =========================

const xpEl =
document.getElementById("xp");

const nivelEl =
document.getElementById("nivel");

const classeEl =
document.getElementById("classe");

const bossHpEl =
document.getElementById("bossHp");

const bossBarra =
document.getElementById("bossBarra");

const bossNome =
document.getElementById("bossNome");

const mensagem =
document.getElementById("mensagem");

const treinoHoje =
document.getElementById("treinoHoje");

const seletorDia =
document.getElementById("diaTreino");

// =========================
// CLASSE
// =========================

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

classeEl.textContent = classe;

}

// =========================
// NÍVEL
// =========================

function atualizarNivel(){

const nivel =
Math.floor(xp / 100) + 1;

nivelEl.textContent =
`⚔️ Nível ${nivel}`;

}

// =========================
// BOSS
// =========================

function atualizarBoss(){

let nome =
"🐺 Lobo Sombrio";

if(xp >= 1000)
nome = "👹 Minotauro";

if(xp >= 3000)
nome = "🐉 Dragão Ancião";

if(xp >= 5000)
nome = "⚔️ Ares";

bossNome.textContent = nome;

bossHpEl.textContent =
bossHp.toLocaleString() + " HP";

const porcentagem =
Math.max(
(bossHp / 10000) * 100,
0
);

bossBarra.style.width =
porcentagem + "%";

}

// =========================
// MENSAGENS
// =========================

const frases = [

"Disciplina vence motivação.",

"O shape é construído quando ninguém está olhando.",

"Um treino ruim ainda é melhor que nenhum treino.",

"Você está mais perto do tanquinho do que ontem.",

"Cada repetição conta.",

"O projeto São Paulo está em andamento.",

"Você não precisa estar motivado para ser consistente."

];

function atualizarMensagem(){

const indice =
Math.floor(
Math.random() *
frases.length
);

mensagem.textContent =
frases[indice];

}

// =========================
// TREINO
// =========================

function renderTreino(dia){

const treino =
treinos[dia];

if(!treino) return;

let html =
`<h3>${treino.nome}</h3><br>`;

treino.lista.forEach(ex => {

html += `
<div class="exercicio">
${ex}
</div>
`;

});

treinoHoje.innerHTML =
html;

}

// =========================
// SELEÇÃO DE DIA
// =========================

if(seletorDia){

seletorDia.addEventListener(
"change",
function(){

renderTreino(
this.value
);

}
);

}

// =========================
// CALENDÁRIO
// =========================

document
.querySelectorAll(".dia")
.forEach(item => {

item.addEventListener(
"click",
function(){

this.classList.toggle(
"diaConcluido"
);

}
);

});

// =========================
// TELA
// =========================

function atualizarTela(){

if(xpEl){

xpEl.textContent =
`XP Total: ${xp}`;

}

atualizarNivel();

atualizarClasse();

atualizarBoss();

atualizarMensagem();

}

// =========================
// INICIALIZAÇÃO
// =========================

renderTreino(
new Date().getDay()
);

atualizarTela();
// =========================
// MISSÕES DIÁRIAS
// =========================

const missoes =
document.querySelectorAll(".m");

let xpHoje =
Number(
localStorage.getItem(
"ares_xp_hoje"
)
) || 0;

const xpHojeEl =
document.getElementById(
"xpHoje"
);

function atualizarXpHoje(){

if(xpHojeEl){

xpHojeEl.textContent =
xpHoje;

}

}

missoes.forEach(box => {

box.addEventListener(
"change",
() => {

if(box.checked){

xp += 50;

xpHoje += 50;

bossHp -= 250;

if(bossHp <= 0){

bossHp = 10000;

xp += 500;

alert(
"🏆 Boss derrotado! +500 XP"
);

somarBoss();

}

}else{

xp -= 50;

xpHoje -= 50;

bossHp += 250;

}

salvarDados();

atualizarTela();

atualizarXpHoje();

}
);

});

// =========================
// LOCAL STORAGE
// =========================

function salvarDados(){

localStorage.setItem(
"ares_xp",
xp
);

localStorage.setItem(
"ares_boss_hp",
bossHp
);

localStorage.setItem(
"ares_streak",
streak
);

localStorage.setItem(
"ares_xp_hoje",
xpHoje
);

}

// =========================
// CALENDÁRIO
// =========================

function carregarCalendario(){

const dias =
document.querySelectorAll(
".dia"
);

dias.forEach((dia,i)=>{

const salvo =
localStorage.getItem(
"ares_dia_"+i
);

if(salvo === "1"){

dia.classList.add(
"diaConcluido"
);

dia.textContent =
"🟩";

}

dia.addEventListener(
"click",
()=>{

dia.classList.toggle(
"diaConcluido"
);

if(
dia.classList.contains(
"diaConcluido"
)
){

dia.textContent =
"🟩";

localStorage.setItem(
"ares_dia_"+i,
"1"
);

}else{

dia.textContent =
"⬜";

localStorage.removeItem(
"ares_dia_"+i
);

}

calcularStreak();

}
);

});

}

// =========================
// STREAK
// =========================

function calcularStreak(){

const dias =
document.querySelectorAll(
".diaConcluido"
);

streak =
dias.length;

const streakEl =
document.getElementById(
"streakAtual"
);

if(streakEl){

streakEl.textContent =
streak;

}

const streakPerfil =
document.getElementById(
"streak"
);

if(streakPerfil){

streakPerfil.textContent =
`🔥 Streak: ${streak} dias`;

}

salvarDados();

}

// =========================
// CONQUISTAS
// =========================

function verificarConquistas(){

const area =
document.getElementById(
"conquistas"
);

if(!area) return;

if(streak >= 7){

if(
!document.getElementById(
"conq7"
)
){

area.innerHTML += `
<div
id="conq7"
class="conquista">
🔥 7 Dias Seguidos
</div>
`;

}

}

if(xp >= 2000){

if(
!document.getElementById(
"conqDiamante"
)
){

area.innerHTML += `
<div
id="conqDiamante"
class="conquista">
💎 Classe Diamante
</div>
`;

}

}

if(xp >= 5000){

if(
!document.getElementById(
"conqTita"
)
){

area.innerHTML += `
<div
id="conqTita"
class="conquista">
🏛️ Classe Titã
</div>
`;

}

}

}

// =========================
// BOSS DERROTADO
// =========================

function somarBoss(){

let totalBoss =

Number(
localStorage.getItem(
"ares_bosses"
)
) || 0;

totalBoss++;

localStorage.setItem(
"ares_bosses",
totalBoss
);

const totalBossEl =
document.getElementById(
"totalBoss"
);

if(totalBossEl){

totalBossEl.textContent =
totalBoss;

}

}

// =========================
// ESTATÍSTICAS
// =========================

function carregarStats(){

const totalBoss =

Number(
localStorage.getItem(
"ares_bosses"
)
) || 0;

const bossEl =
document.getElementById(
"totalBoss"
);

if(bossEl){

bossEl.textContent =
totalBoss;

}

const xpTotalEl =
document.getElementById(
"xpTotal"
);

if(xpTotalEl){

xpTotalEl.textContent =
xp;

}

}

// =========================
// RESET DIÁRIO
// =========================

function verificarNovoDia(){

const hoje =
new Date()
.toLocaleDateString();

const ultimoDia =
localStorage.getItem(
"ares_data"
);

if(ultimoDia !== hoje){

localStorage.setItem(
"ares_data",
hoje
);

xpHoje = 0;

missoes.forEach(
m => m.checked = false
);

localStorage.setItem(
"ares_xp_hoje",
0
);

}

}

// =========================
// CHAMADAS
// =========================

verificarNovoDia();

carregarCalendario();

calcularStreak();

carregarStats();

verificarConquistas();

atualizarXpHoje();
// =========================
// EVOLUÇÃO FÍSICA
// =========================

const pesoInput =
document.getElementById("pesoInput");

const bfInput =
document.getElementById("bfInput");

const bracoInput =
document.getElementById("bracoInput");

const peitoInput =
document.getElementById("peitoInput");

const cinturaInput =
document.getElementById("cinturaInput");

const gluteoInput =
document.getElementById("gluteoInput");

const coxaInput =
document.getElementById("coxaInput");

const panturrilhaInput =
document.getElementById("panturrilhaInput");

const salvarMedidasBtn =
document.getElementById("salvarMedidas");

// =========================
// CARREGAR HISTÓRICO
// =========================

let historicoPeso =
JSON.parse(
localStorage.getItem("ares_historico_peso")
) || [];

let historicoBF =
JSON.parse(
localStorage.getItem("ares_historico_bf")
) || [];

let historicoMedidas =
JSON.parse(
localStorage.getItem("ares_historico_medidas")
) || [];

// =========================
// SALVAR MEDIDAS
// =========================

if(salvarMedidasBtn){

salvarMedidasBtn.addEventListener(
"click",
()=>{

const data = new Date()
.toLocaleDateString();

const peso =
Number(pesoInput.value);

const bf =
Number(bfInput.value);

const medidas = {

data,

braco:
Number(bracoInput.value),

peito:
Number(peitoInput.value),

cintura:
Number(cinturaInput.value),

gluteo:
Number(gluteoInput.value),

coxa:
Number(coxaInput.value),

panturrilha:
Number(panturrilhaInput.value)

};

if(peso){

historicoPeso.push({
data,
valor:peso
});

localStorage.setItem(
"ares_historico_peso",
JSON.stringify(
historicoPeso
)
);

document.getElementById(
"pesoAtual"
).textContent =
peso + "kg";

}

if(bf){

historicoBF.push({
data,
valor:bf
});

localStorage.setItem(
"ares_historico_bf",
JSON.stringify(
historicoBF
)
);

document.getElementById(
"bfAtual"
).textContent =
bf + "%";

}

historicoMedidas.push(
medidas
);

localStorage.setItem(
"ares_historico_medidas",
JSON.stringify(
historicoMedidas
)
);

atualizarGraficos();

alert(
"💾 Medidas salvas!"
);

}
);

}

// =========================
// GRÁFICO PESO
// =========================

let graficoPeso;

// =========================
// GRÁFICO BF
// =========================

let graficoBF;

// =========================
// GRÁFICO MEDIDAS
// =========================

let graficoMedidas;

// =========================
// ATUALIZAR GRÁFICOS
// =========================

function atualizarGraficos(){

// PESO

const labelsPeso =
historicoPeso.map(
i => i.data
);

const dadosPeso =
historicoPeso.map(
i => i.valor
);

const ctxPeso =
document
.getElementById(
"graficoPeso"
);

if(ctxPeso){

if(graficoPeso){

graficoPeso.destroy();

}

graficoPeso =
new Chart(
ctxPeso,
{
type:"line",

data:{

labels:
labelsPeso,

datasets:[{

label:
"Peso",

data:
dadosPeso,

borderWidth:3

}]

}

}
);

}

// BF

const labelsBF =
historicoBF.map(
i => i.data
);

const dadosBF =
historicoBF.map(
i => i.valor
);

const ctxBF =
document
.getElementById(
"graficoBF"
);

if(ctxBF){

if(graficoBF){

graficoBF.destroy();

}

graficoBF =
new Chart(
ctxBF,
{
type:"line",

data:{

labels:
labelsBF,

datasets:[{

label:
"BF",

data:
dadosBF,

borderWidth:3

}]

}

}
);

}

// MEDIDAS

const ctxMedidas =
document
.getElementById(
"graficoMedidas"
);

if(
ctxMedidas &&
historicoMedidas.length > 0
){

if(graficoMedidas){

graficoMedidas.destroy();

}

graficoMedidas =
new Chart(
ctxMedidas,
{

type:"line",

data:{

labels:
historicoMedidas.map(
i => i.data
),

datasets:[

{
label:"Braço",
data:
historicoMedidas.map(
i => i.braco
)
},

{
label:"Peito",
data:
historicoMedidas.map(
i => i.peito
)
},

{
label:"Cintura",
data:
historicoMedidas.map(
i => i.cintura
)
},

{
label:"Glúteo",
data:
historicoMedidas.map(
i => i.gluteo
)
}

]

}

}
);

}

}

// =========================
// CARREGAR ÚLTIMO REGISTRO
// =========================

function carregarUltimasMedidas(){

if(
historicoPeso.length > 0
){

const ultimoPeso =

historicoPeso[
historicoPeso.length - 1
];

document.getElementById(
"pesoAtual"
).textContent =
ultimoPeso.valor + "kg";

}

if(
historicoBF.length > 0
){

const ultimoBF =

historicoBF[
historicoBF.length - 1
];

document.getElementById(
"bfAtual"
).textContent =
ultimoBF.valor + "%";

}

}

// =========================
// INICIALIZAÇÃO
// =========================

carregarUltimasMedidas();

atualizarGraficos();
// =========================
// HISTÓRICO DE TREINOS
// =========================

let historicoTreinos =
JSON.parse(
localStorage.getItem(
"ares_historico_treinos"
)
) || [];

// =========================
// RECORDES
// =========================

let recordes =
JSON.parse(
localStorage.getItem(
"ares_recordes"
)
) || {

"Hip Thrust":130,
"Agachamento":120,
"Leg Press":240,
"Stiff":120

};

// =========================
// SALVAR TREINO
// =========================

const btnSalvarTreino =
document.getElementById(
"salvarTreino"
);

if(btnSalvarTreino){

btnSalvarTreino.addEventListener(
"click",
salvarTreino
);

}

// =========================
// SALVAR TREINO
// =========================

function salvarTreino(){

const dia =
document.getElementById(
"diaTreino"
).value;

const treinoNome =
treinos[dia].nome;

const data =
new Date()
.toLocaleDateString();

const treinoSalvo = {

data,
dia,
treino:treinoNome,
exercicios:[]

};

const linhas =
document.querySelectorAll(
"#corpoTreino tr"
);

linhas.forEach(linha=>{

const exercicio =
linha.querySelector(
"td"
).innerText;

const numeros =
linha.querySelectorAll(
"input[type='number']"
);

let maiorPeso = 0;

let series = [];

for(
let i=0;
i<numeros.length;
i+=2
){

const peso =
Number(
numeros[i].value
) || 0;

const reps =
Number(
numeros[i+1].value
) || 0;

if(
peso > maiorPeso
){

maiorPeso =
peso;

}

series.push({

peso,
reps

});

}

treinoSalvo.exercicios.push({

nome:exercicio,
series

});

// =========================
// RECORDES
// =========================

if(maiorPeso > 0){

if(
!recordes[exercicio]
){

recordes[
exercicio
] = maiorPeso;

}

else if(
maiorPeso >
recordes[
exercicio
]
){

recordes[
exercicio
] = maiorPeso;

alert(
`🏆 Novo recorde em ${exercicio}: ${maiorPeso}kg`
);

}

}

});

historicoTreinos.push(
treinoSalvo
);

localStorage.setItem(
"ares_historico_treinos",
JSON.stringify(
historicoTreinos
)
);

localStorage.setItem(
"ares_recordes",
JSON.stringify(
recordes
)
);

atualizarRecordes();

renderHistorico();

alert(
"💾 Treino salvo!"
);

}

// =========================
// RENDER RECORDES
// =========================

function atualizarRecordes(){

const hip =
document.getElementById(
"recHip"
);

if(
hip &&
recordes["Hip Thrust"]
){

hip.textContent =
recordes[
"Hip Thrust"
] + "kg";

}

const agach =
document.getElementById(
"recAgachamento"
);

if(
agach &&
recordes["Agachamento"]
){

agach.textContent =
recordes[
"Agachamento"
] + "kg";

}

const leg =
document.getElementById(
"recLeg"
);

if(
leg &&
recordes["Leg Press"]
){

leg.textContent =
recordes[
"Leg Press"
] + "kg";

}

const stiff =
document.getElementById(
"recStiff"
);

if(
stiff &&
recordes["Stiff"]
){

stiff.textContent =
recordes[
"Stiff"
] + "kg";

}

}

// =========================
// HISTÓRICO
// =========================

function renderHistorico(){

const area =
document.getElementById(
"historicoTreinos"
);

if(!area) return;

if(
historicoTreinos.length === 0
){

area.innerHTML =
"Nenhum treino registrado.";

return;

}

let html = "";

historicoTreinos
.slice()
.reverse()
.forEach(item=>{

html += `

<div class="historicoCard">

<h3>
${item.data}
</h3>

<p>
${item.treino}
</p>

</div>

`;

});

area.innerHTML =
html;

}

// =========================
// CICLOS DE 30 DIAS
// =========================

function atualizarCiclo(){

const inicioProjeto =

new Date(
"2026-09-01"
);

const hoje =
new Date();

const dias = Math.floor(

(
hoje - inicioProjeto
)

/

86400000

);

const ciclo =

Math.floor(
dias / 30
)

+ 1;

const progresso =

(
(dias % 30)

/

30
)

* 100;

const cicloEl =
document.getElementById(
"cicloAtual"
);

if(cicloEl){

cicloEl.textContent =

`Ciclo ${ciclo} • Dias ${
(dias % 30)+1
}/30`;

}

const barra =
document.getElementById(
"barraCiclo"
);

if(barra){

barra.style.width =
progresso + "%";

}

const restante =
document.getElementById(
"diasRestantes"
);

if(restante){

restante.textContent =

`${30-(dias%30)}
dias para próximo ciclo`;

}

}

// =========================
// TOTAL DE TREINOS
// =========================

function atualizarTotalTreinos(){

const total =
document.getElementById(
"totalTreinos"
);

if(total){

total.textContent =
historicoTreinos.length;

}

}

// =========================
// INICIALIZAÇÃO
// =========================

renderHistorico();

atualizarRecordes();

atualizarTotalTreinos();

atualizarCiclo();
// =========================
// PARTE 5 - ARES PREMIUM
// =========================

// =========================
// PROGRESSO DO TREINO
// =========================

function atualizarProgressoTreino(){

const checks =
document.querySelectorAll(
"#corpoTreino input[type='checkbox']"
);

if(checks.length === 0) return;

let feitos = 0;

checks.forEach(c=>{

if(c.checked) feitos++;

});

const porcentagem =
Math.round(
(feitos / checks.length) * 100
);

let barra =
document.getElementById(
"barraTreino"
);

let texto =
document.getElementById(
"textoProgresso"
);

if(barra){

barra.style.width =
porcentagem + "%";

}

if(texto){

texto.textContent =
`${feitos}/${checks.length} exercícios (${porcentagem}%)`;

}

}

// =========================
// CHECKBOX COM BRILHO
// =========================

document.addEventListener(
"change",
e=>{

if(
e.target.type ===
"checkbox"
){

const linha =
e.target.closest("tr");

if(linha){

if(e.target.checked){

linha.classList.add(
"treinoFeito"
);

}else{

linha.classList.remove(
"treinoFeito"
);

}

}

atualizarProgressoTreino();

}

}
);

// =========================
// TREINOS PERSONALIZADOS
// =========================

let treinosCustom =

JSON.parse(
localStorage.getItem(
"ares_treinos_custom"
)
) || {};

function salvarTreinosCustom(){

localStorage.setItem(
"ares_treinos_custom",
JSON.stringify(
treinosCustom
)
);

}

// =========================
// ADICIONAR EXERCÍCIO
// =========================

function adicionarExercicio(){

const nome =
prompt(
"Nome do exercício:"
);

if(!nome) return;

const dia =
document.getElementById(
"diaTreino"
).value;

if(
!treinosCustom[dia]
){

treinosCustom[dia] = [];

}

treinosCustom[dia].push(
nome
);

salvarTreinosCustom();

renderTreino(dia);

}

// =========================
// BOTÃO
// =========================

const btnAdd =
document.getElementById(
"addExercicio"
);

if(btnAdd){

btnAdd.addEventListener(
"click",
adicionarExercicio
);

}

// =========================
// FRASES GEPETÃO
// =========================

const frasesPremium = [

"Disciplina vence motivação.",

"Seu shape de amanhã depende do treino de hoje.",

"Quando ninguém acredita, continue.",

"Você não chegou até aqui para desistir agora.",

"Cada repetição aproxima São Paulo.",

"Hoje é um ótimo dia para evoluir.",

"Seu concorrente treinou hoje. E você?",

"Mais forte do que ontem.",

"Projeto Tanquinho em andamento.",

"Construa o físico que você admira."

];

function conselhoAleatorio(){

const indice =
Math.floor(
Math.random()
*
frasesPremium.length
);

const msg =
document.getElementById(
"mensagem"
);

if(msg){

msg.textContent =
frasesPremium[indice];

}

}

setInterval(
conselhoAleatorio,
30000
);

// =========================
// EXPORTAR BACKUP
// =========================

function exportarDados(){

const dados = {

xp,

bossHp,

streak,

recordes,

historicoPeso,

historicoBF,

historicoMedidas,

historicoTreinos

};

const blob =
new Blob(

[
JSON.stringify(
dados,
null,
2
)
],

{
type:
"application/json"
}

);

const a =
document.createElement(
"a"
);

a.href =
URL.createObjectURL(
blob
);

a.download =
"ares_backup.json";

a.click();

}

// =========================
// BOTÃO EXPORTAR
// =========================

const btnExportar =
document.getElementById(
"exportarDados"
);

if(btnExportar){

btnExportar.addEventListener(
"click",
exportarDados
);

}

// =========================
// CONQUISTAS AVANÇADAS
// =========================

function verificarConquistasAvancadas(){

const area =
document.getElementById(
"conquistas"
);

if(!area) return;

if(
historicoTreinos.length >= 50
){

if(
!document.getElementById(
"conq50"
)
){

area.innerHTML +=

`<div
id="conq50"
class="conquista">
🏋️ 50 Treinos
</div>`;

}

}

if(
historicoTreinos.length >= 100
){

if(
!document.getElementById(
"conq100"
)
){

area.innerHTML +=

`<div
id="conq100"
class="conquista">
🔥 100 Treinos
</div>`;

}

}

if(xp >= 10000){

if(
!document.getElementById(
"conqGod"
)
){

area.innerHTML +=

`<div
id="conqGod"
class="conquista">
👑 Deus da Guerra
</div>`;

}

}

}

// =========================
// INICIALIZAÇÃO FINAL
// =========================

verificarConquistasAvancadas();

atualizarProgressoTreino();

conselhoAleatorio();

console.log(
"🏛️ ARES TRACKER 6.0 CARREGADO"
);
