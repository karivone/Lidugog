<template>
  <section class="create-blog-section">
    <h1>Create New Blog Post</h1>
    <form class="create-blog-form" @submit.prevent="submitBlog" enctype="multipart/form-data">
      <input v-model="title" type="text" placeholder="Title*" required />
      <input v-model="author" type="text" placeholder="Author*" required />
      <input v-model="date" type="date" required />
      <textarea v-model="summary" placeholder="Summary*" required rows="3"></textarea>
      <input type="file" @change="onFileChange" accept="image/*" />
      <button type="submit">Create Blog</button>
    </form>
    <p v-if="responseMsg" class="success-msg">{{ responseMsg }}</p>
  </section>
</template>

<script setup>
import { ref } from 'vue'
const title = ref('')
const author = ref('')
const date = ref('')
const summary = ref('')
const imageFile = ref(null)
const responseMsg = ref('')

function onFileChange(e) {
  imageFile.value = e.target.files[0]
}

async function submitBlog() {
  if (!title.value || !author.value || !date.value || !summary.value) {
    responseMsg.value = 'Please fill all fields.'
    return
  }
  const formData = new FormData()
  formData.append('title', title.value)
  formData.append('author', author.value)
  formData.append('date', date.value)
  formData.append('summary', summary.value)
  if (imageFile.value) {
    formData.append('image', imageFile.value)
  }
  try {
    const res = await fetch('http://localhost:4000/api/posts', {
      method: 'POST',
      body: formData
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Failed to create blog')
    responseMsg.value = 'Blog created successfully!'
    title.value = ''
    author.value = ''
    date.value = ''
    summary.value = ''
    imageFile.value = null
  } catch (e) {
    responseMsg.value = e.message || 'Failed to create blog.'
  }
}
</script>

<style scoped>
.create-blog-section {
  max-width: 480px;
  margin: 3rem auto;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  padding: 2.5rem 2rem 2rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.create-blog-section h1 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #222;
  text-align: center;
}
.create-blog-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.create-blog-form input,
.create-blog-form textarea {
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
}
.create-blog-form button {
  background: #42b983;
  color: #fff;
  border: none;
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  font-weight: bold;
}
.success-msg {
  color: #42b983;
  margin-top: 1rem;
  text-align: center;
}
</style>
