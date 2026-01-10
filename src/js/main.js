/**
 * Main JavaScript for Rita Tomforde Artist Portfolio
 * Handles mobile navigation toggle and smooth scrolling
 */

(function() {
    'use strict';

    /**
     * Mobile Navigation Toggle
     * Handles hamburger menu button interaction
     */
    function initMobileNav() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        if (!hamburger || !navMenu) {
            return;
        }

        // Create overlay element for mobile menu backdrop
        let overlay = document.querySelector('.nav-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'nav-overlay';
            overlay.setAttribute('aria-hidden', 'true');
            document.body.appendChild(overlay);
        }

        /**
         * Toggle menu open/closed state
         */
        function toggleMenu() {
            const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
            const newState = !isExpanded;

            hamburger.setAttribute('aria-expanded', String(newState));
            navMenu.classList.toggle('is-active', newState);
            overlay.classList.toggle('is-active', newState);

            // Prevent body scroll when menu is open
            document.body.style.overflow = newState ? 'hidden' : '';
        }

        /**
         * Close the mobile menu
         */
        function closeMenu() {
            hamburger.setAttribute('aria-expanded', 'false');
            navMenu.classList.remove('is-active');
            overlay.classList.remove('is-active');
            document.body.style.overflow = '';
        }

        // Hamburger button click handler
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            toggleMenu();
        });

        // Close menu when clicking overlay
        overlay.addEventListener('click', closeMenu);

        // Close menu when clicking a nav link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                // Small delay to allow smooth scroll to start
                setTimeout(closeMenu, 100);
            });
        });

        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('is-active')) {
                closeMenu();
                hamburger.focus();
            }
        });

        // Close menu on window resize above mobile breakpoint
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                if (window.innerWidth >= 768 && navMenu.classList.contains('is-active')) {
                    closeMenu();
                }
            }, 100);
        });
    }

    /**
     * Smooth Scroll Enhancement
     * Adds smooth scrolling behavior for anchor links
     */
    function initSmoothScroll() {
        // Check if browser supports smooth scroll natively
        if ('scrollBehavior' in document.documentElement.style) {
            return; // Browser handles it via CSS scroll-behavior: smooth
        }

        // Fallback for older browsers
        document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });

                    // Update URL hash without jumping
                    if (history.pushState) {
                        history.pushState(null, null, targetId);
                    }
                }
            });
        });
    }

    /**
     * Gallery Lightbox
     * Initializes GLightbox for gallery image overlay functionality
     */
    function initGalleryLightbox() {
        if (typeof GLightbox === 'undefined') {
            return;
        }

        GLightbox({
            selector: '.glightbox',
            touchNavigation: true,
            loop: false,
            autoplayVideos: false
        });
    }

    /**
     * Initialize all functionality when DOM is ready
     */
    function init() {
        initMobileNav();
        initSmoothScroll();
        initGalleryLightbox();
    }

    // Run initialization when DOM is fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
