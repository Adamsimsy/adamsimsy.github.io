// AdamTheme JavaScript - Modern Blog Theme
(function() {
    'use strict';

    // Mobile menu functionality
    function initMobileMenu() {
        const navTrigger = document.getElementById('nav-trigger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (navTrigger && navMenu) {
            // Close menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!e.target.closest('.site-nav') && navTrigger.checked) {
                    navTrigger.checked = false;
                }
            });

            // Close menu when pressing escape
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && navTrigger.checked) {
                    navTrigger.checked = false;
                }
            });

            // Accessibility improvements
            navTrigger.addEventListener('change', function() {
                navMenu.setAttribute('aria-hidden', !this.checked);
            });
        }
    }

    // Smooth scrolling for anchor links
    function initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const target = document.getElementById(targetId);
                
                if (target) {
                    const headerHeight = document.querySelector('.site-header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Reading progress indicator for posts
    function initReadingProgress() {
        const postContent = document.querySelector('.post-content');
        if (!postContent) return;

        // Create progress bar
        const progressBar = document.createElement('div');
        progressBar.className = 'reading-progress';
        progressBar.innerHTML = '<div class="reading-progress-fill"></div>';
        document.body.appendChild(progressBar);

        // Add CSS for progress bar
        const style = document.createElement('style');
        style.textContent = `
            .reading-progress {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 3px;
                background: rgba(0,0,0,0.1);
                z-index: 1001;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            .reading-progress.visible {
                opacity: 1;
            }
            .reading-progress-fill {
                height: 100%;
                background: linear-gradient(90deg, #667eea, #764ba2);
                width: 0%;
                transition: width 0.1s ease;
            }
        `;
        document.head.appendChild(style);

        // Update progress on scroll
        function updateProgress() {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrollTop / docHeight) * 100;
            
            const progressFill = progressBar.querySelector('.reading-progress-fill');
            progressFill.style.width = Math.min(Math.max(progress, 0), 100) + '%';
            
            // Show/hide progress bar
            if (scrollTop > 300) {
                progressBar.classList.add('visible');
            } else {
                progressBar.classList.remove('visible');
            }
        }

        // Throttled scroll listener
        let ticking = false;
        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(updateProgress);
                ticking = true;
                setTimeout(() => ticking = false, 10);
            }
        });
    }

    // Initialize theme interactions on page load
    function initTheme() {
        // Add loading class to body for smooth transitions
        document.body.classList.add('theme-loading');
        
        // Initialize components
        initMobileMenu();
        initSmoothScrolling();
        initReadingProgress();
        
        // Add scroll-based header background
        const header = document.querySelector('.site-header');
        if (header) {
            window.addEventListener('scroll', function() {
                if (window.pageYOffset > 50) {
                    header.style.background = 'linear-gradient(135deg, rgba(102, 126, 234, 0.95), rgba(118, 75, 162, 0.95))';
                    header.style.backdropFilter = 'blur(10px)';
                } else {
                    header.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                    header.style.backdropFilter = 'none';
                }
            });
        }

        // Animate post cards on scroll
        const observeCards = () => {
            const cards = document.querySelectorAll('.post-card');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            cards.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(card);
            });
        };

        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', observeCards);
        } else {
            observeCards();
        }
        
        // Remove loading class after everything is initialized
        setTimeout(() => {
            document.body.classList.remove('theme-loading');
        }, 100);
    }

    // Start initialization
    initTheme();

})();
                height: 3px;
                background: #3498db;
                z-index: 1000;
                transition: width 0.1s ease;
            `;
            document.body.appendChild(progressBar);
        } else {
            progressBar.style.width = Math.min(Math.max(progress, 0), 100) + '%';
        }
    }

    // Add reading progress to post pages
    if (document.querySelector('.post-content')) {
        window.addEventListener('scroll', updateReadingProgress);
        window.addEventListener('resize', updateReadingProgress);
        updateReadingProgress();
    }

    // Add copy to clipboard functionality for code blocks
    document.querySelectorAll('pre code').forEach(block => {
        const button = document.createElement('button');
        button.className = 'copy-button';
        button.textContent = 'Copy';
        button.style.cssText = `
            position: absolute;
            top: 8px;
            right: 8px;
            padding: 4px 8px;
            background: #f1f1f1;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 12px;
            cursor: pointer;
            opacity: 0;
            transition: opacity 0.2s;
        `;

        const pre = block.parentElement;
        pre.style.position = 'relative';
        pre.appendChild(button);

        pre.addEventListener('mouseenter', () => {
            button.style.opacity = '1';
        });

        pre.addEventListener('mouseleave', () => {
            button.style.opacity = '0';
        });

        button.addEventListener('click', () => {
            navigator.clipboard.writeText(block.textContent).then(() => {
                button.textContent = 'Copied!';
                setTimeout(() => {
                    button.textContent = 'Copy';
                }, 2000);
            });
        });
    });

})();
