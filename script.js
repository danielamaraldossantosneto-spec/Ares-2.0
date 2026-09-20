/* =====================================
   ARES TRACKER 7.0
   DANIEL AMARAL
===================================== */

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

let bossesMortos =
Number(
localStorage.getItem(
"ares_bosses"
)
) || 0;

let totalTreinos =
Number(
localStorage.getItem(
"ares_treinos"
)
) || 0;

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

const bossHpArenaEl =
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

const terminalARES =
document.getElementById(
"terminalARES"
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

localStorage.setItem(
"ares_bosses",
bossesMortos
);

localStorage.setItem(
"ares_treinos",
totalTreinos
);

}

// =====================================
// TERMINAL ARES
// =====================================

function logARES(texto){

if(!terminalARES) return;

const linha =
document.createElement("p");

linha.innerHTML =
"> " + texto;

terminalARES.prepend(
linha
);

}

// =====================================
// XP
// =====================================

function ganharXP(valor){

xp += valor;

atualizarXP();

salvarDados();

}

// =====================================
// NIVEL
// =====================================

function calcularNivel(){

return Math.floor(
xp / 100
) + 1;

}

// =====================================
// ATUALIZAR XP
// =====================================

function atualizarXP(){

if(xpEl){

xpEl.textContent =
xp + " XP";

}

const nivel =
calcularNivel();

if(nivelEl){

nivelEl.textContent =
"⚔️ Nível " + nivel;

}

atualizarClasse();

atualizarEstatisticas();

}

// =====================================
// CLASSES RPG
// =====================================

function atualizarClasse(){

if(!classeEl) return;

let classe =
"🥈 Prata";

classeEl.className = "";

if(xp >= 1000){

classe =
"🥇 Ouro";

}

if(xp >= 2000){

classe =
"💎 Diamante";

classeEl.classList.add(
"classeDiamante"
);

}

if(xp >= 5000){

classe =
"🏛️ Titã";

classeEl.classList.add(
"classeTita"
);

}

if(xp >= 10000){

classe =
"👑 Deus da Guerra";

classeEl.classList.add(
"classeDeus"
);

}

classeEl.textContent =
classe;

}
// =====================================
// BOSS DA SEMANA
// =====================================

const bosses = [

{
nome:"👹 Minotauro",
hp:10000,
imagem:"https://i.imgur.com/W6X8K4A.png"
},

{
nome:"🐉 Dragão Infernal",
hp:15000,
imagem:"https://i.imgur.com/3VesQzM.png"
},

{
nome:"💀 Rei Esqueleto",
hp:20000,
imagem:"https://i.imgur.com/1Y7N6UL.png"
},

{
nome:"🔥 Titã de Fogo",
hp:25000,
imagem:"https://i.imgur.com/xv8h0hI.png"
},

{
nome:"⚡ Zeus Corrompido",
hp:30000,
imagem:"https://i.imgur.com/fJwYJ1w.png"
}

];

// =====================================
// BOSS ATUAL
// =====================================

let bossAtual =
Number(
localStorage.getItem(
"ares_boss_atual"
)
) || 0;

// =====================================
// CARREGAR BOSS
// =====================================

function carregarBoss(){

const boss =
bosses[bossAtual];

const bossNome =
document.getElementById(
"bossNomeArena"
);

const bossImagem =
document.getElementById(
"bossImagem"
);

if(bossNome){

bossNome.textContent =
boss.nome;

}

if(bossImagem){

bossImagem.src =
boss.imagem;

}

if(bossHp > boss.hp){

bossHp =
boss.hp;

}

atualizarBoss();

}

// =====================================
// ATUALIZAR BOSS
// =====================================

function atualizarBoss(){

const boss =
bosses[bossAtual];

const porcentagem =
(bossHp / boss.hp) * 100;

if(bossHpEl){

bossHpEl.textContent =
bossHp + " HP";

}

if(bossHpArenaEl){

bossHpArenaEl.textContent =
bossHp + " HP";

}

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
// CAUSAR DANO
// =====================================

function causarDanoBoss(dano){

bossHp -= dano;

if(bossHp < 0){

bossHp = 0;

}

mostrarDano(
dano
);

atualizarBoss();

salvarDados();

if(bossHp <= 0){

matarBoss();

}

}

// =====================================
// TEXTO DE DANO
// =====================================

function mostrarDano(valor){

const dano =
document.createElement(
"div"
);

dano.className =
"danoBoss";

dano.textContent =
"-" + valor;

document.body.appendChild(
dano
);

setTimeout(()=>{

dano.remove();

},1000);

}

// =====================================
// MATAR BOSS
// =====================================

function matarBoss(){

bossesMortos++;

ganharXP(500);

logARES(
"🏆 Boss derrotado!"
);

alert(
"🏆 Você derrotou o Boss da Semana!"
);

proximoBoss();

}

// =====================================
// PRÓXIMO BOSS
// =====================================

function proximoBoss(){

bossAtual++;

if(
bossAtual >= bosses.length
){

bossAtual = 0;

}

localStorage.setItem(
"ares_boss_atual",
bossAtual
);

bossHp =
bosses[bossAtual].hp;

salvarDados();

carregarBoss();

}

// =====================================
// MISSÃO COMPLETA = DANO
// =====================================

document
.querySelectorAll(
".missaoCheck"
)
.forEach(check=>{

check.addEventListener(
"change",
()=>{

if(check.checked){

ganharXP(25);

causarDanoBoss(
250
);

logARES(
"⚔️ Dano causado ao Boss: 250"
);

}

}
);

});
// =====================================
// CALENDÁRIO ARES
// =====================================

const dias =
document.querySelectorAll(
".dia"
);

let diasConcluidos =
JSON.parse(
localStorage.getItem(
"ares_dias"
)
) || [];

// =====================================
// CARREGAR CALENDÁRIO
// =====================================

function carregarCalendario(){

dias.forEach((dia,index)=>{

if(
diasConcluidos.includes(index)
){

dia.classList.add(
"diaConcluido"
);

dia.innerHTML = "✔";

}

dia.onclick = ()=>{

alternarDia(index);

};

});

atualizarStreak();

}

// =====================================
// MARCAR DIA
// =====================================

function alternarDia(index){

if(
diasConcluidos.includes(index)
){

diasConcluidos =
diasConcluidos.filter(
d => d !== index
);

}else{

diasConcluidos.push(index);

ganharXP(100);

causarDanoBoss(500);

totalTreinos++;

logARES(
"🏋️ Treino concluído!"
);

}

localStorage.setItem(
"ares_dias",
JSON.stringify(
diasConcluidos
)
);

carregarCalendario();

atualizarEstatisticas();

}

// =====================================
// STREAK
// =====================================

function atualizarStreak(){

streak =
diasConcluidos.length;

const streakEl =
document.getElementById(
"streakAtual"
);

if(streakEl){

streakEl.textContent =
"🔥 Streak Atual: " +
streak +
" dias";

}

if(streak > Number(
localStorage.getItem(
"ares_maior_streak"
)
) || 0){

localStorage.setItem(
"ares_maior_streak",
streak
);

}

salvarDados();

}

// =====================================
// ESTATÍSTICAS
// =====================================

function atualizarEstatisticas(){

const xpTotal =
document.getElementById(
"xpTotal"
);

const diasAtivos =
document.getElementById(
"diasAtivos"
);

const bossesEl =
document.getElementById(
"bossesMortos"
);

const maiorStreak =
document.getElementById(
"maiorStreak"
);

const totalTreinosEl =
document.getElementById(
"totalTreinos"
);

const nivelAtual =
document.getElementById(
"nivelAtualStat"
);

if(xpTotal){

xpTotal.textContent =
xp;

}

if(diasAtivos){

diasAtivos.textContent =
diasConcluidos.length;

}

if(bossesEl){

bossesEl.textContent =
bossesMortos;

}

if(maiorStreak){

maiorStreak.textContent =
localStorage.getItem(
"ares_maior_streak"
) || 0;

}

if(totalTreinosEl){

totalTreinosEl.textContent =
totalTreinos;

}

if(nivelAtual){

nivelAtual.textContent =
calcularNivel();

}

}

// =====================================
// CONQUISTAS
// =====================================

function verificarConquistas(){

const conquistas =
document.querySelectorAll(
".conquista"
);

if(
xp >= 1000 &&
conquistas[2]
){

conquistas[2]
.classList.remove(
"bloqueada"
);

}

if(
streak >= 7 &&
conquistas[1]
){

conquistas[1]
.classList.remove(
"bloqueada"
);

}

if(
xp >= 2000 &&
conquistas[3]
){

conquistas[3]
.classList.remove(
"bloqueada"
);

}

if(
xp >= 5000 &&
conquistas[4]
){

conquistas[4]
.classList.remove(
"bloqueada"
);

}

if(
xp >= 10000 &&
conquistas[5]
){

conquistas[5]
.classList.remove(
"bloqueada"
);

}

}

// =====================================
// HALL DA FAMA
// =====================================

function atualizarHallDaFama(){

const hallStreak =
document.getElementById(
"hallStreak"
);

if(hallStreak){

hallStreak.textContent =
(
localStorage.getItem(
"ares_maior_streak"
) || 0
)
+ " dias";

}

}

// =====================================
// INICIAR SISTEMA
// =====================================

carregarCalendario();

atualizarXP();

atualizarBoss();

atualizarHallDaFama();

atualizarEstatisticas();

verificarConquistas();

carregarBoss();

logARES(
"🚀 Sistema ARES iniciado."
);
// =====================================
// TREINOS ARES
// =====================================

const treinos = {

segunda:[

{nome:"Supino Reto Barra",series:4,reps:"8-10",carga:"100",video:"https://www.youtube.com/embed/rT7DgCr-3pg"},
{nome:"Supino Inclinado Halter",series:4,reps:"10-12",carga:"34",video:"https://www.youtube.com/embed/DbFgADa2PL8"},
{nome:"Supino Máquina",series:4,reps:"10-12",carga:"100",video:"https://www.youtube.com/embed/rT7DgCr-3pg"},
{nome:"Crucifixo Máquina",series:3,reps:"12-15",carga:"70",video:"https://www.youtube.com/embed/eozdVDA78K0"},
{nome:"Cross Over",series:3,reps:"12-15",carga:"25",video:"https://www.youtube.com/embed/taI4XduLpTk"},
{nome:"Desenvolvimento Máquina",series:4,reps:"10-12",carga:"60",video:"https://www.youtube.com/embed/qEwKCR5JCog"},
{nome:"Tríceps Corda",series:4,reps:"12-15",carga:"35",video:"https://www.youtube.com/embed/vB5OHsJ3EME"},
{nome:"Tríceps Testa",series:3,reps:"10-12",carga:"30",video:"https://www.youtube.com/embed/d_KZxkY_0cM"}

],

terca:[

{nome:"Puxada Frontal",series:4,reps:"8-10",carga:"70",video:"https://www.youtube.com/embed/CAwf7n6Luuc"},
{nome:"Remada Curvada",series:4,reps:"8-10",carga:"80",video:"https://www.youtube.com/embed/vT2GjY_Umpw"},
{nome:"Remada Baixa",series:4,reps:"10-12",carga:"70",video:"https://www.youtube.com/embed/GZbfZ033f74"},
{nome:"Pulldown",series:3,reps:"12-15",carga:"50",video:"https://www.youtube.com/embed/AOj7wR5M4xk"},
{nome:"Face Pull",series:3,reps:"12-15",carga:"35",video:"https://www.youtube.com/embed/eIq5CB9JfKE"},
{nome:"Rosca Direta",series:4,reps:"10-12",carga:"40",video:"https://www.youtube.com/embed/kwG2ipFRgfo"},
{nome:"Rosca Martelo",series:3,reps:"10-12",carga:"20",video:"https://www.youtube.com/embed/zC3nLlEvin4"},
{nome:"Abdominal",series:4,reps:"20",carga:"Peso corporal",video:"https://www.youtube.com/embed/1919eTCoESo"}

],

quarta:[

{nome:"Hip Thrust",series:4,reps:"10",carga:"180",video:"https://www.youtube.com/embed/LM8XHLYJoYs"},
{nome:"Agachamento Livre",series:4,reps:"10",carga:"120",video:"https://www.youtube.com/embed/SW_C1A-rejs"},
{nome:"Stiff",series:4,reps:"10",carga:"80",video:"https://www.youtube.com/embed/CQp7i7Z7W7A"},
{nome:"Mesa Flexora",series:4,reps:"12",carga:"60",video:"https://www.youtube.com/embed/1Tq3QdYUuHs"},
{nome:"Abdutora",series:4,reps:"15",carga:"80",video:"https://www.youtube.com/embed/G_8LItOiZ0Q"},
{nome:"Glúteo Cabo",series:3,reps:"15",carga:"20",video:"https://www.youtube.com/embed/5jJ6kQ6R9L8"},
{nome:"Panturrilha Sentado",series:4,reps:"20",carga:"60",video:"https://www.youtube.com/embed/-M4-G8p8fmc"}

],

quinta:[

{nome:"Leg Press 45",series:4,reps:"10",carga:"240",video:"https://www.youtube.com/embed/IZxyjW7MPJQ"},
{nome:"Hack Squat",series:4,reps:"10",carga:"100",video:"https://www.youtube.com/embed/0tn5K9NlCfo"},
{nome:"Extensora",series:4,reps:"12",carga:"70",video:"https://www.youtube.com/embed/YyvSfVjQeL0"},
{nome:"Afundo",series:3,reps:"12",carga:"20",video:"https://www.youtube.com/embed/QOVaHwm-Q6U"},
{nome:"Cadeira Flexora",series:4,reps:"12",carga:"60",video:"https://www.youtube.com/embed/1Tq3QdYUuHs"},
{nome:"Panturrilha Leg Press",series:4,reps:"20",carga:"140",video:"https://www.youtube.com/embed/-M4-G8p8fmc"}

],

sexta:[

{nome:"Desenvolvimento Halter",series:4,reps:"10",carga:"30",video:"https://www.youtube.com/embed/qEwKCR5JCog"},
{nome:"Elevação Lateral",series:4,reps:"12",carga:"16",video:"https://www.youtube.com/embed/3VcKaXpzqRo"},
{nome:"Elevação Frontal",series:3,reps:"12",carga:"16",video:"https://www.youtube.com/embed/-t7fuZ0KhDA"},
{nome:"Face Pull",series:3,reps:"15",carga:"35",video:"https://www.youtube.com/embed/eIq5CB9JfKE"},
{nome:"Rosca Direta",series:4,reps:"10",carga:"40",video:"https://www.youtube.com/embed/kwG2ipFRgfo"},
{nome:"Rosca Martelo",series:3,reps:"12",carga:"20",video:"https://www.youtube.com/embed/zC3nLlEvin4"},
{nome:"Tríceps Testa",series:3,reps:"12",carga:"30",video:"https://www.youtube.com/embed/d_KZxkY_0cM"},
{nome:"Tríceps Corda",series:3,reps:"15",carga:"35",video:"https://www.youtube.com/embed/vB5OHsJ3EME"}

],

sabado:[

{nome:"Supino Inclinado",series:4,reps:"8-10",carga:"34",video:"https://www.youtube.com/embed/DbFgADa2PL8"},
{nome:"Supino Máquina",series:4,reps:"10-12",carga:"100",video:"https://www.youtube.com/embed/rT7DgCr-3pg"},
{nome:"Cross Over",series:3,reps:"12-15",carga:"25",video:"https://www.youtube.com/embed/taI4XduLpTk"},
{nome:"Crucifixo",series:3,reps:"12-15",carga:"18",video:"https://www.youtube.com/embed/eozdVDA78K0"},
{nome:"Paralela",series:3,reps:"Falha",carga:"Peso corporal",video:"https://www.youtube.com/embed/2z8JmcrW-As"},
{nome:"Tríceps Francês",series:3,reps:"12",carga:"20",video:"https://www.youtube.com/embed/_gsUck-7M74"},
{nome:"Tríceps Corda",series:3,reps:"15",carga:"35",video:"https://www.youtube.com/embed/vB5OHsJ3EME"},
{nome:"Abdominal",series:4,reps:"20",carga:"Peso corporal",video:"https://www.youtube.com/embed/1919eTCoESo"}

]

};

// =====================================
// CARREGAR TREINO
// =====================================

function carregarTreino(){

const seletor =
document.getElementById(
"diaTreino"
);

const tabela =
document.getElementById(
"tabelaTreinoBody"
);

if(!seletor || !tabela) return;

const dia =
seletor.value;

if(!treinos[dia]){

tabela.innerHTML = `
<tr>
<td colspan="6">
Treino não encontrado
</td>
</tr>
`;

return;

}

const treino =
treinos[dia];

tabela.innerHTML = "";

treino.forEach(ex=>{

tabela.innerHTML += `

<tr>

<td>${ex.nome}</td>

<td>${ex.series}</td>

<td>${ex.reps}</td>

<td>

<input
type="number"
placeholder="${ex.carga}">

</td>

<td>

<button
class="btnVideo"
data-video="${ex.video}">

▶ Ver

</button>

</td>

<td>

<input
type="checkbox"
class="checkExercicio">

</td>

</tr>

`;

});

ativarVideos();
ativarChecks();

}
function ativarVideos(){

document
.querySelectorAll(".btnVideo")
.forEach(btn=>{

btn.addEventListener(
"click",
()=>{

const url =
btn.dataset.video;

window.open(
url,
"_blank"
);

});

});

}

// =====================================
// TROCA DE DIA
// =====================================

const diaTreino =
document.getElementById(
"diaTreino"
);

if(diaTreino){

diaTreino.addEventListener(
"change",
carregarTreino
);

}

// =====================================
// PROGRESSO TREINO
// =====================================

function atualizarProgressoTreino(){

const checks =
document.querySelectorAll(
".checkExercicio"
);

const feitos =
document.querySelectorAll(
".checkExercicio:checked"
);

const porcentagem =
checks.length
?
(feitos.length / checks.length) * 100
:
0;

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
Math.round(
porcentagem
)
+ "% concluído";

}

}

// =====================================
// CHECK EXERCÍCIOS
// =====================================

function ativarChecks(){

document
.querySelectorAll(
".checkExercicio"
)
.forEach(check=>{

check.addEventListener(
"change",
()=>{

atualizarProgressoTreino();

if(check.checked){

ganharXP(20);

causarDanoBoss(100);

}

}
);

});

}

// =====================================
// HISTÓRICO
// =====================================

function salvarHistoricoTreino(){

const historico =
JSON.parse(
localStorage.getItem(
"ares_historico"
)
) || [];

historico.unshift({

data:
new Date()
.toLocaleDateString(),

xp:xp,

nivel:
calcularNivel()

});

localStorage.setItem(
"ares_historico",
JSON.stringify(
historico
)
);

renderHistorico();

}

// =====================================
// RENDER HISTÓRICO
// =====================================

function renderHistorico(){

const div =
document.getElementById(
"historicoTreinos"
);

if(!div) return;

const historico =
JSON.parse(
localStorage.getItem(
"ares_historico"
)
) || [];

div.innerHTML = "";

historico
.slice(0,20)
.forEach(item=>{

div.innerHTML += `

<div class="historicoCard">

<h3>
📅 ${item.data}
</h3>

<p>
XP: ${item.xp}
</p>

<p>
Nível: ${item.nivel}
</p>

</div>

`;

});

}

// =====================================
// SALVAR TREINO
// =====================================

const salvarTreinoBtn =
document.getElementById(
"salvarTreino"
);

if(salvarTreinoBtn){

salvarTreinoBtn
.addEventListener(
"click",
()=>{

ganharXP(100);

causarDanoBoss(500);

salvarHistoricoTreino();

logARES(
"🏋️ Treino salvo com sucesso."
);

alert(
"Treino registrado!"
);

}
);

}

// =====================================
// INICIAR TREINOS
// =====================================

carregarTreino();

renderHistorico();
// =====================================
// EVOLUÇÃO FÍSICA
// =====================================

function salvarMedidas(){

const medidas = {

data:
new Date().toLocaleDateString(),

peso:
document.getElementById("peso")?.value || 0,

bf:
document.getElementById("bf")?.value || 0,

peito:
document.getElementById("peito")?.value || 0,

cintura:
document.getElementById("cintura")?.value || 0,

braco:
document.getElementById("braco")?.value || 0,

coxa:
document.getElementById("coxa")?.value || 0

};

const historico =
JSON.parse(
localStorage.getItem(
"ares_medidas"
)
) || [];

historico.push(
medidas
);

localStorage.setItem(
"ares_medidas",
JSON.stringify(
historico
)
);

renderHistoricoMedidas();
renderGraficos();

logARES(
"📏 Medidas corporais atualizadas."
);

}

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
// HISTÓRICO MEDIDAS
// =====================================

function renderHistoricoMedidas(){

const div =
document.getElementById(
"historicoMedidas"
);

if(!div) return;

const historico =
JSON.parse(
localStorage.getItem(
"ares_medidas"
)
) || [];

div.innerHTML = "";

historico
.slice()
.reverse()
.forEach(item=>{

div.innerHTML += `

<div class="historicoCard">

<h3>
📅 ${item.data}
</h3>

<p>⚖️ Peso: ${item.peso} kg</p>

<p>🔥 BF: ${item.bf}%</p>

<p>🏋️ Peito: ${item.peito} cm</p>

<p>📏 Cintura: ${item.cintura} cm</p>

<p>💪 Braço: ${item.braco} cm</p>

<p>🦵 Coxa: ${item.coxa} cm</p>

</div>

`;

});

}

// =====================================
// GRÁFICOS
// =====================================

let graficoPeso;
let graficoBF;

function renderGraficos(){

const historico =
JSON.parse(
localStorage.getItem(
"ares_medidas"
)
) || [];

const labels =
historico.map(
m=>m.data
);

const pesos =
historico.map(
m=>Number(m.peso)
);

const bfs =
historico.map(
m=>Number(m.bf)
);

// PESO

const pesoCanvas =
document.getElementById(
"graficoPeso"
);

if(pesoCanvas){

if(graficoPeso)
graficoPeso.destroy();

graficoPeso =
new Chart(
pesoCanvas,
{
type:"line",
data:{
labels,
datasets:[{
label:"Peso",
data:pesos
}]
}
}
);

}

// BF

const bfCanvas =
document.getElementById(
"graficoBF"
);

if(bfCanvas){

if(graficoBF)
graficoBF.destroy();

graficoBF =
new Chart(
bfCanvas,
{
type:"line",
data:{
labels,
datasets:[{
label:"BF %",
data:bfs
}]
}
}
);

}

}

// =====================================
// UPLOAD DE FOTOS
// =====================================

function carregarFoto(
inputId,
imgId,
storage
){

const input =
document.getElementById(
inputId
);

const img =
document.getElementById(
imgId
);

if(!input || !img) return;

input.addEventListener(
"change",
e=>{

const arquivo =
e.target.files[0];

if(!arquivo) return;

const leitor =
new FileReader();

leitor.onload =
ev=>{

img.src =
ev.target.result;

localStorage.setItem(
storage,
ev.target.result
);

};

leitor.readAsDataURL(
arquivo
);

}
);

const salva =
localStorage.getItem(
storage
);

if(salva){

img.src = salva;

}

}

carregarFoto(
"fotoAntesInput",
"fotoAntes",
"ares_foto_antes"
);

carregarFoto(
"fotoDepoisInput",
"fotoDepois",
"ares_foto_depois"
);

// =====================================
// BACKUP JSON
// =====================================

const exportarBtn =
document.getElementById(
"exportarDados"
);

if(exportarBtn){

exportarBtn.addEventListener(
"click",
()=>{

const dados = {

xp,
bossHp,
streak,

medidas:
JSON.parse(
localStorage.getItem(
"ares_medidas"
)
),

historico:
JSON.parse(
localStorage.getItem(
"ares_historico"
)
)

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
type:"application/json"
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

});
}

// =====================================
// LEVEL UP POPUP
// =====================================

function mostrarLevelUp(){

const popup =
document.getElementById(
"levelUpPopup"
);

const novoNivel =
document.getElementById(
"novoNivel"
);

if(!popup) return;

novoNivel.textContent =
"NÍVEL "
+
calcularNivel();

popup.style.display =
"flex";

setTimeout(()=>{

popup.style.display =
"none";

},3000);

}

// =====================================
// CLASSES RPG
// =====================================

function atualizarClasseRPG(){

const classe =
document.getElementById(
"classe"
);

if(!classe) return;

classe.className = "";

if(xp >= 10000){

classe.classList.add(
"classeDeus"
);

}

else if(xp >= 5000){

classe.classList.add(
"classeTita"
);

}

else if(xp >= 2000){

classe.classList.add(
"classeDiamante"
);

}

}

// =====================================
// METAS AUTOMÁTICAS
// =====================================

function atualizarMetas(){

const pesoAtual =
Number(
document.getElementById(
"peso"
)?.value || 0
);

const bfAtual =
Number(
document.getElementById(
"bf"
)?.value || 0
);

const barraPeso =
document.getElementById(
"barraMetaPeso"
);

const barraBF =
document.getElementById(
"barraMetaBF"
);

if(barraPeso){

const percPeso =
Math.min(
100,
(pesoAtual / 85) * 100
);

barraPeso.style.width =
percPeso + "%";

}

if(barraBF){

const percBF =
Math.min(
100,
(15 / Math.max(bfAtual,1))
*100
);

barraBF.style.width =
percBF + "%";

}

}

// =====================================
// INICIALIZAÇÃO FINAL
// =====================================

renderHistoricoMedidas();

renderGraficos();

atualizarClasseRPG();

atualizarMetas();

logARES(
"⚔️ ARES TRACKER 7.0 ONLINE"
);

logARES(
"👑 Bem-vindo, Daniel."
);

logARES(
"🔥 Projeto ARES iniciado."
);
function ativarVideos(){

document
.querySelectorAll(".btnVideo")
.forEach(btn=>{

btn.addEventListener(
"click",
()=>{

const video =
btn.dataset.video;

window.open(
video,
"videoARES",
"width=900,height=600"
);

});

});

}
function ativarVideos(){

const botoes =
document.querySelectorAll(".btnVideo");

botoes.forEach(btn=>{

btn.onclick = function(){

const video =
this.getAttribute("data-video");

alert(video);

window.open(
video,
"_blank"
);

};

});

}
