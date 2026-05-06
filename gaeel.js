// Core interactivity for the GAEEL landing page
// keeps the code minimal, accessible and performant.

(function() {
    'use strict';

    /**
     * Toggles the mobile navigation menu and updates ARIA attributes.
     */
    function initMobileMenu() {
        var btn = document.getElementById('mobile-menu-btn');
        var menu = document.getElementById('mobile-menu');

        if (!btn || !menu) {
            return;
        }

        btn.addEventListener('click', function() {
            var expanded = btn.getAttribute('aria-expanded') === 'true';
            btn.setAttribute('aria-expanded', String(!expanded));
            menu.classList.toggle('hidden');
        });

        // close the menu when any link inside is clicked
        menu.addEventListener('click', function(e) {
            var target = e.target;
            if (target.matches('a') || target.closest('a')) {
                menu.classList.add('hidden');
                btn.setAttribute('aria-expanded', 'false');
            }
        });
    }

    /**
     * Adds a smooth highlight to navbar links based on scroll position.
     */
    function initScrollSpy() {
        var sections = document.querySelectorAll('section[id]');
        var options = { rootMargin: '0px 0px -50% 0px', threshold: 0 };

        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                var id = entry.target.id;
                var link = document.querySelector('.nav-link[href="#' + id + '"]');
                if (link) {
                    if (entry.isIntersecting) {
                        document.querySelectorAll('.nav-link').forEach(function(l) {
                            l.classList.remove('active');
                        });
                        link.classList.add('active');
                    }
                }
            });
        }, options);

        sections.forEach(function(sec) {
            observer.observe(sec);
        });
    }

    /**
     * Initialize lazy attributes for any <img> present (already added in markup)
     * Placeholder for potential JS enhancements.
     */

    /* Loja modal helper for Mercado Livre embed */
    function initLojaModal() {
        var modal = document.getElementById('ml-modal');
        var iframe = document.getElementById('ml-iframe');
        var closeBtn = document.getElementById('modal-close');
        if (!modal || !iframe || !closeBtn) return;

        document.querySelectorAll('.view-item').forEach(function(btn) {
            btn.addEventListener('click', function() {
                var url = btn.getAttribute('data-url');
                if (url) {
                    iframe.src = url;
                    modal.classList.remove('hidden');
                }
            });
        });

        closeBtn.addEventListener('click', function() {
            modal.classList.add('hidden');
            iframe.src = '';
        });

        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.add('hidden');
                iframe.src = '';
            }
        });
    }

    /* Chatbot helper */
    function initChatbot() {
        var toggle = document.getElementById('chatbot-toggle');
        var windowEl = document.getElementById('chatbot-window');
        var response = document.getElementById('chatbot-response');

        if (!toggle || !windowEl) return;

        toggle.addEventListener('click', function(e) {
            e.stopPropagation(); // don't let document handler close immediately
            windowEl.classList.toggle('hidden');
            // clear response when hiding
            if (windowEl.classList.contains('hidden')) {
                response.textContent = '';
                document.removeEventListener('click', outsideClick);
            } else {
                // add listener to close when clicking anywhere else
                document.addEventListener('click', outsideClick);
            }
        });

        function outsideClick(e) {
            // if click is outside the chatbot-window and toggle
            if (!windowEl.contains(e.target) && e.target !== toggle) {
                windowEl.classList.add('hidden');
                response.textContent = '';
                document.removeEventListener('click', outsideClick);
            }
        }

document.querySelectorAll('.chatbot-option').forEach(function(btn) {
    btn.addEventListener('click', function() {
        var action = btn.getAttribute('data-action');
        var target;

        if (action === 'inscricao') {
            target = document.getElementById('campeonatos');
            if (target) target.scrollIntoView({ behavior: 'smooth' });

            response.textContent = "Basta clicar no botão inscrever, preencher os dados da equipe e finalizar o pagamento. Após isso, você poderá entrar no grupo do WhatsApp.";

        } else if (action === 'cursos') {
            target = document.getElementById('cursos');
            if (target) target.scrollIntoView({ behavior: 'smooth' });

            response.textContent = "Para se inscrever em nossos cursos, clique em “Quero me Inscrever” e preencha o formulário. Em caso de dúvidas, entre em contato.";

        } else if (action === 'contato') {
            target = document.getElementById('area-clube');
            if (target) target.scrollIntoView({ behavior: 'smooth' });

            response.textContent = "Você pode falar com nossa equipe na área do clube. Lá você encontra formulários e acesso ao grupo de suporte.";

        } else if (action === 'palestras') {
            target = document.getElementById('palestras');
            if (target) target.scrollIntoView({ behavior: 'smooth' });

            response.textContent = "Nossas palestras são conduzidas por profissionais da área esportiva. Acesse a seção de palestras para ver os temas disponíveis e como participar.";

        } else if (action === 'patrocinios') {
            target = document.getElementById('patrocinios');
            if (target) target.scrollIntoView({ behavior: 'smooth' });

            response.textContent = "Quer ser patrocinador? Basta acessar a seção de patrocínios para conhecer os planos e benefícios de parceria com o GAEEL.";

        }
    });
});
    }

    /* reveal more championships */
    function initMoreChamps() {
        var showBtn = document.getElementById('show-all-champs');
        var hideBtn = document.getElementById('hide-all-champs');
        var section = document.getElementById('more-champions');
        if (!showBtn || !section) return;

        // Show more button
        showBtn.addEventListener('click', function(e) {
            e.preventDefault();
            section.classList.remove('hidden');
            section.scrollIntoView({ behavior: 'smooth' });
            showBtn.style.display = 'none';
        });

        // Hide more button (if exists)
        if (hideBtn) {
            hideBtn.addEventListener('click', function(e) {
                e.preventDefault();
                section.classList.add('hidden');
                showBtn.style.display = '';
                // scroll back to championships section
                var champSection = document.getElementById('campeonatos');
                if (champSection) {
                    champSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    }

    /* Search products in loja */
    function initProductSearch() {
        var searchInput = document.getElementById('search-products');
        var productGrid = document.getElementById('product-grid');
        var productCards = productGrid ? productGrid.querySelectorAll('.product-card') : [];
        
        if (!searchInput || !productCards.length) return;

        searchInput.addEventListener('input', function() {
            var searchTerm = this.value.toLowerCase().trim();
            
            productCards.forEach(function(card) {
                var productName = card.querySelector('.product-name').textContent.toLowerCase();
                
                if (searchTerm === '' || productName.includes(searchTerm)) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    /* club registration removed - no data is collected via forms anymore */
    function initClubRegistration() {
        // Auto-open modal when clicking on any form field
        var formFields = document.querySelectorAll('#register-form input');
        
        formFields.forEach(function(field) {
            field.addEventListener('focus', function() {
                openClubModal();
            });
            
            field.addEventListener('click', function() {
                openClubModal();
            });
        });

        // Modal functionality for club registration
        window.openClubModal = function() {
            var modal = document.getElementById('club-modal');
            if (modal) {
                modal.classList.remove('hidden');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            }
        };

        // Close modal functionality
        var closeBtn = document.getElementById('modal-close');
        var modal = document.getElementById('club-modal');
        
        if (closeBtn && modal) {
            closeBtn.addEventListener('click', function() {
                modal.classList.add('hidden');
                document.body.style.overflow = ''; // Restore scrolling
            });

            // Close modal when clicking outside
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    modal.classList.add('hidden');
                    document.body.style.overflow = ''; // Restore scrolling
                }
            });
        }
    }

    /* Sponsor registration modal */
    function initSponsorRegistration() {
        // Modal functionality for sponsor registration
        window.openSponsorModal = function() {
            var modal = document.getElementById('sponsor-modal');
            if (modal) {
                modal.classList.remove('hidden');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            }
        };

        // Close modal functionality
        var closeBtn = document.getElementById('sponsor-modal-close');
        var modal = document.getElementById('sponsor-modal');
        
        if (closeBtn && modal) {
            closeBtn.addEventListener('click', function() {
                modal.classList.add('hidden');
                document.body.style.overflow = ''; // Restore scrolling
            });

            // Close modal when clicking outside
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    modal.classList.add('hidden');
                    document.body.style.overflow = ''; // Restore scrolling
                }
            });
        }
    }

    function init() {
        initMobileMenu();
        initScrollSpy();
        initLojaModal();
        initChatbot();
        initMoreChamps();
        initProductSearch();
        initClubRegistration();
        initSponsorRegistration();
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();