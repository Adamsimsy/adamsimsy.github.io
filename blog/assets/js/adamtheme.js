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

    // Search functionality
    function initSearch() {
        const searchInput = document.querySelector('.search-input');
        const searchButton = document.querySelector('.search-button');
        
        if (!searchInput || !searchButton) return;

        let searchData = null;
        let searchTimeout = null;

        // Load search data
        async function loadSearchData() {
            if (searchData) return searchData;
            
            try {
                const response = await fetch('/search.json');
                searchData = await response.json();
                return searchData;
            } catch (error) {
                console.error('Failed to load search data:', error);
                return [];
            }
        }

        // Perform search
        function performSearch(query) {
            if (!query || query.trim().length < 2) {
                // If we're on the search page, show the initial message
                if (window.location.pathname.includes('/search')) {
                    showSearchResults([], query);
                }
                return;
            }

            loadSearchData().then(data => {
                const results = searchPosts(data, query.trim());
                
                if (window.location.pathname.includes('/search')) {
                    showSearchResults(results, query);
                } else {
                    // Redirect to search page with query
                    const searchUrl = '/search?q=' + encodeURIComponent(query);
                    window.location.href = searchUrl;
                }
            });
        }

        // Search through posts
        function searchPosts(posts, query) {
            const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);
            
            return posts.filter(post => {
                const searchableText = [
                    post.title,
                    post.content,
                    post.excerpt,
                    ...post.categories,
                    ...post.tags
                ].join(' ').toLowerCase();

                return searchTerms.every(term => searchableText.includes(term));
            }).sort((a, b) => {
                // Score based on title matches (higher priority)
                const aTitle = a.title.toLowerCase();
                const bTitle = b.title.toLowerCase();
                const aInTitle = searchTerms.some(term => aTitle.includes(term));
                const bInTitle = searchTerms.some(term => bTitle.includes(term));
                
                if (aInTitle && !bInTitle) return -1;
                if (!aInTitle && bInTitle) return 1;
                
                // Secondary sort by date (newest first)
                return new Date(b.date) - new Date(a.date);
            });
        }

        // Show search results on search page
        function showSearchResults(results, query) {
            const resultsContainer = document.getElementById('search-results');
            if (!resultsContainer) return;

            if (results.length === 0) {
                resultsContainer.innerHTML = query ? 
                    `<div class="no-results">No posts found for "${query}"</div>` :
                    '<p class="search-info">Enter a search term to find posts.</p>';
                return;
            }

            const statsHtml = `<div class="search-stats">Found ${results.length} post${results.length !== 1 ? 's' : ''} for "${query}"</div>`;
            
            const resultsHtml = results.map(post => `
                <article class="search-result">
                    <h3><a href="${post.url}">${post.title}</a></h3>
                    <div class="search-result-meta">${post.date}</div>
                    <div class="search-result-excerpt">${post.excerpt}</div>
                    <div class="search-result-tags">
                        ${post.categories.map(cat => `<span class="search-result-tag">${cat}</span>`).join('')}
                        ${post.tags.map(tag => `<span class="search-result-tag">${tag}</span>`).join('')}
                    </div>
                </article>
            `).join('');

            resultsContainer.innerHTML = statsHtml + resultsHtml;
        }

        // Handle search input
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            const query = this.value;
            
            // Debounce search if we're on the search page
            if (window.location.pathname.includes('/search')) {
                searchTimeout = setTimeout(() => {
                    performSearch(query);
                }, 300);
            }
        });

        // Handle search button click
        searchButton.addEventListener('click', function(e) {
            e.preventDefault();
            performSearch(searchInput.value);
        });

        // Make search box clickable to focus input
        const searchBox = document.querySelector('.search-box');
        if (searchBox) {
            searchBox.addEventListener('click', function(e) {
                if (e.target === this || e.target.classList.contains('search-input')) {
                    searchInput.focus();
                }
            });
        }

        // Handle Enter key
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch(this.value);
            }
        });

        // If we're on the search page, initialize with URL query
        if (window.location.pathname.includes('/search')) {
            const urlParams = new URLSearchParams(window.location.search);
            const query = urlParams.get('q');
            
            if (query) {
                searchInput.value = query;
                performSearch(query);
            }

            // Also set up the page search input
            const pageSearchInput = document.getElementById('search-input-page');
            const pageSearchButton = document.getElementById('search-button-page');
            
            if (pageSearchInput) {
                pageSearchInput.value = query || '';
                
                pageSearchInput.addEventListener('input', function() {
                    clearTimeout(searchTimeout);
                    searchTimeout = setTimeout(() => {
                        const newQuery = this.value;
                        if (newQuery !== query) {
                            // Update URL and perform search
                            const newUrl = newQuery ? 
                                '/search?q=' + encodeURIComponent(newQuery) : 
                                '/search';
                            window.history.pushState({}, '', newUrl);
                            performSearch(newQuery);
                        }
                    }, 300);
                });

                pageSearchButton.addEventListener('click', function() {
                    performSearch(pageSearchInput.value);
                });

                pageSearchInput.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        performSearch(this.value);
                    }
                });
            }
        }
    }

    // Start initialization
    initTheme();
    initSearch();

})();
