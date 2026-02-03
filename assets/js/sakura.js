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
    petals: ["*", "+", "·"],
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
  
  // 1. Tentukan sumber (70% dari kanopi pohon)
  const isFromCanopy = isBurst || Math.random() < 0.7;

  // 2. Setting area kanan (fokus di koordinat kanan)
  const config = isFromCanopy 
    ? { 
        // Sangat dekat dengan dahan pohon (kanan bawah)
        offset: Math.random() * 100 - 50, // Rentang -50px sampai 50px dari posisi pohon
        startAttr: "--from-bottom", 
        startVal: "160px" 
      }
    : { 
        // Dari langit, tapi hanya di pojok kanan atas
        offset: Math.random() * 150 - 50, // Tidak melebar jauh ke kiri
        startAttr: "--from-top",    
        startVal: "-20px" 
      };

  // 3. Setup Konten
  petal.className = "sakura";
  petal.textContent = CONFIG.petals[Math.floor(Math.random() * CONFIG.petals.length)];
  
  const size = Math.random() * 4 + 10;
  const delay = Math.random() * 1.5;

  // 4. Terapkan Style
  petal.style.fontSize = `${size}px`;
  petal.style.setProperty("--offset", `${config.offset}px`);
  petal.style.setProperty("--delay", `${delay}s`);
  petal.style.setProperty(config.startAttr, config.startVal);

  // 5. Masukkan ke DOM & Cleanup
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