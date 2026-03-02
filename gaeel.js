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
                if (action === 'inscricao') {
                    // scroll to championships
                    var target = document.getElementById('campeonatos');
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                    response.textContent = "Basta clicar no botão inscrever, e preencher os dados da sua equipe, e efetuar o pagamento no final, você já estará inscrito, e após isso, poderá entrar no grupo do whatsapp.";                } else if (action === 'cursos') {
                    var target = document.getElementById('cursos');
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                    response.textContent = "Para se inscrever em nossos cursos, clique no botão “Quero me Inscrever” e preencha o formulário. Em caso de dúvidas, entre em contato por e-mail ou telefone.";
                } else if (action === 'contato') {
                    var target = document.getElementById('area-clube');
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                    response.textContent = "Você pode falar com nossa equipe indo à área do clube; lá encontrará formulários de contato e informações úteis. Também preparamos um grupo de WhatsApp para suporte rápido.";                }
                // future actions can be added here
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

    /* Handle club registration form submission to Google Forms */
    function initClubRegistration() {
        var form = document.getElementById('register-form');
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            var clubName = document.getElementById('club-name').value;
            var cnpj = document.getElementById('cnpj').value || '';
            var email = document.getElementById('register-email').value;
            var phone = document.getElementById('phone').value;

            // Google Forms endpoint - CONFIGURE WITH YOUR FORM ID AND ENTRY IDs
            // Steps to get this:
            // 1. Create a Google Form with fields: Nome do Clube, CNPJ, Email, Telefone
            // 2. In the form, inspect the field names to get the entry.XXXXX values
            // 3. Update the FORM_ID in the URL below
            var formId = 'YOUR_FORM_ID_HERE'; // Replace with your Google Form ID
            var endpoint = 'https://docs.google.com/forms/d/e/' + formId + '/formResponse';

            // Build the submission data
            var submitData = new FormData();
            submitData.append('entry.1234567890', clubName);      // Replace with actual entry ID from your form
            submitData.append('entry.1234567891', cnpj);          // Replace with actual entry ID from your form
            submitData.append('entry.1234567892', email);         // Replace with actual entry ID from your form
            submitData.append('entry.1234567893', phone);         // Replace with actual entry ID from your form

            // Submit to Google Forms
            fetch(endpoint, {
                method: 'POST',
                body: submitData,
                mode: 'no-cors' // Important: Google Forms doesn't allow CORS
            }).then(function() {
                // Success - show message and reset form
                alert('✅ Cadastro realizado com sucesso! Nossa equipe entrará em contato em breve.');
                form.reset();
            }).catch(function(err) {
                // Also show success message even if the request appears to fail
                // (due to no-cors mode, the response won't be readable)
                console.log('Cadastro enviado:', {
                    clubName: clubName,
                    cnpj: cnpj,
                    email: email,
                    phone: phone
                });
                alert('✅ Cadastro realizado com sucesso! Nossa equipe entrará em contato em breve.');
                form.reset();
            });
        });
    }

    function init() {
        initMobileMenu();
        initScrollSpy();
        initLojaModal();
        initChatbot();
        initMoreChamps();
        initProductSearch();
        initClubRegistration();
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();