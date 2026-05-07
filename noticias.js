document.addEventListener('DOMContentLoaded', function() {
    // MENU HAMBURGUER
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    hamburgerBtn.addEventListener('click', function() {
        hamburgerBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });
    
    // Fechar menu ao clicar em item
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', function() {
            hamburgerBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });
    
    // Fechar menu ao clicar fora
    document.addEventListener('click', function(e) {
        if (!mobileMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
            hamburgerBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    });

    // CAROUSEL (manter funcionalidade anterior)
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const secondaryGrid = document.getElementById('secondaryGrid');
    const cards = secondaryGrid.querySelectorAll('.secondary-card');
    
    let currentIndex = 0;
    const totalSets = 2;
    
    nextBtn.addEventListener('click', function() {
        if (currentIndex < totalSets - 1) {
            currentIndex++;
            updateCarousel();
        }
    });
    
    prevBtn.addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });
    
    function updateCarousel() {
        cards.forEach((card, index) => {
            if (index < currentIndex * 5 || index >= (currentIndex + 1) * 5) {
                card.classList.add('hidden');
            } else {
                card.classList.remove('hidden');
            }
        });
    }
});
document.addEventListener('DOMContentLoaded', function() {
   document.addEventListener('DOMContentLoaded', function() {
    // MENU MOBILE
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
    });
    
    // Fechar menu ao clicar link
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    });

    // CAROUSEL
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const cards = document.querySelectorAll('.secondary-card');
    let currentIndex = 0;
    const totalSets = 2;

    nextBtn.addEventListener('click', () => {
        if (currentIndex < totalSets - 1) {
            currentIndex++;
            updateCarousel();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    function updateCarousel() {
        cards.forEach((card, index) => {
            if (index < currentIndex * 5 || index >= (currentIndex + 1) * 5) {
                card.classList.add('hidden');
            } else {
                card.classList.remove('hidden');
            }
        });
    }
});

    // CAROUSEL
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const cards = document.querySelectorAll('.secondary-card');
    let currentIndex = 0;
    const totalSets = 2;

    nextBtn.addEventListener('click', () => {
        if (currentIndex < totalSets - 1) {
            currentIndex++;
            updateCarousel();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    function updateCarousel() {
        cards.forEach((card, index) => {
            if (index < currentIndex * 5 || index >= (currentIndex + 1) * 5) {
                card.classList.add('hidden');
            } else {
                card.classList.remove('hidden');
            }
        });
    }
});