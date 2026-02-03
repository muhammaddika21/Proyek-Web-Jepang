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
  
  // 1. Probabilitas: 70% dari kanopi (atau 100% jika burst), 30% dari langit
  const isFromCanopy = isBurst || Math.random() < 0.7;

  // 2. Logika Koordinat:
  // Nilai 'right' dasar di CSS adalah area pohon (8% + 80px).
  // Agar muncul di pojok kanan (tepi layar), offset harus bernilai negatif kuat.
  const config = isFromCanopy 
    ? { 
        // Fokus di area dahan pohon
        offset: Math.random() * 100 - 50, 
        startAttr: "--from-bottom", 
        startVal: "180px" 
      }
    : { 
        // Pojok kanan atas footer (Sky)
        // Kita geser jauh ke kanan dengan nilai negatif (-150px sampai -50px)
        offset: Math.random() * 100 - 160, 
        startAttr: "--from-top",    
        startVal: "-20px" 
      };

  // 3. Setup Konten & Karakter
  petal.className = "sakura";
  petal.textContent = CONFIG.petals[Math.floor(Math.random() * CONFIG.petals.length)];
  
  const size = Math.random() * 4 + 10;
  const delay = Math.random() * 1.5;

  // 4. Injeksi Variabel CSS
  petal.style.fontSize = `${size}px`;
  petal.style.setProperty("--offset", `${config.offset}px`);
  petal.style.setProperty("--delay", `${delay}s`);
  petal.style.setProperty(config.startAttr, config.startVal);

  // 5. DOM Injection & Cleanup
  elements.container.appendChild(petal);
  
  // Menggunakan 'animationend' karena kita sudah mengubah 'infinite' jadi 'forwards' di CSS
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