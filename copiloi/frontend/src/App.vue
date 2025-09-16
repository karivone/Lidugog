
<script setup>
</script>


<template>
  <div>
    <header>
      <div class="header-content">
        <img alt="logo" class="logo" src="./assets/Lidugog_logo.png" width="80" height="80" />
        <nav>
          <router-link to="/">Home</router-link>
          <router-link to="/blog">Blog</router-link>
          <router-link to="/about">About Me</router-link>
          <router-link to="/contact">Contact</router-link>
          <router-link to="/subscribe">Subscribe</router-link>
        </nav>
      </div>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  margin-bottom: 1rem;
  background: #fff;
  box-shadow: 0 2px 8px rgba(235, 186, 81, 0.04);
  position: sticky;
  top: 0;
  z-index: 10;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.5rem 1rem;
  flex-wrap: nowrap;
}
@media (max-width: 700px) {
  .header-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
    flex-wrap: wrap;
  }
  .logo {
    margin-bottom: 0.5rem;
  }
  nav {
    width: 100%;
    justify-content: flex-start;
    gap: 0.25rem;
  }
  nav a {
    padding: 0.5rem 0.5rem;
    font-size: 0.98rem;
  }
}

.logo {
  display: block;
  margin: 0 1.5rem 0 0;
  width: 80px;
  height: 80px;
}

nav {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
  margin-left: auto;
}

nav a {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  text-decoration: none;
  color: #222;
  font-weight: 500;
  transition: background 0.15s, color 0.15s;
}

nav a.router-link-exact-active {
  background: #42b983;
  color: #fff;
}

nav a.create-blog-link {
  background: #ffd700;
  color: #222;
  font-weight: bold;
  margin-left: 0.5rem;
  border: 1px solid #ffd700;
  transition: background 0.15s, color 0.15s;
}
nav a.create-blog-link:hover {
  background: #fffbe6;
  color: #42b983;
  border: 1px solid #42b983;
}

@media (max-width: 700px) {
  .header-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  .logo {
    margin-bottom: 0.5rem;
  }
  nav {
    width: 100%;
    justify-content: flex-start;
    gap: 0.25rem;
  }
  nav a {
    padding: 0.5rem 0.5rem;
    font-size: 0.98rem;
  }
}
</style>
