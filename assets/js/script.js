

document.addEventListener('DOMContentLoaded', () => {
    // Logic Hamburger Menu
    const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}


// when we click on hamburger icon its close 

const navLink = document.querySelectorAll(".nav-link");

navLink.forEach(n => n.addEventListener("click", closeMenu));

function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}

 // ========================================
    // 2. HIDE HEADER ON SCROLL (Fitur Tambahan)
    // ========================================
    const header = document.getElementById('mainHeader');
    let lastScrollY = window.scrollY;
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const currentScrollY = window.scrollY;
                
                // Pastikan header ada dan scroll sudah lebih dari 100px
                if (header) {
                    if (currentScrollY > lastScrollY && currentScrollY > 100) {
                        // Scroll Ke Bawah -> Sembunyikan Header
                        header.classList.add('hidden');
                        header.classList.remove('visible');
                    } else {
                        // Scroll Ke Atas -> Tampilkan Header
                        header.classList.remove('hidden');
                        header.classList.add('visible');
                    }
                }
                
                lastScrollY = currentScrollY;
                ticking = false;
            });
            ticking = true;
        }
    });
});

    
    
