document.addEventListener('DOMContentLoaded', function() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const secondaryGrid = document.getElementById('secondaryGrid');
    const cards = secondaryGrid.querySelectorAll('.secondary-card');
    
    let currentIndex = 0;
    const totalSets = 2; // 2 grupos de 5 cards
    
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