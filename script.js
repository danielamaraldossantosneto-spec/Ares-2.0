// =====================================
// ARES TRACKER 6.1
// Daniel Amaral
// =====================================

// =====================================
// TREINOS
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

"Construa o físico que você admira."

];

// =====================================
// DADOS SALVOS
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

// =====================================
// ELEMENTOS
// =====================================

const xpEl =
document.getElementById(
"xp"
);

const bossHpEl =
document.getElementById(
"bossHp"
);

const bossBarra =
document.getElementById(
"bossBarra"
);

const nivelEl =
document.getElementById(
"nivel"
);

const classeEl =
document.getElementById(
"classe"
);

const mensagemEl =
document.getElementById(
"mensagem"
);

// =====================================
// SALVAR DADOS
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

}

// =====================================
// CLASSE
// =====================================

function atualizarClasse(){

let classe =
"🥈 Prata";

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

if(bossHpEl){

bossHpEl.textContent =
`${bossHp.toLocaleString()} HP`;

}

if(bossBarra){

const porcentagem =
Math.max(
(bossHp / 10000) * 100,
0
);

bossBarra.style.width =
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
// =====================================
// TREINOS DINÂMICOS
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
// GERAR TABELA TREINO
// =====================================

function renderTreino(dia){

const treino =
treinos[dia];

if(!treino)
return;

// CASO ESTEJA USANDO DIV

if(treinoHojeEl){

let html = `
<h3>${treino.nome}</h3>
`;

treino.lista.forEach(ex=>{

html += `
<div class="exercicio">
${ex}
</div>
`;

});

treinoHojeEl.innerHTML =
html;

}

// CASO ESTEJA USANDO TABELA

if(corpoTreino){

let linhas = "";

treino.lista.forEach(ex=>{

linhas += `

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

</tr>

`;

});

corpoTreino.innerHTML =
linhas;

}

}

// =====================================
// SELECIONAR DIA
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
// CARREGAR DIA SALVO
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

if(
!isNaN(diaSalvo)
){

seletorDia.value =
diaSalvo;

renderTreino(
diaSalvo
);

}
else{

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
// EXERCÍCIOS CONCLUÍDOS
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

if(!linha)
return;

if(
e.target.checked
){

linha.classList.add(
"treinoFeito"
);

}
else{

linha.classList.remove(
"treinoFeito"
);

}

}

}
);

// =====================================
// PROGRESSO TREINO
// =====================================

function atualizarProgresso(){

const checks =
document.querySelectorAll(
".checkExercicio"
);

if(checks.length === 0)
return;

let feitos = 0;

checks.forEach(c=>{

if(c.checked)
feitos++;

});

const porcentagem =
Math.round(
(feitos / checks.length)
* 100
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

`${feitos}/${checks.length}
(${porcentagem}%)`;

}

}

// =====================================
// OUVIR CHECKS
// =====================================

document.addEventListener(
"change",
function(e){

if(
e.target.classList.contains(
"checkExercicio"
)
){

atualizarProgresso();

}

}
);

// =====================================
// INICIAR TREINOS
// =====================================

carregarDiaSalvo();
// =====================================
// MISSÕES DIÁRIAS
// =====================================

const missoes =
document.querySelectorAll(".m");

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
xpHoje;

}

}

// =====================================
// MISSÕES
// =====================================

missoes.forEach(box=>{

box.addEventListener(
"change",
()=>{

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

// =====================================
// CALENDÁRIO
// =====================================

function iniciarCalendario(){

const dias =
document.querySelectorAll(
".dia"
);

dias.forEach((dia,index)=>{

const salvo =
localStorage.getItem(
"ares_dia_semana_" + index
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
"ares_dia_semana_" + index,
"1"
);

}else{

dia.textContent =
"⬜";

localStorage.removeItem(
"ares_dia_semana_" + index
);

}

calcularStreak();

}
);

});

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
`🔥 Streak: ${streak} dias`;

}

const streakAtual =
document.getElementById(
"streakAtual"
);

if(streakAtual){

streakAtual.textContent =
streak;

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

// =====================================
// ESTATÍSTICAS
// =====================================

function atualizarEstatisticas(){

const totalTreinos =
document.getElementById(
"totalTreinos"
);

if(totalTreinos){

const historico =

JSON.parse(
localStorage.getItem(
"ares_historico_treinos"
)
) || [];

totalTreinos.textContent =
historico.length;

}

const totalBoss =
document.getElementById(
"totalBoss"
);

if(totalBoss){

const bosses =

Number(
localStorage.getItem(
"ares_bosses"
)
) || 0;

totalBoss.textContent =
bosses;

}

}

// =====================================
// FRASE AUTOMÁTICA
// =====================================

setInterval(()=>{

atualizarMensagem();

},30000);

// =====================================
// INICIAR
// =====================================

verificarNovoDia();

iniciarCalendario();

calcularStreak();

atualizarXpHoje();

atualizarEstatisticas();
// =====================================
// HISTÓRICO DE TREINOS
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

if(linhas.length === 0){

alert(
"Selecione um treino primeiro."
);

return;

}

const treinoSalvo = [];

linhas.forEach(linha=>{

const exercicio =
linha.cells[0].innerText;

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

treinoSalvo.push({

exercicio,
peso,
reps,
feito

});

// =====================================
// RECORDE AUTOMÁTICO
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
`🏆 Novo recorde em ${exercicio}: ${peso}kg`
);

}

}

});

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

xp += 100;

salvarDados();

atualizarTela();

atualizarRecordes();

renderHistorico();

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
// ESTATÍSTICAS
// =====================================

function atualizarEstatisticasTreino(){

const total =
document.getElementById(
"totalTreinos"
);

if(total){

total.textContent =
historicoTreinos.length;

}

}

// =====================================
// INICIAR
// =====================================

atualizarRecordes();

renderHistorico();

atualizarEstatisticasTreino();
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
// BOTÃO SALVAR MEDIDAS
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

// =====================================
// SALVAR MEDIDAS
// =====================================

function salvarMedidas(){

const peso =
Number(
document.getElementById(
"pesoInput"
)?.value || 0
);

const bf =
Number(
document.getElementById(
"bfInput"
)?.value || 0
);

const braco =
Number(
document.getElementById(
"bracoInput"
)?.value || 0
);

const peito =
Number(
document.getElementById(
"peitoInput"
)?.value || 0
);

const cintura =
Number(
document.getElementById(
"cinturaInput"
)?.value || 0
);

const gluteo =
Number(
document.getElementById(
"gluteoInput"
)?.value || 0
);

const coxa =
Number(
document.getElementById(
"coxaInput"
)?.value || 0
);

const panturrilha =
Number(
document.getElementById(
"panturrilhaInput"
)?.value || 0
);

const registro = {

data:
new Date()
.toLocaleDateString(),

peso,
bf,
braco,
peito,
cintura,
gluteo,
coxa,
panturrilha

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

atualizarEvolucao();

gerarGraficos();

alert(
"📈 Medidas salvas!"
);

}

// =====================================
// EVOLUÇÃO FÍSICA
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

// =====================
// PESO
// =====================

const pesoCanvas =
document.getElementById(
"graficoPeso"
);

if(pesoCanvas){

if(graficoPeso){

graficoPeso.destroy();

}

graficoPeso =
new Chart(

pesoCanvas,

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

// =====================
// BF
// =====================

const bfCanvas =
document.getElementById(
"graficoBF"
);

if(bfCanvas){

if(graficoBF){

graficoBF.destroy();

}

graficoBF =
new Chart(

bfCanvas,

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
// TABELA DE MEDIDAS
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
// INICIAR
// =====================================

atualizarEvolucao();

gerarGraficos();

renderMedidas();
// =====================================
// CONQUISTAS
// =====================================

let conquistas =

JSON.parse(
localStorage.getItem(
"ares_conquistas"
)
) || [];

// =====================================
// DESBLOQUEAR CONQUISTA
// =====================================

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

alert(
`🏆 Nova conquista: ${nome}`
);

}

// =====================================
// VERIFICAR CONQUISTAS
// =====================================

function verificarConquistas(){

// PRIMEIRO TREINO

if(
historicoTreinos.length >= 1
){

desbloquearConquista(
"⚔️ Primeiro Treino"
);

}

// 7 TREINOS

if(
historicoTreinos.length >= 7
){

desbloquearConquista(
"🔥 7 Dias de Guerra"
);

}

// 30 TREINOS

if(
historicoTreinos.length >= 30
){

desbloquearConquista(
"🏛️ Titã da Consistência"
);

}

// XP

if(
xp >= 2000
){

desbloquearConquista(
"💎 Diamante"
);

}

if(
xp >= 5000
){

desbloquearConquista(
"🏛️ Titã"
);

}

if(
xp >= 10000
){

desbloquearConquista(
"👑 Deus da Guerra"
);

}

// BOSS

const bosses =
Number(
localStorage.getItem(
"ares_bosses"
)
) || 0;

if(
bosses >= 1
){

desbloquearConquista(
"👹 Primeiro Boss"
);

}

}

// =====================================
// RENDER CONQUISTAS
// =====================================

function renderConquistas(){

const area =
document.getElementById(
"conquistas"
);

if(!area)
return;

let html = "";

conquistas.forEach(c=>{

html += `

<div class="conquista">

${c}

</div>

`;

});

area.innerHTML =
html;

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

alert(
`⚔️ LEVEL UP!
Nível ${nivelAtual}`
);

ultimoNivel =
nivelAtual;

localStorage.setItem(
"ares_ultimo_nivel",
ultimoNivel
);

}

}

// =====================================
// META PESO
// =====================================

function atualizarMetaPeso(){

if(
historicoMedidas.length === 0
)
return;

const ultimo =

historicoMedidas[
historicoMedidas.length - 1
];

const metaPeso = 75;

const progresso =

Math.max(

0,

Math.min(

100,

((79 - ultimo.peso)
/
(79 - metaPeso))
* 100

)

);

const barra =
document.getElementById(
"barraMetaPeso"
);

if(barra){

barra.style.width =
progresso + "%";

}

}

// =====================================
// META BF
// =====================================

function atualizarMetaBF(){

if(
historicoMedidas.length === 0
)
return;

const ultimo =

historicoMedidas[
historicoMedidas.length - 1
];

const meta = 10;

const progresso =

Math.max(

0,

Math.min(

100,

((14 - ultimo.bf)
/
(14 - meta))
* 100

)

);

const barra =
document.getElementById(
"barraMetaBF"
);

if(barra){

barra.style.width =
progresso + "%";

}

}

// =====================================
// CICLO 30 DIAS
// =====================================

function verificarCiclo(){

const inicio =

localStorage.getItem(
"ares_inicio_ciclo"
);

if(!inicio){

localStorage.setItem(
"ares_inicio_ciclo",
Date.now()
);

return;

}

const dias =

Math.floor(

(
Date.now() -
Number(inicio)
)

/

86400000

);

if(
dias >= 30
){

alert(
"🔥 Novo ciclo de treino iniciado!"
);

localStorage.setItem(
"ares_inicio_ciclo",
Date.now()
);

}

}

// =====================================
// EXPORTAR BACKUP
// =====================================

function exportarBackup(){

const dados = {

xp,
bossHp,
streak,
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
document.createElement("a");

link.href =
URL.createObjectURL(blob);

link.download =
"ARES_BACKUP.json";

link.click();

}

// =====================================
// BOTÃO BACKUP
// =====================================

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
// INICIAR
// =====================================

renderConquistas();

verificarConquistas();

verificarLevelUp();

verificarCiclo();

atualizarMetaPeso();

atualizarMetaBF();
