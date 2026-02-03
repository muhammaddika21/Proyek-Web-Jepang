// assets/js/sakura.js
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".sakura-container");
  const footer = document.querySelector("footer");
  const sakuraTree = document.querySelector(".pixel-sakura");

  if (!container || !footer || !sakuraTree) return;

  // Karakter pixel mini
  const PETALS = ["*", "+", "·"];
  let spawnRate = 700;
  let interval;

function spawnSakura() {
  const petal = document.createElement("span");
  petal.className = "sakura";
  const size = Math.random() * 4 + 10;
  petal.style.fontSize = `${size}px`;
  petal.textContent =
    PETALS[Math.floor(Math.random() * PETALS.length)];

  const offset =
  Math.random() < 0.7
    ? Math.random() * 60 - 30   // kanopi
    : Math.random() * 120 - 60; // dari atas
  const delay = Math.random() * 1.5;

  petal.style.setProperty("--offset", `${offset}px`);
  petal.style.setProperty("--delay", `${delay}s`);

  if (Math.random() < 0.7) {
    // Dari kanopi 🌸
    petal.style.setProperty("--from-bottom", "150px");
    petal.style.removeProperty("--from-top");
  } else {
    // Dari atas 🍃
    petal.style.setProperty("--from-top", "-12px");
    petal.style.removeProperty("--from-bottom");
  }

  container.appendChild(petal);

  const fallDuration =
    parseFloat(
      getComputedStyle(footer).getPropertyValue("--spawn-speed")
    ) * 1000;

  setTimeout(() => petal.remove(), fallDuration + delay * 1000);
}
function startSpawn(rate) {
    clearInterval(interval);
    interval = setInterval(spawnSakura, rate);
  }
  // Normal flow
   startSpawn(spawnRate);
function setFallSpeed(speed) {
  footer.style.setProperty("--spawn-speed", speed);
}
function burst(count = 6) {
  for (let i = 0; i < count; i++) {
    spawnSakura();
  }
}

 sakuraTree.addEventListener("mouseenter", () => {
  burst(8);
  setFallSpeed("5s");
  startSpawn(220);
});

sakuraTree.addEventListener("mouseleave", () => {
  setFallSpeed("7s");
  startSpawn(700);
});

let touching = false;

sakuraTree.addEventListener("touchstart", () => {
  if (touching) return;
  burst(6);
  touching = true;
  setFallSpeed("5s");
  startSpawn(220);
});

sakuraTree.addEventListener("touchend", () => {
  touching = false;
  setFallSpeed("7s");
  startSpawn(700);
});

});
