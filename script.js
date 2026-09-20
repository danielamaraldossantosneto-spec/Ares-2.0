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

const checkboxes =
document.querySelectorAll(".missao input");

function atualizarTela() {

  xpElemento.textContent =
  `XP Total: ${xp}`;

  bossHpElemento.textContent =
  `${bossHp.toLocaleString()} HP`;

  const porcentagem =
  Math.max((bossHp / 10000) * 100,0);

  bossBarra.style.width =
  porcentagem + "%";

  if (xp >= 5000) {

    document.getElementById("classe")
    .textContent =
    "👑 Semideus";

  } else if (xp >= 3000) {

    document.getElementById("classe")
    .textContent =
    "🏛️ Titã";

  } else if (xp >= 1000) {

    document.getElementById("classe")
    .textContent =
    "🥇 Ouro";

  } else {

    document.getElementById("classe")
    .textContent =
    "🥈 Prata";
  }

  const nivel =
  Math.floor(xp / 100) + 1;

  document.getElementById("nivel")
  .textContent =
  `⚔️ Nível ${nivel}`;
}

checkboxes.forEach((box) => {

  box.addEventListener(
    "change",
    () => {

      if (box.checked) {

        xp += 50;

        bossHp -= 250;

        if (bossHp <= 0) {

          alert(
          "🏆 Boss derrotado! +500 XP"
          );

          xp += 500;

          bossHp = 10000;

          mensagem.textContent =
          "🔥 Você derrotou o Boss da Semana!";
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
        "ares_boss_hp",
        bossHp
      );

      atualizarTela();
    }
  );
});

atualizarTela();
