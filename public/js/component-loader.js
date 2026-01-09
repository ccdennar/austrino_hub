// Component Loader for dynamically loading reusable components
class ComponentLoader {
    constructor() {
        this.loadedComponents = new Map();
        this.componentCache = new Map();
    }

    async loadComponent(componentName, targetElement, data = {}) {
        try {
            // Check if component is already loaded
            if (this.componentCache.has(componentName)) {
                const componentHTML = this.componentCache.get(componentName);
                this.renderComponent(componentHTML, targetElement, data);
                return;
            }

            // Load component from file
            const response = await fetch(`components/${componentName}.html`);
            if (!response.ok) {
                throw new Error(`Component ${componentName} not found`);
            }

            const componentHTML = await response.text();
            
            // Cache the component
            this.componentCache.set(componentName, componentHTML);
            
            // Render the component
            this.renderComponent(componentHTML, targetElement, data);
            
        } catch (error) {
            console.error(`Error loading component ${componentName}:`, error);
            this.renderError(targetElement, componentName);
        }
    }

    renderComponent(componentHTML, targetElement, data) {
        // Process template variables if data is provided
        let processedHTML = this.processTemplate(componentHTML, data);
        
        // Insert the component
        if (typeof targetElement === 'string') {
            targetElement = document.querySelector(targetElement);
        }
        
        if (targetElement) {
            targetElement.innerHTML = processedHTML;
            
            // Execute any scripts in the component
            this.executeScripts(targetElement);
            
            // Dispatch custom event
            targetElement.dispatchEvent(new CustomEvent('component:loaded', {
                detail: { component: processedHTML, data: data }
            }));
        }
    }

    processTemplate(html, data) {
        // Simple template processing - replace {{variable}} with data
        Object.keys(data).forEach(key => {
            const regex = new RegExp(`{{${key}}}`, 'g');
            html = html.replace(regex, data[key]);
        });
        
        // Remove any remaining template variables
        html = html.replace(/\{\{[^}]+\}\}/g, '');
        
        return html;
    }

    executeScripts(container) {
        // Find and execute scripts in the component
        const scripts = container.querySelectorAll('script');
        scripts.forEach(script => {
            const newScript = document.createElement('script');
            
            if (script.src) {
                newScript.src = script.src;
            } else {
                newScript.textContent = script.textContent;
            }
            
            document.head.appendChild(newScript);
            document.head.removeChild(newScript);
        });
    }

    renderError(targetElement, componentName) {
        if (targetElement) {
            targetElement.innerHTML = `
                <div class="component-error">
                    <p>Error loading component: ${componentName}</p>
                </div>
            `;
        }
    }

    // Batch load multiple components
    async loadComponents(components) {
        const promises = components.map(({ name, target, data }) => 
            this.loadComponent(name, target, data)
        );
        
        return Promise.all(promises);
    }

    // Clear component cache
    clearCache() {
        this.componentCache.clear();
    }

    // Preload components for better performance
    async preloadComponents(componentNames) {
        const preloadPromises = componentNames.map(name => 
            this.loadComponent(name, document.createElement('div'))
                .catch(error => console.warn(`Failed to preload ${name}:`, error))
        );
        
        return Promise.all(preloadPromises);
    }
}

// Initialize component loader
const componentLoader = new ComponentLoader();

// Auto-load components on page load
document.addEventListener('DOMContentLoaded', async () => {
    // Load header component
    const headerContainer = document.getElementById('header-container');
    if (headerContainer) {
        await componentLoader.loadComponent('header', headerContainer);
    }
    
    // Load footer component
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        await componentLoader.loadComponent('footer', footerContainer);
    }
    
    // Load hero component
    const heroContainer = document.getElementById('hero-container');
    if (heroContainer) {
        await componentLoader.loadComponent('hero-section', heroContainer);
    }
    
    // Preload commonly used components
    await componentLoader.preloadComponents(['card-component']);
});

// Export for global use
window.ComponentLoader = ComponentLoader;
window.componentLoader = componentLoader;

// Example usage:
// componentLoader.loadComponent('header', '#header-container', { pageTitle: 'Services' });
// componentLoader.loadComponent('service-card', '#services-grid', serviceData);