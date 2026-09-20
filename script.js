const missoes = document.querySelectorAll(".missao");

let xp = Number(localStorage.getItem("ares_xp")) || 1540;
let bossHp = Number(localStorage.getItem("ares_boss")) || 10000;

const xpTexto = document.getElementById("xp");
const hpTexto = document.getElementById("bosshp");
const barraBoss = document.getElementById("bossbar");

function atualizar() {

xpTexto.innerText = xp;

hpTexto.innerText = bossHp;

const porcentagem =
(bossHp / 10000) * 100;

barraBoss.style.width =
porcentagem + "%";

}

missoes.forEach((missao) => {

const checkbox =
missao.querySelector("input");

checkbox.addEventListener(
"change",
() => {

if (checkbox.checked) {

xp += 50;

bossHp -= 250;

if (bossHp <= 0) {

alert(
"🏆 Boss derrotado! +500 XP"
);

xp += 500;

bossHp = 10000;

}

} else {

xp -= 50;

bossHp += 250;

}

localStorage.setItem(
"ares_xp",
xp
);

localStorage.setItem(
"ares_boss",
bossHp
);

atualizar();

}
);

});

atualizar();
