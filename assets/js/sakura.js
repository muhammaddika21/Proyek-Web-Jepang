const container = document.querySelector(".sakura-container");

function createSakura() {
  const sakura = document.createElement("span");
  sakura.className = "sakura";
  sakura.textContent = "🌸";

  // posisi acak
  sakura.style.left = Math.random() * 100 + "%";

  // ukuran pixel acak
  sakura.style.fontSize = 8 + Math.random() * 10 + "px";

  // durasi jatuh
  const duration = 6 + Math.random() * 6;
  sakura.style.animationDuration = `${duration}s, 3s`;

  container.appendChild(sakura);

  // hapus setelah jatuh
  setTimeout(() => {
    sakura.remove();
  }, duration * 1000);
}

// spawn tiap 700ms
setInterval(createSakura, 700);
