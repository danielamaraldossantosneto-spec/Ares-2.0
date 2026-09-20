// =====================================
// ARES TRACKER 7.0
// DANIEL AMARAL
// =====================================

// =====================================
// DADOS PRINCIPAIS
// =====================================

let xp =
Number(
localStorage.getItem(
"ares_xp"
)
) || 1540;

let bossHp =
Number(
localStorage.getItem(
"ares_boss_hp"
)
) || 10000;

let streak =
Number(
localStorage.getItem(
"ares_streak"
)
) || 0;

let bossesDerrotados =
Number(
localStorage.getItem(
"ares_bosses"
)
) || 0;

// =====================================
// FRASES GEPETÃO
// =====================================

const frases = [

"Disciplina vence motivação.",

"Seu shape de amanhã depende do treino de hoje.",

"Continue avançando guerreiro.",

"Cada repetição aproxima São Paulo.",

"A consistência constrói campeões.",

"Hoje você planta o shape de amanhã.",

"Você já chegou longe demais para desistir.",

"Mais forte do que ontem.",

"Projeto Tanquinho em andamento.",

"Construa o físico que você admira.",

"Um treino ruim ainda é melhor que nenhum treino.",

"Foco no processo. O resultado vem."

];

// =====================================
// ELEMENTOS
// =====================================

const xpEl =
document.getElementById(
"xp"
);

const nivelEl =
document.getElementById(
"nivel"
);

const classeEl =
document.getElementById(
"classe"
);

const bossHpEl =
document.getElementById(
"bossHp"
);

const bossHpArena =
document.getElementById(
"bossHpArena"
);

const bossBarra =
document.getElementById(
"bossBarra"
);

const bossBarraArena =
document.getElementById(
"bossBarraArena"
);

const mensagemEl =
document.getElementById(
"mensagem"
);

// =====================================
// SALVAR
// =====================================

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
"ares_bosses",
bossesDerrotados
);

}

// =====================================
// CLASSE RPG
// =====================================

function atualizarClasse(){

let classe =
"🥉 Bronze";

if(xp >= 1000)
classe = "🥇 Ouro";

if(xp >= 2000)
classe = "💎 Diamante";

if(xp >= 5000)
classe = "🏛️ Titã";

if(xp >= 10000)
classe = "👑 Deus da Guerra";

if(classeEl){

classeEl.textContent =
classe;

}

}

// =====================================
// NÍVEL
// =====================================

function atualizarNivel(){

const nivel =
Math.floor(
xp / 100
) + 1;

if(nivelEl){

nivelEl.textContent =
`⚔️ Nível ${nivel}`;

}

}

// =====================================
// BOSS
// =====================================

function atualizarBoss(){

const hpTexto =
`${bossHp.toLocaleString()} HP`;

if(bossHpEl){

bossHpEl.textContent =
hpTexto;

}

if(bossHpArena){

bossHpArena.textContent =
hpTexto;

}

const porcentagem =

Math.max(
0,
(bossHp / 10000) * 100
);

if(bossBarra){

bossBarra.style.width =
porcentagem + "%";

}

if(bossBarraArena){

bossBarraArena.style.width =
porcentagem + "%";

}

}

// =====================================
// FRASE ALEATÓRIA
// =====================================

function atualizarMensagem(){

if(!mensagemEl)
return;

const indice =

Math.floor(
Math.random() *
frases.length
);

mensagemEl.textContent =
frases[indice];

}

// =====================================
// LEVEL UP
// =====================================

let ultimoNivel =

Number(
localStorage.getItem(
"ares_ultimo_nivel"
)
) || 1;

function verificarLevelUp(){

const nivelAtual =

Math.floor(
xp / 100
) + 1;

if(
nivelAtual >
ultimoNivel
){

const popup =
document.getElementById(
"levelUpPopup"
);

const novoNivel =
document.getElementById(
"novoNivel"
);

if(
popup &&
novoNivel
){

novoNivel.textContent =
`NÍVEL ${nivelAtual}`;

popup.style.display =
"flex";

setTimeout(()=>{

popup.style.display =
"none";

},3000);

}

ultimoNivel =
nivelAtual;

localStorage.setItem(
"ares_ultimo_nivel",
ultimoNivel
);

}

}

// =====================================
// TELA
// =====================================

function atualizarTela(){

if(xpEl){

xpEl.textContent =
`XP Total: ${xp}`;

}

atualizarNivel();

atualizarClasse();

atualizarBoss();

salvarDados();

}

// =====================================
// INICIAR
// =====================================

atualizarTela();

atualizarMensagem();

setInterval(()=>{

atualizarMensagem();

},30000);

verificarLevelUp();
// =====================================
// MISSÕES DIÁRIAS
// =====================================

const missoes =
document.querySelectorAll(
".m"
);

let xpHoje =
Number(
localStorage.getItem(
"ares_xp_hoje"
)
) || 0;

function atualizarXpHoje(){

const xpHojeEl =
document.getElementById(
"xpHoje"
);

if(xpHojeEl){

xpHojeEl.textContent =
`${xpHoje} XP`;

}

}

// =====================================
// DANO VISUAL NO BOSS
// =====================================

function mostrarDano(valor){

const dano =
document.createElement(
"div"
);

dano.className =
"danoBoss";

dano.textContent =
`-${valor}`;

document.body.appendChild(
dano
);

setTimeout(()=>{

dano.remove();

},1000);

}

// =====================================
// MISSÕES
// =====================================

missoes.forEach(box=>{

const salvo =

localStorage.getItem(
"missao_" +
box.value
);

if(salvo === "1"){

box.checked = true;

}

box.addEventListener(
"change",
()=>{

if(box.checked){

localStorage.setItem(
"missao_" +
box.value,
"1"
);

xp += 50;

xpHoje += 50;

bossHp -= 250;

mostrarDano(
250
);

if(bossHp <= 0){

bossHp = 10000;

bossesDerrotados++;

xp += 500;

localStorage.setItem(
"ares_bosses",
bossesDerrotados
);

alert(
"🏆 Boss derrotado! +500 XP"
);

}

}else{

localStorage.removeItem(
"missao_" +
box.value
);

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

// =====================================
// CALENDÁRIO SEMANAL
// =====================================

function iniciarCalendario(){

const dias =

document.querySelectorAll(
".dia"
);

dias.forEach(
(dia,index)=>{

const salvo =

localStorage.getItem(
"ares_dia_semana_" +
index
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
"ares_dia_semana_" +
index,
"1"
);

}else{

dia.textContent =
"⬜";

localStorage.removeItem(
"ares_dia_semana_" +
index
);

}

calcularStreak();

}
);

}
);

}

// =====================================
// STREAK
// =====================================

function calcularStreak(){

const diasFeitos =

document.querySelectorAll(
".diaConcluido"
).length;

streak = diasFeitos;

const streakEl =
document.getElementById(
"streak"
);

if(streakEl){

streakEl.textContent =
`🔥 Streak: ${streak}`;

}

const streakAtual =
document.getElementById(
"streakAtual"
);

if(streakAtual){

streakAtual.textContent =
`${streak} dias`;

}

const melhor =

Number(
localStorage.getItem(
"ares_melhor_streak"
)
) || 0;

if(streak > melhor){

localStorage.setItem(
"ares_melhor_streak",
streak
);

}

salvarDados();

}

// =====================================
// RESET DIÁRIO
// =====================================

function verificarNovoDia(){

const hoje =

new Date()
.toLocaleDateString();

const ultimoDia =

localStorage.getItem(
"ares_data"
);

if(
ultimoDia !== hoje
){

localStorage.setItem(
"ares_data",
hoje
);

xpHoje = 0;

localStorage.setItem(
"ares_xp_hoje",
0
);

missoes.forEach(m=>{

m.checked = false;

localStorage.removeItem(
"missao_" +
m.value
);

});

}

}

// =====================================
// ESTATÍSTICAS BÁSICAS
// =====================================

function atualizarEstatisticas(){

const xpStats =
document.getElementById(
"xpStats"
);

if(xpStats){

xpStats.textContent =
xp;

}

const totalBoss =
document.getElementById(
"totalBoss"
);

if(totalBoss){

totalBoss.textContent =
bossesDerrotados;

}

const melhorStreak =
document.getElementById(
"melhorStreak"
);

if(melhorStreak){

melhorStreak.textContent =

localStorage.getItem(
"ares_melhor_streak"
) || 0;

}

}

// =====================================
// INICIAR
// =====================================

verificarNovoDia();

iniciarCalendario();

calcularStreak();

atualizarXpHoje();

atualizarEstatisticas();
// =====================================
// TREINOS ARES 7.0
// =====================================

const treinos = {

0:{
nome:"🏃 RECUPERAÇÃO",
lista:[
"30min Cardio",
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
"Hip Thrust 4x10",
"Mesa Flexora 4x12",
"Stiff 4x10",
"Abdutora 4x15",
"Panturrilha 4x15"
]
},

4:{
nome:"🦵 LOWER",
lista:[
"Agachamento 4x10",
"Leg Press 4x12",
"Extensora 4x12",
"Flexora 4x12",
"Panturrilha 4x15"
]
},

5:{
nome:"💪 OMBRO + BRAÇO",
lista:[
"Desenvolvimento 4x10",
"Elevação Lateral 4x12",
"Rosca Direta 4x10",
"Rosca Martelo 4x12",
"Tríceps Testa 4x12"
]
},

6:{
nome:"⚔️ PEITO + TRÍCEPS",
lista:[
"Supino Inclinado 4x10",
"Crucifixo 4x12",
"Peck Deck 4x12",
"Tríceps Francês 4x12",
"Tríceps Corda 4x12"
]
}

};

// =====================================
// VÍDEOS EXERCÍCIOS
// =====================================

const videos = {

"Supino Inclinado 4x10":
"https://www.youtube.com/results?search_query=supino+inclinado",

"Supino Máquina 4x12":
"https://www.youtube.com/results?search_query=supino+maquina",

"Crucifixo 4x12":
"https://www.youtube.com/results?search_query=crucifixo",

"Desenvolvimento 4x10":
"https://www.youtube.com/results?search_query=desenvolvimento+ombro",

"Hip Thrust 4x10":
"https://www.youtube.com/results?search_query=hip+thrust",

"Agachamento 4x10":
"https://www.youtube.com/results?search_query=agachamento+livre",

"Leg Press 4x12":
"https://www.youtube.com/results?search_query=leg+press"

};

// =====================================
// ELEMENTOS
// =====================================

const seletorDia =
document.getElementById(
"diaTreino"
);

const treinoHojeEl =
document.getElementById(
"treinoHoje"
);

const corpoTreino =
document.getElementById(
"corpoTreino"
);

// =====================================
// RENDER TREINO
// =====================================

function renderTreino(dia){

const treino =
treinos[dia];

if(!treino)
return;

if(treinoHojeEl){

treinoHojeEl.innerHTML =
`<h3>${treino.nome}</h3>`;

}

if(corpoTreino){

let html = "";

treino.lista.forEach(ex=>{

html += `

<tr>

<td>${ex}</td>

<td>

<input
type="number"
placeholder="Peso">

</td>

<td>

<input
type="number"
placeholder="Reps">

</td>

<td>

<input
type="checkbox"
class="checkExercicio">

</td>

<td>

<button
class="btnVideo"
onclick="abrirVideo('${ex}')">

🎥 Ver

</button>

</td>

</tr>

`;

});

corpoTreino.innerHTML =
html;

}

atualizarProgresso();

}

// =====================================
// ABRIR VÍDEO
// =====================================

function abrirVideo(exercicio){

const url =

videos[exercicio] ||

"https://www.youtube.com/results?search_query=" +
encodeURIComponent(exercicio);

window.open(
url,
"_blank"
);

}

// =====================================
// TROCA DIA
// =====================================

if(seletorDia){

seletorDia.addEventListener(
"change",
function(){

const dia =
Number(
this.value
);

localStorage.setItem(
"ares_dia",
dia
);

renderTreino(
dia
);

}
);

}

// =====================================
// CARREGAR DIA
// =====================================

function carregarDiaSalvo(){

if(!seletorDia)
return;

const diaSalvo =

Number(
localStorage.getItem(
"ares_dia"
)
);

if(!isNaN(diaSalvo)){

seletorDia.value =
diaSalvo;

renderTreino(
diaSalvo
);

}else{

const hoje =
new Date()
.getDay();

seletorDia.value =
hoje;

renderTreino(
hoje
);

}

}

// =====================================
// PROGRESSO TREINO
// =====================================

function atualizarProgresso(){

const checks =

document.querySelectorAll(
".checkExercicio"
);

if(
checks.length === 0
)
return;

let feitos = 0;

checks.forEach(c=>{

if(c.checked)
feitos++;

});

const porcentagem =

Math.round(
(feitos/checks.length)
*100
);

const barra =
document.getElementById(
"barraTreino"
);

const texto =
document.getElementById(
"textoProgresso"
);

if(barra){

barra.style.width =
porcentagem + "%";

}

if(texto){

texto.textContent =

`${feitos}/${checks.length} (${porcentagem}%)`;

}

}

// =====================================
// CHECKBOX TREINO
// =====================================

document.addEventListener(
"change",
function(e){

if(
e.target.classList.contains(
"checkExercicio"
)
){

const linha =

e.target.closest("tr");

if(
e.target.checked
){

linha.classList.add(
"treinoFeito"
);

}else{

linha.classList.remove(
"treinoFeito"
);

}

atualizarProgresso();

}

}
);

// =====================================
// HISTÓRICO
// =====================================

let historicoTreinos =

JSON.parse(
localStorage.getItem(
"ares_historico_treinos"
)
) || [];

let recordes =

JSON.parse(
localStorage.getItem(
"ares_recordes"
)
) || {};

// =====================================
// INICIAR
// =====================================

carregarDiaSalvo();
// =====================================
// BOTÃO SALVAR TREINO
// =====================================

const salvarTreinoBtn =
document.getElementById(
"salvarTreino"
);

if(salvarTreinoBtn){

salvarTreinoBtn.addEventListener(
"click",
salvarTreino
);

}

// =====================================
// SALVAR TREINO
// =====================================

function salvarTreino(){

const linhas =

document.querySelectorAll(
"#corpoTreino tr"
);

if(
linhas.length === 0
){

alert(
"Selecione um treino primeiro."
);

return;

}

const treinoSalvo = [];

let exerciciosFeitos = 0;

// =====================================
// PERCORRER TREINO
// =====================================

linhas.forEach(linha=>{

const exercicio =

linha.cells[0]
.textContent;

const inputs =

linha.querySelectorAll(
"input"
);

const peso =

Number(
inputs[0]?.value || 0
);

const reps =

Number(
inputs[1]?.value || 0
);

const feito =

inputs[2]?.checked || false;

if(feito){

exerciciosFeitos++;

}

treinoSalvo.push({

exercicio,
peso,
reps,
feito

});

// =====================================
// RECORDE
// =====================================

if(feito){

if(
!recordes[exercicio]
){

recordes[exercicio] =
peso;

}

if(
peso >
recordes[exercicio]
){

recordes[exercicio] =
peso;

alert(
`🏆 Novo Recorde!
${exercicio}
${peso}kg`
);

}

}

});

// =====================================
// SALVAR TREINO
// =====================================

const treinoDia = {

data:
new Date()
.toLocaleDateString(),

dia:
document.getElementById(
"diaTreino"
)?.value,

treino:
treinoSalvo

};

historicoTreinos.push(
treinoDia
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

// =====================================
// XP TREINO
// =====================================

xp += 100;

if(
exerciciosFeitos >= 5
){

xp += 50;

}

salvarDados();

atualizarTela();

renderHistorico();

atualizarRecordes();

atualizarEstatisticasTreino();

atualizarHallDaFama();

alert(
"🔥 Treino salvo com sucesso!"
);

}

// =====================================
// RECORDES
// =====================================

function atualizarRecordes(){

const area =

document.getElementById(
"recordes"
);

if(!area)
return;

let html = "";

for(
const exercicio
in recordes
){

html += `

<div class="recordeCard">

<h3>

${exercicio}

</h3>

<p>

${recordes[exercicio]} kg

</p>

</div>

`;

}

area.innerHTML =
html;

}

// =====================================
// HISTÓRICO
// =====================================

function renderHistorico(){

const area =

document.getElementById(
"historicoTreinos"
);

if(!area)
return;

let html = "";

historicoTreinos
.slice()
.reverse()
.forEach(t=>{

html += `

<div class="historicoCard">

<h3>

📅 ${t.data}

</h3>

`;

t.treino.forEach(ex=>{

if(ex.feito){

html += `

<p>

✅ ${ex.exercicio}

- ${ex.peso}kg

x ${ex.reps}

</p>

`;

}

});

html +=
`</div>`;

});

area.innerHTML =
html;

}

// =====================================
// ESTATÍSTICAS TREINO
// =====================================

function atualizarEstatisticasTreino(){

const totalTreinos =

document.getElementById(
"totalTreinos"
);

if(totalTreinos){

totalTreinos.textContent =
historicoTreinos.length;

}

}

// =====================================
// HALL DA FAMA
// =====================================

function atualizarHallDaFama(){

const supino =

document.querySelector(
"#hallSupino"
);

const hip =

document.querySelector(
"#hallHip"
);

const leg =

document.querySelector(
"#hallLeg"
);

if(
supino &&
recordes[
"Supino Inclinado 4x10"
]
){

supino.textContent =

recordes[
"Supino Inclinado 4x10"
] + " kg";

}

if(
hip &&
recordes[
"Hip Thrust 4x10"
]
){

hip.textContent =

recordes[
"Hip Thrust 4x10"
] + " kg";

}

if(
leg &&
recordes[
"Leg Press 4x12"
]
){

leg.textContent =

recordes[
"Leg Press 4x12"
] + " kg";

}

}

// =====================================
// TERMINAL ARES
// =====================================

function logARES(texto){

const terminal =

document.getElementById(
"terminalARES"
);

if(!terminal)
return;

const linha =
document.createElement(
"p"
);

linha.textContent =
texto;

terminal.prepend(
linha
);

}

// =====================================
// REGISTRAR EVENTO
// =====================================

logARES(
"⚔️ Sistema iniciado."
);

logARES(
"🏛️ Bem-vindo ao ARES."
);

// =====================================
// INICIAR
// =====================================

atualizarRecordes();

renderHistorico();

atualizarEstatisticasTreino();

atualizarHallDaFama();
// =====================================
// EVOLUÇÃO FÍSICA
// =====================================

let historicoMedidas =

JSON.parse(
localStorage.getItem(
"ares_medidas"
)
) || [];

// =====================================
// SALVAR MEDIDAS
// =====================================

const salvarMedidasBtn =

document.getElementById(
"salvarMedidas"
);

if(salvarMedidasBtn){

salvarMedidasBtn.addEventListener(
"click",
salvarMedidas
);

}

function salvarMedidas(){

const registro = {

data:
new Date()
.toLocaleDateString(),

peso:
Number(
document.getElementById(
"pesoInput"
)?.value || 0
),

bf:
Number(
document.getElementById(
"bfInput"
)?.value || 0
),

braco:
Number(
document.getElementById(
"bracoInput"
)?.value || 0
),

peito:
Number(
document.getElementById(
"peitoInput"
)?.value || 0
),

cintura:
Number(
document.getElementById(
"cinturaInput"
)?.value || 0
),

gluteo:
Number(
document.getElementById(
"gluteoInput"
)?.value || 0
),

coxa:
Number(
document.getElementById(
"coxaInput"
)?.value || 0
),

panturrilha:
Number(
document.getElementById(
"panturrilhaInput"
)?.value || 0
)

};

historicoMedidas.push(
registro
);

localStorage.setItem(

"ares_medidas",

JSON.stringify(
historicoMedidas
)

);

xp += 50;

salvarDados();

atualizarTela();

atualizarEvolucao();

gerarGraficos();

renderMedidas();

verificarConquistas();

alert(
"📈 Evolução salva!"
);

}

// =====================================
// EVOLUÇÃO
// =====================================

function atualizarEvolucao(){

if(
historicoMedidas.length === 0
)
return;

const ultimo =

historicoMedidas[
historicoMedidas.length - 1
];

const pesoAtual =
document.getElementById(
"pesoAtual"
);

const bfAtual =
document.getElementById(
"bfAtual"
);

if(pesoAtual){

pesoAtual.textContent =
`${ultimo.peso} kg`;

}

if(bfAtual){

bfAtual.textContent =
`${ultimo.bf}%`;

}

}

// =====================================
// GRÁFICOS
// =====================================

let graficoPeso;
let graficoBF;

function gerarGraficos(){

if(
typeof Chart ===
"undefined"
)
return;

const labels =

historicoMedidas.map(
m => m.data
);

const pesos =

historicoMedidas.map(
m => m.peso
);

const bfs =

historicoMedidas.map(
m => m.bf
);

// PESO

const canvasPeso =

document.getElementById(
"graficoPeso"
);

if(canvasPeso){

if(graficoPeso){

graficoPeso.destroy();

}

graficoPeso =
new Chart(

canvasPeso,

{

type:"line",

data:{

labels,

datasets:[{

label:"Peso",

data:pesos,

borderWidth:3,

tension:.3

}]

}

}

);

}

// BF

const canvasBF =

document.getElementById(
"graficoBF"
);

if(canvasBF){

if(graficoBF){

graficoBF.destroy();

}

graficoBF =
new Chart(

canvasBF,

{

type:"line",

data:{

labels,

datasets:[{

label:"BF",

data:bfs,

borderWidth:3,

tension:.3

}]

}

}

);

}

}

// =====================================
// HISTÓRICO MEDIDAS
// =====================================

function renderMedidas(){

const area =

document.getElementById(
"historicoMedidas"
);

if(!area)
return;

let html = "";

historicoMedidas
.slice()
.reverse()
.forEach(m=>{

html += `

<div class="historicoCard">

<h3>
📅 ${m.data}
</h3>

<p>⚖️ Peso: ${m.peso}kg</p>

<p>🧬 BF: ${m.bf}%</p>

<p>💪 Braço: ${m.braco}cm</p>

<p>🏛️ Peito: ${m.peito}cm</p>

<p>📏 Cintura: ${m.cintura}cm</p>

<p>🍑 Glúteo: ${m.gluteo}cm</p>

<p>🦵 Coxa: ${m.coxa}cm</p>

<p>🔥 Panturrilha: ${m.panturrilha}cm</p>

</div>

`;

});

area.innerHTML =
html;

}

// =====================================
// CONQUISTAS
// =====================================

let conquistas =

JSON.parse(
localStorage.getItem(
"ares_conquistas"
)
) || [];

function desbloquearConquista(nome){

if(
conquistas.includes(nome)
)
return;

conquistas.push(nome);

localStorage.setItem(

"ares_conquistas",

JSON.stringify(
conquistas
)

);

renderConquistas();

logARES(
`🏆 ${nome}`
);

}

function verificarConquistas(){

if(
historicoTreinos.length >= 1
){

desbloquearConquista(
"⚔️ Primeiro Treino"
);

}

if(
historicoTreinos.length >= 30
){

desbloquearConquista(
"🏛️ Titã da Consistência"
);

}

if(
xp >= 2000
){

desbloquearConquista(
"💎 Classe Diamante"
);

}

if(
xp >= 5000
){

desbloquearConquista(
"🏛️ Classe Titã"
);

}

if(
xp >= 10000
){

desbloquearConquista(
"👑 Deus da Guerra"
);

}

}

function renderConquistas(){

const area =

document.getElementById(
"conquistas"
);

if(!area)
return;

area.innerHTML =
conquistas.map(c=>

`<div class="conquista">${c}</div>`

).join("");

}

// =====================================
// BACKUP JSON
// =====================================

function exportarBackup(){

const dados = {

xp,
bossHp,
streak,
bossesDerrotados,
historicoTreinos,
historicoMedidas,
recordes,
conquistas

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

const link =
document.createElement(
"a"
);

link.href =
URL.createObjectURL(
blob
);

link.download =
"ARES_BACKUP.json";

link.click();

}

const btnBackup =

document.getElementById(
"exportarDados"
);

if(btnBackup){

btnBackup.addEventListener(
"click",
exportarBackup
);

}

// =====================================
// TÍTULOS RPG
// =====================================

function atualizarTitulos(){

const titulos =

document.querySelectorAll(
".tituloCard"
);

titulos.forEach(t=>{

const texto =
t.textContent;

if(
texto.includes("Guerreiro")
){

t.classList.remove(
"bloqueado"
);

}

if(
xp >= 2000 &&
texto.includes("Campeão")
){

t.classList.remove(
"bloqueado"
);

}

if(
xp >= 5000 &&
texto.includes("Titã")
){

t.classList.remove(
"bloqueado"
);

}

if(
xp >= 10000 &&
texto.includes("Deus")
){

t.classList.remove(
"bloqueado"
);

}

});

}

// =====================================
// INICIAR FINAL
// =====================================

atualizarEvolucao();

gerarGraficos();

renderMedidas();

renderConquistas();

verificarConquistas();

atualizarTitulos();
