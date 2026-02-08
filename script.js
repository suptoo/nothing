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
            setTimeout(() => preloader.classList.add('hidden'), 1500);
        };

        if (document.readyState === 'complete') {
            hidePreloader();
        } else {
            window.addEventListener('load', hidePreloader);
        }

        setTimeout(() => preloader.classList.add('hidden'), 4000);
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
        const sariPhoto = document.getElementById('sariPhoto');
        const sparkleBurst = document.getElementById('sparkleBurst');
        const colorDots = document.querySelectorAll('.color-dots .dot');
        const sariGlow = document.querySelector('.sari-glow');

        if (!sariDisplay || !sariPhoto || colorDots.length === 0) return;

        let currentIndex = 0;
        let isAnimating = false; // Lock to prevent overlapping animations
        const isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

        // PRELOAD all sari images so they switch instantly
        const preloadedImages = {};
        colorDots.forEach(dot => {
            const src = dot.getAttribute('data-img');
            if (src) {
                const img = new Image();
                img.src = src;
                preloadedImages[src] = img;
            }
        });

        // Set initial transition on the photo
        sariPhoto.style.transition = 'opacity 0.3s ease, transform 0.35s cubic-bezier(0.34,1.56,0.64,1), filter 0.3s ease';

        function changeSari(index) {
            const dot = colorDots[index];
            if (!dot || index === currentIndex || isAnimating) return;

            isAnimating = true; // LOCK animation

            const imgSrc = dot.getAttribute('data-img');
            const color = getComputedStyle(dot).getPropertyValue('--dot-color').trim() || '#e91e63';
            const wrapper = document.querySelector('.sari-photo-wrapper');

            // Add magic swirl class
            if (wrapper) wrapper.classList.add('magic-changing');

            // Phase 1: Fade out current photo
            sariPhoto.style.opacity = '0';
            sariPhoto.style.transform = 'scale(0.85) rotate(4deg)';
            sariPhoto.style.filter = 'brightness(1.8) blur(3px)';

            // Flash the glow with the new color
            if (sariGlow) {
                sariGlow.style.transition = 'all 0.2s ease';
                sariGlow.style.opacity = '1';
                sariGlow.style.transform = 'scale(1.5)';
                sariGlow.style.background = `radial-gradient(circle, ${color} 0%, transparent 70%)`;
            }

            // Particles (fewer on mobile)
            createMagicRing(color);

            // Phase 2: Swap image after fade-out, then fade in
            setTimeout(() => {
                // Use preloaded image - instant switch
                sariPhoto.src = imgSrc;

                // Small delay to let browser paint the new image
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        // Fade in with bounce
                        sariPhoto.style.opacity = '1';
                        sariPhoto.style.transform = 'scale(1.05) rotate(-1deg)';
                        sariPhoto.style.filter = 'brightness(1.1) blur(0px)';

                        // Glow settles
                        if (sariGlow) {
                            sariGlow.style.transition = 'all 0.5s ease';
                            sariGlow.style.opacity = '0.5';
                            sariGlow.style.transform = 'scale(1)';
                        }

                        // Phase 3: Settle into final position
                        setTimeout(() => {
                            sariPhoto.style.filter = 'none';
                            sariPhoto.style.transform = 'scale(1) rotate(0deg)';
                            if (wrapper) wrapper.classList.remove('magic-changing');
                            isAnimating = false; // UNLOCK
                        }, 300);
                    });
                });
            }, 300);

            // Update active dot with pop effect
            colorDots.forEach((d, i) => {
                d.classList.toggle('active', i === index);
                if (i === index) {
                    d.style.transform = 'scale(1.5)';
                    setTimeout(() => { d.style.transform = ''; }, 300);
                }
            });

            // Create sparkle burst
            createSparkleBurst();

            // Floating emoji shower (skip on mobile to reduce lag)
            if (!isMobile) {
                createEmojiShower();
            }

            // Haptic feedback
            if (navigator.vibrate) {
                navigator.vibrate([15, 50, 25]);
            }

            currentIndex = index;
        }

        // Magic ring particles around the sari photo
        function createMagicRing(color) {
            const display = sariDisplay.getBoundingClientRect();
            const cx = display.left + display.width / 2;
            const cy = display.top + display.height / 2;
            const radius = Math.max(display.width, display.height) / 2 + 20;
            const count = isMobile ? 8 : 16;

            for (let i = 0; i < count; i++) {
                const angle = (i / count) * Math.PI * 2;
                const particle = document.createElement('div');
                const x = cx + Math.cos(angle) * radius;
                const y = cy + Math.sin(angle) * radius;
                const dx = Math.cos(angle) * 40;
                const dy = Math.sin(angle) * 40;

                particle.style.cssText = `
                    position: fixed; left: ${x}px; top: ${y}px;
                    width: 6px; height: 6px; border-radius: 50%;
                    background: ${color}; pointer-events: none;
                    z-index: 9999; box-shadow: 0 0 8px ${color};
                    animation: magic-particle 0.6s ease-out forwards;
                    --dx: ${dx}px; --dy: ${dy}px;
                `;
                document.body.appendChild(particle);
                setTimeout(() => particle.remove(), 700);
            }
        }

        // Emoji shower effect
        function createEmojiShower() {
            const emojis = ['✨', '🌟', '💫', '⭐', '🥻', '💖', '🔮', '🪄'];
            const display = sariDisplay.getBoundingClientRect();

            for (let i = 0; i < 8; i++) {
                const emoji = document.createElement('div');
                emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
                const x = display.left + Math.random() * display.width;
                const startY = display.top - 20;

                emoji.style.cssText = `
                    position: fixed; left: ${x}px; top: ${startY}px;
                    pointer-events: none; font-size: ${1 + Math.random() * 0.8}rem;
                    z-index: 9999; opacity: 1;
                    animation: emoji-fall ${0.8 + Math.random() * 0.6}s ease-in forwards;
                    animation-delay: ${i * 0.06}s;
                `;
                document.body.appendChild(emoji);
                setTimeout(() => emoji.remove(), 1600);
            }
        }

        function createSparkleBurst() {
            if (!sparkleBurst) return;

            sparkleBurst.innerHTML = '';

            const sparkles = ['✨', '⭐', '💫', '🌟', '💖', '🥻'];
            const numSparkles = 12;

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

            setTimeout(() => {
                sparkleBurst.innerHTML = '';
            }, 1000);
        }

        // Click on photo to cycle saris
        sariDisplay.addEventListener('click', (e) => {
            // Don't cycle if clicking on dots
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
