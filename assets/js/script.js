// assets/js/script.js

document.addEventListener('DOMContentLoaded', () => {
    // Logic Hamburger Menu
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("navMenu");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            navMenu.classList.toggle("active");
            
            // Animasi sederhana untuk hamburger lines (opsional)
            const spans = hamburger.querySelectorAll('span');
            spans.forEach(span => span.classList.toggle('active-anim'));
        });

        // Tutup menu saat klik di luar
        document.addEventListener("click", (e) => {
            if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                navMenu.classList.remove("active");
            }
        });
    }
});

    function openCategory(categoryName, btnElement) {
        // 1. Sembunyikan semua konten tab
        const grids = document.getElementsByClassName("topic-grid");
        for (let i = 0; i < grids.length; i++) {
            grids[i].classList.remove("active");
        }

        // 2. Hilangkan status 'active' dari semua tombol
        const tabs = document.getElementsByClassName("tab-btn");
        for (let i = 0; i < tabs.length; i++) {
            tabs[i].classList.remove("active");
        }

        // 3. Tampilkan konten yang dipilih
        document.getElementById(categoryName).classList.add("active");

        // 4. Tambahkan status 'active' ke tombol yang diklik
        btnElement.classList.add("active");
    }
