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
     * Simple tab switching for the club area forms.
     */
    function initFormTabs() {
        var tabs = document.querySelectorAll('.tab-btn');
        if (!tabs.length) return;

        tabs.forEach(function(btn) {
            btn.addEventListener('click', function() {
                var target = btn.dataset.tab;
                tabs.forEach(function(b) { b.classList.remove('active'); });
                document.querySelectorAll('.tab-content').forEach(function(c) {
                    c.classList.remove('active');
                });

                btn.classList.add('active');
                var form = document.getElementById(target + '-form');
                if (form) {
                    form.classList.add('active');
                }
            });
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
    function init() {
        initMobileMenu();
        initFormTabs();
        initScrollSpy();
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();