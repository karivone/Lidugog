<template>
  <div id="app">
    <header class="header">
      <div class="header-content">
        <router-link to="/" class="logo-link">
          <img alt="Lidugog Blog" class="logo" src="./assets/Lidugog_logo.png" width="60" height="60" />
          <span class="logo-text">Lidugog</span>
        </router-link>
        
        <nav class="nav">
          <router-link to="/" class="nav-link">
            <span>Home</span>
          </router-link>
          <router-link to="/blog" class="nav-link">
            <span>Blog</span>
          </router-link>
          <router-link to="/about" class="nav-link">
            <span>About</span>
          </router-link>
          <router-link to="/contact" class="nav-link">
            <span>Contact</span>
          </router-link>
          <router-link to="/subscribe" class="nav-link subscribe-btn">
            <span>Subscribe</span>
          </router-link>
        </nav>

        <button class="mobile-menu-btn" @click="toggleMobileMenu">
          <i class="fas fa-bars"></i>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div class="mobile-nav" :class="{ 'mobile-nav-open': isMobileMenuOpen }">
        <router-link to="/" class="mobile-nav-link" @click="closeMobileMenu">Home</router-link>
        <router-link to="/blog" class="mobile-nav-link" @click="closeMobileMenu">Blog</router-link>
        <router-link to="/about" class="mobile-nav-link" @click="closeMobileMenu">About</router-link>
        <router-link to="/contact" class="mobile-nav-link" @click="closeMobileMenu">Contact</router-link>
        <router-link to="/subscribe" class="mobile-nav-link subscribe-mobile" @click="closeMobileMenu">Subscribe</router-link>
      </div>
    </header>

    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const isMobileMenuOpen = ref(false)
    
    const toggleMobileMenu = () => {
      isMobileMenuOpen.value = !isMobileMenuOpen.value
    }
    
    const closeMobileMenu = () => {
      isMobileMenuOpen.value = false
    }
    
    return {
      isMobileMenuOpen,
      toggleMobileMenu,
      closeMobileMenu
    }
  }
}
</script>

<style scoped>
/* CSS Variables - Add to your base.css */
:root {
  --primary-color: #6366f1;
  --primary-light: #8b5cf6;
  --secondary-color: #10b981;
  --accent-color: #f59e0b;
  --light-bg: #fafbfc;
  --card-bg: #ffffff;
  --text-primary: #1e293b;
  --text-secondary: #64748b;
  --text-light: #ffffff;
  --border-color: #e2e8f0;
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --transition-normal: 0.3s ease;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
  --font-sm: 0.875rem;
  --font-xl: 1.25rem;
  --gradient-primary: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  --gradient-accent: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--text-primary);
  padding-top: 80px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Header Styles */
.header {
  background: var(--card-bg);
  box-shadow: var(--shadow-md);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  border-bottom: 1px solid var(--border-color);
  height: 80px;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-xl);
  display: flex;
  align-items: center;
  height: 100%;
}

.logo-link {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  text-decoration: none;
  transition: all var(--transition-normal);
  flex-shrink: 0;
}

.logo-link:hover {
  transform: translateY(-2px);
  opacity: 0.9;
}

.logo {
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.logo-text {
  font-size: var(--font-xl);
  font-weight: 800;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.nav {
  display: flex;
  align-items: center;
  gap: var(--space-xl);
  margin-left: auto;
  padding-left: 20rem;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 0.75rem 1.25rem;
  border-radius: 12px;
  text-decoration: none;
  color: var(--text-secondary);
  font-weight: 600;
  font-size: var(--font-sm);
  transition: all var(--transition-normal);
  background: transparent;
  border: 2px solid transparent;
  cursor: pointer;
}

.nav-link:hover {
  color: var(--secondary-color);
  border-color: var(--secondary-color);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.nav-link:hover::before,
.nav-link.router-link-active::before {
  left: 0;
}

.nav-link.router-link-active {
  color: var(--secondary-color);
  border-color: var(--secondary-color);
  background: rgba(16, 185, 129, 0.1);
}

.subscribe-btn {
  background: var(--secondary-color);
  color: var(--text-light);
  border: none;
}

.subscribe-btn:hover {
  background: var(--secondary-color);
  opacity: 0.9;
  color: var(--text-light);
  border: none;
  transform: translateY(-2px) scale(1.05);
  box-shadow: var(--shadow-lg);
}

.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  font-size: var(--font-xl);
  color: var(--text-primary);
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: all var(--transition-normal);
}

.mobile-menu-btn:hover {
  background: var(--border-color);
}

/* Mobile Navigation */
.mobile-nav {
  display: none;
  flex-direction: column;
  background: var(--card-bg);
  border-top: 1px solid var(--border-color);
  max-height: 0;
  overflow: hidden;
  transition: max-height var(--transition-normal);
}

.mobile-nav-open {
  max-height: 400px;
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  padding: var(--space-lg);
  text-decoration: none;
  color: var(--text-secondary);
  border-bottom: 1px solid var(--border-color);
  transition: all var(--transition-normal);
}

.mobile-nav-link:hover,
.mobile-nav-link.router-link-active {
  background: var(--gradient-primary);
  color: var(--text-light);
}

.subscribe-mobile {
  background: var(--gradient-accent);
  color: var(--text-light);
  border-bottom: none;
}

/* Main Content */
.main-content {
  flex: 1;
  min-height: calc(100vh - 80px);
  margin-top: 2rem;
  padding: 0 var(--space-xl);
}

/* Responsive Design */
@media (max-width: 768px) {
  .nav {
    display: none;
  }
  
  .mobile-menu-btn,
  .mobile-nav {
    display: flex;
  }
  
  .header-content {
    padding: var(--space-md);
  }
  
  .logo-text {
    display: none;
  }
}
</style>