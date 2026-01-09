// Navigation functionality for Austrino website

document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initMegaMenu();
    initSearch();
    initBreadcrumb();
});

// Mobile menu toggle
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active');
            
            // Animate hamburger menu
            const spans = mobileToggle.querySelectorAll('span');
            if (mobileToggle.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('nav')) {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
                const spans = mobileToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
}

// Mega menu functionality
function initMegaMenu() {
    const menuItems = document.querySelectorAll('.nav-menu > li');
    
    menuItems.forEach(item => {
        const link = item.querySelector('a');
        const megaMenu = item.querySelector('.mega-menu');
        
        if (megaMenu) {
            // Add mega menu trigger
            link.addEventListener('mouseenter', function() {
                megaMenu.style.display = 'block';
                setTimeout(() => megaMenu.classList.add('active'), 10);
            });
            
            item.addEventListener('mouseleave', function() {
                megaMenu.classList.remove('active');
                setTimeout(() => megaMenu.style.display = 'none', 300);
            });
        }
    });
}

// Search functionality
function initSearch() {
    const searchToggle = document.querySelector('.search-toggle');
    const searchModal = document.querySelector('.search-modal');
    const searchInput = document.querySelector('.search-input');
    const searchResults = document.querySelector('.search-results');
    
    if (searchToggle && searchModal) {
        searchToggle.addEventListener('click', function() {
            searchModal.style.display = 'block';
            setTimeout(() => searchInput.focus(), 100);
        });
        
        // Close search modal
        const closeBtn = searchModal.querySelector('.close-search');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                searchModal.style.display = 'none';
                searchInput.value = '';
                searchResults.innerHTML = '';
            });
        }
        
        // Search functionality
        let searchTimeout;
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            const query = this.value.trim();
            
            if (query.length > 2) {
                searchTimeout = setTimeout(() => performSearch(query), 300);
            } else {
                searchResults.innerHTML = '';
            }
        });
    }
}

// Perform search
function performSearch(query) {
    const searchResults = document.querySelector('.search-results');
    
    // Mock search results - replace with actual search API
    const mockResults = [
        { title: 'Digital Transformation Services', url: '/services/digital-transformation.html' },
        { title: 'Cloud Computing Solutions', url: '/services/cloud-services.html' },
        { title: 'AI & Analytics', url: '/services/ai-analytics.html' }
    ];
    
    const filteredResults = mockResults.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase())
    );
    
    if (filteredResults.length > 0) {
        searchResults.innerHTML = filteredResults.map(result => `
            <div class="search-result-item">
                <a href="${result.url}">${result.title}</a>
            </div>
        `).join('');
    } else {
        searchResults.innerHTML = '<div class="no-results">No results found</div>';
    }
}

// Breadcrumb navigation
function initBreadcrumb() {
    const breadcrumb = document.querySelector('.breadcrumb');
    if (!breadcrumb) return;
    
    const currentPath = window.location.pathname;
    const pathSegments = currentPath.split('/').filter(segment => segment);
    
    let breadcrumbHTML = '<li class="breadcrumb-item"><a href="/">Home</a></li>';
    let buildPath = '';
    
    pathSegments.forEach((segment, index) => {
        buildPath += `/${segment}`;
        const isLast = index === pathSegments.length - 1;
        const formattedSegment = segment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        
        if (isLast) {
            breadcrumbHTML += `<li class="breadcrumb-item active">${formattedSegment}</li>`;
        } else {
            breadcrumbHTML += `<li class="breadcrumb-item"><a href="${buildPath}">${formattedSegment}</a></li>`;
        }
    });
    
    breadcrumb.innerHTML = breadcrumbHTML;
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    // Escape key closes modals and menus
    if (e.key === 'Escape') {
        const searchModal = document.querySelector('.search-modal');
        const navMenu = document.querySelector('.nav-menu');
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        
        if (searchModal && searchModal.style.display === 'block') {
            searchModal.style.display = 'none';
        }
        
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (mobileToggle) {
                mobileToggle.classList.remove('active');
            }
        }
    }
    
    // Tab navigation for accessibility
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

// Remove keyboard navigation class on mouse use
document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Navigation analytics (optional)
function trackNavigation(pageName) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view', {
            page_title: pageName,
            page_location: window.location.href
        });
    }
}

// Export functions for use in other modules
window.Navigation = {
    initMobileMenu,
    initMegaMenu,
    initSearch,
    initBreadcrumb,
    performSearch,
    trackNavigation
};