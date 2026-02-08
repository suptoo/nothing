// ========================================
// SURPRISE WEBSITE - MAGIC EDITION
// Sari Color Changer + Photo/Sketch Toggle
// ========================================

(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', init);

    function init() {
        try {
            initPreloader();
            initFloatingElements();
            initEnterButton();
            initPhotoSketchCards();
            initModal();
            initAOSAnimations();
            initSariMagic();
            initCursorSparkle();
            consoleEasterEgg();
        } catch (error) {
            console.error('Initialization error:', error);
        }
    }

    // ========================================
    // PRELOADER
    // ========================================
    function initPreloader() {
        const preloader = document.getElementById('preloader');
        if (!preloader) return;

        const hidePreloader = () => {
            setTimeout(() => preloader.classList.add('hidden'), 800);
        };

        if (document.readyState === 'complete') {
            hidePreloader();
        } else {
            window.addEventListener('load', hidePreloader);
        }

        setTimeout(() => preloader.classList.add('hidden'), 3000);
    }

    // ========================================
    // FLOATING ELEMENTS
    // ========================================
    function initFloatingElements() {
        const container = document.getElementById('floatingElements');
        if (!container) return;

        const elements = ['⭐', '✨', '💫', '🌟', '✦', '🦋', '🌸', '💕'];
        const maxElements = 12;
        let activeElements = 0;

        function createFloatingElement() {
            if (activeElements >= maxElements) return;

            const el = document.createElement('div');
            el.className = 'floating-element';
            el.textContent = elements[Math.floor(Math.random() * elements.length)];
            el.style.left = Math.random() * 100 + '%';
            el.style.animationDuration = (12 + Math.random() * 8) + 's';
            el.style.animationDelay = Math.random() * 3 + 's';
            el.style.fontSize = (1 + Math.random() * 1.2) + 'rem';

            container.appendChild(el);
            activeElements++;

            const duration = parseFloat(el.style.animationDuration) * 1000;
            setTimeout(() => {
                if (el.parentNode) {
                    el.remove();
                    activeElements--;
                }
            }, duration);
        }

        for (let i = 0; i < 8; i++) {
            setTimeout(createFloatingElement, i * 400);
        }

        setInterval(createFloatingElement, 2500);
    }

    // ========================================
    // ENTER BUTTON
    // ========================================
    function initEnterButton() {
        const enterBtn = document.getElementById('enterBtn');
        const landing = document.getElementById('landing');
        const mainContent = document.getElementById('mainContent');

        if (!enterBtn || !landing || !mainContent) return;

        enterBtn.addEventListener('click', () => {
            enterBtn.disabled = true;
            enterBtn.style.pointerEvents = 'none';

            landing.style.opacity = '0';
            landing.style.transform = 'scale(1.05)';
            landing.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';

            setTimeout(() => {
                landing.style.display = 'none';
                mainContent.classList.add('visible');

                requestAnimationFrame(() => triggerAOSAnimations());
                window.scrollTo({ top: 0, behavior: 'instant' });
            }, 800);
        });
    }

    // ========================================
    // PHOTO/SKETCH TOGGLE CARDS
    // ========================================
    function initPhotoSketchCards() {
        const cards = document.querySelectorAll('.photo-sketch-card');

        cards.forEach(card => {
            const overlay = card.querySelector('.overlay-toggle');
            const photoImg = card.querySelector('.photo-img');
            const sketchImg = card.querySelector('.sketch-img');
            const compliment = card.querySelector('.photo-compliment');

            if (!overlay || !photoImg || !sketchImg) return;

            let showingSketch = false;

            overlay.addEventListener('click', () => {
                showingSketch = !showingSketch;

                if (showingSketch) {
                    // Show sketch
                    photoImg.classList.remove('active');
                    sketchImg.classList.add('active');
                    overlay.textContent = '📷 Photo';
                    overlay.classList.add('showing-sketch');
                    if (compliment) compliment.style.opacity = '0';
                } else {
                    // Show photo
                    sketchImg.classList.remove('active');
                    photoImg.classList.add('active');
                    overlay.textContent = '✏️ Sketch';
                    overlay.classList.remove('showing-sketch');
                    if (compliment) compliment.style.opacity = '1';
                }

                // Haptic feedback
                if (navigator.vibrate) {
                    navigator.vibrate(15);
                }

                // Sparkle effect
                createCardSparkles(card);
            });
        });
    }

    function createCardSparkles(card) {
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const sparkles = ['✨', '⭐', '💫', '✏️'];

        for (let i = 0; i < 5; i++) {
            const sparkle = document.createElement('div');
            sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
            sparkle.style.cssText = `
                position: fixed;
                left: ${centerX + (Math.random() - 0.5) * 80}px;
                top: ${centerY + (Math.random() - 0.5) * 80}px;
                pointer-events: none;
                font-size: 1.2rem;
                z-index: 9999;
                animation: sparkle-pop 0.6s ease-out forwards;
            `;
            document.body.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 600);
        }
    }

    // ========================================
    // PHOTO MODAL
    // ========================================
    function initModal() {
        const modal = document.getElementById('photoModal');
        const modalImage = document.getElementById('modalImage');
        const modalClose = document.getElementById('modalClose');

        if (!modal || !modalImage) return;

        function closeModal() {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }

        if (modalClose) modalClose.addEventListener('click', closeModal);

        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        document.addEventListener('keydown', (e) => {
            if (!modal.classList.contains('active')) return;
            if (e.key === 'Escape') closeModal();
        });
    }

    // ========================================
    // AOS ANIMATIONS
    // ========================================
    function initAOSAnimations() { }

    function triggerAOSAnimations() {
        const aosElements = document.querySelectorAll('[data-aos]');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = parseInt(entry.target.getAttribute('data-aos-delay')) || 0;
                    setTimeout(() => entry.target.classList.add('aos-animate'), delay);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        aosElements.forEach(el => observer.observe(el));
    }

    // ========================================
    // MAGIC SARI COLOR CHANGER ✨
    // Uses actual different sari photos
    // ========================================
    function initSariMagic() {
        const sariDisplay = document.getElementById('sariDisplay');
        const sariPhotos = document.querySelectorAll('.sari-photo');
        const sparkleBurst = document.getElementById('sparkleBurst');
        const colorDots = document.querySelectorAll('.color-dots .dot');
        const sariGlow = document.querySelector('.sari-glow');

        if (!sariDisplay || sariPhotos.length === 0 || colorDots.length === 0) return;

        let currentIndex = 0;
        let isAnimating = false;

        function changeSari(index) {
            if (index === currentIndex || isAnimating) return;
            if (index < 0 || index >= sariPhotos.length) return;

            isAnimating = true;

            const color = getComputedStyle(colorDots[index]).getPropertyValue('--dot-color').trim() || '#e91e63';

            // Flash the glow with the new color
            if (sariGlow) {
                sariGlow.style.transition = 'all 0.2s ease';
                sariGlow.style.opacity = '1';
                sariGlow.style.transform = 'scale(1.5)';
                sariGlow.style.background = `radial-gradient(circle, ${color} 0%, transparent 70%)`;
            }

            // Hide current photo, show new one
            sariPhotos[currentIndex].classList.remove('active');
            sariPhotos[index].classList.add('active');

            // Update active dot
            colorDots.forEach((d, i) => {
                d.classList.toggle('active', i === index);
            });

            // Glow settles after a moment
            setTimeout(() => {
                if (sariGlow) {
                    sariGlow.style.transition = 'all 0.5s ease';
                    sariGlow.style.opacity = '0.5';
                    sariGlow.style.transform = 'scale(1)';
                }
                isAnimating = false;
            }, 150);

            // Sparkle burst
            createSparkleBurst();

            // Haptic feedback
            if (navigator.vibrate) {
                navigator.vibrate([15, 50, 25]);
            }

            currentIndex = index;
        }

        function createSparkleBurst() {
            if (!sparkleBurst) return;
            sparkleBurst.innerHTML = '';

            const sparkles = ['✨', '⭐', '💫', '🌟', '💖', '🥻'];
            const numSparkles = 10;

            for (let i = 0; i < numSparkles; i++) {
                const sparkle = document.createElement('div');
                sparkle.className = 'sparkle';
                sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];

                const angle = (i / numSparkles) * Math.PI * 2;
                const distance = 40 + Math.random() * 50;
                const x = Math.cos(angle) * distance + 50;
                const y = Math.sin(angle) * distance + 50;

                sparkle.style.left = x + '%';
                sparkle.style.top = y + '%';
                sparkle.style.animationDelay = (i * 0.03) + 's';

                sparkleBurst.appendChild(sparkle);
            }

            setTimeout(() => { sparkleBurst.innerHTML = ''; }, 1000);
        }

        // Click on photo to cycle saris
        sariDisplay.addEventListener('click', (e) => {
            if (e.target.classList.contains('dot')) return;
            const nextIndex = (currentIndex + 1) % colorDots.length;
            changeSari(nextIndex);
        });

        // Click on color dots
        colorDots.forEach((dot, index) => {
            dot.addEventListener('click', (e) => {
                e.stopPropagation();
                changeSari(index);
            });
        });
    }

    // ========================================
    // CURSOR SPARKLE (Desktop Only)
    // ========================================
    function initCursorSparkle() {
        if ('ontouchstart' in window) return;

        let lastSparkle = 0;
        const throttle = 100;

        document.addEventListener('mousemove', (e) => {
            const now = Date.now();
            if (now - lastSparkle < throttle) return;
            if (Math.random() > 0.92) {
                createSparkle(e.clientX, e.clientY);
                lastSparkle = now;
            }
        });
    }

    function createSparkle(x, y) {
        const sparkle = document.createElement('div');
        sparkle.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            font-size: 0.9rem;
            z-index: 9998;
            animation: sparkle-fade 0.8s ease-out forwards;
        `;
        sparkle.textContent = '✨';
        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 800);
    }

    // Add keyframe animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes sparkle-fade {
            0% { opacity: 1; transform: scale(1) translateY(0); }
            100% { opacity: 0; transform: scale(0) translateY(-15px); }
        }
        @keyframes sparkle-pop {
            0% { opacity: 1; transform: scale(0); }
            50% { transform: scale(1.2); }
            100% { opacity: 0; transform: scale(0.8) translateY(-30px); }
        }
        @keyframes fadeInUp {
            0% { opacity: 0; transform: translateX(-50%) translateY(10px); }
            100% { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        @keyframes magic-particle {
            0% { opacity: 1; transform: translate(0, 0) scale(1); }
            100% { opacity: 0; transform: translate(var(--dx), var(--dy)) scale(0); }
        }
        @keyframes emoji-fall {
            0% { opacity: 0; transform: translateY(0) scale(0.3) rotate(0deg); }
            20% { opacity: 1; transform: translateY(10px) scale(1.1) rotate(20deg); }
            100% { opacity: 0; transform: translateY(120px) scale(0.5) rotate(-30deg); }
        }
        .magic-changing {
            box-shadow: 0 0 60px rgba(233, 30, 99, 0.6), 0 0 120px rgba(233, 30, 99, 0.3) !important;
        }
    `;
    document.head.appendChild(style);

    // ========================================
    // SMOOTH SCROLL
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ========================================
    // CONSOLE EASTER EGG
    // ========================================
    function consoleEasterEgg() {
        console.log(`
%c✨ Magic Website ✨
%c🥻 Tap sari to see different colors!
%c📸 Click Sketch button to see drawings!
%cMade with love 💕
        `,
            'font-size: 20px; color: #e91e63; font-weight: bold;',
            'font-size: 14px; color: #9c27b0;',
            'font-size: 14px; color: #2196f3;',
            'font-size: 12px; color: #ff758c;'
        );
    }

})();
