import { createRouter, createWebHistory } from 'vue-router'

import Home from './pages/Home.vue'
import Blog from './pages/Blog.vue'
import About from './pages/About.vue'
import Contact from './pages/Contact.vue'
import Subscribe from './pages/Subscribe.vue'
import CreateBlog from './pages/CreateBlog.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/blog', name: 'Blog', component: Blog },
  { path: '/about', name: 'About', component: About },
  { path: '/contact', name: 'Contact', component: Contact },
  { path: '/subscribe', name: 'Subscribe', component: Subscribe },
  { path: '/create-blog', name: 'CreateBlog', component: CreateBlog },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
