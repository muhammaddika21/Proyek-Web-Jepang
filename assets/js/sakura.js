// assets/js/sakura.js
document.addEventListener("DOMContentLoaded", () => {
  const elements = {
    container: document.querySelector(".sakura-container"),
    footer: document.querySelector("footer"),
    tree: document.querySelector(".pixel-sakura")
  };

  // Guard clause jika elemen tidak ditemukan
  if (!elements.container || !elements.footer || !elements.tree) return;

  const CONFIG = {
    petals: ["*", "·"],
    normalRate: 700,
    fastRate: 200,
    normalSpeed: "7s",
    fastSpeed: "5s"
  };

  let spawnInterval = null;

  /**
   * Fungsi untuk membuat satu kelopak sakura
   * @param {boolean} isBurst - Apakah ini bagian dari efek burst (dari kanopi saja)
   */
const spawnSakura = (isBurst = false) => {
  const petal = document.createElement("span");
  
  // Probabilitas: 70% dari dahan pohon, 30% dari pojok kanan atas
  const isFromTree = isBurst || Math.random() < 0.7;

  let spawnTop, spawnRight;

  if (isFromTree) {
    // AREA POHON (Sekitar dahan)
    spawnRight = Math.random() * 120 + 40; 
    spawnTop = Math.random() * 60 + 10;    
  } else {
    // AREA POJOK KANAN (Langit)
    spawnRight = Math.random() * 40 - 20;  
    spawnTop = -20;                        
  }

  // --- PENYESUAIAN WARNA AGAR MIRIP POHON ---
  const colors = [
    "#fbd0f0", // Pink sangat muda
    "#f7b6e4", // Pink standar pohon
    "#ffb3ba", // Sakura pink (variabel)
    "#fdbaef", // Pink cerah
    "#f4b6e2", // Pink lembut
    "#ffd4f7"  // Pink dahan atas
  ];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  petal.className = "sakura";
  petal.textContent = CONFIG.petals[Math.floor(Math.random() * CONFIG.petals.length)];
  
  const size = Math.random() * 5 + 10;
  const delay = Math.random() * 1;

  petal.style.fontSize = `${size}px`;
  petal.style.color = randomColor; // Set warna acak ke elemen
  petal.style.setProperty("--start-right", `${spawnRight}px`);
  petal.style.setProperty("--start-top", `${spawnTop}px`);
  petal.style.setProperty("--delay", `${delay}s`);

  elements.container.appendChild(petal);
  
  petal.addEventListener("animationend", () => petal.remove(), { once: true });
}; 
/**
   * Mengatur kecepatan produksi sakura
   */
  const setSpawnRate = (rate) => {
    if (spawnInterval) clearInterval(spawnInterval);
    spawnInterval = setInterval(() => spawnSakura(), rate);
  };

  /**
   * Efek ledakan kelopak bunga
   */
  const burst = (count = 8) => {
    for (let i = 0; i < count; i++) {
      // Delay sedikit antar kelopak dalam burst agar lebih alami
      setTimeout(() => spawnSakura(true), i * 50);
    }
  };

  /**
   * Handler untuk interaksi (Hover/Touch)
   */
  const handleInteractionStart = (e) => {
    // Hindari trigger ganda pada mobile (touch + mouse)
    if (e.type === 'touchstart') e.preventDefault(); 
    
    burst(10);
    elements.footer.style.setProperty("--spawn-speed", CONFIG.fastSpeed);
    setSpawnRate(CONFIG.fastRate);
  };

  const handleInteractionEnd = () => {
    elements.footer.style.setProperty("--spawn-speed", CONFIG.normalSpeed);
    setSpawnRate(CONFIG.normalRate);
  };

  // Event Listeners
  elements.tree.addEventListener("mouseenter", handleInteractionStart);
  elements.tree.addEventListener("mouseleave", handleInteractionEnd);
  
  // Mobile Support
  elements.tree.addEventListener("touchstart", handleInteractionStart, { passive: false });
  elements.tree.addEventListener("touchend", handleInteractionEnd);

  // Jalankan siklus awal
  setSpawnRate(CONFIG.normalRate);
});