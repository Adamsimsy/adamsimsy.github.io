// AdamTheme JavaScript
(function() {
    'use strict';

    // Mobile menu toggle
    const navTrigger = document.getElementById('nav-trigger');
    const siteNav = document.querySelector('.site-nav');
    
    if (navTrigger && siteNav) {
        navTrigger.addEventListener('change', function() {
            if (this.checked) {
                siteNav.setAttribute('aria-expanded', 'true');
            } else {
                siteNav.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Reading progress indicator
    function updateReadingProgress() {
        const article = document.querySelector('.post-content');
        if (!article) return;

        const totalHeight = article.offsetHeight;
        const windowHeight = window.innerHeight;
        const scrollTop = window.pageYOffset;
        const progress = (scrollTop / (totalHeight - windowHeight)) * 100;
        
        let progressBar = document.querySelector('.reading-progress');
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.className = 'reading-progress';
            progressBar.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: ${Math.min(Math.max(progress, 0), 100)}%;
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
